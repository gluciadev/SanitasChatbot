# Screens Layer Rules

La carpeta **`screens/`** contiene todo el **visual de la aplicación**.  
Cada vista debe estar construida bajo principios **[SOLID](solid-rules.md)** y **[KISS](solid-rules.md)**, siendo modular y autónoma.  

> ⚠️ Las carpetas de primer nivel en `screens/` corresponden a las vistas que carga la carpeta **`app/`** en el enrutado.

---

## Estructura de una vista
```
screens/
  <ViewName>/                 // Nombre de la vista
    adapters/                 // Adaptan datos de API al formato de la vista (usar plural siempre)
    components/               // Subcomponentes que conforman la vista (usar inglés siempre)
      commons/                // Carpeta con componentes comunes para dos vistas u otros componentes
      <ViewComponent>/        // Cada subcomponente repite la misma estructura que la vista padre
      <ViewComponent>/        // Cada subcomponente repite la misma estructura que la vista padre
    context/                  // Contexto local para compartir estado profundo
    helpers/                  // Lógica sin estado reutilizable
    hooks/                    // Lógica con estado extraída de la UI
    locales/                  // Traducciones (ej. es.json, en.json)
    types.ts                  // Tipado asociado a la vista
    <ViewName>.doc.md         // Documentación funcional y técnica
    <ViewName>.module.css     // Estilos con CSS Modules
    test/
      <ViewName>Mock.ts       // Mocks asociados al testing
      <ViewName>.test.tsx     // Tests unitarios (solo del propio componente)
    <ViewName>.tsx            // Entrada principal de la vista
```
- **[Documentation Rules](documentation-rules.md)** , ejemplo de documentación minima en cada componente.
---

## Carpetas opcionales
- adapters/ → solo si hay que transformar datos de backend.  
- commons/ -> solo si hay componentes comunes para otros componentes.
- components/ → se omite en vistas de bajo nivel sin subcomponentes.  
- context/ → solo si es necesario compartir estado a más de 2 niveles.  
- helpers/ → si no hay lógica pura extraíble, no se crea.  
- hooks/ → si no hay estado complejo, no se crea.  
- locales/ → solo si hay internacionalización.  

---

## Reglas clave
- Cada componente debe seguir **[SOLID](solid-rules.md)**: una única responsabilidad.  
- La vista <ViewName>.tsx se encarga de renderizar sus subcomponentes o de la lógica asociada a esa vista.  
- El estado debe elevarse al padre común cuando varios hijos lo necesiten.  
- Si hay más de dos niveles, usar context; para algo más global, usar zustand en services/.  
- Componentes reutilizables deben moverse a commons/ en el nivel más bajo posible.  
- Mantener consistencia en nombres de carpetas (plural e inglés).  

---

## Ejemplo de vista Users
```
screens/
  Users/
    components/
      UsersHeader/
      UsersBody/
    locales/
    types.ts
    Users.doc.md
    Users.module.css
    test/
      UsersTestMock.ts
      Users.test.tsx
    Users.tsx
```

Aquí Users.tsx solo orquesta UsersHeader y UsersBody.  
Su principio SOLID → “responsable de renderizar la vista”.  
Cada subcomponente mantiene sus propias reglas internas.

---

## Ejemplo de promoción a commons/

Caso: un botón definido en UsersHeader también se necesita en UsersBody.

### Antes
```
screens/
  Users/
    components/
      UsersHeader/
        components/
          ButtonHeader/
      UsersBody/
```

### Después
```
screens/
  Users/
    components/
      commons/
        ButtonUsers/   // Antiguo ButtonHeader elevado a commons
      UsersHeader/
      UsersBody/
```

⚠️ En el ejemplo se omiten otras carpetas mínimas para simplificar la explicación.
