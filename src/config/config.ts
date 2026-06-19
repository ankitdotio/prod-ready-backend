import dotenvFlow from 'dotenv-flow'

dotenvFlow.config()

export default {
  ENV: process.env.ENV,
  PORT: process.env.PORT,
  SERVER_URI: process.env.SERVER_URI,
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN,
}
