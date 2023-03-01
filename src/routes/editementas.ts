import { Router, Request, Response } from 'express';
import admin from '../credetials/firebaseConfig';
import { verifyToken } from '../middlewares/firebase';

const editementaRouter = Router();

editementaRouter.post('/editarementa', verifyToken, async (req: Request, res: Response) => {
    try {
        const userEmail = req.body.email;
        const semana = req.body.semana;

        // Verifica se o documento já existe antes de atualizá-lo
        const docRef = admin.firestore().collection('marcadas').doc(userEmail);
        const doc = await docRef.get();
        if (!doc.exists) {
            return res.status(404).send('Documento não encontrado');
        }

        // Verifica o número de edições já realizadas pelo usuário
        const userData = doc.data();
        const numEdicoes = userData?.num_edicoes ?? 0; // Usa operador opcional e valor padrão para evitar erro
        if (numEdicoes >= 2) {
            return res.status(403).send('Número máximo de edições já realizado');
        }

        // Atualiza o documento existente e incrementa o número de edições
        await docRef.update({ semana, num_edicoes: numEdicoes + 1 });

        // Retorna uma mensagem de sucesso
        res.status(200).send('Documento atualizado com sucesso');

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Falha ao atualizar dados no Firestore' });
    }
});

export default editementaRouter;
