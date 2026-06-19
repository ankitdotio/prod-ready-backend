import type { NextFunction, Request, Response } from 'express'
import httpsResponse from '../util/httpsResponse.js'
import applicationResponseMessage from '../constants/applicationResponseMessage.js'
import httpError from '../util/httpError.js'

export default {
  self: (req: Request, res: Response, next: NextFunction) => {
    try {
      throw new Error('This is error')
      httpsResponse(req, res, 200, applicationResponseMessage.SUCCESS)
    } catch (err) {
      httpError(next, err, req, 500)
    }
  },
}
