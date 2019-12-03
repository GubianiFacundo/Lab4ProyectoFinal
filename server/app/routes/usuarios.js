module.exports = function(app) {
	const usuario = require('../controllers/usuarios.controller');
	app.post('/login', usuario.login);
	app.post('/register', usuario.registrar);
  // app.get('/usuarios', usuario.listaUsuario);
  // app.get('/usuariosAsignar', usuario.listaUsuarioAsignar);
};
