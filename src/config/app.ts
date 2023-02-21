import 'dotenv/config'
import 'express-async-errors'
import '../credetials/firestoreConfig'

import express from 'express'
import cors from 'cors'
import routes from '../routes'
import { appSecurity } from '../middlewares/security'

const app = express()

app.use(cors())
app.use(express.json())
app.use(appSecurity)
app.use(routes)

export default app
