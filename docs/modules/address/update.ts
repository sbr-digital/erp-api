import { components } from '../../config'

const {
  createdResponse,
  badRequestError,
  unauthorizedError,
  notFoundError,
  internalError,
} = components.responses

export const updateAddress = {
  '/address/{id}': {
    put: {
      tags: ['Address'],
      summary: 'Update address',
      description: 'Here you can updated address',
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'string' },
          description: 'Insert address id',
        },
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                country: { type: 'string', minLength: 2, maxLength: 255 },
                state: { type: 'string', minLength: 2, maxLength: 255 },
                city: { type: 'string', minLength: 2, maxLength: 255 },
                street: { type: 'string', minLength: 2, maxLength: 255 },
                number: { type: 'string', minLength: 1, maxLength: 255 },
                district: { type: 'string', minLength: 2, maxLength: 255 },
                zipCode: { type: 'string', minLength: 2, maxLength: 255 },
                details: { type: 'string', minLength: 2, maxLength: 255 },
              },
              required: [
                'country',
                'state',
                'city',
                'street',
                'number',
                'district',
                'zipCode',
              ],
              example: {
                country: 'update Brasil',
                state: 'update São Paulo',
                city: 'update São Paulo',
                street: 'update Rua',
                number: '10001',
                district: 'update Bela Vista',
                zipCode: '00000-999',
                details: 'update Casa',
              },
            },
          },
        },
      },
      responses: {
        '201': createdResponse,
        '400': badRequestError,
        '401': unauthorizedError,
        '404': notFoundError,
        '500': internalError,
      },
    },
  },
}
