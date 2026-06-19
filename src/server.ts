import config from './config/config.js'
import { app } from './app.js'
import logger from './util/logger.js'

const PORT = config.PORT ?? 3000

const server = app.listen(PORT, () => {
  //logger.log(`SERVER IS UP AND RUNNING ON PORT ${PORT}`)
})
;(() => {
  //DB CONNECTION
  try {
    logger.info(`APPLICATION STARTED`, {
      meta: {
        PORT: PORT,
        SERVER_URI: config.SERVER_URI,
      },
    })
  } catch (error) {
    logger.error(`ERROR WHILE STARTING THE APPLICATION`, {
      meta: {
        error: error,
      },
    })
    server.close((error) => {
      if (error) {
        logger.error(`ERROR WHILE CLOSING THE SERVER`, {
          meta: {
            error,
          },
        })

        process.exit(1)
      }
    })
  }
})()
