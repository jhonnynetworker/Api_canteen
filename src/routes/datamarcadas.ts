import { Router, Request, Response } from 'express';
import { verifyToken } from '../middlewares/firebase';
import admin from '../credetials/firebaseConfig';


const datamarcadasRouter = Router()

datamarcadasRouter.get('/datamarcadas', verifyToken, async (req: Request, res: Response) => {

    try {
        // Obtém uma referência à coleção "marcadas"
    const marcadasRef = admin.firestore().collection('marcadas');
    const marcadasSnapshot = await marcadasRef.get();

    // Converte os documentos da coleção em um array de objetos simples
    const marcadasData = marcadasSnapshot.docs.map((doc) => ({
      email: doc.id,
      semana: doc.data().semana
    }));

    console.log(marcadasData)
    // Retorna a resposta JSON com os dados obtidos do Firestore
    res.status(200).json(marcadasData);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to retrieve data from Firestore' });
  }
});

export default datamarcadasRouter;


