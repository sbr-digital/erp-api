/* eslint-disable no-useless-escape */
import { z } from 'zod'

import { Password } from '../domain'

export const CreateUserDTO = z.object({
  name: z.string().min(3, 'Name is required').trim(),
  email: z
    .string()
    .email('Invalid email')
    .trim()
    .transform((value) => value.toLowerCase()),
  password: z
    .string()
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#¨\$%\^&*\(\)_+\-=\[\]\{\};':"\\|,.<>\/?])(?=.{8,})/,
      'Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character',
    )
    .trim()
    .optional()
    .transform((value) => value ?? Password.generate()),
  role: z
    .enum(['ADMIN', 'MEMBER', 'FINANCIAL', 'ASSOCIATE'])
    .default('MEMBER')
    .optional(),
})

export type CreateUserInput = z.infer<typeof CreateUserDTO>

export const ListUserInfoDTO = z.object({
  userId: z.string().uuid(),
  id: z.string().uuid().optional(),
})

export const UpdateUserDTO = z.object({
  id: z.string().uuid(),
  name: z.string().min(3, 'Name is required').trim().optional(),
  email: z
    .string()
    .email('Invalid email')
    .trim()
    .transform((value) => value.toLowerCase())
    .optional(),
  password: z
    .string()
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#¨\$%\^&*\(\)_+\-=\[\]\{\};':"\\|,.<>\/?])(?=.{8,})/,
      'Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character',
    )
    .trim()
    .transform((value) => value ?? Password.generate())
    .optional(),
  role: z
    .enum(['ADMIN', 'MEMBER', 'FINANCIAL', 'ASSOCIATE'])
    .default('MEMBER')
    .optional(),
})

export type UpdateUserInput = z.infer<typeof UpdateUserDTO>
