import { Request, Response, NextFunction } from 'express';
import admin from '../credetials/firebaseConfig';
import { AppError, globalError } from '../config/global';

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  const token = authorization?.split(' ')[1];

  if (!token) {
    throw new AppError("You don't have permission to access this resource", 403);
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.body.uid = decodedToken.uid;
    req.body.email = decodedToken.email;
    req.body.name = decodedToken.name;
    next();

  } catch (err: any) {
    if (err.code === 'auth/id-token-expired') {
      // Token expirado, solicita um novo token ao cliente
      return res.status(401).json({ error: 'Token expired, please sign in again.' });
    } else {
      globalError(err, res);
    }
  }
};