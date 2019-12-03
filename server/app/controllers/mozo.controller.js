const db = require('../config/db.config');
const formDate = require('./formDate');
const op = db.Sequelize.Op;

exports.registerMozo = (req, res) => {
  if (req.body && req.body.nombre && req.body.nro_mozo) {
    db.mozo.create({
      nombre: req.body.nombre,
      nro_mozo: req.body.nro_mozo,
    }).then((mozo) => {
      res.status(200).json(mozo)
    }).catch(err => {
      res.status(409).send(err);
    });
  } else {
    res.status(401).send('Faltan variables !!!');
  }
};
