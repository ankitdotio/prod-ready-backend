import type { NextFunction, Request, Response } from 'express'
import httpsResponse from '../util/httpsResponse.js'
import applicationResponseMessage from '../constants/applicationResponseMessage.js'
import httpError from '../util/httpError.js'
import quciker from '../util/quciker.js'

export default {
  self: (req: Request, res: Response, next: NextFunction) => {
    try {
      httpsResponse(req, res, 200, applicationResponseMessage.SUCCESS)
    } catch (err) {
      httpError(next, err, req, 500)
    }
  },
  health: (req: Request, res: Response, next: NextFunction) => {
    try {
      const healthData = {
        applicationHealthData: quciker.getApplicationHealth(),
        systemHealthData: quciker.getSystemHealth(),
        timeStamps: new Date().toISOString(),
      }
      httpsResponse(req, res, 200, applicationResponseMessage.SUCCESS, healthData)
    } catch (err) {
      httpError(next, err, req, 500)
    }
  },
}
