const db = require('../config/db.config');
const formDate = require('./formDate');
const op = db.Sequelize.Op;

exports.registerPlato = (req, res) => {
  if (req.body && req.body.desc && req.body.precio_costo && req.body.porc_gan) {
    db.plato.create({
      desc: req.body.desc,
      precio_costo: req.body.precio_costo,
      porc_gan: req.body.porc_gan
    }).then((plato) => {
      res.status(200).json({
        msg: 'Generado Correctamente !!!',
        plato: plato
      })
    }).catch(err => {
      res.status(409).json({
        msg: 'Error al generar !!!',
        err: err
      });
    });
  } else {
    res.status(401).send('Faltan variables !!!');
  }
};

exports.listaPlato = (req, res) => {
  db.plato.findAll({
    attributes: ['id', 'desc', 'precio_costo', 'porc_gan'],
  }).then(result => {
    res.status(200).json(result);
  }).catch(err => {
    res.status(401).send(err)
  });
};

exports.borrar = (req, res) => {
  if (req.params.id) {
    db.plato.destroy({
      where: {
        id: req.params.id,
      },
    }).then(() => {
      res.status(202).json({
        ok: true,
        msg: `Se eliminó el plato ${req.params.id} correctamente`,
      });
    }).catch(err => {
      res.status(409).json({
        msg: `Error al borrar !!!`,
        err: err,
      });
    });
  } else {
    res.status(401).send('Faltan variables');
  }
}

exports.modificar = (req, res) => {
  if (req.body && req.params.id) {
    db.plato.update(req.body, {
      where: {
        id: req.params.id,
      },
    }).then(() => {
      res.status(202).json({
        ok: true,
        msg: `Se modificó el plato ${req.params.id} correctamente`,
      });
    }).catch(err => {
      res.status(409).json({
        msg: `Error al modificar !!!`,
        err: err,
      });
    });
  } else {
    res.status(401).send('Faltan variables');
  }
};
