import { z } from 'zod'

import { PAGINATION } from '@/constants'
import { parsePage } from '@/modules/utils'

export const GlobalListDTO = z.object({
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

export const GlobalDeleteDTO = z.object({
  id: z.coerce.number().positive(),
})
