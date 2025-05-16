import { components } from '../../config'

const { badRequestError, internalError, successResponse, unauthorizedError } =
  components.responses

export const listAddress = {
  '/address/{id}': {
    get: {
      tags: ['Address'],
      security: [{ bearerAuth: [] }],
      summary: 'List Address',
      description: 'Here you can list address by id',
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'string' },
          description: 'Insert address id',
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
