# App layer rules

La carpeta **`app/`** define el **enrutado de la aplicación**.  
Su responsabilidad es **únicamente**:  
- Declarar rutas (con o sin internacionalización).  
- Definir `layout.tsx` y `providers` de nivel global o de idioma.  
- Renderizar la **screen** correspondiente desde la carpeta **[screens](screens-rules.md)**.  

> ⚠️ No debe contener lógica de negocio ni componentes de UI complejos.

## Estructura con Internacionalización
```
app/
  [locale]/             // Agrupa rutas por idioma (ej. "es", "en").
    <folderName>/       // Carpeta/ruta (ej. "users" → "/es/users").
      page.tsx          // Renderiza la screen asociada a esta ruta.
    layout.tsx          // Provider de traducciones para el locale.
    page.tsx            // Página principal "/" para el idioma.
  layout.tsx            // Layout global con providers genéricos.
  globals.css           // Estilos globales de la aplicación.
```

## Estructura sin Internacionalización
```
app/
  <folderName>/         // Carpeta/ruta (ej. "users" → "/users").
    page.tsx            // Renderiza la screen asociada a esta ruta.
  page.tsx              // Página principal "/" de la aplicación.
  layout.tsx            // Layout global con providers genéricos.
  globals.css           // Estilos globales de la aplicación.
```

### Regla clave
 Mantener la filosofía **[SOLID](solid-rules.md)**  → `app/` solo orquesta rutas y layouts, y delega el renderizado en las **[screens](screens-rules.md)** correspondientes.