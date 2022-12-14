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
router.get('/capitulos/:empresa', controllers.getCapitulos);
router.post('/porcentajeporcapitulo', controllers.setPorcentajePorCapitulo);
router.get('/porcentajeporcapitulo/:empresa/:capitulo', controllers.getPorcentajePorCapitulo);
router.get('/modelos/:empresa', controllers.getModelos);
router.post('/capitulopormodelo', controllers.setCapituloPorModelo);
router.get('/capitulopormodelo/:empresa/:modelo', controllers.getCapituloPorModelo);
router.get('/etapasconstructivas/:empresa', controllers.getEtapaConstructiva);
router.post('/etapaconstructivaporcapitulo', controllers.setEtapaConstructivaPorCapitulo);
router.get('/etapaconstructivaporcapitulo/:empresa/:capitulo', controllers.getEtapaConstructivaPorCapitulo);
router.post('/estadorevision', controllers.setEstadoRevision);
router.put('/estadorevision/:id', controllers.setEstadoRevision);
router.get('/estadorevision/:empresa', controllers.getEstadoRevision);
router.get('/estadorevision/:empresa/:id', controllers.getEstadoRevisionPorId);
router.delete('/estadorevision/:empresa/:id', controllers.delEstadoRevision);
router.post('/nivelcargaaleatoria', controllers.setNivelCargaAleatoria);
router.get('/nivelcargaaleatoria/:empresa', controllers.getNivelCargaAleatoria);
router.post('/parametro', controllers.setParametro);
router.get('/parametro/:empresa', controllers.getParametro);
router.get('/proyecto/:empresa', controllers.getProyectos);
router.get('/etapaproyecto/:empresa/:proyecto', controllers.getEtapasProyecto);

module.exports = router;