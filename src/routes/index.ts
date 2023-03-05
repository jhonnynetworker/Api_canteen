import { Router } from "express";

import authRouter from "./auth";
import cursoRouter from "./curso";
import dataRouter from "./data";
import ementaRouter from "./ementas";
import usersRouter from "./users";
import qrCode from "./qrcode";
import datamarcadasRouter from "./datamarcadas";

const routes = Router()

routes.use("/auth", authRouter)
routes.use("/data", dataRouter)
routes.use("/data", ementaRouter)
routes.use("/data", usersRouter)
routes.use("/data", cursoRouter)
routes.use("/data", qrCode)
routes.use("/data", datamarcadasRouter)

export default routes;