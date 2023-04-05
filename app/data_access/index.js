const db = require('../connections/index');
const ambiensa_db = db.ambiensaPool;
const fiscalizacion_db = db.fiscalizacionPool;

// async function ValidaUsuario(usuario, clave){
//     let query = '';
//     query += 'SELECT e.id_empresa "idEmpresa", e.nombre "empresa", u.usuario "usuario", u.nombre "nombreUsuario", u.id_rol "idRol" ';
//     query += 'FROM usuario_empresas ue ';
//     query += 'INNER JOIN empresas e ON ue.id_empresa = e.id_empresa ';
//     query += 'INNER JOIN usuarios u ON ue.id_usuario = u.id_usuario ';
//     query += 'WHERE UPPER(u.usuario) = UPPER($1) ';
//     // query += 'AND u.clave = $2';
//     query += 'GROUP BY e.id_empresa, e.nombre, u.usuario, u.nombre, u.id_rol';
    
//     // let result = await ambiensa_db.query(query, [usuario, clave]);
//     let result = await ambiensa_db.query(query, [usuario]);

//     return result;
// }

async function ConsultaEmpresa(idUsuario){
    let query = '';
    query += 'SELECT e.id_empresa, e.nombre ';
    query += 'FROM usuario_empresas ue ';
    query += 'INNER JOIN empresas e ON ue.id_empresa = e.id_empresa ';
    query += 'WHERE id_usuario = $1 ';
    query += 'GROUP BY e.id_empresa, e.nombre';
    
    let result = await ambiensa_db.query(query, [idUsuario]);

    return result;
}

async function ConsultaRoles(idEmpresa){
    let query = '';
    query += 'SELECT id_rol "id", descripcion ';
    query += 'FROM roles ';
    query += 'ORDER BY descripcion';
    
    // let result = await ambiensa_db.query(query, [idEmpresa]);
    let result = await ambiensa_db.query(query);

    return result;
}

async function ConsultaRol(idEmpresa, idRol){
    let query = '';
    query += 'SELECT id_rol "id", descripcion ';
    query += 'FROM roles ';    
    query += 'WHERE id_rol = $1 ';

    // let result = await ambiensa_db.query(query, [idEmpresa, idRol]);
    let result = await ambiensa_db.query(query, [idRol]);

    return result;
}

async function ConsultaPorcentajes(idEmpresa){
    let query = '';
    query += 'SELECT id, descripcion, porcentaje, false "check" ';
    query += 'FROM Porcentaje ';    
    // query += 'WHERE id_empresa = $1 ';
    query += 'ORDER BY porcentaje';
    
    // let result = await fiscalizacion_db.query(query, [idEmpresa]);
    let result = await fiscalizacion_db.query(query);

    return result;
}

async function ConsultaCapitulos(idEmpresa){
    let query = '';
    query += 'SELECT id_capitulo "id", descripcion ';
    query += 'FROM capitulos ';    
    query += 'WHERE id_empresa = $1 ';
    query += 'ORDER BY descripcion';
    
    let result = await ambiensa_db.query(query, [idEmpresa]);

    return result;
}

async function ConsultaRelacionCapitulos(idEmpresa, idCapituloPadre){
    let query = '';
    query += 'SELECT id_capitulo_padre,id_capitulo,id_porcentaje ';
    query += 'FROM Configuracion_RelacionCapitulo ';    
    query += 'WHERE id_empresa = $1 ';
    query += 'AND id_capitulo_padre = $2';
    
    let result = await fiscalizacion_db.query(query, [idEmpresa,idCapituloPadre]);

    return result;
}

