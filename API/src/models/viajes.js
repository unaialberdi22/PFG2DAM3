'use strict';
module.exports = (sequelize, DataTypes) => {
    const Viajes = sequelize.define('viajes', {
        idRuta: {
            type: DataTypes.STRING(255),
            primaryKey: true
        },
        idViaje: {
            type: DataTypes.STRING(255),
        },
        accesoMinus: {
            type: DataTypes.STRING(255),
        },
      }, {
        timestamps: false
      });
}