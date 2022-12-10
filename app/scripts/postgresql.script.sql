CREATE DATABASE fiscalizacion_db
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

CREATE TABLE Empresa (
    id INTEGER,	
    nombre VARCHAR (10)
);

INSERT INTO Empresa(id,nombre) VALUES (1,'AMBIENSA');

CREATE TABLE Usuario (
    id INTEGER,
    usuario VARCHAR(100),
    clave VARCHAR(200),
    nombre VARCHAR(200),
    rol VARCHAR(100)
);

INSERT INTO Usuario(id,usuario,clave,nombre,rol) VALUES(1,'handrade','prueba123','Hernán Andrade','Fiscalizador');