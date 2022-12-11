const db = require('../connections/index');
const ambiensa_db = db.ambiensaPool;

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
    query += 'AND id = $2';

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

module.exports = {    
    ValidaUsuario,
    ConsultaRoles,
    ConsultaRol,
    ConsultaPorcentajes,
    ConsultaCapitulos,
}