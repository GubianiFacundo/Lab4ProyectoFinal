/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('adiciones', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    fecha: {
      type: DataTypes.TIME,
      allowNull: false
    },
    nro_mesa: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_mozo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'mozo',
        key: 'id'
      }
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false
    },
    total: {
      type: DataTypes.DOUBLE,
      allowNull: false
    }
  }, {
    tableName: 'adiciones',
    timestamps: false,
  });
};
