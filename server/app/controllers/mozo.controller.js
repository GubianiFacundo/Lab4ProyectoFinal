const db = require('../config/db.config');
const formDate = require('./formDate');
const op = db.Sequelize.Op;

exports.registerMozo = (req, res) => {
  if (req.body && req.body.nombre && req.body.nro_mozo) {
    db.mozo.create({
      nombre: req.body.nombre,
      nro_mozo: req.body.nro_mozo,
    }).then((mozo) => {
      res.status(200).json({
        msg: 'Generado Correctamente !!!',
        mozo: mozo
      })
    }).catch(err => {
      res.status(409).json({
        msg: 'Error al generar !!!',
        err: err
      });
    });
  } else {
    res.status(401).json({
      msg: 'Faltan Variables !!!'
    });
  }
};

exports.listaMozo = (req, res) => {
  db.mozo.findAll({
    attributes: ['id', 'nombre', 'nro_mozo'],
  }).then(result => {
    res.status(200).json(result);
  }).catch(err => {
    res.status(401).send(err)
  });
};

exports.borrar = (req, res) => {
  if (req.params.id) {
    db.mozo.destroy({
      where: {
        id: req.params.id,
      },
    }).then(() => {
      res.status(202).json({
        ok: true,
        msg: `Se eliminó el mozo ${req.params.id} correctamente`,
      });
    }).catch(err => {
      res.status(409).json({
        msg: 'ERROR AL ELIMINAR, El mozo está asociado a una factura !!!',
        err: err
      });
    });
  } else {
    res.status(401).send('Faltan variables');
  }
}

exports.modificar = (req, res) => {
  console.log(req)
  if (req.body && req.params.id) {
    db.mozo.update(req.body, {
      where: {
        id: req.params.id,
      },
    }).then(() => {
      res.status(202).json({
        ok: true,
        msg: `Se modificó el mozo ${req.params.id} correctamente`,
      });
    }).catch(err => {
      res.status(409).json({
        msg: 'ERROR AL MODIFICAR !!!',
        err: err
      });
    });
  } else {
    res.status(401).send('Faltan variables');
  }
};
