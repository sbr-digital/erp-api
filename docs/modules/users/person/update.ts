import { components } from '../../../config'

const {
  noContentResponse,
  badRequestError,
  unauthorizedError,
  conflictError,
  internalError,
} = components.responses

export const updatePerson = {
  '/person/{id}': {
    put: {
      tags: ['Person'],
      security: [{ bearerAuth: [] }],
      summary: 'Update Person',
      description: 'Here you can updated person by id',
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'string' },
          description: 'Insert person id',
        },
      ],
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
                },
              },
              example: {
                name: 'update fake name',
                phoneNumber: '55999999922',
                email: 'updateperson@njaa.ong.br',
                documentType: 'CPF',
                documentNumber: '000.000.000-22',
                birthday: '2020-01-01',
                details: 'update details',
                address: {
                  country: 'update country',
                  state: 'update state',
                  city: 'update city',
                  street: 'update street',
                  number: '222',
                  district: 'update district',
                  zipCode: '00000-222',
                  details: 'update details',
                },
              },
            },
          },
        },
      },
      responses: {
        '204': noContentResponse,
        '400': badRequestError,
        '401': unauthorizedError,
        '409': conflictError,
        '500': internalError,
      },
    },
  },
}
