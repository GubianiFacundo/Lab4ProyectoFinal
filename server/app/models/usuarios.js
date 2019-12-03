/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('usuarios', {
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
    pass: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rol_id: {
      type: DataTypes.STRING(3),
      allowNull: false
    }
  }, {
    tableName: 'usuarios',
    timestamps: false,
  });
};
