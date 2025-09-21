# GitHub Rules

Reglas y buenas prácticas para el flujo de trabajo en GitHub, integradas con Jira y los estándares del proyecto.

---

## 1) Creación de ramas
- Todas las ramas **siempre parten de `develop`**.  
- El nombre de la rama debe comenzar con el **TAG de Jira** correspondiente al ticket.  
  - Formato: `<JIRA-TAG>-<descripcionFeature>`  
  - Ejemplo: `EXAMPLE-251-add-users-screen`

---

## 2) Commits
- Realizar un **commit cada vez que exista algo funcional**.  
- Esto permite tener **puntos de control** y un historial claro de avances.  
- Evitar commits con mensajes vagos como `fix`, `update`, etc.  
- Utilizar los conventionals commits `feat: resume`
- Usar mensajes descriptivos en inglés o español, pero siempre claros.

Ejemplo:
```
git commit -m "feat: Add Users screen with header and list"
```

---

## 3) Pull Requests (PRs)
- Una vez finalizado el desarrollo, se abre una **PR hacia `develop`**.  
- El título de la PR debe tener el formato:  
  `[<JIRA-TAG>] <Description feature>`  
  Ejemplo: `[EXAMPLE-251] Add Users screen`
- La descripción de la PR debe incluir un **resumen claro** de lo realizado.

---

## 4) Checklist antes de abrir una PR
Antes de abrir la PR, el desarrollador debe asegurarse de que:  
- [ ] La documentación asociada (`.doc.md`) está actualizada.  
- [ ] Existen tests unitarios para el nuevo código con RTL.  
- [ ] Se han probado las funcionalidades manualmente.  
- [ ] El código sigue los principios **KISS** y **SOLID**.  
- [ ] Se cumplen los **standards definidos en el proyecto** (React, TypeScript, CSS, GrowthBook, etc.).  

---

## 5) Filosofía
El flujo de trabajo busca garantizar:  
- **Trazabilidad clara** entre Jira ↔️ GitHub.  
- **Historial de commits funcionales** para debug y control.  
- **PRs limpias y documentadas**, facilitando las revisiones.  
- Código consistente y mantenible gracias a KISS + SOLID.
