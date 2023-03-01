import { Router } from "express";



import authRouter from "./auth";
import cursoRouter from "./curso";
import dataRouter from "./data";
import editementaRouter from "./editementas";
import ementaRouter from "./ementas";
import usersRouter from "./users";


const routes = Router()

routes.use("/auth", authRouter)
routes.use("/data", dataRouter)
routes.use("/data", ementaRouter)
routes.use("/data", usersRouter)
routes.use("/data", cursoRouter)
routes.use("/data", editementaRouter)


export default routes;