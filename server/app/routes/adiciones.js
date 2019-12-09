module.exports = function(app) {
	const adiciones = require('../controllers/adiciones.controller');
  app.post('/registerAdicion', adiciones.registerAdicion);
  app.get('/adiciones', adiciones.listaAdicion);
  app.delete('/deleteAdicion/:id', adiciones.borrar);
  app.put('/modificarAdicion/:id', adiciones.modificar);
};
