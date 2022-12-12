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
    query += 'SELECT id, descripcion, porcentaje ';
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

async function InsertaPorcentajePorCapitulo(idEmpresa, idCapitulo, idPorcentaje){
    let query = '';
    query += 'INSERT INTO Configuracion_PorcentajePorCapitulo(id_empresa, id_capitulo, id_porcentaje) ';
    query += 'VALUES($1, $2, $3)';
    let result = false;    

    try {
        await fiscalizacion_db.query(query, [idEmpresa, idCapitulo, idPorcentaje]);
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

async function InsertaCapituloPorModelo(idEmpresa, idModelo, idCapitulo){
    let query = '';
    query += 'INSERT INTO Configuracion_CapituloPorModelo(id_empresa, id_modelo, id_capitulo) ';
    query += 'VALUES($1, $2, $3)';
    let result = false;    

    try {
        await fiscalizacion_db.query(query, [idEmpresa, idModelo, idCapitulo]);
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

async function InsertaEtapaConstructivaPorCapitulo(idEmpresa, idCapitulo, idPorcentaje, idEtapaConstructiva){
    let query = '';
    query += 'INSERT INTO Configuracion_EtapaConstructivaPorCapitulo(id_empresa, id_capitulo, id_porcentaje, id_etapaConstructiva) ';
    query += 'VALUES($1, $2, $3, $4)';
    let result = false;    

    try {
        await fiscalizacion_db.query(query, [idEmpresa, idCapitulo, idPorcentaje, idEtapaConstructiva]);
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
    ConsultaEtapaConstructivaPorCapitulo
}