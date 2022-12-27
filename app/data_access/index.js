const db = require('../connections/index');
const ambiensa_db = db.ambiensaPool;
const fiscalizacion_db = db.fiscalizacionPool;

async function ValidaUsuario(usuario, clave){
    let query = '';
    query += 'SELECT e.id "idEmpresa", e.nombre "empresa", u.nombre "nombreUsuario", u.id_rol "idRol" ';
    query += 'FROM Usuario u ';
    query += 'INNER JOIN Empresa e ON e.id = u.id_empresa ';
    query += 'WHERE u.usuario = $1 ';
    query += 'AND u.clave = $2';
    
    let result = await ambiensa_db.query(query, [usuario, clave]);

    return result;
}

async function ConsultaRoles(idEmpresa){
    let query = '';
    query += 'SELECT id, descripcion ';
    query += 'FROM Rol ';    
    query += 'WHERE id_empresa = $1 ';
    query += 'ORDER BY id';
    
    let result = await ambiensa_db.query(query, [idEmpresa]);

    return result;
}

async function ConsultaRol(idEmpresa, idRol){
    let query = '';
    query += 'SELECT id, descripcion ';
    query += 'FROM Rol ';    
    query += 'WHERE id_empresa = $1 ';
    query += 'AND id = $2 ';

    let result = await ambiensa_db.query(query, [idEmpresa, idRol]);

    return result;
}

async function ConsultaPorcentajes(idEmpresa){
    let query = '';
    query += 'SELECT id, descripcion, porcentaje, false "check" ';
    query += 'FROM Porcentaje ';    
    query += 'WHERE id_empresa = $1 ';
    query += 'ORDER BY porcentaje';
    
    let result = await ambiensa_db.query(query, [idEmpresa]);

    return result;
}

async function ConsultaCapitulos(idEmpresa){
    let query = '';
    query += 'SELECT id, descripcion ';
    query += 'FROM Capitulo ';    
    query += 'WHERE id_empresa = $1 ';
    query += 'ORDER BY orden';
    
    let result = await ambiensa_db.query(query, [idEmpresa]);

    return result;
}

async function InsertaPorcentajePorCapitulo(idEmpresa, idCapitulo, arrPorcentajes){
    let deleteQuery = 'DELETE FROM Configuracion_PorcentajePorCapitulo WHERE id_empresa = $1 AND id_capitulo = $2';    
    let insertQuery = 'INSERT INTO Configuracion_PorcentajePorCapitulo(id_empresa, id_capitulo, id_porcentaje) VALUES($1, $2, $3)';    
    let result = false;    

    try {
        await fiscalizacion_db.query(deleteQuery, [idEmpresa, idCapitulo]);

        if(arrPorcentajes != null && arrPorcentajes.length > 0) {
            arrPorcentajes.forEach(async (idPorcentaje, index) => {
                await fiscalizacion_db.query(insertQuery, [idEmpresa, idCapitulo, idPorcentaje]);    
            });
        }        
        
        result = true;
    } catch(error) {
        console.error(error.stack);        
    }

    return result;
}

async function ConsultaPorcentajesPorCapitulo(idEmpresa, idCapitulo){
    let query = '';
    query += 'SELECT id_empresa, id_capitulo, id_porcentaje ';
    query += 'FROM Configuracion_PorcentajePorCapitulo ';    
    query += 'WHERE id_empresa = $1 ';
    query += 'AND id_capitulo = $2';
    
    let result = await fiscalizacion_db.query(query, [idEmpresa, idCapitulo]);

    return result;
}

async function ConsultaModelos(idEmpresa){
    let query = '';
    query += 'SELECT id, descripcion ';
    query += 'FROM Modelo ';    
    query += 'WHERE id_empresa = $1 ';
    query += 'ORDER BY descripcion';
    
    let result = await ambiensa_db.query(query, [idEmpresa]);

    return result;
}

