const data_access = require('../data_access/postgresql.data_access');

const getEmpresas = (request, response) => {
    data_access
        .ConsultaEmpresas()
        .then(result => {
            console.log(result);
            if(result.rowCount > 0) {
                response.status(200).json(result.rows);
            } else {
                response.status(404).send({
                    message: "Datos no encontrados"
                });
            }
        })
        .catch(err => {
            console.log(err);
            return response.status(500).send({
                message: "INTERNAL SERVER ERROR"
            });
        });
}

const getEmpresaPorId = (request, response) => {
    const id = parseInt(request.params.id)    

    if(id <= 0) {
        return response.status(400).send({
            message: "Empresa no existe"
        });
    }

    data_access
        .ConsultaEmpresaPorId(id)        
        .then(result => {
            console.log(result);
            if(result.rowCount > 0) {
                response.status(200).json(result.rows);
            } else {
                response.status(404).send({
                    message: "Datos no encontrados"
                });
            }
        })
        .catch(err => {
            console.log(err);
            return response.status(500).send({
                message: "INTERNAL SERVER ERROR"
            });
        });
}

const setIniciarSesion = (request, response) => {
    const { user, pass } = request.body

    if(!user || user.trim() == '') {
        return response.status(400).send({
            message: "Ingrese usuario"
        });
    }

    if(!pass || pass.trim() == '') {
        return response.status(400).send({
            message: "Ingrese clave"
        });
    }

    data_access
        .ValidaUsuario(user, pass)        
        .then(result => {
            console.log(result);
            if(result.rowCount > 0) {
                response.status(200).json(result.rows);
            } else {
                response.status(404).send({
                    message: "Datos no encontrados"
                });
            }
        })
        .catch(err => {
            console.log(err);
            return response.status(500).send({
                message: "INTERNAL SERVER ERROR"
            });
        });
}

module.exports = {
    getEmpresas,
    getEmpresaPorId,
    setIniciarSesion,
}