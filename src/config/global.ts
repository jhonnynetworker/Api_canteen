import { Response } from 'express'

 export class AppError extends Error {

  constructor (
    public readonly message: string,
    public readonly statusCode: number = 400
  ) {
    super()
  }
}

export const globalError = (err: Error, res: Response) => {
  const { message } = err

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message })
  }

  return res.status(500).json({ message })
}
