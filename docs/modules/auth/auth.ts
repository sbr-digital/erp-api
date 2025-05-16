import { components } from '../../config'

const { successResponse, badRequestError, unauthorizedError, internalError } =
  components.responses

export const auth = {
  '/signin': {
    post: {
      tags: ['Auth'],
      summary: 'Authentication user',
      description: 'Here you can signin a user into the application',
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                email: { type: 'string', format: 'email' },
                password: {
                  type: 'string',
                  format: 'password',
                },
              },
              required: ['email', 'password'],
              example: {
                email: 'sandbox@njaa.ong.br',
                password: 'Acess@pass11234',
              },
            },
          },
        },
      },
      responses: {
        '200': successResponse,
        '400': badRequestError,
        '401': unauthorizedError,
        '500': internalError,
      },
    },
  },
}
