import { container, delay } from 'tsyringe'

import { CONTAINER } from '@/constants'
import { ICacheService } from '@/core/domain'
import { IPasswordService } from '@/interfaces'

import { IAddressRepository } from '@/modules/address/domain'
import { PrismaAddressRepository } from '@/modules/address/infra/database'
import {
  IAuthenticationRepository,
  IJwtTokenService,
} from '@/modules/authentication/domain'
import { PrismaAuthenticationRepository } from '@/modules/authentication/infra/database'
import { FastifyJwtTokenService } from '@/modules/authentication/infra/services/jwt'
import { IPersonRepository, IUserRepository } from '@/modules/users/domain'
import {
  PrismaPersonRepository,
  PrismaUserRepository,
} from '@/modules/users/infra/database/'

import {
  PasswordService,
  NodeCacheService,
  PinoLoggerService,
} from '../services'
import { ILoggerService } from '@/interfaces/logger'

export class DependencyInjection {
  static botstrap() {
    container.register(CONTAINER.HTTP.REQUEST, {
      useFactory: () => {
        throw new Error(
          'FastifyRequest should be injected in the request context',
        )
      },
    })

    container.register(CONTAINER.HTTP.REPLY, {
      useFactory: () => {
        throw new Error(
          'FastifyReply should be injected in the request context',
        )
      },
    })

    container.registerSingleton<IAuthenticationRepository>(
      CONTAINER.REPOSITORIES.AUTH,
      delay(() => PrismaAuthenticationRepository),
    )

    container.registerSingleton<IUserRepository>(
      CONTAINER.REPOSITORIES.USERS,
      delay(() => PrismaUserRepository),
    )

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    container.registerSingleton<ICacheService<any>>(
      CONTAINER.SERVICES.CACHE,
      delay(() => NodeCacheService),
    )

    container.registerSingleton<IPasswordService>(
      CONTAINER.SERVICES.PASSWORD,
      delay(() => PasswordService),
    )

    container.registerSingleton<IJwtTokenService>(
      CONTAINER.SERVICES.TOKEN,
      delay(() => FastifyJwtTokenService),
    )

    container.registerSingleton<ILoggerService>(
      CONTAINER.SERVICES.LOGGER,
      delay(() => PinoLoggerService),
    )

    container.registerSingleton<IAddressRepository>(
      CONTAINER.REPOSITORIES.ADDRESS,
      delay(() => PrismaAddressRepository),
    )

    container.registerSingleton<IPersonRepository>(
      CONTAINER.REPOSITORIES.PERSON,
      delay(() => PrismaPersonRepository),
    )
  }
}
