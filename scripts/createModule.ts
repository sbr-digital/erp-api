import { exec } from 'node:child_process'
import * as fs from 'node:fs'
import * as path from 'node:path'

const createFile = (filePath: string, content: string = ''): void => {
  fs.writeFileSync(filePath, content, { flag: 'w' })
}

const createDirectory = (dirPath: string): void => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }
}

const capitalizeFirstLetter = (letter: string): string => {
  return letter.charAt(0).toUpperCase() + letter.substring(1)
}

const generateUseCaseContent = (classModule: string) => {
  const caps = capitalizeFirstLetter(classModule)
  return `
  import { inject, injectable } from 'tsyringe'

  import { I${caps}Repository } from '../../domain'

  interface ${caps}Input {
    generic: string
  }

  interface ${caps}Output {
    generic: string
  }

  @injectable()
  export class ${caps}UseCase {
    constructor(
      @inject('generic')
      private ${classModule}Repository: I${caps}Repository,
    ) {}

    async execute({ generic }: ${caps}Request): Promise<${caps}Output> {
              
      return { generic }
    }
  }`
}

const contentSpec = `import { describe, expect, it } from 'vitest'

describe('teste', () => {
  it('teste', () => {
    expect(1 + 1).toEqual(2)
  })
})
`

const createModule = (moduleName: string): void => {
  const baseDir = path.join(__dirname, '../', 'src', 'modules', moduleName)

  if (fs.existsSync(baseDir)) {
    console.error(`Module ${moduleName} already exists.`)
    return
  }

  const classModule = capitalizeFirstLetter(moduleName)

  const contentEntity = `import { Entity } from '@/core/domain/entities/entity'
  import { Optional } from '@/core/types/optional'

  interface ${classModule}Props {
    name: string
    enable: boolean
    createdAt: Date
    updatedAt?: Date
  }

  export class ${classModule} extends Entity<${classModule}Props> {
  
    private touch() {
      this.props.updatedAt = new Date()
    }

    static create(
      props: Optional<${classModule}Props, 'createdAt' | 'enable'>,
      id?: number,
    ) {
      const ${moduleName} = new ${classModule}(
        {
          ...props,
          createdAt: new Date(),
          updatedAt: new Date(),
          enable: true,
        },
        id,
      )
  
      return ${moduleName}
    }

    delete() {
      this.props.enable = false
      this.touch()
    }

    toJSON() {
      return {
        id: this.id,
        enable: this.props.enable,
        createdAt: this.props.createdAt,
        updatedAt: this.props.updatedAt,
      }
    }

    get createdAt(): Date {
      return this.props.createdAt
    }
  
    get updatedAt(): Date {
      return this.props.updatedAt!
    }

    get name(): string {
      return this.props.name
    }
  
    set name(value: string) {
      if (!value || value.length < 3) {
        throw new Error('name is required and must be at least 3 characters long')
      }
  
      this.props.name = value
    }
  
    get enable(): boolean {
      return this.props.enable
    }
  
    set enable(value: boolean) {
      this.props.enable = value
    }
  }
  `

  const contentRoute = `
  import { FastifyInstance } from 'fastify'

  import { PATHS } from '@/constants'

  export async function ${moduleName}Routes(server: FastifyInstance) {
    const create${classModule}Controller = new Create${classModule}Controller()

    server.post(
      PATHS,
      create${classModule}Controller.handle.bind(create${classModule}Controller),
    )
  }`

  const contentDTO = `
  import { z } from 'zod'

  export const ${classModule}DTO = z.object({
    generic: z.string().trim(),
  })

  export type ${classModule}DTOType = z.infer<typeof ${classModule}DTO>`

  const contentDomainRepository = `
  import {${classModule}} from '../entities/${classModule}'
  export interface I${classModule}Repository {
    save(${moduleName}: ${classModule}): Promise<void>
    update({id, name, enable}: ${classModule}): Promise<void>
    findByID({ id }: {id: number }): Promise<${classModule} | null>
    delete(): Promise<void>
  }  `

  const contentFake = `
  import { ${classModule} } from '../../domain'

export const fake${classModule}: ${classModule}[] = [
  new ${classModule}({ enable: true }, 1),
  new ${classModule}({ enable: true }, 2),
  new ${classModule}({ enable: true }, 3),
  new ${classModule}({ enable: true }, 4),
]`

  const contentRepository = (type: string) => {
    return `
  import { I${classModule}Repository, ${classModule} } from '../../../domain'
  
  export class ${type}${classModule}Repository implements I${classModule}Repository {
    async save(${moduleName}: ${classModule}): Promise<void> {
      throw new Error('Method not implemented.')
    }
  
    async update({ id, name, enable }: ${classModule}): Promise<void> {
      throw new Error('Method not implemented.')
    }
  
    async findByID({ id }: { id: number }): Promise<${classModule} | null> {
      throw new Error('Method not implemented.')
    }
  
    async delete(): Promise<void> {
      throw new Error('Method not implemented.')
    }
  }
  `
  }

  const contentUseCase = generateUseCaseContent(moduleName)

  const dirs = [
    `${baseDir}/__tests__`,
    `${baseDir}/__tests__/use-cases`,
    `${baseDir}/__tests__/mocks`,
    `${baseDir}/application/use-cases`,
    `${baseDir}/domain/entities`,
    `${baseDir}/domain/repository`,
    `${baseDir}/dtos`,
    `${baseDir}/infra/database`,
    `${baseDir}/infra/database/adapters`,
    `${baseDir}/infra/database/in-memory`,
    `${baseDir}/infra/database/prisma`,
    `${baseDir}/infra/http/controllers`,
    `${baseDir}/infra/http/routes`,
  ]

  const files = [
    {
      path: `${baseDir}/__tests__/${classModule}.spec.ts`,
      content: contentSpec,
    },
    {
      path: `${baseDir}/__tests__/use-cases/Create${classModule}.useCase.spec.ts`,
      content: contentSpec,
    },
    {
      path: `${baseDir}/__tests__/mocks/fake${classModule}.ts`,
      content: contentFake,
    },
    {
      path: `${baseDir}/application/use-cases/Create${classModule}.useCase.ts`,
      content: contentUseCase,
    },
    {
      path: `${baseDir}/application/use-cases/index.ts`,
      content: `export * from './Create${classModule}.useCase'`,
    },
    {
      path: `${baseDir}/domain/index.ts`,
      content: `      
      export * from './repository/I${classModule}.repository'
      export * from './entities/${classModule}'
      `,
    },
    {
      path: `${baseDir}/domain/entities/${classModule}.ts`,
      content: contentEntity,
    },
    {
      path: `${baseDir}/domain/repository/I${classModule}.repository.ts`,
      content: contentDomainRepository,
    },
    {
      path: `${baseDir}/dtos/index.ts`,
      content: `export * from './Create${classModule}.DTO'`,
    },
    {
      path: `${baseDir}/dtos/Create${classModule}.DTO.ts`,
      content: contentDTO,
    },
    {
      path: `${baseDir}/infra/index.ts`,
      content: `export * from './http/controllers/Create${classModule}.controller'
      
      export * from './http/routes/${moduleName}.routes'
      `,
    },
    {
      path: `${baseDir}/infra/database/index.ts`,
      content: `export * from '../database/in-memory/InMemory${classModule}.repository'

      export * from '../database/prisma/Prisma${classModule}.repository'
      `,
    },
    {
      path: `${baseDir}/infra/database/adapters/index.ts`,
      content: `export * from './${classModule}Database.adapter'
      export * from './${classModule}Domain.adapter'`,
    },
    {
      path: `${baseDir}/infra/database/adapters/${classModule}Database.adapter.ts`,
      content: `import { ${classModule} } from '../../../domain'

      interface ${classModule}DatabaseResult {
        id: number
        name: string
        enable: boolean
      }
      
      export class ${classModule}DatabaseAdapter {
        static toDomain(dbResult: ${classModule}DatabaseResult | null): ${classModule} | null {
          if (!dbResult) return null
      
          return new ${classModule}(
            { name: dbResult.name, enable: dbResult.enable },
            dbResult.id,
          )
        }
      }`,
    },
    {
      path: `${baseDir}/infra/database/adapters/${classModule}Domain.adapter.ts`,
      content: `import { ${classModule} } from '../../../domain'

      export class ${classModule}DomainAdapter {
        static toDatabase(${moduleName}: ${classModule}) {
          return {
            id: ${moduleName}.id,
            name: ${moduleName}.name,
            enable: ${moduleName}.enable,
          }
        }
      }`,
    },
    {
      path: `${baseDir}/infra/database/in-memory/InMemory${classModule}.repository.ts`,
      content: contentRepository('InMemory'),
    },
    {
      path: `${baseDir}/infra/database/prisma/Prisma${classModule}.repository.ts`,
      content: contentRepository('Prisma'),
    },
    {
      path: `${baseDir}/infra/http/controllers/Create${classModule}.controller.ts`,
      content: `import { FastifyReply, FastifyRequest } from 'fastify'
      import { container } from 'tsyringe'
      
      import { ParsedError } from '@/errors'
      import { Create${classModule}UseCase } from '../../../application/use-cases'
      import { Create${classModule}DTO } from '../../../dtos'
      
      export class Create${classModule}Controller {
        async handle(
          req: FastifyRequest,
          reply: FastifyReply,
        ): Promise<FastifyReply> {
          try {
            const create${classModule}UseCase = container.resolve(Create${classModule}UseCase)
      
            const { generic } = await Create${classModule}DTO.parseAsync(req.body)
      
            await create${classModule}UseCase.execute({ generic })
      
            return reply.status(201).send()
          } catch (error) {
            return ParsedError.toResponse({ error, reply })
          }
        }
      }`,
    },
    {
      path: `${baseDir}/infra/http/routes/${moduleName}.routes.ts`,
      content: contentRoute,
    },
  ]

  dirs.forEach(createDirectory)
  files.forEach((file) => createFile(file.path, file.content))

  exec('pnpm run lint')
  console.log(`Module ${moduleName} created successfully.`)
}

const moduleName = process.argv[2]
if (!moduleName) {
  console.error('Please provide a module name.')
  process.exit(1)
}

createModule(moduleName)
