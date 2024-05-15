import db from "../models/index.js";

const getRutasByParadaId = async (req, res) => {
    const { idParada } = req.params;

    try {
        // Buscar la parada correspondiente
        const x = await db.paradas.findOne({
            where: { idParada: idParada }
        });

        if (!parada) {
            return res.status(404).send({
                status: 404,
                message: "Parada no encontrada"
            });
        }

        // Buscar los horarios que contienen la parada
        const horarios = await db.horarios.findAll({
            where: { idParada: idParada }
        });

        // Obtener los idViaje de los horarios
        const idViajes = horarios.map(horario => horario.idViaje);

        // Buscar los viajes correspondientes
        const viajes = await db.viajes.findAll({
            where: { idViaje: idViajes }
        });

        // Obtener los idRuta de los viajes
        const idRutas = viajes.map(viaje => viaje.idRuta);

        // Buscar las rutas correspondientes
        const rutas = await db.rutas.findAll({
            where: { idRuta: idRutas }
        });

        return res.status(200).send({
            status: 200,
            rutas: rutas
        });
    } catch (error) {
        return res.status(500).send({
            status: 500,
            error: "Error al obtener las rutas"
        });
    }
};

export { getRutasByParadaId };