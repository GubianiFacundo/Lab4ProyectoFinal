/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('venta', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    id_plato: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'plato',
        key: 'id'
      }
    },
    precio_venta: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    codigo: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'venta',
    timestamps: false,
  });
};
