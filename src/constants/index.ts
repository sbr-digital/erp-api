export * from './errors'

export const PATHS = {
  ADDRESS: {
    CREATE: '/address',
    LIST: '/address/:id',
    UPDATE: '/address/:id',
    DELETE: '/address/:id',
  },
  HEALTH_CHECK: '/ping_',

  SIGN_IN: '/signin',
  USERS: {
    CREATE: '/users',
    LIST_INFO: '/users/info',
  },
  PERSON: {
    CREATE: '/person',
    DELETE: '/person/:id',
    INFO: '/person/info/:id',
    LIST_ALL: '/person',
    UPDATE: '/person/:id',
  },
}

export const JWT = {
  TYPE: {
    TOKEN: 'token',
    REFRESH_TOKEN: 'refreshToken',
  },
  EXPIRE_IN_TOKEN: 1,
  EXPIRE_IN_REFRESH_TOKEN: 7,
  EXPIRE_IN_TEMP_TOKEN: 20,
}

export const JWT_EXPIRE_IN = JWT.TYPE.TOKEN ? 1 : 7

export const CONTAINER = {
  REPOSITORIES: {
    ADDRESS: 'ADDRESS_REPOSITORY',
    AUTH: 'AUTH_REPOSITORY',
    USERS: 'USER_REPOSITORY',
    PERSON: 'PERSON_REPOSITORY',
  },
  SERVICES: {
    PASSWORD: 'PASSWORD_SERVICE',
    TOKEN: 'TOKEN_SERVICE',
    CACHE: 'CACHE_SERVICE',
    LOGGER: 'LOGGER_SERVICE',
  },
  HTTP: {
    REQUEST: 'FASTIFY_REQUEST',
    REPLY: 'FASTIFY_REPLY',
  },
}

export const CACHE_KEYS = {
  PERSON: 'PERSON',
}

export const SERVERS = {
  test: {
    url: 'http://localhost:4024',
    description: 'Testing Server',
  },
  homolog: {
    url: 'https://api-erp.ong.br',
    description: 'Sandbox Server',
  },
  production: {
    url: 'https://api-erp.ong.br',
    description: 'Production Server',
  },
  local: {
    url: 'http://localhost:4024',
    description: 'Local Server',
  },
}

export const PAGINATION = {
  OFFSET: 0,
  PER_PAGE: 10,
}

export type DOCUMENT_TYPE_ENUM = 'CPF' | 'CNPJ'

export type ROLE_ENUM = 'ADMIN' | 'MEMBER' | 'FINANCIAL' | 'ASSOCIATE'

export const VALID_CPF = [
  '123.456.789-09',
  '111.444.777-35',
  '529.982.247-25',
  '01234567890',
  '52998224725',
]

export const INVALID_CPF = [
  '000.000.000-00',
  '111.111.111-11',
  '123.456.789-00',
  '12345678900',
  'abcdefghijk',
  '12345678',
  '123456789012',
]

export const VALID_CNPJ = [
  '12.ABC.345/01DE-35',
  '90.021.382/0001-22',
  '90.024.778/0001-23',
  '90.025.108/0001-21',
  '90.025.255/0001-00',
  '90.024.420/0001-09',
  '90.024.781/0001-47',
  '04.740.714/0001-97',
  '44.108.058/0001-29',
  '90.024.780/0001-00',
  '90.024.779/0001-78',
  '00000000000191',
  'ABCDEFGHIJKL80',
]

export const INVALID_CNPJ = [
  '',
  "'!@#$%&*-_=+^~",
  '$0123456789ABC',
  '0123456?789ABC',
  '0123456789ABC#',
  '12.ABc.345/01DE-35',
  '0000000000019',
  '000000000001911',
  '0000000000019L',
  '000000000001P1',
  '00000000000192',
  'ABCDEFGHIJKL81',
  '00000000000000',
  '00.000.000/0000-00',
]
