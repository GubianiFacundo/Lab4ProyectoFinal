const Sequelize = require('sequelize');
const config = require('./config');

var sequelize = new Sequelize(config.db.DB, config.db.USER, config.db.PASS, {
  dialect: config.dialect,
  host: config.db.HOST,
  dialectOptions: {
    useUTC: false, // for reading from database
  },
  timezone: 'Etc/GMT0',
});

var init = async function () {
  console.log('CREATING DB...');
  await sequelize.query(`CREATE DATABASE "${config.db.DB}"`).then(() => console.info('Database created')).catch(err => {
    console.log(err);
  });
  console.log('termino')
}

const db = {}

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.init = init;

require('../models/@asociaciones')(db, sequelize, Sequelize);

module.exports = db;
