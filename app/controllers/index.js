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
            if(result.rows.length > 0) {
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
            console.log(result.rows.length);
            if(result.rows.length > 0) {
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
            if(result.rows.length > 0) {
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
            if(result.rows.length > 0) {
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

const getCapitulos = (request, response) => {
    const idEmpresa = parseInt(request.params.empresa)    

    if(idEmpresa <= 0) {
        return response.status(400).send({
            message: "Empresa no existe"
        });
    }

    data_access
        .ConsultaCapitulos(idEmpresa)        
        .then(result => {
            // console.log(result);
            if(result.rows.length > 0) {
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

const setPorcentajePorCapitulo = (request, response) => {
    const { empresa, capitulo, porcentajes } = request.body
    const idEmpresa = parseInt(empresa);
    const idCapitulo = parseInt(capitulo);
    const arrPorcentajes = porcentajes;        

    if(idEmpresa <= 0) {
        return response.status(400).send({
            message: "Empresa no existe"
        });
    }

    if(idCapitulo <= 0) {
        return response.status(400).send({
            message: "Capitulo no existe"
        });
    }

    if(arrPorcentajes == null || arrPorcentajes.length == 0) {
        return response.status(400).send({
            message: "Debe seleccionar al menos 1 porcentaje"
        });
    }

    data_access
        .InsertaPorcentajePorCapitulo(idEmpresa, idCapitulo, arrPorcentajes)
        .then(result => {
            // console.log(result);
            if(result) {
                response.status(200).json({
                    message: "Datos ingresados correctamente"
                });
            } else {
                response.status(404).send({
                    message: "Se produjo un error al insertar datos"
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

const getPorcentajePorCapitulo = (request, response) => {
    const idEmpresa = parseInt(request.params.empresa);
    const idCapitulo = parseInt(request.params.capitulo);

    if(idEmpresa <= 0) {
        return response.status(400).send({
            message: "Empresa no existe"
        });
    }

    if(idCapitulo <= 0) {
        return response.status(400).send({
            message: "Capitulo no existe"
        });
    }

    data_access
        .ConsultaPorcentajesPorCapitulo(idEmpresa, idCapitulo)        
        .then(result => {
            // console.log(result);
            if(result.rows.length > 0) {
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

const getModelos = (request, response) => {
    const idEmpresa = parseInt(request.params.empresa)    

    if(idEmpresa <= 0) {
        return response.status(400).send({
            message: "Empresa no existe"
        });
    }

    data_access
        .ConsultaModelos(idEmpresa)        
        .then(result => {
            // console.log(result);
            if(result.rows.length > 0) {
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

const setCapituloPorModelo = (request, response) => {
    const { empresa, modelo, capitulos } = request.body
    const idEmpresa = parseInt(empresa);
    const idModelo = parseInt(modelo);
    const arrCapitulo = capitulos;    

    if(idEmpresa <= 0) {
        return response.status(400).send({
            message: "Empresa no existe"
        });
    }

    if(idModelo <= 0) {
        return response.status(400).send({
            message: "Modelo no existe"
        });
    }

    if(arrCapitulo == null || arrCapitulo.length == 0) {
        return response.status(400).send({
            message: "Debe seleccionar al menos 1 capitulo"
        });
    }

    data_access
        .InsertaCapituloPorModelo(idEmpresa, idModelo, arrCapitulo)
        .then(result => {
            // console.log(result);
            if(result) {
                response.status(200).json({
                    message: "Datos ingresados correctamente"
                });
            } else {
                response.status(404).send({
                    message: "Se produjo un error al insertar datos"
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

const getCapituloPorModelo = (request, response) => {
    const idEmpresa = parseInt(request.params.empresa);
    const idModelo = parseInt(request.params.modelo);

    if(idEmpresa <= 0) {
        return response.status(400).send({
            message: "Empresa no existe"
        });
    }

    if(idModelo <= 0) {
        return response.status(400).send({
            message: "Modelo no existe"
        });
    }

    data_access
        .ConsultaCapituloPorModelo(idEmpresa, idModelo)        
        .then(result => {
            // console.log(result);
            if(result.rows.length > 0) {
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

const getEtapaConstructiva = (request, response) => {
    const idEmpresa = parseInt(request.params.empresa)    

    if(idEmpresa <= 0) {
        return response.status(400).send({
            message: "Empresa no existe"
        });
    }

    data_access
        .ConsultaEtapaConstructiva(idEmpresa)        
        .then(result => {
            // console.log(result);
            if(result.rows.length > 0) {
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

const setEtapaConstructivaPorCapitulo = (request, response) => {
    const { empresa, capitulo, etapasConstructivasPorPorcentajes } = request.body
    const idEmpresa = parseInt(empresa);    
    const idCapitulo = parseInt(capitulo);        
    const arrEtapasConstructivasPorPorcentajes = etapasConstructivasPorPorcentajes;

    if(idEmpresa <= 0) {
        return response.status(400).send({
            message: "Empresa no existe"
        });
    }    

    if(idCapitulo <= 0) {
        return response.status(400).send({
            message: "Capitulo no existe"
        });
    }
    
    if(arrEtapasConstructivasPorPorcentajes == null || arrEtapasConstructivasPorPorcentajes.length == 0) {
        return response.status(400).send({
            message: "Debe relacionar al menos 1 porcentaje con 1 etapa constructiva"
        });
    }

    arrEtapasConstructivasPorPorcentajes.forEach((element, index) => {        
        const idPorcentaje = parseInt(element.porcentaje);
        const idEtapaConstructiva = parseInt(element.etapaConstructiva);        
        
        if(idPorcentaje <= 0) {
            return response.status(400).send({
                message: "Porcentaje no existe"
            });
        }

        if(idEtapaConstructiva <= 0) {
            return response.status(400).send({
                message: "Etapa Constructiva no existe"
            });
        }
    });    

    data_access
        .InsertaEtapaConstructivaPorCapitulo(idEmpresa, idCapitulo, arrEtapasConstructivasPorPorcentajes)
        .then(result => {
            // console.log(result);
            if(result) {
                response.status(200).json({
                    message: "Datos ingresados correctamente"
                });
            } else {
                response.status(404).send({
                    message: "Se produjo un error al insertar datos"
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

const getEtapaConstructivaPorCapitulo = (request, response) => {
    const idEmpresa = parseInt(request.params.empresa);
    const idCapitulo = parseInt(request.params.capitulo);

    if(idEmpresa <= 0) {
        return response.status(400).send({
            message: "Empresa no existe"
        });
    }

    if(idCapitulo <= 0) {
        return response.status(400).send({
            message: "Capitulo no existe"
        });
    }

    data_access
        .ConsultaEtapaConstructivaPorCapitulo(idEmpresa, idCapitulo)        
        .then(result => {
            // console.log(result);
            if(result.rows.length > 0) {
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
    getCapitulos,
    setPorcentajePorCapitulo,    
    getPorcentajePorCapitulo,
    getModelos,
    setCapituloPorModelo,
    getCapituloPorModelo,
    getEtapaConstructiva,
    setEtapaConstructivaPorCapitulo,
    getEtapaConstructivaPorCapitulo,
}