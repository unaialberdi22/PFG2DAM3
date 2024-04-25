import * as paradas from "../controllers/rutas.js"
import { Router } from "express";

const rutasRouter = Router()
rutasRouter.get("/getRutasByParadaId/:idParada", paradas.getRutasByParadaId);
export default rutasRouter
