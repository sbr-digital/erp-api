import { components } from '../../config'

const { createdResponse, badRequestError, unauthorizedError, internalError } =
  components.responses

export const privateRoute = {
  '/private': {
    get: {
      tags: ['Private'],
      security: [{ bearerAuth: [] }],
      summary: 'Testing security',
      description: 'Here you can testing private route',
      responses: {
        '201': createdResponse,
        '400': badRequestError,
        '401': unauthorizedError,
        '500': internalError,
      },
    },
  },
}
