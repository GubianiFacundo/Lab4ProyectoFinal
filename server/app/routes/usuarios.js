module.exports = function(app) {
	const usuario = require('../controllers/usuarios.controller');
	app.post('/login', usuario.login);
	app.post('/register', usuario.registrar);
  app.get('/usuarios', usuario.listaUsuario);
  app.delete('/deleteUser/:id', usuario.borrar);
  app.put('/modificarUser/:id', usuario.modificar);
};