async function InsertaCapituloPorModelo(idEmpresa, idModelo, arrCapitulo){
    let deleteQuery = 'DELETE FROM Configuracion_CapituloPorModelo WHERE id_empresa = $1 AND id_modelo = $2';    
    let insertQuery = 'INSERT INTO Configuracion_CapituloPorModelo(id_empresa, id_modelo, id_capitulo) VALUES($1, $2, $3)';    
    let result = false;    

    try {
        await fiscalizacion_db.query(deleteQuery, [idEmpresa, idModelo]);

        arrCapitulo.forEach(async (idCapitulo, index) => {
            await fiscalizacion_db.query(insertQuery, [idEmpresa, idModelo, idCapitulo]);    
        });
        
        result = true;
    } catch(error) {
        console.error(error.stack);        
    }

    return result;  
}

async function ConsultaCapituloPorModelo(idEmpresa, idModelo){
    let query = '';
    query += 'SELECT id_empresa, id_modelo, id_capitulo ';
    query += 'FROM Configuracion_CapituloPorModelo ';    
    query += 'WHERE id_empresa = $1 ';
    query += 'AND id_modelo = $2';
    
    let result = await fiscalizacion_db.query(query, [idEmpresa, idModelo]);

    return result;
}

async function ConsultaEtapaConstructiva(idEmpresa){
    let query = '';
    query += 'SELECT id, descripcion ';
    query += 'FROM EtapaConstructiva ';    
    query += 'WHERE id_empresa = $1 ';
    query += 'ORDER BY descripcion';
    
    let result = await ambiensa_db.query(query, [idEmpresa]);

    return result;
}

async function InsertaEtapaConstructivaPorCapitulo(idEmpresa, idCapitulo, arrEtapasConstructivasPorPorcentajes){
    let deleteQuery = 'DELETE FROM Configuracion_EtapaConstructivaPorCapitulo WHERE id_empresa = $1 AND id_capitulo = $2';    
    let insertQuery = 'INSERT INTO Configuracion_EtapaConstructivaPorCapitulo(id_empresa, id_capitulo, id_porcentaje, id_etapaConstructiva) VALUES($1, $2, $3, $4)';    
    let result = false;    

    try {
        await fiscalizacion_db.query(deleteQuery, [idEmpresa, idCapitulo]);

        arrEtapasConstructivasPorPorcentajes.forEach(async (element, index) => {
            await fiscalizacion_db.query(insertQuery, [idEmpresa, idCapitulo, element.porcentaje, element.etapaConstructiva ]);    
        });
        
        result = true;
    } catch(error) {
        console.error(error.stack);        
    }

    return result;
}

async function ConsultaEtapaConstructivaPorCapitulo(idEmpresa, idCapitulo){
    let query = '';
    query += 'SELECT id_empresa, id_capitulo, id_porcentaje, id_etapaConstructiva ';
    query += 'FROM Configuracion_EtapaConstructivaPorCapitulo ';    
    query += 'WHERE id_empresa = $1 ';
    query += 'AND id_capitulo = $2';
    
    let result = await fiscalizacion_db.query(query, [idEmpresa, idCapitulo]);

    return result;
}

async function InsertaEstadoRevision(idEmpresa, descripcion){    
    let insertQuery = 'INSERT INTO Configuracion_EstadoRevision(id_empresa, descripcion) VALUES($1, $2) RETURNING id';    
    let result = await fiscalizacion_db.query(insertQuery, [idEmpresa, descripcion]);

    return result;
}

async function ActualizaEstadoRevision(idEmpresa, idEstadoRevision, descripcion){    
    let updateQuery = 'UPDATE Configuracion_EstadoRevision SET descripcion = $1 WHERE id_empresa = $2 AND id = $3 RETURNING id';    
    let result = await fiscalizacion_db.query(updateQuery, [descripcion, idEmpresa, idEstadoRevision]);

    return result;
}

async function EliminaEstadoRevision(idEmpresa, idEstadoRevision){    
    let deleteQuery = 'DELETE FROM Configuracion_EstadoRevision WHERE id_empresa = $1 AND id = $2';       

    let result = false;    

    try {
        await fiscalizacion_db.query(deleteQuery, [idEmpresa, idEstadoRevision]);

        result = true;
    } catch(error) {
        console.error(error.stack);        
    }

    return result;
}

async function ConsultaEstadoRevision(idEmpresa){
    let query = '';
    query += 'SELECT id_empresa, id, descripcion ';
    query += 'FROM Configuracion_EstadoRevision ';    
    query += 'WHERE id_empresa = $1 ';    
    
    let result = await fiscalizacion_db.query(query, [idEmpresa]);

    return result;
}

