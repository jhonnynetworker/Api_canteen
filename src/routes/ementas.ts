import { Router, Request, Response } from 'express';
import { globalError } from "../config/global";
import admin from '../credetials/firebaseConfig';
import { verifyToken } from '../middlewares/firebase';

const ementaRouter = Router();


ementaRouter.post('/marcar', verifyToken, async (req: Request, res: Response) => {
    try {
        const userEmail = req.body.email;
        const semana = req.body.semana;

        // Verifica se o documento já existe antes de adicioná-lo
        const docRef = admin.firestore().collection('marcadas').doc(userEmail);
        const doc = await docRef.get();
        if (doc.exists) {
            return res.status(400).send('Usuário já possui marcação');
        }

        // Adiciona o novo documento
        await docRef.set({ semana });


        // Retorna o ID do documento criado
        res.status(201);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to add data to Firestore' });
    }
});

export default ementaRouter;
