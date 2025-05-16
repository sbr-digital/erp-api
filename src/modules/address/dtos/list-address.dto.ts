import { z } from 'zod'

export const ListAddressDTO = z.object({
  id: z.coerce.number().positive(),
})

export type ListAddressInput = z.infer<typeof ListAddressDTO>
