import config from './config/config.js'
import { app } from './app.js'

const PORT = config.PORT ?? 3000

const server = app.listen(PORT, () => {
  console.log(`SERVER IS UP AND RUNNING ON PORT ${PORT}`)
})
;(() => {
  //DB CONNECTION
  try {
    console.log(`APPLICATION STARTED`, {
      meta: {
        PORT: PORT,
        SERVER_URI: config.SERVER_URI,
      },
    })
  } catch (error) {
    console.error(`ERROR WHILE STARTING THE APPLICATION`, {
      meta: {
        error: error,
      },
    })
    server.close((error) => {
      if (error) {
        console.error(`ERROR WHILE CLOSING THE SERVER`, {
          meta: {
            error,
          },
        })

        process.exit(1)
      }
    })
  }
})()
