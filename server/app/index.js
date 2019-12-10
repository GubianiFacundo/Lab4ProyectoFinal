var express = require('express');
var config = require('./config/config');
var cors = require('cors');
var app = express();
var morgan = require('morgan');
const db = require('./config/db.config');

// ***** CONNECTION TO DB
new Promise((resolve, reject) => {
  db.init();

  db.sequelize.sync({
    // force: true
  }).then(() => {
    console.log('**** Drop DB y Resync ****');

    // db.usuarios.create({
    //   nombre: 'admin',
    //   pass: 'admin',
    //   rol_id: 'ADM'
    // })

    // db.plato.create({
    //   id: 0,
    //   desc: '',
    //   precio_costo: 0,
    //   porc_gan: 1
    // })
  })

  if (err) {
    reject(err);
  } else {
    resolve('');
  }
})



app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))
app.use(morgan('dev'));

// var corsOptions = {
//   origin: 'http://localhost:8080',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }

// app.use(cors(corsOptions))


app.use(function (req, res, next) {
  // Headers para definir.
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Acciones que permitimos.
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  );
  // si estamos logueados
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Headers', 'x-auth, Content-Type');
  // Se pone true si por ejemplo queremos cookies en las requests
  // res.setHeader('Access-Control-Allow-Credentials', true);
  // Con next() pasamos de este middleware a lo siguiento
  next();
});



let router = require('./routes/router')(config);

app.get('/', (req, res) => {
  res.status(200).send('Yay landing page !!!')
});

app.use('/api', router);
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(config.puerto, config.listenOn, () => {
  console.log(`Server corriendo en el puerto ${config.puerto}, I'm up bro yay!!! ;)`);
}).on('error', (e) => {
  console.error(`Error al iniciar el server (puerto ${config.puerto})`);
});
