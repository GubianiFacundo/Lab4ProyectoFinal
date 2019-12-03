module.exports = (db, sequelize, Sequelize) => {

  db.usuarios = require('../models/usuarios')(sequelize, Sequelize);
  db.mozo = require('../models/mozo')(sequelize, Sequelize);
  db.adiciones = require('../models/adiciones')(sequelize, Sequelize);
  db.detalle = require('../models/detalle')(sequelize, Sequelize);
  db.plato = require('../models/plato')(sequelize, Sequelize);
  db.venta = require('../models/venta')(sequelize, Sequelize);
  
  // db.adiciones.hasOne(db.mozo, {
  //   as: 'mozo',
  //   constraints: false
  // });

  // db.detalle.hasOne(db.adiciones, {
  //   as: 'adiciones',
  //   constraints: false
  // });

  // db.detalle.hasMany(db.plato, {
  //   as: 'plato',
  //   constraints: false
  // });

  // db.venta.hasOne(db.plato, {
  //   as: 'plato',
  //   constraints: false
  // });

  return db;
}