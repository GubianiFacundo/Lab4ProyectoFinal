module.exports = function(app) {
	const plato = require('../controllers/plato.controller');
	app.post('/registerPlato', plato.registerPlato);
  app.get('/platos', plato.listaPlato);
  app.delete('/deletePlato/:id', plato.borrar);
  app.put('/modificarPlato/:id', plato.modificar);
};