async function ConsultaEstadoRevisionPorId(idEmpresa, idEstadoRevision){
    let query = '';
    query += 'SELECT id_empresa, id, descripcion ';
    query += 'FROM Configuracion_EstadoRevision ';    
    query += 'WHERE id_empresa = $1 ';
    query += 'AND id = $2';
    
    let result = await fiscalizacion_db.query(query, [idEmpresa, idEstadoRevision]);

    return result;
}

async function ConsultaEstadoRevisionPorDescripcion(idEmpresa, descripcion){
    let query = '';
    query += 'SELECT id_empresa, id, descripcion ';
    query += 'FROM Configuracion_EstadoRevision ';    
    query += 'WHERE id_empresa = $1 ';
    query += 'AND UPPER(descripcion) = UPPER($2)';
    
    let result = await fiscalizacion_db.query(query, [idEmpresa, descripcion]);

    return result;
}

async function InsertaNivelCargaAleatoria(idEmpresa, arrNivelesCarga){
    let deleteQuery = 'DELETE FROM Configuracion_NivelCargaAleatoria WHERE id_empresa = $1 AND id_rol = $2';    
    let insertQuery = 'INSERT INTO Configuracion_NivelCargaAleatoria(id_empresa, id_rol, porcentaje, id_estadoRevision) VALUES($1, $2, $3, $4)';
    let result = false;    

    try {
        // await fiscalizacion_db.query(deleteQuery, [idEmpresa]);

        arrNivelesCarga.forEach(async (element, index) => {
            const idRol = parseInt(element.rol);
            const porcentaje = parseFloat(element.porcentaje);
            const idEstadoRevision = parseInt(element.estadorevision);        
            
            await fiscalizacion_db.query(deleteQuery, [idEmpresa, idRol]);
            await fiscalizacion_db.query(insertQuery, [idEmpresa, idRol, porcentaje, idEstadoRevision]);    
        });
        
        result = true;
    } catch(error) {
        console.error(error.stack);        
    }

    return result;
}

async function ConsultaNivelCargaAleatoria(idEmpresa){
    let query = '';
    query += 'SELECT * ';
    query += 'FROM Configuracion_NivelCargaAleatoria ';    
    query += 'WHERE id_empresa = $1 ';    
    
    let result = await fiscalizacion_db.query(query, [idEmpresa]);

    return result;
}

async function InsertaParametro(idEmpresa, cargaImagenes){
    let deleteQuery = 'DELETE FROM Configuracion_Parametro WHERE id_empresa = $1';    
    let insertQuery = 'INSERT INTO Configuracion_Parametro(id_empresa, cargaImagenes) VALUES($1, $2)';
    let result = false;    

    try {
        await fiscalizacion_db.query(deleteQuery, [idEmpresa]);
        await fiscalizacion_db.query(insertQuery, [idEmpresa, cargaImagenes]);
        
        result = true;
    } catch(error) {
        console.error(error.stack);        
    }

    return result;
}

async function ConsultaParametro(idEmpresa){
    let query = '';
    query += 'SELECT * ';
    query += 'FROM Configuracion_Parametro ';    
    query += 'WHERE id_empresa = $1 ';    
    
    let result = await fiscalizacion_db.query(query, [idEmpresa]);

    return result;
}

async function ConsultaProyecto(idEmpresa){
    let query = '';
    query += 'SELECT id, descripcion ';
    query += 'FROM Proyecto ';    
    query += 'WHERE id_empresa = $1 ';
    query += 'ORDER BY descripcion';
    
    let result = await ambiensa_db.query(query, [idEmpresa]);

    return result;
}

async function ConsultaEtapaProyecto(idEmpresa, idProyecto){
    let query = '';
    query += 'SELECT id, descripcion ';
    query += 'FROM EtapaProyecto ';    
    query += 'WHERE id_empresa = $1 ';
    query += 'AND id_proyecto = $2 ';
    query += 'ORDER BY descripcion';
    
    let result = await ambiensa_db.query(query, [idEmpresa, idProyecto]);

    return result;
}

