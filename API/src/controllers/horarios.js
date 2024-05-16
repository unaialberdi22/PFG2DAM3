import db from "../models/index.js"
import { Op } from '@sequelize/core';
// const { Viaje, Horario } = db;

const getHorariosByRutas = async (req, res) => {
    const { idParada, idRuta } = req.params;

    // Buscar los viajes que pertenecen a la ruta especificada
    const viajes = await db.viajes.findAll({
        where: { idRuta: idRuta }
    });

    // Obtener los idViaje de los viajes encontrados
    const idViajes = viajes.map(viaje => viaje.idViaje);

    // Buscar el primer horario de la parada específica en la ruta
    const primerHorario = await db.horarios.findOne({
        where: {
            idViaje: idViajes,
            idParada: idParada
        },
        order: [['seqParada', 'ASC']]
    });

    if (!primerHorario) {
        return res.status(404).json({
            status: 404,
            message: "No se encontraron horarios para la parada especificada en la ruta."
        });
    }

    const seqParada = primerHorario.seqParada;

    // Buscar todos los horarios desde la parada específica en adelante
    const horariosPosteriores = await db.horarios.findAll({
        where: {
            idViaje: idViajes,
            seqParada: { [Op.gte]: seqParada }
        }
    });

    // Obtener los detalles de las paradas para los horarios encontrados
    const paradasIds = horariosPosteriores.map(horario => horario.idParada);
    const paradas = await db.paradas.findAll({
        where: { idParada: paradasIds },
        attributes: ['idParada', 'nombreParada', 'latitud', 'longitud']
    });

    // Combinar los resultados de horarios y paradas en un solo JSON
    const horariosConParadas = horariosPosteriores.map(horario => {
        const parada = paradas.find(p => p.idParada === horario.idParada);
        return {
            idViaje: horario.idViaje,
            horaSalida: horario.horaSalida,
            idParada: horario.idParada,
            seqParada: horario.seqParada,
            latitud: parada ? parada.latitud : null,
            longitud: parada ? parada.longitud : null
        };
    });

    return res.status(200).json({
        status: 200,
        horariosPosteriores: horariosConParadas
    });
};

export  {
    getHorariosByRutas
}