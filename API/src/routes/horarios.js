import * as horarios from "../controllers/horarios.js"
import { Router } from "express";

const horariosRouter = Router()
horariosRouter.get("/getSelectedHorarios/:idRuta/:idParada", horarios.getHorariosByRutas);
export default horariosRouter