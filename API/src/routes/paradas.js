import * as paradas from "../controllers/paradas.js"
import { Router } from "express";

const paradasRouter = Router()
paradasRouter.get("/getAllParadas", paradas.getAllParadas);
export default paradasRouter
