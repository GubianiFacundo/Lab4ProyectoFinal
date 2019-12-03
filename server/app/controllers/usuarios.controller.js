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
  if (req.body && req.body.usuario && req.body.pass && req.body.rol) {
    db.usuarios.create({
      nombre: req.body.usuario,
      pass: req.body.pass,
    }).then(() => {
      res.status(201).send('Usuario generado correctamente !!!');
    }).catch(err => {
      res.status(409).send(err);
    });
  } else {
    res.status(401).send('Faltan variables !!!');
  }
};


exports.listaUsuario = (req, res) => {
  let whereClause;
  if (req.query.tipo == 'activas') {
    whereClause = {
      fecha_fin: {
        [op.or]: {
          [op.gt]: formDate.format(new Date),
          [op.is]: null,
        }
      }
    }
  } else if (req.query.tipo == 'inactivas') {
    whereClause =  {
      fecha_fin: {
        [op.or]: {
          [op.lt]: formDate.format(new Date),
        }
      }
    }
  } else if (req.query.tipo == 'todas') {
    whereClause =  {
      fecha_ini: {
        [op.or]: {
          [op.ne]: null
        }
      }
    }
  }

  db.usuarios.findAll({
    attributes: ['id', 'nombre', 'fecha_ini', 'fecha_fin', 'rol_id'],
    where: whereClause
  }).then(result => {
    res.status(200).json(result);
  }).catch(err => {
    res.status(401).send(err)
  });
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