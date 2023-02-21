import { Request, Response, NextFunction, response } from 'express'
import { OAuth2Client } from "google-auth-library"
import { AppError, globalError } from '../config/global'

export const oAuth2Client = new OAuth2Client(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  'postmessage',
)

export const oAuth2 = async (req: Request, res: Response, next: NextFunction) => {
  const { credential } = req.body

  try {
    const { tokens: { access_token, id_token } } = await oAuth2Client.getToken(credential)

    if (access_token) {
      const { email } = await oAuth2Client.getTokenInfo(access_token)
      

      if (!email?.match(/@epfundao.edu.pt$/)) {
        throw new AppError("Unauthorized domain email address", 401)
      }

      req.body.idToken = id_token
    }

    next()

  } catch (error: any) {
    globalError(error, res)
  }

}
