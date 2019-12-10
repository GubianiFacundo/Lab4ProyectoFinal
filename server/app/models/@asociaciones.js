module.exports = (db, sequelize, Sequelize) => {

  db.usuarios = require('../models/usuarios')(sequelize, Sequelize);
  db.mozo = require('../models/mozo')(sequelize, Sequelize);
  db.adiciones = require('../models/adiciones')(sequelize, Sequelize);
  db.detalle = require('../models/detalle')(sequelize, Sequelize);
  db.plato = require('../models/plato')(sequelize, Sequelize);
  db.venta = require('../models/venta')(sequelize, Sequelize);

  db.detalle.belongsTo(db.plato, {
    as: 'plato',
    foreignKey: 'id_plato',
    targetKey: 'id',
    constraints: false
  });

  db.adiciones.hasMany(db.detalle, {
    as: 'detalles',
    foreignKey: 'id_adicion',
    targetKey: 'id',
    constraints: false
  });

  return db;
}
