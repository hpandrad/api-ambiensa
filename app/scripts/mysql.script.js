CREATE SCHEMA 'fiscalizacion_db_2';

CREATE TABLE Empresa(
	id INT,
	nombre VARCHAR(10)
);

INSERT INTO Empresa(id,nombre) VALUES (1,'AMBIENSA');

CREATE TABLE Usuario (
    id INT,
    usuario VARCHAR(100),
    clave VARCHAR(200),
    nombre VARCHAR(200),
    rol VARCHAR(100)
);

INSERT INTO Usuario(id,usuario,clave,nombre,rol) VALUES(1,'handrade','prueba123','Hernán Andrade','Fiscalizador');