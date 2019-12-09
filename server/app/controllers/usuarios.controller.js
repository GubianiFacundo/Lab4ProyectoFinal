const db = require('../config/db.config');
const formDate = require('./formDate');
const op = db.Sequelize.Op;


exports.login = (req, res) => {
  console.log(req)
  if (typeof req.body != 'undefined' && typeof req.body.nombre != 'undefined' && typeof req.body.pass != 'undefined') {
    db.usuarios.findOne({
      attributes: ['nombre', 'rol_id'],
      where: {
        [op.and]: {
          pass: req.body.pass,
          nombre: req.body.nombre
        },
      },
    }).then(usuario => {
      if (!usuario) {
        res.status(204).json(null);
      } else {
        res.status(200).json(usuario);
      }
    });
  } else {
    res.status(401).send('Faltan variables !!!');
  }
};

exports.registrar = (req, res) => {
  if (req.body && req.body.nombre && req.body.pass) {
    db.usuarios.create({
      nombre: req.body.nombre,
      pass: req.body.pass,
      rol_id: 'USR'
    }).then((usuario) => {
      res.status(201).json({
        msg: `Usuario ${usuario.nombre} generado correctamente !!!`
      });
    }).catch(err => {
      res.status(409).json({
        msg: `Error al generar !!!`,
        err: err
      });
    });
  } else {
    res.status(401).send('Faltan variables !!!');
  }
};


exports.listaUsuario = (req, res) => {
  db.usuarios.findAll({
    attributes: ['id', 'nombre', 'rol_id'],
  }).then(result => {
    res.status(200).json(result);
  }).catch(err => {
    res.status(401).send(err)
  });
};

exports.borrar = (req, res) => {
  if (req.params.id) {
    db.usuarios.destroy({
      where: {
        id: req.params.id,
      },
    }).then(() => {
      res.status(202).json({
        ok: true,
        msg: `Se eliminó el usuario ${req.params.id} correctamente`,
      });
    }).catch(err => {
      res.status(409).send(err);
    });
  } else {
    res.status(401).send('Faltan variables');
  }
}

exports.modificar = (req, res) => {
  if (req.body && req.params.id) {
    db.usuarios.update(req.body, {
      where: {
        id: req.params.id,
      },
    }).then(() => {
      res.status(202).json({
        ok: true,
        msg: `Se modificó el usuario ${req.params.id} correctamente`,
      });
    }).catch(err => {
      res.status(409).send(err);
    });
  } else {
    res.status(401).send('Faltan variables');
  }
};

exports.listaUsuarioAsignar = (req, res) => {
  db.usuarios.findAll({
    attributes: ['id', 'nombre', 'fecha_ini', 'fecha_fin', 'rol_id'],
    where: {
      fecha_fin: {
        [op.or]: {
          [op.gt]: formDate.format(new Date),
          [op.is]: null,
        },
      },
    },
  }).then(result => {
    res.status(200).json(result);
  }).catch(err => {
    res.status(401).send(err)
  });
};
