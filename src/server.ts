import 'dotenv/config'
import app from './config/app'

const APP_PORT = Number(process.env.APP_PORT) || 5000;

app.listen(APP_PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${APP_PORT}`);
});
