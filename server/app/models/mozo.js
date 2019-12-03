/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('mozo', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nro_mozo: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'mozo',
    timestamps: false,
  });
};
