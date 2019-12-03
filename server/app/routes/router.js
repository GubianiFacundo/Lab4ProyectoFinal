var express = require('express');
var router = express.Router();

module.exports = function (config) {
  require('./usuarios')(router);
  require('./mozos')(router);
  // require('./incidencias')(router);
  // require('./acciones')(router);
  // require('./notificaciones')(router);
  // require('./escalamientos')(router);
  router.get('/', (req, res) => {
    res.status(200).send('Yay!!!')
  });
	return router;
};
