import { components } from '../../config'

const {
  badRequestError,
  noContentResponse,
  notFoundError,
  internalError,
  unauthorizedError,
} = components.responses

export const deleteAddress = {
  '/address/{id}': {
    delete: {
      tags: ['Address'],
      security: [{ bearerAuth: [] }],
      summary: 'Delete Addresses',
      description: 'Here you can delete address',
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
        '204': noContentResponse,
        '400': badRequestError,
        '401': unauthorizedError,
        '404': notFoundError,
        '500': internalError,
      },
    },
  },
}
