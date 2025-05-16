import { components } from '../../../config'

const {
  createdResponse,
  badRequestError,
  unauthorizedError,
  conflictError,
  internalError,
} = components.responses

export const createPerson = {
  '/person': {
    post: {
      tags: ['Person'],
      security: [{ bearerAuth: [] }],
      summary: 'Create Person',
      description: 'Here you can created person',
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                name: { type: 'string', minLength: 3 },
                documentType: {
                  type: 'string',
                  minLength: 3,
                  maxLength: 4,
                  enum: ['CPF', 'CNPJ'],
                },
                documentNumber: {
                  type: 'string',
                  minLength: 11,
                  maxLength: 14,
                },
                birthday: {
                  type: 'string',
                  format: 'date',
                  minLength: 10,
                },
                email: { type: 'string', format: 'email' },
                details: { type: 'string', minLength: 3 },
                phoneNumber: { type: 'string', minLength: 11 },
                address: {
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
                },
              },
              required: [
                'name',
                'documentType',
                'documentNumber',
                'birthday',
                'address',
              ],
              example: {
                name: 'fake name',
                phoneNumber: '55999999999',
                email: 'newperson@njaa.ong.br',
                documentType: 'CPF',
                documentNumber: '11111111111',
                birthday: '2021-01-01',
                details: 'details',
                address: {
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
      },
      responses: {
        '201': createdResponse,
        '400': badRequestError,
        '401': unauthorizedError,
        '409': conflictError,
        '500': internalError,
      },
    },
  },
}
