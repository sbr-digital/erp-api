import { components } from '../../../config'

const {
  badRequestError,
  noContentResponse,
  notFoundError,
  internalError,
  unauthorizedError,
} = components.responses

export const deletePerson = {
  '/person/{id}': {
    delete: {
      tags: ['Person'],
      security: [{ bearerAuth: [] }],
      summary: 'Delete Person',
      description: 'Here you can delete person',
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'string' },
          description: 'Insert person id',
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
