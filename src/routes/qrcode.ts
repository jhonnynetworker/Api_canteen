import { Router, Request, Response } from 'express';
import { globalError } from "../config/global";
import admin from '../credetials/firebaseConfig';
import { verifyToken } from '../middlewares/firebase';

const qrCode = Router();

qrCode.get('/code', verifyToken, async (req: Request, res: Response) => {
    try {
      const userEmail = req.body.email;
  
      // Verifica se o documento já existe antes de adicioná-lo
      const docRef = admin.firestore().collection('marcadas').doc(userEmail);
      const doc = await docRef.get();
  
      if (doc.exists) {
        // Retorna somente a informação da segunda-feira
        const docData = doc.data();
        console.log(docData);
        res.status(200).json({ semana: docData?.semana }); // retorna toda a informação da semana em formato JSON
      } else {
        res.status(404).send('Documento não encontrado');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao obter as ementas marcadas');
    }
  });
  


export default qrCode;
