const db = require('../config/db.config');
const formDate = require('./formDate');
const op = db.Sequelize.Op;

exports.registerAdicion = (req, res) => {
  if (req.body && req.body.fecha_fin && req.body.nro_mesa && req.body.id_mozo) {
    db.adiciones.create({
      fecha_ini: formDate.format(new Date),
      fecha_fin: formDate.format(req.body.fecha_fin),
      nro_mesa: req.body.nro_mesa,
      id_mozo: req.body.id_mozo,
      estado: 'ABIERTA',
      total: 0
    }).then((adicion) => {
      res.status(200).json({
        msg: 'Generada Correctamente !!!',
        adicion: adicion
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

exports.listaAdicion = (req, res) => {
  if (req.query.id_mozo) {
    db.adiciones.findAll({
      attributes: ['id', 'fecha_ini', 'nro_mesa', 'id_mozo', 'estado', 'total', 'fecha_fin'],
      where: {
        [op.and]: {
          id_mozo: req.query.id_mozo,
          fecha_ini: {
            [op.between]: [formDate.format(req.query.fecha_ini), formDate.format(req.query.fecha_fin)]
          }
        },
      }
    }).then(result => {
      res.status(200).json(result);
    }).catch(err => {
      res.status(401).send(err)
    });
  } else {
    db.adiciones.findAll({
      attributes: ['id', 'fecha_ini', 'nro_mesa', 'id_mozo', 'estado', 'total', 'fecha_fin'],
      where: {
        fecha_ini: {
          [op.between]: [formDate.format(req.query.fecha_ini), formDate.format(req.query.fecha_fin)]
        },
      }
    }).then(result => {
      res.status(200).json(result);
    }).catch(err => {
      res.status(401).send(err)
    });
  }
};

exports.borrar = (req, res) => {
  if (req.params.id) {
    db.adiciones.destroy({
      where: {
        id: req.params.id,
      },
    }).then(() => {
      res.status(202).json({
        ok: true,
        msg: `Se eliminó la adición ${req.params.id} correctamente`,
      });
    }).catch(err => {
      res.status(409).json({
        err: err,
        msg: `Error al borrar !!!`,
      });
    });
  } else {
    res.status(401).send('Faltan variables');
  }
}

exports.modificar = (req, res) => {
  if (req.body && req.params.id) {
    db.adiciones.update(req.body, {
      where: {
        id: req.params.id,
      },
    }).then(() => {
      res.status(202).json({
        ok: true,
        msg: `Se modificó la adición ${req.params.id} correctamente`,
      });
    }).catch(err => {
      res.status(409).json({
        err: err,
        msg: `Error al editar !!!`,
      });
    });
  } else {
    res.status(401).send('Faltan variables');
  }
};
