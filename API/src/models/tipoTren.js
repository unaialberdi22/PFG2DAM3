'use strict';
export default (sequelize, DataTypes) => {
    const TipoTren = sequelize.define('tipoTren', {
        idTipo: {
            type: DataTypes.STRING(255),
            primaryKey: true
        },
        nombre: {
            type: DataTypes.STRING(255),
        },
        imagen: {
            type: DataTypes.STRING(255),
        },
      }, {
        timestamps: false
      });
      return TipoTren
}