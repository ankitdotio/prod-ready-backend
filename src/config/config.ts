import { env } from '../validation/env.js'

export default {
  ENV: env.NODE_ENV,
  PORT: env.PORT,
  SERVER_URI: env.SERVER_URI,
  CLIENT_ORIGIN: env.CLIENT_ORIGIN,
}
