const controllers = require('../controllers/index');
// const controllers = require('../controllers/mysql.controller');

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

router.post('/login', controllers.setIniciarSesion);
router.get('/roles/:empresa', controllers.getRoles);
router.get('/roles/:empresa/:rol', controllers.getRolPorId);
router.get('/porcentajes/:empresa', controllers.getPorcentajes);

module.exports = router;