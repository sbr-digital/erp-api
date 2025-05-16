import { components } from '../../config'

const { successResponse, badRequestError, unauthorizedError, internalError } =
  components.responses

export const userInfo = {
  '/users/info': {
    get: {
      tags: ['Users'],
      security: [{ bearerAuth: [] }],
      summary: 'List user info',
      description:
        'Here you can list the information of the logged user or a user by ID',
      parameters: [
        {
          in: 'query',
          name: 'id',
          required: false,
          schema: { type: 'string' },
          description: 'Use to specify user by id',
        },
      ],
      responses: {
        '200': successResponse,
        '400': badRequestError,
        '401': unauthorizedError,
        '500': internalError,
      },
    },
  },
}
