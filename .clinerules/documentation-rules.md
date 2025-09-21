# Component Documentation Template rules

Este es el template estándar para documentar **cualquier componente o screen** en el proyecto.  
Debe mantenerse consistente en todos los casos para que la información sea clara y fácilmente procesable por humanos e IA.
Siempre que se toque un componente si ya tiene documentación existente debe ser actualizada.

Metadatos que debe tener toda documentación:
```
---
title: <ComponentName>
last_update: YYYY-MM-DD
path: /<route>
---
```

# <ComponentName>

## Descripción funcional
Breve explicación de la funcionalidad que cubre este componente/screen. 
Ejemplo: *Renderiza la lista de usuarios con filtros y paginación.*

---

## Hooks utilizados
| Hook             | Propósito breve                              |
|------------------|-----------------------------------------------|
| `useXxx`         | Explica en una línea la responsabilidad.      |

> Incluir **solo los hooks relevantes** para la funcionalidad (custom o de services).

---

## Helpers utilizados
| Helper           | Propósito breve                              |
|------------------|-----------------------------------------------|
| `formatDate`     | Dar formato consistente a fechas en la vista. |

> Solo helpers propios o importados que afecten a la lógica principal.

---

## Flags utilizadas (si aplica)
- `<flag.name>` → Explicación de lo que habilita o deshabilita.

Ejemplo:  
- `users.newTable` → activa la nueva tabla en vez del listado clásico.

---

## Traducciones (si aplica)
| Key             | es              | en              |
|-----------------|-----------------|-----------------|
| `<key.path>`    | Texto en español| Texto en inglés |

> Incluir solo claves que afectan a este componente.

---

## Contexto (si aplica)
**Provider:** `<ProviderName>`  
**Valores expuestos:**
- `stateProp`: descripción breve.  
- `actionFn(param: type)`: explicación breve de la acción.  

---

## Tipado (si aplica)
Referencia a `types.ts` asociado con las interfaces principales:  
```ts
export interface <ComponentName>Props {
  // ...
}
```

---

## Testing
- **Archivo:** `<ComponentName>.test.tsx`  
- **Cobertura mínima:** renderizado, props críticas, estados de error/loading.  
- **Excluye:** tests de hijos (se testean en sus propios archivos).

---

## Estilos
- **Archivo:** `<ComponentName>.module.css`  
- Seguir convención de **CSS Modules** o **utilidades de Tailwind**.  
- Evitar estilos inline complejos.

---

## Ejemplo de uso
```tsx
import { <ComponentName> } from "@/screens/.../<ComponentName>";

<<ComponentName> prop1="..." prop2={...} />
```

---

## Notas adicionales (opcional)
- Reglas especiales, decisiones de diseño, limitaciones o TODOs relevantes.
