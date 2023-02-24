import { Router, Request, Response } from 'express';
import { globalError } from "../config/global";
import { setUserEmail, getEmail } from '../config/user';
import admin from '../credetials/firebaseConfig';
import { verifyToken } from '../middlewares/firebase';

interface Aluno {
    curso: string;
    email: string;
    id: number;
    nome: string;
    turma: string;
}

const cursoRouter = Router();

const usersRef = admin.firestore().collection('alunos');

cursoRouter.get('/curso', verifyToken, async (req: Request, res: Response) => {
    const userEmail = req.query.email

    try {
        const snapshot = await usersRef.where('email', '==', userEmail).get();

        if (snapshot.empty) {
            console.log('No matching documents.');
            return res.status(404).send('Not Found');
        } else {
            const data: Aluno[] = [];

            snapshot.forEach((doc) => {
                data.push(doc.data() as Aluno);
            });

            const turmaEstipulada = data[0].turma; // Obtém a turma estipulada da Firestore
            console.log(turmaEstipulada)

            const userInfo = data[0];

            // Retorna apenas a turma do usuário
            return res.status(200).json({ turma: userInfo?.turma });
        }
    } catch (err: any) {
        globalError(err, res);
    }
});



export default cursoRouter;