async function InsertaRelacionCapitulos(idEmpresa, idCapituloPadre, idCapitulo, idPorcentaje){
    let deleteQuery = 'DELETE FROM Configuracion_RelacionCapitulo WHERE id_empresa = $1 AND id_capitulo_padre = $2';    
    let insertQuery = 'INSERT INTO Configuracion_RelacionCapitulo(id_empresa, id_capitulo_padre, id_capitulo, id_porcentaje) VALUES($1, $2, $3, $4)';    
    let result = false;    

    try {
        await fiscalizacion_db.query(deleteQuery, [idEmpresa, idCapituloPadre]);

        if(idCapitulo > 0 && idPorcentaje > 0) {
            await fiscalizacion_db.query(insertQuery, [idEmpresa, idCapituloPadre, idCapitulo, idPorcentaje]);    
        }        
        
        result = true;
    } catch(error) {
        console.error(error.stack);        
    }

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
    query += 'SELECT id_modelo "id", descripcion ';
    query += 'FROM modelos_proyecto ';    
    query += 'WHERE id_empresa = $1 ';
    query += 'GROUP BY id_modelo, descripcion ';
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
    query += 'SELECT -1 "id", -1 "descripcion" ';
    query += 'UNION ALL ';
    query += 'SELECT id_etapa_constructiva "id", descripcion ';
    query += 'FROM etapa_constructivas ';    
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
    query += 'id_proyecto "id", descripcion, nemonico ';
    query += 'FROM proyectos ';    
    query += 'WHERE id_empresa = $1 ';
    query += 'ORDER BY descripcion';
    
    let result = await ambiensa_db.query(query, [idEmpresa]);

    return result;
}

async function ConsultaEtapaProyecto(idEmpresa, idProyecto){
    let query = '';
    query += 'SELECT id_fase_proyecto "id", descripcion ';
    query += 'FROM fases_proyectos ';    
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
    query += 'SELECT id_urbanizacion "id", descripcion_etapa "descripcion" ';
    query += 'FROM urbanizaciones ';    
    query += 'WHERE id_empresa = $1 ';
    query += 'ORDER BY descripcion_etapa';
    
    let result = await ambiensa_db.query(query, [idEmpresa]);

    return result;
}

async function ConsultaOrdenTrabajo(idEmpresa,usuario){
    let query = '';
    query += 'SELECT ot.id_orden_trabajo "id",ot.codigo,p.id_proyecto "idProyecto",p.descripcion "proyecto",u.id_urbanizacion "idUrbanizacion",';
    query += 'u.descripcion_etapa "urbanizacion",ep.descripcion "etapa",ot.fecha_emision "fechaEmision",';
    query += 'TRIM(ot.tiempo_ejecucion || \' \' || COALESCE(ot.periodo_ejecucion,\'\')) "tiempoEjecucion",dot.id_detalle_orden_trabajo "id_detalle",';
    query += 'dot.id_manzana "manzana",dot.id_solar "solar",dot.id_modelo "id_modelo",dot.descripcion_modelo "descripcion",';
    query += 'COALESCE(dot.fecha_especifica_tecnica,NOW()) "fechaEspecificacionTecnica",ep.descripcion "tipoOrdenTrabajo",u2.usuario ';
    query += 'FROM orden_trabajos ot ';    
    query += 'INNER JOIN proyectos p ON ot.id_proyecto = p.id_proyecto ';
    query += 'INNER JOIN urbanizaciones u ON ot.id_urbanizacion = u.id_urbanizacion ';
    query += 'INNER JOIN fases_proyectos ep ON ot.id_proyecto = ep.id_proyecto AND ot.id_fase_proyecto = ep.id_fase_proyecto ';
    query += 'INNER JOIN detalle_orden_trabajos dot ON ot.id_orden_trabajo = dot.id_orden_trabajo ';
    query += 'INNER JOIN usuarios u2 ON ot.id_usuario = u2.id_usuario ';
    query += 'WHERE ot.id_empresa = $1 ';
    query += 'AND u2.usuario = $2 ';
    query += 'ORDER BY ot.fecha_emision ,dot.id_detalle_orden_trabajo';
    
    let result = await ambiensa_db.query(query, [idEmpresa,usuario]);

    return result;
}

module.exports = {    
    // ValidaUsuario,
    ConsultaEmpresa,
    ConsultaRoles,
    ConsultaRol,
    ConsultaPorcentajes,
    ConsultaCapitulos,
    ConsultaRelacionCapitulos,
    InsertaRelacionCapitulos,
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