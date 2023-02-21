import { Router, Request, Response } from 'express';
import { signInWithCredential, GoogleAuthProvider, getAuth } from "firebase/auth";
import { getEmail, setUserEmail } from '../config/user';
import { oAuth2 } from '../middlewares/google';

const authRouter = Router()

authRouter.post('/google', oAuth2, async (req: Request, res: Response) => {
    const { idToken } = req.body

    try {
      const credential = GoogleAuthProvider.credential(idToken)
      const { user } = await signInWithCredential(getAuth(), credential)

      const accessToken = await user.getIdToken()
      const email = await user.email



      res.status(200).json({ user, accessToken, email })

    } catch (error) {
      res.status(401).json({ error })
    }
  })

export default authRouter;


