# SOLID rules

Este documento define cómo aplicar los principios **SOLID** en el proyecto, sirviendo como referencia única (biblia) para mantener la arquitectura consistente, modular y escalable.

---

## S — Single Responsibility Principle (Responsabilidad Única)
**Cada módulo, clase o componente debe tener una sola razón para cambiar.**

### Aplicación en el proyecto
- **Screens**: cada screen solo orquesta la vista; no maneja lógica de dominio ni de datos.
- **Components**: cada componente resuelve una sola función de UI (ej: `Button`, `UserCard`).
- **Services/domain**: cada cliente gestiona un recurso (`usersClient`, `ordersClient`).
- **Services/api**: cada hook expone un solo caso de uso (`useGetUserById`, `useListUsers`).

✅ Mantiene el código pequeño y testeable.  
❌ No mezclar renderizado con fetch de datos en el mismo componente.

---

## O — Open/Closed Principle (Abierto/Cerrado)
**El software debe estar abierto a extensión pero cerrado a modificación.**

### Aplicación en el proyecto
- **Components**: extender mediante composición, no modificando código interno.
- **Services**: nuevos endpoints deben agregarse como nuevos métodos en clientes, sin romper los existentes.
- **Hooks**: envolver lógica con nuevos hooks (ej: `useEnhancedUser`) en vez de alterar los ya probados.

✅ Permite agregar nuevas funcionalidades sin tocar código validado.  
❌ No editar un componente genérico para resolver un caso puntual.

---

## L — Liskov Substitution Principle (Sustitución de Liskov)
**Los objetos derivados deben poder sustituir a sus padres sin alterar el comportamiento esperado.**

### Aplicación en el proyecto
- **Props en Components**: un `PrimaryButton` debe comportarse como un `Button` normal sin romper la UI.
- **Tipos**: los DTO deben respetar la estructura esperada en el dominio; las adaptaciones ocurren en `adapters/`, nunca rompiendo contratos.
- **Hooks**: variantes de hooks (`useGetUser`, `useGetAdminUser`) deben devolver la misma forma (`data`, `isLoading`, `error`).

✅ Facilita reutilización de componentes y hooks.  
❌ No romper contratos ni cambiar la forma de retorno de funciones ya expuestas.

---

## I — Interface Segregation Principle (Segregación de Interfaces)
**Los clientes no deben depender de interfaces que no usan.**

### Aplicación en el proyecto
- **Components**: evitar props “bolsa” con demasiados parámetros; agrupar en objetos tipados si son relacionados.
- **Hooks**: exponer solo lo necesario (`data`, `error`, `isLoading`), no estados internos inútiles.
- **Services**: cada cliente debe enfocarse en su recurso, no en otros.

✅ Propiedades y contratos claros y específicos.  
❌ No crear super-hooks que expongan todo lo del servidor.

---

## D — Dependency Inversion Principle (Inversión de Dependencias)
**Los módulos de alto nivel no deben depender de los de bajo nivel, ambos deben depender de abstracciones.**

### Aplicación en el proyecto
- **Screens** dependen de **hooks de api** (`useGetUser`), no de clientes HTTP concretos.
- **Api/hooks** dependen de **domain/client**, no de Axios directamente.
- **Domain/client** depende de `axiosClient` (abstracción de HTTP), no de código repetido.
- **Growthbook/zustand** se inyectan vía providers/hooks, no se acoplan a componentes.

✅ Evita acoplamiento entre capas.  
❌ No hacer que una screen consuma directamente `axiosClient`.

---

## Resumen Visual

```
UI (screens, components)
   ↓ usa
Services/api (hooks con React Query)
   ↓ usa
Services/domain (clients + models)
   ↓ usa
Infra (axiosClient, clientFactory, growthbook, zustand)
```

---

## Checklist de revisión SOLID

- [ ] ¿Cada componente/hook/cliente tiene **una sola responsabilidad**? (S)  
- [ ] ¿Extiendes sin modificar código probado? (O)  
- [ ] ¿Subcomponentes/hooks respetan la forma y contratos originales? (L)  
- [ ] ¿Interfaces/props están enfocadas y no son “bolsa de todo”? (I)  
- [ ] ¿Screens nunca dependen directamente de Axios u otras implementaciones de bajo nivel? (D)  

---

## Conclusión

La filosofía **SOLID** guía todo el proyecto:  
- **Screens** renderizan y orquestan.  
- **Services** aíslan datos, estado global y feature flags.  
- **Components** son modulares, simples y reutilizables.  

> Aplicar SOLID garantiza que el proyecto se mantenga **legible, escalable y fácil de evolucionar**.
