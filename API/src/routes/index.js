import { Router } from "express";
import paradasRouter from "../routes/paradas.js";
const router = Router();
//primer elemento es el modelo, y el segundo es el archivo la ruta importado anteriormente
router.use('/paradas', paradasRouter);

export default router;