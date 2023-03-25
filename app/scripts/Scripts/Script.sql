SELECT id_etapa_constructiva "id", descripcion  
FROM etapa_constructivas
WHERE id_empresa = 1
ORDER BY descripcion
;

SELECT id_modelo "id", descripcion 
FROM modelos_proyecto 
WHERE id_empresa = 1 
GROUP BY id_modelo, descripcion 
ORDER BY descripcion
;

SELECT id_proyecto "id", descripcion, nemonico  --id, descripcion
FROM proyectos
WHERE id_empresa = 1
ORDER BY descripcion
;

SELECT *
FROM fases_proyectos
ORDER BY descripcion
;

SELECT * 
FROM urbanizaciones 
;

SELECT *
FROM orden_trabajos ot
;

SELECT *
FROM detalle_orden_trabajos dot
;

SELECT *
FROM capitulos c 
order by descripcion 
;

/*
SELECT ot.id,ot.codigo,p.id as idProyecto,p.descripcion as proyecto,u.id as idUrbanizacion,
		u.descripcion as urbanizacion,ep.descripcion as etapa,ot.fechaEmision as fechaEmision,
		ot.tiempoEjecucion || \' \' || ot.periodoEvaluacion as tiempoEjecucion,dot.id as id_detalle,
		dot.manzana,dot.solar,dot.id_modelo,dot.modelo,dot.descripcion,dot.fechaEspecificacionTecnica,dot.tipoOrdenTrabajo
*/ 
SELECT ot.id_orden_trabajo "id",ot.codigo,p.id_proyecto "idProyecto",p.descripcion "proyecto",u.id_urbanizacion "idUrbanizacion", 
		u.descripcion_etapa "urbanizacion",ep.descripcion "etapa",ot.fecha_emision "fechaEmision", 
		TRIM(ot.tiempo_ejecucion || ' ' || COALESCE(ot.periodo_ejecucion,'')) "tiempoEjecucion",dot.id_detalle_orden_trabajo "id_detalle", 
		dot.id_manzana "manzana",dot.id_solar "solar",dot.id_modelo "id_modelo",dot.descripcion_modelo "descripcion",
		COALESCE(dot.fecha_especifica_tecnica,NOW()) "fechaEspecificacionTecnica",ep.descripcion "tipoOrdenTrabajo",u2.usuario 
FROM orden_trabajos ot 
INNER JOIN proyectos p ON ot.id_proyecto = p.id_proyecto 
INNER JOIN urbanizaciones u ON ot.id_urbanizacion = u.id_urbanizacion 
INNER JOIN fases_proyectos ep ON ot.id_proyecto = ep.id_proyecto AND ot.id_fase_proyecto = ep.id_fase_proyecto
INNER JOIN detalle_orden_trabajos dot ON ot.id_orden_trabajo = dot.id_orden_trabajo 
INNER JOIN usuarios u2 ON ot.id_usuario = u2.id_usuario 
ORDER BY ot.fecha_emision ,dot.id_detalle_orden_trabajo 
;


SELECT id_empresa FROM usuario_empresas WHERE id_usuario = 921 GROUP BY id_empresa;
select * from roles r;

SELECT e.id_empresa, e.nombre 
FROM usuario_empresas ue
INNER JOIN empresas e ON ue.id_empresa = e.id_empresa 
WHERE id_usuario = 879 
GROUP BY e.id_empresa, e.nombre;


SELECT 99 "id", 'Desconocido' "descripcion"
UNION ALL 
SELECT id_etapa_constructiva "id", descripcion
FROM etapa_constructivas
WHERE id_empresa = 1
; 

