const data_access = require('../data_access/index');

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
            // console.log(result);
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

const getRoles = (request, response) => {
    const idEmpresa = parseInt(request.params.empresa)    

    if(idEmpresa <= 0) {
        return response.status(400).send({
            message: "Empresa no existe"
        });
    }

    data_access
        .ConsultaRoles(idEmpresa)        
        .then(result => {
            // console.log(result);
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

const getRolPorId = (request, response) => {
    const idEmpresa = parseInt(request.params.empresa)
    const idRol = parseInt(request.params.rol)

    if(idEmpresa <= 0) {
        return response.status(400).send({
            message: "Empresa no existe"
        });
    }

    if(idRol <= 0) {
        return response.status(400).send({
            message: "Rol no existe"
        });
    }

    data_access
        .ConsultaRol(idEmpresa, idRol)        
        .then(result => {
            // console.log(result);
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

const getPorcentajes = (request, response) => {
    const idEmpresa = parseInt(request.params.empresa)    

    if(idEmpresa <= 0) {
        return response.status(400).send({
            message: "Empresa no existe"
        });
    }

    data_access
        .ConsultaPorcentajes(idEmpresa)        
        .then(result => {
            // console.log(result);
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
    setIniciarSesion,
    getRoles,
    getRolPorId,
    getPorcentajes,
}