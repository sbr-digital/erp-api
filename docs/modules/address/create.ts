import { components } from '../../config'

const { createdResponse, badRequestError, unauthorizedError, internalError } =
  components.responses

export const createAddress = {
  '/address': {
    post: {
      tags: ['Address'],
      summary: 'Create address',
      description: 'Here you can created address',
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
                country: 'Brasil',
                state: 'São Paulo',
                city: 'São Paulo',
                street: 'Rua',
                number: '000',
                district: 'Bela Vista',
                zipCode: '00000-000',
                details: 'Casa',
              },
            },
          },
        },
      },
      responses: {
        '201': createdResponse,
        '400': badRequestError,
        '401': unauthorizedError,
        '500': internalError,
      },
    },
  },
}
