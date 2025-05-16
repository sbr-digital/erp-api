import { z } from 'zod'

export const AuthenticationDTO = z.object({
  email: z.string().email('Invalid email').trim(),
  password: z.string(),
})

export type AuthenticationUserInput = z.infer<typeof AuthenticationDTO>
