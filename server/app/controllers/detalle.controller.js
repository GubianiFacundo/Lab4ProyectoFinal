const db = require('../config/db.config');
const formDate = require('./formDate');
const op = db.Sequelize.Op;

exports.registerDetalle = (req, res) => {
  if (req.body.id_plato && req.body.cantidad && req.body.precio_unit && req.body.id_adicion) {
    db.detalle.create({
      id_plato: req.body.id_plato,
      cantidad: req.body.cantidad,
      precio_unit: req.body.precio_unit,
      subtotal: req.body.cantidad * req.body.precio_unit,
      id_adicion: req.body.id_adicion,
    }).then((detalle) => {
      res.status(200).json({
        msg: 'Generado Correctamente !!!',
        detalle: detalle
      })
    }).catch(err => {
      res.status(409).json({
        msg: 'Error al Generar !!!',
        err: err
      });
    });
  } else {
    res.status(401).send('Faltan variables !!!');
  }
};

exports.listaDetalle = (req, res) => {
  db.detalle.findAll({
    attributes: ['id', 'id_plato', 'cantidad', 'precio_unit', 'subtotal', 'id_adicion'],
    where: {
      id_adicion: req.query.id_adicion
    }
  }).then(result => {
    res.status(200).json(result);
  }).catch(err => {
    res.status(401).send(err)
  });
};

exports.borrar = (req, res) => {
  if (req.params.id) {
    db.detalle.destroy({
      where: {
        id: req.params.id,
      },
    }).then(() => {
      res.status(202).json({
        ok: true,
        msg: `Se eliminó el detalle ${req.params.id} correctamente`,
      });
    }).catch(err => {
      res.status(409).json({
        msg: 'Error al borrar !!!',
        err: err
      });
    });
  } else {
    res.status(401).send('Faltan variables');
  }
}

exports.modificar = (req, res) => {
  console.log('a ver', req)
  if (req.body && req.params.id) {
    db.detalle.update(req.body, {
      where: {
        id: req.params.id,
      },
    }).then(() => {
      res.status(202).json({
        ok: true,
        msg: `Se modificó el detalle ${req.params.id} correctamente`,
      });
    }).catch(err => {
      res.status(409).json({
        msg: 'Error al editar !!!',
        err: err
      });
    });
  } else {
    res.status(401).send('Faltan variables');
  }
};
