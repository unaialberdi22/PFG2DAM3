'use strict';
export default (sequelize, DataTypes) => {
    const Paradas = sequelize.define('paradas', {
        idParada: {
            type: DataTypes.STRING(255),
            primaryKey: true
        },
        nombreParada: {
            type: DataTypes.STRING(255),
        },
        latitud: {
            type: DataTypes.STRING(255),
        },
        longitud: {
            type: DataTypes.STRING(255),
        },
        accesoMinus: {
            type: DataTypes.STRING(255),
        },
      }, {
        timestamps: false
      });

      
      return Paradas
}