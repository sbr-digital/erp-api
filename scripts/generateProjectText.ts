import * as fs from 'node:fs'
import * as path from 'node:path'

interface Config {
  excludedFolders: string[]
  excludedFiles: string[]
  excludedExtensions: string[]
}

const config: Config = {
  excludedFolders: ['node_modules', '.git', '.husky'],
  excludedFiles: [
    '.env',
    '.gitignore',
    'pass-to-pass.txt',
    'private.key',
    'public.key',
  ],
  excludedExtensions: ['ts'],
}

const isExcludedFolder = (folderName: string): boolean => {
  return config.excludedFolders.includes(folderName)
}

const isExcludedFile = (fileName: string): boolean => {
  return config.excludedFiles.includes(fileName)
}

const isExcludedExtensions = (extension: string): boolean => {
  const sliptExtension = extension.split('.')

  return config.excludedExtensions.includes(
    sliptExtension[sliptExtension.length - 1],
  )
}

const rootDir = path.join(__dirname, '../')

const getDirectoryTree = (
  dirPath: string,
  txtFilePath: string,
  depth: number = 0,
): void => {
  const stats = fs.statSync(dirPath)
  const name = path.basename(dirPath)

  if (isExcludedFolder(name)) {
    return
  }

  const indentation = '│   '.repeat(depth)
  const linePrefix = `${indentation}├── `

  fs.appendFileSync(txtFilePath, `${linePrefix}${name}\n`)

  if (stats.isDirectory()) {
    const files = fs.readdirSync(dirPath)
    files.forEach((file) => {
      const filePath = path.join(dirPath, file)
      const fileName = path.basename(filePath)

      if (isExcludedFile(fileName) || isExcludedExtensions(fileName)) {
        return
      }

      getDirectoryTree(filePath, txtFilePath, depth + 1)
    })
  }
}

const txtFilePath = path.join(__dirname, '../docs/images/projectStructure.txt')

fs.writeFileSync(txtFilePath, '')

getDirectoryTree(rootDir, txtFilePath, 0)

console.log('Directory structure has been written to directory_structure.txt')
