import { Router } from "express";
import authRouter from "./auth";
import dataRouter from "./data";
import ementaRouter from "./ementas";


const routes = Router()

routes.use("/auth", authRouter)
routes.use("/data", dataRouter)
routes.use("/data", ementaRouter)

export default routes;