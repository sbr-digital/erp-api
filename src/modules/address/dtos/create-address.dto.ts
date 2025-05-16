import { z } from 'zod'

export const CreateAddressDTO = z.object({
  country: z.string().trim().min(2),
  state: z.string().trim().min(2),
  city: z.string().trim().min(2),
  district: z.string().trim().min(2),
  street: z.string().trim().min(2),
  number: z.string().trim().min(1),
  zipCode: z.string().trim().min(2),
  details: z.string().trim().min(2).nullable().optional(),
})

export type CreateAddressInput = z.infer<typeof CreateAddressDTO>
