const db = require('../connections/postgresql.connection');
const queries = require('./queries');

async function ConsultaEmpresas(){
    let result = await db.query(queries.consultaEmpresas);

    return result;
}

async function ConsultaEmpresaPorId(id){
    let result = await db.query(queries.consultaEmpresaPorId, [id]);

    return result;
}

async function ValidaUsuario(usuario, clave){
    let result = await db.query(queries.consultaUsuario, [usuario, clave]);

    return result;
}

module.exports = {
    ConsultaEmpresas,
    ConsultaEmpresaPorId,
    ValidaUsuario
}