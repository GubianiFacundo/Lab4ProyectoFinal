/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('detalle', {
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
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    precio_unit: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    subtotal: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    id_adicion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'adiciones',
        key: 'id'
      }
    }
  }, {
    tableName: 'detalle',
    timestamps: false,
  });
};
