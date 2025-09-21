# Jira Rules

Reglas y buenas prácticas para el uso de **Jira** en el proyecto, asegurando trazabilidad y claridad entre las tareas y el código.

---

## 1) Flujo de estados de una tarea
- Todas las tareas deben moverse a **"Ongoing"** (o estado equivalente) en cuanto comiencen a desarrollarse.  
- Cuando la PR esté lista, la tarea debe pasar a un estado que indique **"Ready to Verify"** (lista para verificación).  
- La tarea solo se pasará a cerrada por parte del equipo de desarollo tras revisar la PR

---

## 2) Comentarios obligatorios al finalizar
- Al completar una tarea, se debe añadir un **comentario** con un resumen de lo realizado.  
- El comentario debe ser claro y comprensible para negocio y para el equipo técnico.  
- Debe incluir referencias a la PR asociada.

Ejemplo:
```
### Work done
- Implemented Users screen with header and list
- Integrated GrowthBook flag `users.newTable`
- Added unit tests with RTL
- Updated documentation `Users.doc.md`

PR: https://github.com/org/project/pull/123
```

---

## 3) Estructura de cada tarea en Jira
Cada tarea debe incluir desde el inicio:

### Contexto general
Descripción clara del **porqué** de la tarea, qué necesidad de negocio cubre.

### Objetivo funcional
Qué resultado se espera al completar la tarea, en términos de usuario/funcionalidad.

### Detalles técnicos
Notas específicas aportadas por el equipo técnico:  
- Arquitectura impactada (screens, services, adapters, etc.).  
- Consideraciones de flags, estados o dependencias.  
- Criterios de aceptación técnicos.

---

## 4) Filosofía
El uso de Jira busca garantizar:
- **Trazabilidad** completa entre tarea ↔️ PR ↔️ release.  
- **Comunicación clara** para negocio y equipo técnico.  
- **Definiciones consistentes** de contexto, objetivos y detalles.  
- **Control de calidad** asegurando que cada tarea tiene verificación antes de cerrarse.
