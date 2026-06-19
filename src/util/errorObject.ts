import { type Request } from 'express'
import type { thttpError } from '../types/types.js'
import { EApplicationEnvironment } from '../constants/application.js'
import config from '../config/config.js'
import applicationResponseMessage from '../constants/applicationResponseMessage.js'

// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
export default (req: Request, err: Error | unknown, errorStatusCode: number = 500) => {
  const errorObj: thttpError = {
    success: false,
    statusCode: errorStatusCode,
    request: {
      ip: req.ip || null,
      method: req.method,
      url: req.originalUrl,
    },
    trace: err instanceof Error ? { error: err.stack } : null,
    message:
      err instanceof Error
        ? err.message || applicationResponseMessage.SOMETHING_WENT_WRONG
        : applicationResponseMessage.SOMETHING_WENT_WRONG,
    data: null,
  }
  console.log(`ERROR_CONTROLLER`, { meta: errorObj })

  if (config.ENV === EApplicationEnvironment.PRODUCTION) {
    delete errorObj.request.ip
    delete errorObj.trace
  }
  return errorObj
}
