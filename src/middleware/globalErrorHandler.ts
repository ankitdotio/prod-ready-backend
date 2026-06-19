import type { NextFunction, Request, Response } from 'express'
import type { thttpError } from '../types/types.js'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (err: thttpError, _: Request, res: Response, __: NextFunction) => {
  res.status(err.statusCode).json(err)
}
