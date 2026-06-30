import dotenvFlow from 'dotenv-flow'
import { z } from 'zod'
import { EApplicationEnvironment } from '../constants/application.js'

dotenvFlow.config()

const envSchema = z.object({
  NODE_ENV: z.nativeEnum(EApplicationEnvironment),

  PORT: z.coerce.number().int().positive(),

  CLIENT_ORIGIN: z.string().url(),

  SERVER_URI: z.string().url(),
})

export const env = envSchema.parse(process.env)
