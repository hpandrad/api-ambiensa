const controllers = require('../controllers/index');
const auth = require('../auth/index');

// module.exports = function(app) {
//     app.get('/empresas', controllers.getEmpresas);
//     app.get('/empresaPorId/:id', controllers.getEmpresaPorId);
//     app.post('/login', controllers.setIniciarSesion)
// };

const express = require("express");
const router = express.Router();

router.get('/', (request, response) => {
    response.send('...');
});

//router.post('/login', controllers.setIniciarSesion);
router.get('/empresa/:usuario', auth.verifyToken, controllers.getEmpresa);
router.get('/roles/:empresa', auth.verifyToken, controllers.getRoles);
router.get('/roles/:empresa/:rol', auth.verifyToken, controllers.getRolPorId);
router.get('/porcentajes/:empresa', auth.verifyToken, controllers.getPorcentajes);
router.get('/capitulos/:empresa', auth.verifyToken, controllers.getCapitulos);
router.get('/relacioncapitulos/:empresa/:capitulopadre', auth.verifyToken, controllers.getRelacionCapitulos);
router.post('/relacioncapitulos', auth.verifyToken, controllers.setRelacionCapitulos);
router.post('/porcentajeporcapitulo', auth.verifyToken, controllers.setPorcentajePorCapitulo);
router.get('/porcentajeporcapitulo/:empresa/:capitulo', auth.verifyToken, controllers.getPorcentajePorCapitulo);
router.get('/modelos/:empresa', auth.verifyToken, controllers.getModelos);
router.post('/capitulopormodelo', auth.verifyToken, controllers.setCapituloPorModelo);
router.get('/capitulopormodelo/:empresa/:modelo', auth.verifyToken, controllers.getCapituloPorModelo);
router.get('/etapasconstructivas/:empresa', auth.verifyToken, controllers.getEtapaConstructiva);
router.post('/etapaconstructivaporcapitulo', auth.verifyToken, controllers.setEtapaConstructivaPorCapitulo);
router.get('/etapaconstructivaporcapitulo/:empresa/:capitulo', auth.verifyToken, controllers.getEtapaConstructivaPorCapitulo);
router.post('/estadorevision', auth.verifyToken, controllers.setEstadoRevision);
router.put('/estadorevision/:id', auth.verifyToken, controllers.setEstadoRevision);
router.get('/estadorevision/:empresa', auth.verifyToken, controllers.getEstadoRevision);
router.get('/estadorevision/:empresa/:id', auth.verifyToken, controllers.getEstadoRevisionPorId);
router.delete('/estadorevision/:empresa/:id', auth.verifyToken, controllers.delEstadoRevision);
router.post('/nivelcargaaleatoria', auth.verifyToken, controllers.setNivelCargaAleatoria);
router.get('/nivelcargaaleatoria/:empresa', auth.verifyToken, controllers.getNivelCargaAleatoria);
router.post('/parametro', auth.verifyToken, controllers.setParametro);
router.get('/parametro/:empresa', auth.verifyToken, controllers.getParametro);
router.get('/proyecto/:empresa', auth.verifyToken, controllers.getProyectos);
router.get('/etapaproyecto/:empresa/:proyecto', auth.verifyToken, controllers.getEtapasProyecto);
router.post('/periodoFiscalizacion', auth.verifyToken, controllers.setPeriodoFiscalizacion);
router.get('/periodoFiscalizacion/:empresa', auth.verifyToken, controllers.getPeriodoFiscalizacion);
router.get('/urbanizacion/:empresa', auth.verifyToken, controllers.getUrbanizaciones);
router.get('/ordenestrabajo/:empresa/:usuario', auth.verifyToken, controllers.getOrdenesTrabajo);

module.exports = router;