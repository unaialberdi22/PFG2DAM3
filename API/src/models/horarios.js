'use strict';
export default (sequelize, DataTypes) => {
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

        // Define la asociación
        Horarios.associate = (models) => {
            // Un horario pertenece a una parada
            Horarios.belongsTo(models.paradas, { foreignKey: 'idParada', as: 'parada' });
        };
      return Horarios
}