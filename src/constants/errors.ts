export const HTTP_STATUS_CODE = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER: 500,
  BAD_GATEWAY: 502,
}

export const ERROR_CATEGORY = {
  AUTHENTICATION_ERROR: {
    prefix: 1,
    UNAUTHORIZED_ERROR: {
      MESSAGE: {
        EN_US: 'Invalid credentials',
        PT_BR: 'Credenciais inválidas!',
      },
      ERROR_CODE: 10001,
    },
  },
  USER_ERROR: {
    prefix: 2,
    ALREADY_EXISTS_ERROR: {
      MESSAGE: {
        EN_US: 'User already exists',
        PT_BR: 'Email já está cadastrado!',
      },
      ERROR_CODE: 20001,
    },
    NOT_FOUND_ERROR: {
      MESSAGE: {
        EN_US: 'Not found',
        PT_BR: 'Usuário não encontrado!',
      },
      ERROR_CODE: 20002,
    },
  },

  ADDRESS_ERROR: {
    prefix: 4,
    NOT_FOUND_ERROR: {
      MESSAGE: {
        EN_US: 'Not found',
        PT_BR: 'Não encontrado!',
      },
      ERROR_CODE: 40001,
    },
  },

  DELETE_RESOURCE_ERROR: {
    prefix: 8,
    MESSAGE: {
      EN_US: 'Operation not allowed',
      PT_BR:
        'Essa operação não pode ser realizada o recurso tem dependência ativa!',
    },
    ERROR_CODE: 80001,
  },
}
