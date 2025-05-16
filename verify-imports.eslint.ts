import * as fs from 'node:fs'
import * as path from 'node:path'
import * as glob from 'glob'
import ts from 'typescript'

// Função para ler e parsear o tsconfig.json
const getTsConfigPaths = () => {
  const configPath = path.resolve(__dirname, 'tsconfig.json')
  const configFile = ts.readConfigFile(configPath, ts.sys.readFile)
  if (configFile.error) {
    throw new Error(
      ts.formatDiagnosticsWithColorAndContext([configFile.error], {
        getCurrentDirectory: ts.sys.getCurrentDirectory,
        getCanonicalFileName: (fileName) => fileName,
        getNewLine: () => ts.sys.newLine,
      }),
    )
  }
  const configParseResult = ts.parseJsonConfigFileContent(
    configFile.config,
    ts.sys,
    path.dirname(configPath),
  )

  return configParseResult.options.paths || {}
}

const tsConfigPaths = getTsConfigPaths()

// Função para resolver paths personalizados
const resolvePath = (importPath: string, filePath: string): string => {
  if (importPath.startsWith('@/')) {
    const alias = '@/*'
    const aliasPaths = tsConfigPaths[alias]
    if (aliasPaths) {
      const aliasPath = aliasPaths[0].replace('/*', '')
      const resolvedPath = path.join(
        __dirname,
        aliasPath,
        importPath.replace('@/', ''),
      )
      const absolutePath = path.resolve(resolvedPath)
      return absolutePath
    }
  }
  const defaultPath = path.resolve(path.dirname(filePath), importPath)
  return defaultPath
}

// Define as regras de importação
const rules = [
  {
    target: ['src/core/domain/**', 'src/domain/**', 'src/modules/**/domain/**'],
    from: ['src/application/**', 'src/modules/**/application/**'],
    message:
      'The domain layer should not depend on application | clean architecture',
  },
  {
    target: ['src/core/domain/**', 'src/domain/**', 'src/modules/**/domain/**'],
    from: ['src/infra/**', 'src/modules/**/infra/**'],
    message: 'The domain layer should not depend on infra | clean architecture',
  },
  {
    target: ['src/application/**', 'src/modules/**/application/**'],
    from: ['src/infra/**', 'src/modules/**/infra/**'],
    message:
      'The application layer should not depend on infra | clean architecture',
  },
]

// Função para verificar se uma importação é válida
const isImportValid = (filePath: string, importedPath: string): boolean => {
  const normalizedPath = path.normalize(importedPath)
  return !rules.some((rule) => {
    return rule.target.some((target) => {
      const targetPattern = path.resolve(target)
      const targetRegex = new RegExp(
        targetPattern.replace(/\*\*/g, '.*').replace(/\*/g, '[^/]*'),
      )
      if (targetRegex.test(filePath)) {
        return rule.from.some((from) => {
          const fromPattern = path.resolve(from)
          const fromRegex = new RegExp(
            fromPattern.replace(/\*\*/g, '.*').replace(/\*/g, '[^/]*'),
          )
          return fromRegex.test(normalizedPath)
        })
      }
      return false
    })
  })
}

// Função para verificar as importações de um arquivo
const checkFileImports = (file: string): string[] => {
  const content = fs.readFileSync(file, 'utf-8')
  const importRegex = /import .* from ['"](.*)['"]/g
  let match: RegExpExecArray | null
  const errors: string[] = []
  while ((match = importRegex.exec(content)) !== null) {
    const importedPath = match[1]
    const resolvedImportedPath = resolvePath(importedPath, file)
    if (!isImportValid(file, resolvedImportedPath)) {
      if (file.includes('domain') && resolvedImportedPath.includes('infra')) {
        errors.push(
          `The domain layer should not depend on infra | clean architecture\n Invalid import from ${importedPath} in ${file}\n`,
        )
      }
      if (
        file.includes('domain') &&
        resolvedImportedPath.includes('application')
      ) {
        errors.push(
          `The domain layer should not depend on application | clean architecture\n Invalid import from ${importedPath} in ${file}\n`,
        )
      }
      if (
        file.includes('application') &&
        resolvedImportedPath.includes('infra')
      ) {
        errors.push(
          `The application layer should not depend on infra | clean architecture\n Invalid import from ${importedPath} in ${file}\n`,
        )
      }
    }
  }
  return errors
}

// Função para verificar todos os arquivos de um diretório
const checkImports = (srcPath: string): string[] => {
  const files = glob.sync(`${srcPath}/**/*.ts`)
  let allErrors: string[] = []
  files.forEach((file) => {
    const errors = checkFileImports(file)
    if (errors.length > 0) {
      allErrors = allErrors.concat(errors)
    }
  })
  return allErrors
}

// Verifique as importações
const srcPath = path.resolve(__dirname, 'src')
const errors = checkImports(srcPath)

if (errors.length > 0) {
  console.error('Found import errors:\n')
  errors.forEach((error) => console.error(error))
  process.exit(1)
} else {
  console.log('No import errors found.')
}
