const db = require('../connections/postgresql.connection');

async function ConsultaEmpresas(){
    let result = await db.query('SELECT * FROM Empresa ORDER BY nombre');

    return result;
}

async function ConsultaEmpresaPorId(id){
    let result = await db.query('SELECT * FROM Empresa WHERE id = $1', [id]);

    return result;
}

async function ValidaUsuario(usuario, clave){
    let result = await db.query('SELECT * FROM Usuario WHERE usuario = $1 AND clave = $2', [usuario, clave]);

    return result;
}

module.exports = {
    ConsultaEmpresas,
    ConsultaEmpresaPorId,
    ValidaUsuario
}