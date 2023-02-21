import { Request, Response, NextFunction } from 'express'
import { AppError, globalError } from '../config/global'

export const appSecurity = async (req: Request, res: Response, next: NextFunction) => {
  const { url, method, ip } = req

  try {
    console.log({ method, url, ip })

  } catch (err: any) {
    globalError(err, res)
  }

  next()
}

