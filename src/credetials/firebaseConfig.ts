import admin, { ServiceAccount } from 'firebase-admin';
import firebaseConfig from './credentials';

admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig as ServiceAccount),
  databaseURL: 'https://testes-full-dev.firebaseio.com',
})

export default admin