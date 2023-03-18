DROP TABLE Configuracion_PeriodoFiscalizacion;
DROP TABLE Configuracion_Parametro;
DROP TABLE Configuracion_NivelCargaAleatoria;
DROP TABLE Configuracion_EstadoRevision;
DROP TABLE Configuracion_EtapaConstructivaPorCapitulo;
DROP TABLE Configuracion_CapituloPorModelo;
DROP TABLE Configuracion_PorcentajePorCapitulo;
DROP TABLE Registro_Avances;

CREATE TABLE Porcentaje(
	id_empresa INTEGER,
	id INTEGER,
	descripcion VARCHAR(5),
	porcentaje DECIMAL(4,2),
	
	CONSTRAINT PK_Porcentaje PRIMARY KEY(id)
);

CREATE TABLE Configuracion_PorcentajePorCapitulo(
	id_empresa INTEGER,	
	id_capitulo INTEGER,
	id_porcentaje INTEGER,
	
	CONSTRAINT PK_Configuracion_PorcentajePorCapitulo PRIMARY KEY(id_capitulo,id_porcentaje)
);

CREATE TABLE Configuracion_CapituloPorModelo(
	id_empresa INTEGER,	
	id_modelo INTEGER,
	id_capitulo INTEGER,
	
	CONSTRAINT PK_Configuracion_CapituloPorModelo PRIMARY KEY(id_modelo,id_capitulo)
);

CREATE TABLE Configuracion_EtapaConstructivaPorCapitulo(
	id_empresa INTEGER,	
	id_capitulo INTEGER,
	id_porcentaje INTEGER,
	id_etapaConstructiva INTEGER,
	
	CONSTRAINT PK_Configuracion_ConfiguracionEtapaConstructivaPorCapitulo PRIMARY KEY(id_capitulo,id_porcentaje,id_etapaConstructiva)
);

CREATE TABLE Configuracion_EstadoRevision(
	id_empresa INTEGER,	
	id SERIAL,
	descripcion VARCHAR(100),	
	
	CONSTRAINT PK_Configuracion_EstadoRevision PRIMARY KEY(id)
);

--GRANT USAGE, SELECT ON SEQUENCE configuracion_estadorevision_id_seq TO devsswma_fiscalizacion;

CREATE TABLE Configuracion_NivelCargaAleatoria(
	id_empresa INTEGER,	
	id_rol INTEGER,
	porcentaje DECIMAL(4,2),
	id_estadoRevision INTEGER,
	
	CONSTRAINT PK_Configuracion_NivelCargaAleatoria PRIMARY KEY(id_rol)
);

CREATE TABLE Configuracion_Parametro(
	id_empresa INTEGER,	
	cargaImagenes INTEGER
);

CREATE TABLE Configuracion_PeriodoFiscalizacion(
	id_empresa INTEGER,	
	id_proyecto INTEGER,
	id_etapaProyecto INTEGER,
	periodo INTEGER,	
	
	CONSTRAINT PK_Configuracion_PeriodoFiscalizacion PRIMARY KEY(id_proyecto,id_etapaProyecto)
);

CREATE TABLE Registro_Avances(
	id_empresa INTEGER,	
	id SERIAL,
	id_usuario INTEGER,
	fecha_registro TIMESTAMP,
	id_proyecto INTEGER,
	id_urbanizacion INTEGER,
	manzana INTEGER,
	solar INTEGER,
	id_modelo INTEGER,
	id_capitulo INTEGER,
	porcentaje DECIMAL(4,2),
	
	CONSTRAINT PK_Registro_Avances PRIMARY KEY(id)
);

INSERT INTO Configuracion_EstadoRevision(id_empresa,id,descripcion) VALUES(1,1,'REVISADO');
INSERT INTO Configuracion_EstadoRevision(id_empresa,id,descripcion) VALUES(1,2,'EVALUADO');
INSERT INTO Configuracion_EstadoRevision(id_empresa,id,descripcion) VALUES(1,3,'AUDITADO');
INSERT INTO Configuracion_EstadoRevision(id_empresa,id,descripcion) VALUES(1,4,'APROBADO');

INSERT INTO Porcentaje(id_empresa,id,descripcion,porcentaje) VALUES(1,1,'0%',0.00);
INSERT INTO Porcentaje(id_empresa,id,descripcion,porcentaje) VALUES(1,2,'25%',0.25);
INSERT INTO Porcentaje(id_empresa,id,descripcion,porcentaje) VALUES(1,3,'50%',0.50);
INSERT INTO Porcentaje(id_empresa,id,descripcion,porcentaje) VALUES(1,4,'75%',0.75);
INSERT INTO Porcentaje(id_empresa,id,descripcion,porcentaje) VALUES(1,5,'100%',1.00);

