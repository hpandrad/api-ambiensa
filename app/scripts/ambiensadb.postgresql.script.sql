CREATE TABLE Empresa(
	id INTEGER,
	nombre VARCHAR(50),
	
	CONSTRAINT PK_Empresa PRIMARY KEY(id)
);

CREATE TABLE Rol(
	id INTEGER,
	descripcion VARCHAR(50),
	
	CONSTRAINT PK_Rol PRIMARY KEY(id)
);

CREATE TABLE Usuario(
	id_empresa INTEGER,
	id INTEGER,
	usuario VARCHAR(50),
	clave VARCHAR(50),
	nombre VARCHAR(200),
	id_rol INTEGER,
	
	CONSTRAINT PK_Usuario PRIMARY KEY(id),
	CONSTRAINT FK_Usuario_Empresa FOREIGN KEY(id_empresa) REFERENCES Empresa(id),
	CONSTRAINT FK_Usuario_Rol FOREIGN KEY(id_rol) REFERENCES Rol(id)
);

CREATE TABLE Porcentaje(
	id INTEGER,
	descripcion VARCHAR(5),
	porcentaje DECIMAL(4,2),
	
	CONSTRAINT PK_Porcentaje PRIMARY KEY(id)
);

INSERT INTO Empresa(id,nombre) VALUES(1,'Ambiensa S.A.');

INSERT INTO Rol(id,descripcion) VALUES(1,'Administrador');
INSERT INTO Rol(id,descripcion) VALUES(2,'Coordinador');
INSERT INTO Rol(id,descripcion) VALUES(3,'Auditor');
INSERT INTO Rol(id,descripcion) VALUES(4,'Jefe de Fiscalización');
INSERT INTO Rol(id,descripcion) VALUES(5,'Gerente');

INSERT INTO Usuario(id_empresa,id,usuario,clave,nombre,id_rol) VALUES(1,1,'handrade','prueba123','Hernán Andrade',1);

INSERT INTO Porcentaje(id,descripcion,porcentaje) VALUES(1,'0%',0.00);
INSERT INTO Porcentaje(id,descripcion,porcentaje) VALUES(2,'25%',0.25);
INSERT INTO Porcentaje(id,descripcion,porcentaje) VALUES(3,'50%',0.50);
INSERT INTO Porcentaje(id,descripcion,porcentaje) VALUES(4,'75%',0.75);
INSERT INTO Porcentaje(id,descripcion,porcentaje) VALUES(5,'100%',1.00);

select * from information_schema.columns where table_name = 'porcentaje'; 
