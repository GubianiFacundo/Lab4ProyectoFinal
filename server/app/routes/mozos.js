module.exports = function(app) {
	const mozo = require('../controllers/mozo.controller');
  app.post('/registerMozo', mozo.registerMozo);
  app.get('/mozo', mozo.listaMozo);
  app.delete('/deleteMozo/:id', mozo.borrar);
  app.put('/modificarMozo/:id', mozo.modificar);
};
