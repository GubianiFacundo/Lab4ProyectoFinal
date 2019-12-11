/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('plato', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    desc: {
      type: DataTypes.STRING,
      allowNull: false
    },
    precio_costo: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    porc_gan: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    precio_plato: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
  }, {
    tableName: 'plato',
    timestamps: false,
  });
};
