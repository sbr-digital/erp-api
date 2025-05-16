import { z } from 'zod'

export const UpdateAddressDTO = z.object({
  id: z.coerce.number().positive(),
  country: z.string().trim().min(2).optional(),
  state: z.string().trim().min(2).optional(),
  city: z.string().trim().min(2).optional(),
  district: z.string().trim().min(2).optional(),
  street: z.string().trim().min(2).optional(),
  number: z.string().trim().min(1).optional(),
  zipCode: z.string().trim().min(2).optional(),
  details: z.union([z.string().trim().min(2), z.null()]).optional(),
})

export type UpdateAddressInput = z.infer<typeof UpdateAddressDTO>
