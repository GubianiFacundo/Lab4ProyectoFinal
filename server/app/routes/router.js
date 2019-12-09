var express = require('express');
var router = express.Router();

module.exports = function (config) {
  require('./usuarios')(router);
  require('./mozos')(router);
  require('./platos')(router);
  require('./adiciones')(router);
  require('./detalle')(router);
  router.get('/', (req, res) => {
    res.status(200).send('Yay!!!')
  });
	return router;
};
