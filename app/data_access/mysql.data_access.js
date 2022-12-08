const db = require('../connections/mysql.connection');

async function ConsultaEmpresas(){
    let result = await db.query('SELECT * FROM Empresa ORDER BY nombre');

    return result;
}

async function ConsultaEmpresaPorId(id){
    let result = await db.query(`SELECT * FROM Empresa WHERE id = ${id}`);

    return result;
}

async function ValidaUsuario(usuario, clave){
    let result = await db.query(`SELECT * FROM Usuario WHERE usuario = '${usuario}' AND clave = '${clave}'`);

    return result;
}

module.exports = {
    ConsultaEmpresas,
    ConsultaEmpresaPorId,
    ValidaUsuario
}