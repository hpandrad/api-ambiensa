// const controllers = require('../controllers/postgresql.controller');
 const controllers = require('../controllers/mysql.controller');

// module.exports = function(app) {
//     app.get('/empresas', controllers.getEmpresas);
//     app.get('/empresaPorId/:id', controllers.getEmpresaPorId);
//     app.post('/login', controllers.setIniciarSesion)
// };

const express = require("express");
const router = express.Router();

router.get('/', (request, response) => {
    response.send('Hola mundo cruel... jajajaja..!');
});

router.get('/test', (request, response) => {
    response.send('ESTA ES UNA PRUEBA...');
});

module.exports = router;