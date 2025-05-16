import { components } from '../../../config'

const { successResponse, badRequestError, unauthorizedError, internalError } =
  components.responses

export const listPeople = {
  '/person': {
    get: {
      tags: ['Person'],
      security: [{ bearerAuth: [] }],
      summary: 'List People',
      description: 'Here you can listed people',
      parameters: [
        {
          in: 'query',
          name: 'name',
          required: false,
          schema: { type: 'string' },
          description: 'Filter person by name',
        },
        {
          in: 'query',
          name: 'page',
          required: false,
          schema: { type: 'string' },
          description: 'Use to search on a specific page',
        },
        {
          in: 'query',
          name: 'pageSize',
          required: false,
          schema: { type: 'string' },
          description: 'Use to specify the amount of items per page',
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
