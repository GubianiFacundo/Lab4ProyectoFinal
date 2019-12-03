module.exports = function(app) {
	const mozo = require('../controllers/mozo.controller');
	// app.post('/login', usuario.login);
	app.post('/registerMozo', mozo.registerMozo);
  // app.get('/usuarios', usuario.listaUsuario);
  // app.get('/usuariosAsignar', usuario.listaUsuarioAsignar);
};
