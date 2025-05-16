import { components } from '../../../config'

const {
  successResponse,
  badRequestError,
  notFoundError,
  unauthorizedError,
  internalError,
} = components.responses

export const listPersonInfo = {
  '/person/info/{id}': {
    get: {
      tags: ['Person'],
      security: [{ bearerAuth: [] }],
      summary: 'List person info',
      description: 'Here you can list the information a person by ID',
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
        '200': successResponse,
        '400': badRequestError,
        '401': unauthorizedError,
        '404': notFoundError,
        '500': internalError,
      },
    },
  },
}
