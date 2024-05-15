import db from "../models/index.js"
// const { Viaje, Horario } = db;

const getHorariosByRutas = async (req, res) => {
    const { idRuta, idParada } = req.params;

    try {
        // Paso 1: Buscar los viajes asociados a la idRuta
        const viajes = await db.viajes.findAll({
            where: {
                idRuta: idRuta
            }
        });

        // Paso 2: Obtener los horarios correspondientes a esos viajes
        const idViajes = viajes.map(viaje => viaje.idViaje);
        const horarios = await db.horarios.findAll({
            where: {
                idViaje: idViajes
            }
        });

        // Paso 3: Filtrar los horarios para obtener las líneas desde la parada seleccionada en adelante
        const horariosDesdeParada = horarios.filter(horario => {
            return horario.seqParada >= idParada;
        });

        // Devolver los horarios filtrados como respuesta
        res.json(horariosDesdeParada);
    } catch (error) {
        // Manejo de errores
        console.error("Error al obtener los horarios:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

export default getHorariosByRutas;