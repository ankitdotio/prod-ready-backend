import type { Request, Response } from 'express'
import type { thttpResponse } from '../types/types.js'
import config from '../config/config.js'
import { EApplicationEnvironment } from '../constants/application.js'

export default (
  req: Request,
  res: Response,
  responseStatusCode: number,
  responseMessage: string,
  data: unknown = null,
): void => {
  const response: thttpResponse = {
    success: true,
    statusCode: responseStatusCode,
    request: {
      ip: req.ip || null,
      method: req.method,
      url: req.originalUrl,
    },
    message: responseMessage,
    data: data,
  }
  //log
  console.info('CONTROLLER RESPONSE', {
    meta: response,
  })
  //prod env check
  if (config.ENV === EApplicationEnvironment.PRODUCTION) {
    delete response.request.ip
  }
  res.status(responseStatusCode).json(response)
}
