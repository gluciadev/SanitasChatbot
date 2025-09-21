# React Testing Library (RTL) — Standards para Cline

Guía de **buenas prácticas** para pruebas unitarias con **React Testing Library (RTL) + Jest** en el proyecto.  
Enfocada en **componentes aislados**, **semántica de consultas**, y nuestros **puntos custom**.

> Objetivo: tests **claros, estables y útiles** que verifiquen el **comportamiento público** del componente, no sus detalles internos.

---

## 0) Puntos custom obligatorios ✅
- **Prohibido `any`** en tests, mocks y utilidades. Tipado estricto siempre.
- Los **mocks** necesarios se ubican **al mismo nivel** que el test con el nombre:  
  `**<ComponentName>.mocks.ts**` (o `.mocks.tsx` si devuelve JSX).
- **Ámbito unitario:** el test se centra **solo en el componente** bajo prueba.  
  - Si el componente **solo renderiza** hijos, el test **solo** debe probar **su renderizado**, **no** el de los hijos.  
  - Los hijos se **mockean** o se reemplazan por *stubs* simples.

---

## 1) Estructura y nombrado

```
screens/
  Users/
    components/
      UserCard/
        UserCard.tsx
        UserCard.module.css
        test/
          UserCard.test.tsx
          UserCard.mocks.ts        # mocks locales del componente
        types.ts
```

- Archivos de prueba: `**<ComponentName>.test.tsx**` (o `.test.ts` si no hay JSX).
- Mantén los tests **cerca** del componente para favorecer el mantenimiento.

---

## 2) Principios de prueba con RTL

1. **Arreglo → Acción → Afirmación (AAA)** claro por test.
2. **Queries por rol y accesibilidad** primero (`getByRole`, `getByLabelText`, `getByText`...), evitando `testId` salvo necesidad.
3. **No pruebes implementación interna** (estado, efectos, clases). Prueba **comportamiento observable**.
4. **Sin snapshots frágiles**. Prefiere aserciones específicas y semánticas.
5. **User interactions** con `@testing-library/user-event`, no con `fireEvent` salvo casos puntuales.
6. **No mocks globales innecesarios**. Mockea solo lo que el componente consume (hijos/servicios).

---

## 3) Mocks locales

- Todo mock **local** al componente en `**<ComponentName>.mocks.ts**`.
- Incluye **factories tipadas** para props y datos (usa `as const` cuando aplique).
- Mockea **hijos** si el componente solo los orquesta: sustituye por *stubs* simples y accesibles.

**Ejemplo de mocks (`UserCard.mocks.ts`)**

```ts
import type { UserCardProps } from "./types";

export const aUser = (overrides: Partial<UserCardProps> = {}): UserCardProps => ({
  id: "u-1",
  name: "Ada Lovelace",
  email: "ada@example.com",
  onSelect: () => {},
  ...overrides,
});
```

---

## 4) Ejemplos de tests

### 4.1 Componente que **solo renderiza** (no probar hijos)

```tsx
// UserContainer.tsx
export function UserContainer({ children }: { children: React.ReactNode }) {
  return <section aria-label="Users section">{children}</section>;
}
```

```tsx
// UserContainer.test.tsx
import { render, screen } from "@testing-library/react";
import { UserContainer } from "./UserContainer";

describe("<UserContainer />", () => {
  it("renderiza su contenedor accesible", () => {
    render(<UserContainer>Contenido</UserContainer>);
    // Solo verificamos SU contrato público (wrapper accesible)
    expect(screen.getByLabelText("Users section")).toBeInTheDocument();
  });
});
```

### 4.2 Componente con **interacción** mínima

```tsx
// UserCard.tsx
type Props = { id: string; name: string; email: string; onSelect: (id: string) => void };
export function UserCard({ id, name, email, onSelect }: Props) {
  return (
    <article>
      <h3>{name}</h3>
      <a href={`mailto:${email}`}>{email}</a>
      <button onClick={() => onSelect(id)}>Seleccionar</button>
    </article>
  );
}
```

```tsx
// UserCard.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserCard } from "./UserCard";
import { aUser } from "./UserCard.mocks";

describe("<UserCard />", () => {
  it("muestra nombre y email y dispara onSelect", async () => {
    const user = aUser();
    const onSelect = jest.fn();
    render(<UserCard {...user} onSelect={onSelect} />);

    expect(screen.getByRole("heading", { name: user.name })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: user.email })).toHaveAttribute("href", `mailto:${user.email}`);

    await userEvent.click(screen.getByRole("button", { name: /seleccionar/i }));
    expect(onSelect).toHaveBeenCalledWith(user.id);
  });
});
```

### 4.3 Mock de **hijo** para mantener el test unitario

```tsx
// Parent.tsx
import { Child } from "./Child";
export function Parent() {
  return (
    <div>
      <Child />
    </div>
  );
}
```

```tsx
// Parent.test.tsx
import { render, screen } from "@testing-library/react";

jest.mock("./Child", () => ({
  Child: () => <div role="note">Stub Child</div>,
}));

describe("<Parent />", () => {
  it("renderiza su estructura sin testear Child", () => {
    render(<Parent />);
    expect(screen.getByRole("note", { name: /stub child/i })).toBeInTheDocument();
  });
});
```

---

## 5) Qué **sí** cubrir en unit tests
- Renderizado básico (cuando ese es el contrato del componente).
- Props críticas (títulos, estados visibles, accesibilidad).
- Interacciones de usuario (click, type, select) y efectos observables.
- Estados **loading / empty / error** si el componente los gestiona **él**.
- Emisión de **callbacks** con los valores esperados.

## 6) Qué **no** cubrir
- Comportamiento de **hijos** (cada hijo tiene su propio test).
- Implementación interna (setState, clases CSS, detalles de librerías).
- Snapshots grandes que rompen con cualquier cambio menor.

---

## 7) Tipado y utilidades
- **Sin `any`**. Usa tipos concretos o `unknown` + *type narrowing* si procede.
- Factories de props/datos **tipadas** en `*.mocks.ts` (y reusables).
- Reutiliza `render` con **providers** comunes solo si el componente lo necesita; si hace falta, crea un `test-utils.tsx` con un `renderWithProviders`.

---

## 8) Checklist para PRs (copiar/pegar)

- [ ] Sin `any` en tests ni mocks  
- [ ] Mocks en `<ComponentName>.mocks.ts` al lado del test  
- [ ] Test **unitario** (no prueba hijos)  
- [ ] Consultas RTL semánticas (`getByRole`, `getByLabelText`, etc.)  
- [ ] Interacciones con `user-event`  
- [ ] Aserciones específicas (no snapshots frágiles)  
- [ ] Estados relevantes cubiertos (si aplica)
- [ ] Cubre el 100% en todo (si se complica el minimo es 90% ) 

---

## 9) Extras recomendados (opcional)
- **Accesibilidad**: `jest-axe` para validar reglas a11y básicas.  
- **MSW** para mock de red cuando pruebes hooks/servicios (tests fuera de UI pura).

---

**Resultado esperado:** tests rápidos, confiables y centrados en el **contrato público** del componente, fáciles de mantener y de leer.
