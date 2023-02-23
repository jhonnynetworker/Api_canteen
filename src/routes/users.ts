import { Router, Request, Response } from 'express';
import admin from '../credetials/firebaseConfig';
import { verifyToken } from '../middlewares/firebase';

const usersRouter = Router()

usersRouter.get('/dados', verifyToken, async (req: Request, res: Response) => {
  try {
    const userList = await admin.auth().listUsers();
    const numContasGoogle = userList.users.filter(user => user.providerData.some(data => data.providerId === 'google.com')).length;
    
    const marcadasCollection = admin.firestore().collection('marcadas');
    const marcadasDocs = await marcadasCollection.get();
    const numMarcadas = marcadasDocs.size;

    const alunosCollection = admin.firestore().collection('alunos');
    const alunosDocs = await alunosCollection.get();
    const numAlunos = alunosDocs.size;


    return res.status(200).json({ numContasGoogle, numMarcadas, numAlunos });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default usersRouter;
