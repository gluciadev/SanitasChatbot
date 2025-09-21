# CSS Rules

Todo el proyecto utiliza **CSS Modules** para el estilado de componentes.  
Cada componente dentro de `screens/` debe tener asociado su propio `.module.css` solo si necesita estilos.

Ejemplo de estructura:

```
screens/
  Users/
    Users.tsx
    Users.module.css
```

> ⚠️ **No deben crearse ficheros vacíos**.  
> Si un componente no necesita estilos personalizados, no se genera `.module.css`.

---

## 1) Nombrado e importación
- Todos los imports deben llamarse **`Styles`** para estandarizar.
- Las clases dentro del `.module.css` deben estar en **camelCase**.
- Los nombres deben ser **claros, autoexplicativos y basados en el rol/propósito**, no en apariencia visual.

Ejemplo:

```tsx
import React from "react";
import Styles from "./Users.module.css";

export const Users = () => {
  return (
    <div className={Styles.mainContainer}>
      Example usage of styles with CSS Modules
    </div>
  );
};
```

---

## 2) Convenciones de estilo
- Prefiere nombres basados en **componente + rol** (`userCardHeader`, `buttonPrimary`) en lugar de genéricos (`container1`, `redBox`).
- Usa **camelCase** para todas las clases.
- Evita abreviaturas poco claras (`usr`, `btnCnt`).
- Prefiere **layout claro y semántico** en los nombres (ej. `listWrapper`, `formActions`).

---

## 3) Principios KISS y SOLID aplicados
- **KISS**: las clases deben resolver un único propósito, no ser “comodines” con muchas responsabilidades.
- **SOLID**: cada componente tiene sus propios estilos encapsulados; no modificar estilos de otros componentes desde fuera.
- No crear dependencias cruzadas entre módulos de CSS.

---

## 4) Buenas prácticas
- Mantén las clases **pequeñas y reutilizables dentro del mismo componente**.
- Usa **variables globales** o tokens de diseño en `globals.css` para colores, tipografías y spacing.
- Usa selectores anidados solo cuando sea **imprescindible**.
- Prefiere **utilidades de layout** (Flexbox/Grid) en lugar de hacks de posición.
- Elimina clases no usadas para evitar deuda técnica.

---

## 5) Checklist rápido (KISS aplicado)
- [ ] ¿El archivo `.module.css` es necesario o está vacío?  
- [ ] ¿Los nombres de las clases son claros, camelCase y descriptivos?  
- [ ] ¿Cada clase cumple un solo propósito?  
- [ ] ¿Se evita duplicación de estilos que deberían estar en `globals.css`?  
- [ ] ¿No hay reglas innecesarias o sin uso?  
- [ ] ¿Se ha priorizado el uso de Flexbox sobre hacks de posición?  

---

## 6) Anti-patrones a evitar
- ❌ **`!important`** bajo cualquier circunstancia.  
- ❌ Nombres vagos (`container`, `box`, `style1`).  
- ❌ Clases demasiado genéricas que mezclan múltiples responsabilidades.  
- ❌ Selectores profundos innecesarios (`.wrapper .inner .content p span`).  
- ❌ Duplicar variables (usar `globals.css` para tokens compartidos).  

---

## 7) Ejemplo correcto

```css
/* Users.module.css */
.mainContainer {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.userCard {
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: var(--color-surface);
}

.userCardHeader {
  font-size: 1.25rem;
  font-weight: bold;
}
```

```tsx
// Users.tsx
import Styles from "./Users.module.css";

export const Users = () => (
  <div className={Styles.mainContainer}>
    <div className={Styles.userCard}>
      <h2 className={Styles.userCardHeader}>John Doe</h2>
    </div>
  </div>
);
```
