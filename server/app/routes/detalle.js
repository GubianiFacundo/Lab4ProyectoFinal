module.exports = function(app) {
	const detalle = require('../controllers/detalle.controller');
  app.post('/registerDetalle', detalle.registerDetalle);
  app.get('/detalles', detalle.listaDetalle);
  app.delete('/deleteDetalle/:id', detalle.borrar);
  app.put('/modificarDetalle/:id', detalle.modificar);
};
