const db = require('../connections/mysql.connection');

consultaEmpresas = () =>{
    return new Promise((resolve, reject)=>{
        db.query('SELECT * FROM Empresa ORDER BY nombre ',  (error, rows)=>{
            if(error){
                return reject(error);
            }
            return resolve(rows);
        });
    });
};

consultaEmpresaPorId = (id) =>{
    return new Promise((resolve, reject)=>{
        db.query(`SELECT * FROM Empresa WHERE id = ${id}`,  (error, rows)=>{
            if(error){
                return reject(error);
            }
            return resolve(rows);
        });
    });
};

async function ConsultaEmpresas(){
    let result = await consultaEmpresas();

    return result;
}

async function ConsultaEmpresaPorId(id){
    let result = await consultaEmpresaPorId(id);

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