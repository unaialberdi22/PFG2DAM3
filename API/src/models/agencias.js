'use strict';
module.exports = (sequelize, DataTypes) => {
    const Agencias = sequelize.define('agencias', {
        idAgencia: {
            type: DataTypes.STRING(255),
            primaryKey: true
        },
        nombreAgencia: {
            type: DataTypes.STRING(255),
        },
        web: {
            type: DataTypes.STRING(255),
        },
        paisAgencia: {
            type: DataTypes.STRING(255),
        },
        telefono: {
            type: DataTypes.STRING(255),
        },
      }, {
        timestamps: false
      });
}