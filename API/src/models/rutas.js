'use strict';
module.exports = (sequelize, DataTypes) => {
    const Rutas = sequelize.define('rutas', {
        idRuta: {
            type: DataTypes.STRING(255),
            primaryKey: true
        },
        idAgencia: {
            type: DataTypes.STRING(255),
        },
        tipo: {
            type: DataTypes.STRING(255),
        },
      }, {
        timestamps: false
      });
}