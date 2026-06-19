import express, { type Application, type NextFunction, type Request, type Response } from 'express'

import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { router } from './router/apiRouter.js'
import globalErrorHandler from './middleware/globalErrorHandler.js'
import applicationResponseMessage from './constants/applicationResponseMessage.js'
import httpError from './util/httpError.js'
import helmet from 'helmet'

export const app: Application = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
// -----------------------------------------------------------------------------
// Middleware
// -----------------------------------------------------------------------------
app.use(helmet())
app.use(express.json())
app.use(express.static(path.join(__dirname, '../', 'public')))

// -----------------------------------------------------------------------------
// Routes
// -----------------------------------------------------------------------------

app.use('/api/v1', router)

//
// 404 HANDLER
//

app.use((req: Request, _: Response, next: NextFunction) => {
  try {
    throw new Error(applicationResponseMessage.NOT_FOUND('route'))
  } catch (error) {
    httpError(next, error, req, 404)
  }
})

//
//GLOBAL ERROR HANDLER
//

app.use(globalErrorHandler)