async function InsertaPeriodoFiscalizacion(idEmpresa, arrPeriodosFiscalizacion){
    let deleteQuery = 'DELETE FROM Configuracion_PeriodoFiscalizacion WHERE id_empresa = $1 AND id_proyecto = $2';    
    let insertQuery = 'INSERT INTO Configuracion_PeriodoFiscalizacion(id_empresa, id_proyecto, id_etapaProyecto, periodo) VALUES($1, $2, $3, $4)';
    let result = false;    

    try {
        // await fiscalizacion_db.query(deleteQuery, [idEmpresa]);

        arrPeriodosFiscalizacion.forEach(async (element, index) => {
            const idProyecto = parseInt(element.proyecto);
            const idEtapa = parseInt(element.etapa);
            const periodo = parseFloat(element.periodo);
            
            await fiscalizacion_db.query(deleteQuery, [idEmpresa, idProyecto]);
            await fiscalizacion_db.query(insertQuery, [idEmpresa, idProyecto, idEtapa, periodo]);    
        });
        
        result = true;
    } catch(error) {
        console.error(error.stack);        
    }

    return result;
}

async function ConsultaPeriodoFiscalizacion(idEmpresa){
    let query = '';
    query += 'SELECT * ';
    query += 'FROM Configuracion_PeriodoFiscalizacion ';    
    query += 'WHERE id_empresa = $1 ';    
    
    let result = await fiscalizacion_db.query(query, [idEmpresa]);

    return result;
}

async function ConsultaUrbanizacion(idEmpresa){
    let query = '';
    query += 'SELECT id, descripcion ';
    query += 'FROM Urbanizacion ';    
    query += 'WHERE id_empresa = $1 ';
    query += 'ORDER BY descripcion';
    
    let result = await ambiensa_db.query(query, [idEmpresa]);

    return result;
}

async function ConsultaOrdenTrabajo(idEmpresa,usuario){
    let query = '';
    query += 'SELECT ot.id,ot.codigo,p.id as idProyecto,p.descripcion as proyecto,u.id as idUrbanizacion,';
    query += 'u.descripcion as urbanizacion,ep.descripcion as etapa,ot.fechaEmision as fechaEmision,';
    query += 'ot.tiempoEjecucion || \' \' || ot.periodoEvaluacion as tiempoEjecucion,dot.id as id_detalle,';
    query += 'dot.manzana,dot.solar,dot.modelo,dot.descripcion,dot.fechaEspecificacionTecnica,dot.tipoOrdenTrabajo ';
    query += 'FROM OrdenTrabajo ot ';    
    query += 'INNER JOIN Proyecto p ON p.id = ot.id_proyecto ';
    query += 'INNER JOIN Urbanizacion u ON u.id = ot.id_urbanizacion ';
    query += 'INNER JOIN EtapaProyecto ep ON ep.id_proyecto = ot.id_proyecto AND ep.id = ot.id_etapaProyecto ';
    query += 'INNER JOIN DetalleOrdenTrabajo dot ON dot.id_ordenTrabajo = ot.id ';
    query += 'WHERE ot.id_empresa = $1 ';
    query += 'AND usuario = $2 ';
    query += 'ORDER BY ot.fechaEmision,dot.id';
    
    let result = await ambiensa_db.query(query, [idEmpresa,usuario]);

    return result;
}

module.exports = {    
    ValidaUsuario,
    ConsultaRoles,
    ConsultaRol,
    ConsultaPorcentajes,
    ConsultaCapitulos,
    InsertaPorcentajePorCapitulo,    
    ConsultaPorcentajesPorCapitulo,
    ConsultaModelos,
    InsertaCapituloPorModelo,
    ConsultaCapituloPorModelo,
    ConsultaEtapaConstructiva,
    InsertaEtapaConstructivaPorCapitulo,
    ConsultaEtapaConstructivaPorCapitulo,
    InsertaEstadoRevision,
    ActualizaEstadoRevision,
    EliminaEstadoRevision,
    ConsultaEstadoRevision,
    ConsultaEstadoRevisionPorId,
    ConsultaEstadoRevisionPorDescripcion,
    InsertaNivelCargaAleatoria,
    ConsultaNivelCargaAleatoria,
    InsertaParametro,
    ConsultaParametro,
    ConsultaProyecto,
    ConsultaEtapaProyecto,
    InsertaPeriodoFiscalizacion,
    ConsultaPeriodoFiscalizacion,
    ConsultaUrbanizacion,
    ConsultaOrdenTrabajo
}