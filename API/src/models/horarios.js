'use strict';
module.exports = (sequelize, DataTypes) => {
    const Horarios = sequelize.define('horarios', {
        idViaje: {
            type: DataTypes.STRING(255),
            primaryKey: true
        },
        horaSalida: {
            type: DataTypes.STRING(255),
        },
        idParada: {
            type: DataTypes.STRING(255),
        },
        seqParada: {
            type: DataTypes.STRING(255),
        },
      }, {
        timestamps: false
      });
}