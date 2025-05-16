import { components } from '../../config'

const { createdResponse, badRequestError, conflictError, internalError } =
  components.responses

export const signUp = {
  '/users': {
    post: {
      tags: ['Users'],
      summary: 'Create user',
      description: 'Here you can created user',
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                name: { type: 'string', minLength: 3, maxLength: 255 },
                email: { type: 'string', format: 'email' },
                password: {
                  type: 'string',
                  format: 'password',
                  minLength: 8,
                  maxLength: 128,
                },
              },
              required: ['name', 'email', 'password'],
              example: {
                name: 'user sample',
                email: 'sample@njaa.ong.br',
                password: 'Acess@pass11234',
              },
            },
          },
        },
      },
      responses: {
        '201': createdResponse,
        '400': badRequestError,
        '409': conflictError,
        '500': internalError,
      },
    },
  },
}
