import { Router } from "express";
import paradasRouter from "../routes/paradas.js";
import rutasRouter from "../routes/rutas.js";
import horariosRouter from "../routes/horarios.js";
const router = Router();
//primer elemento es el modelo, y el segundo es el archivo la ruta importado anteriormente
router.use('/paradas', paradasRouter);
router.use('/rutas', rutasRouter);
router.use('/horarios', horariosRouter);

export default router;