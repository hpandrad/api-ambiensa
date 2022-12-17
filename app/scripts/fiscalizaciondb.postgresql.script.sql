DROP TABLE Configuracion_PeriodoFiscalizacion;
DROP TABLE Configuracion_Parametro;
DROP TABLE Configuracion_NivelCargaAleatoria;
DROP TABLE Configuracion_EstadoRevision;
DROP TABLE Configuracion_EtapaConstructivaPorCapitulo;
DROP TABLE Configuracion_CapituloPorModelo;
DROP TABLE Configuracion_PorcentajePorCapitulo;

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
	id INTEGER SERIAL,
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

INSERT INTO Configuracion_EstadoRevision(id_empresa,id,descripcion) VALUES(1,1,'REVISADO');
INSERT INTO Configuracion_EstadoRevision(id_empresa,id,descripcion) VALUES(1,2,'EVALUADO');
INSERT INTO Configuracion_EstadoRevision(id_empresa,id,descripcion) VALUES(1,3,'AUDITADO');
INSERT INTO Configuracion_EstadoRevision(id_empresa,id,descripcion) VALUES(1,4,'APROBADO');

