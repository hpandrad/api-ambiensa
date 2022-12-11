DROP TABLE EtapaProyecto;
DROP TABLE Proyecto;
DROP TABLE EtapaConstructiva;
DROP TABLE Modelo;
DROP TABLE Capitulo;
DROP TABLE Porcentaje;
DROP TABLE Usuario;
DROP TABLE Rol;
DROP TABLE Empresa;

CREATE TABLE Empresa(
	id INTEGER,
	nombre VARCHAR(50),
	
	CONSTRAINT PK_Empresa PRIMARY KEY(id)
);

CREATE TABLE Rol(
	id_empresa INTEGER,	
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
	CONSTRAINT FK_Usuario_Rol FOREIGN KEY(id_rol) REFERENCES Rol(id)
);

CREATE TABLE Porcentaje(
	id_empresa INTEGER,
	id INTEGER,
	descripcion VARCHAR(5),
	porcentaje DECIMAL(4,2),
	
	CONSTRAINT PK_Porcentaje PRIMARY KEY(id)
);

CREATE TABLE Capitulo(
	id_empresa INTEGER,
	id INTEGER,
	descripcion VARCHAR(100),
	orden INTEGER,
	
	CONSTRAINT PK_Capitulo PRIMARY KEY(id)
);

CREATE TABLE Modelo(
	id_empresa INTEGER,
	id INTEGER,
	descripcion VARCHAR(100),	
	
	CONSTRAINT PK_Modelo PRIMARY KEY(id)
);

CREATE TABLE EtapaConstructiva(
	id_empresa INTEGER,
	id INTEGER,
	descripcion VARCHAR(100),	
	
	CONSTRAINT PK_EtapaConstructiva PRIMARY KEY(id)
);

CREATE TABLE Proyecto(
	id_empresa INTEGER,
	id INTEGER,
	descripcion VARCHAR(100),	
	
	CONSTRAINT PK_Proyecto PRIMARY KEY(id)
);

CREATE TABLE EtapaProyecto(
	id_empresa INTEGER,
	id_proyecto INTEGER,
	id INTEGER,
	descripcion VARCHAR(100),	
	
	CONSTRAINT PK_EtapaProyecto PRIMARY KEY(id),
	CONSTRAINT FK_EtapaProyecto_Proyecto FOREIGN KEY(id_proyecto) REFERENCES Proyecto(id)
);

INSERT INTO Empresa(id,nombre) VALUES(1,'Ambiensa S.A.');

INSERT INTO Rol(id_empresa,id,descripcion) VALUES(1,1,'Administrador');
INSERT INTO Rol(id_empresa,id,descripcion) VALUES(1,2,'Coordinador');
INSERT INTO Rol(id_empresa,id,descripcion) VALUES(1,3,'Auditor');
INSERT INTO Rol(id_empresa,id,descripcion) VALUES(1,4,'Jefe de Fiscalización');
INSERT INTO Rol(id_empresa,id,descripcion) VALUES(1,5,'Gerente');

INSERT INTO Usuario(id_empresa,id,usuario,clave,nombre,id_rol) VALUES(1,1,'handrade','prueba123','Hernán Andrade',1);

INSERT INTO Porcentaje(id_empresa,id,descripcion,porcentaje) VALUES(1,1,'0%',0.00);
INSERT INTO Porcentaje(id_empresa,id,descripcion,porcentaje) VALUES(1,2,'25%',0.25);
INSERT INTO Porcentaje(id_empresa,id,descripcion,porcentaje) VALUES(1,3,'50%',0.50);
INSERT INTO Porcentaje(id_empresa,id,descripcion,porcentaje) VALUES(1,4,'75%',0.75);
INSERT INTO Porcentaje(id_empresa,id,descripcion,porcentaje) VALUES(1,5,'100%',1.00);

INSERT INTO Capitulo(id_empresa,id,descripcion,orden) VALUES(1,1,'CIMENTACION',1);
INSERT INTO Capitulo(id_empresa,id,descripcion,orden) VALUES(1,2,'MUROS DE PLANTA BAJA Y LOSA',2);
INSERT INTO Capitulo(id_empresa,id,descripcion,orden) VALUES(1,3,'MUROS DE PLANTA ALTA',3);
INSERT INTO Capitulo(id_empresa,id,descripcion,orden) VALUES(1,4,'ENCOFRADO FORSA',4);
INSERT INTO Capitulo(id_empresa,id,descripcion,orden) VALUES(1,5,'PAREDES Y ENLUCIDO',5);
INSERT INTO Capitulo(id_empresa,id,descripcion,orden) VALUES(1,6,'MESONES',6);
INSERT INTO Capitulo(id_empresa,id,descripcion,orden) VALUES(1,7,'RECUBRIMIENTO DE PISO Y PAREDES',7);
INSERT INTO Capitulo(id_empresa,id,descripcion,orden) VALUES(1,8,'CUBIERTA',8);
INSERT INTO Capitulo(id_empresa,id,descripcion,orden) VALUES(1,9,'PINTURA',9);
INSERT INTO Capitulo(id_empresa,id,descripcion,orden) VALUES(1,10,'INSTALACIONES ELECTRICAS',10);
INSERT INTO Capitulo(id_empresa,id,descripcion,orden) VALUES(1,11,'INSTALACIONES SANITARIAS',11);
INSERT INTO Capitulo(id_empresa,id,descripcion,orden) VALUES(1,12,'PIEZAS SANITARIAS',12);
INSERT INTO Capitulo(id_empresa,id,descripcion,orden) VALUES(1,13,'CARPINTERIA DE MADERA - CERRAJERIA - ALUMINIO Y VIDRIO',13);
INSERT INTO Capitulo(id_empresa,id,descripcion,orden) VALUES(1,14,'PISO DE INGRESO',14);
INSERT INTO Capitulo(id_empresa,id,descripcion,orden) VALUES(1,15,'VARIOS',15);

INSERT INTO Modelo(id_empresa,id,descripcion) VALUES(1,1,'KIARA');

INSERT INTO EtapaConstructiva(id_empresa,id,descripcion) VALUES(1,1,'NADA');
INSERT INTO EtapaConstructiva(id_empresa,id,descripcion) VALUES(1,2,'FINALIZADO');

INSERT INTO Proyecto(id_empresa,id,descripcion) VALUES(1,1,'PROYECTO A');

INSERT INTO EtapaProyecto(id_empresa,id_proyecto,id,descripcion) VALUES(1,1,1,'ETAPA 1');
INSERT INTO EtapaProyecto(id_empresa,id_proyecto,id,descripcion) VALUES(1,1,2,'ETAPA 2');
INSERT INTO EtapaProyecto(id_empresa,id_proyecto,id,descripcion) VALUES(1,1,3,'ETAPA 3');



select * from information_schema.columns where table_name = 'Capitulo'; 
