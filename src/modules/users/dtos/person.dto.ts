/* eslint-disable no-useless-escape */
import { z } from 'zod'

import { PAGINATION } from '@/constants'
import { CreateAddressDTO } from '@/modules/address/dtos'
import { CNPJ, CPF, parsePage } from '@/modules/utils'

export const CreatePersonDTO = z
  .object({
    address: CreateAddressDTO,
    name: z.string().min(3, 'Name is required').trim(),
    birthday: z.coerce.date(),
    documentType: z.enum(['CPF', 'CNPJ']),
    documentNumber: z.string().trim(),
    email: z
      .string()
      .email('Invalid email')
      .trim()
      .optional()
      .transform((value) => value && value.toLowerCase()),
    details: z.string().optional(),
    phoneNumber: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const { documentType, documentNumber } = data

    if (documentType === 'CPF') {
      if (!CPF.isValid(documentNumber)) {
        ctx.addIssue({
          path: ['documentNumber'],
          message: 'CPF inválido',
          code: 'custom',
        })
      }
    }

    if (documentType === 'CNPJ') {
      if (!CNPJ.isValid(documentNumber)) {
        ctx.addIssue({
          path: ['documentNumber'],
          message: 'CNPJ inválido',
          code: 'custom',
        })
      }
    }
  })

export type CreatePersonInput = z.infer<typeof CreatePersonDTO>

export const DeletePersonDTO = z.object({
  id: z.coerce.number().positive(),
})

export type DeletePersonInput = z.infer<typeof DeletePersonDTO>

export const ListPeopleDTO = z.object({
  query: z.object({
    name: z
      .string()
      .optional()
      .transform((value) => value?.trim().toLowerCase() || undefined),
    page: z.coerce
      .string()
      .optional()
      .transform((value) => parsePage(value)),
    pageSize: z.coerce
      .number()
      .optional()
      .transform((value) => value || PAGINATION.PER_PAGE),
  }),
})

export const UpdatePersonDTO = z
  .object({
    id: z.coerce.number().positive(),
    userId: z.union([z.string().uuid(), z.null()]).optional(),
    address: z
      .object({
        country: z.string().trim().min(2).optional(),
        state: z.string().trim().min(2).optional(),
        city: z.string().trim().min(2).optional(),
        district: z.string().trim().min(2).optional(),
        street: z.string().trim().min(2).optional(),
        number: z.string().trim().min(1).optional(),
        zipCode: z.string().trim().min(2).optional(),
        details: z.union([z.string().trim().min(2), z.null()]).optional(),
      })
      .optional(),
    name: z.string().min(3, 'Name is required').trim().optional(),
    birthday: z.coerce.date().optional(),
    documentType: z.enum(['CPF', 'CNPJ']).optional(),
    documentNumber: z.string().trim().optional(),
    email: z
      .union([z.string().email('Invalid email').trim(), z.null()])
      .optional()
      .transform((value) => value && value.toLowerCase()),
    details: z.union([z.string(), z.null()]).optional(),
    phoneNumber: z.union([z.string(), z.null()]).optional(),
  })
  .partial()
  .superRefine((data, ctx) => {
    const { documentType, documentNumber } = data

    if (documentNumber && documentType === 'CPF') {
      if (!CPF.isValid(documentNumber)) {
        ctx.addIssue({
          path: ['documentNumber'],
          message: 'CPF inválido',
          code: 'custom',
        })
      }
    }

    if (documentNumber && documentType === 'CNPJ') {
      if (!CNPJ.isValid(documentNumber)) {
        ctx.addIssue({
          path: ['documentNumber'],
          message: 'CNPJ inválido',
          code: 'custom',
        })
      }
    }
  })

export type UpdatePersonInput = z.infer<typeof UpdatePersonDTO>

export const ListPersonInfoDTO = z.object({
  personId: z.coerce.number(),
})

export type ListPersonInfoInput = z.infer<typeof ListPersonInfoDTO>
