# TypeScript Rules

Todo el proyecto utiliza **TypeScript** con tipado estricto para garantizar consistencia, autocompletado y seguridad en el código.  
El tipado debe ser claro, expresivo y siempre alineado con los principios **KISS** y **SOLID**.

---

## 1) Principios generales
- **Tipado estricto** obligatorio (`strict` activado en `tsconfig.json`).
- Evitar `any` en todo el código (usar `unknown` si es necesario).
- Prefiere **tipos explícitos** para props, retornos y estados.
- Los nombres deben ser descriptivos, nunca genéricos (`data`, `info` → ❌).
- los tipados deben ir en el fichero asociado al componente **types.ts**

---

## 2) Tipado en componentes
- Definir props con `interface` o `type`, no con inline types dentro del componente.
- Exportar siempre las props si el componente puede reutilizarse.
- Props opcionales con `?`, valores por defecto en destructuring.

Ejemplo:

```ts 
//types.ts
export type UserCardProps = {
  name: string;
  email?: string;
  onSelect: (id: string) => void;
};

```

```tsx
import { UserCardProps } from './types.ts'

export const UserCard = ({ name, email = "—", onSelect }: UserCardProps) => {
  return (
    <article>
      <h3>{name}</h3>
      <p>{email}</p>
      <button onClick={() => onSelect(name)}>Seleccionar</button>
    </article>
  );
}
```

---

## 3) Tipos en hooks y lógica
- Custom hooks deben tener tipos claros en sus retornos.
- Si devuelve múltiples valores, usar objetos en lugar de arrays.

```ts
const useCounter = (initial: number) => {
  const [count, setCount] = useState<number>(initial);
  const increment = () => setCount((number) => number + 1);
  return { count, increment };
}
```

---

## 4) Funciones y helpers
- Siempre tipar parámetros y valores de retorno.
- Evitar `function fn(x)` sin tipado explícito.
- Preferir **tipos utilitarios** de TS (`Partial`, `Pick`, `Omit`, `Record`, etc.) en vez de duplicar.

```ts
export const formatDate = (date: Date, locale: string): string => {
  return new Intl.DateTimeFormat(locale).format(date);
}
```

---

## 5) Tipos globales y comunes
- Guardar en `types.ts` dentro de cada screen o módulo.
- No duplicar: si un tipo se usa en varios sitios, mover a `@/types` o a `services/domain`.
- Nombrar en **PascalCase** (`User`, `UserProps`, `UserId`).

Ejemplo:

```ts
// screens/Users/types.ts
export type User = {
  id: string;
  name: string;
  email: string;
};
```

---

## 6) API y servicios
- Todos los DTOs (Data Transfer Objects) deben definirse en `services/domain/model`, como contratos que representan los datos tal y como se reciben o envían al backend.
- Los clientes en `services/domain/client/...` consumen estos DTOs y exponen funciones de acceso a la API.
- Las screens nunca deben consumir DTOs directamente.
- Usar adapters en `screens/.../adapters` para transformar los DTOs en ViewModels adaptados a la UI.
- Cada capa conoce solo lo que le corresponde:
  - `domain/model` → contratos de datos externos (fuente de verdad).
  - `domain/client` → llamadas HTTP que usan esos contratos.
  - `screens/adapters` → mapeo de DTO → ViewModel para la UI.

```ts
// services/domain/client/users.ts
export type UserResponse = {
  id: string;
  full_name: string;
  mail: string;
};

// screens/Users/adapters/toUser.ts
import { UserResponse } from "@/services/domain/client/users";

export type User = {
  id: string;
  name: string;
  email: string;
};

export function toUser(res: UserResponse): User {
  return { id: res.id, name: res.full_name, email: res.mail };
}
```

---

## 7) Buenas prácticas
- Prefiere `enum` o `as const` para valores fijos en lugar de strings mágicos.
- No abusar de `union` demasiado grandes, considerar `enum` o `discriminated unions`.
- Tipar estados de `useReducer` y acciones con `type` discriminado.
- Usar `never` para detectar casos no manejados.

---

## 8) Anti‑patrones a evitar
- ❌ Uso de `any` o `object` sin necesidad.  
- ❌ Tipar con `string` o `number` cuando existe un conjunto finito (usar union).  
- ❌ Definir tipos inline dentro de componentes grandes.  
- ❌ Duplicar tipos entre API y UI sin pasar por un adapter.  

---

## 9) Checklist rápido
- [ ] ¿Todos los tipados que se hagan en los componentes estan definidos en su `types.ts` correspondiente?
- [ ] ¿Todos los props tienen `type` o `interface` definido?  
- [ ] ¿Se evitaron `any`, `object` y `Function` genéricos?  
- [ ] ¿El retorno de funciones está tipado?  
- [ ] ¿Se usan `types.ts` locales para mantener orden?  
- [ ] ¿Los datos de API pasan por adapter antes de usarse en UI?  
- [ ] ¿Se usan utilitarios de TS en vez de duplicar tipos?  

---

**Objetivo final:** tipado claro, consistente y expresivo que documenta el código, facilita el autocompletado y previene errores en tiempo de compilación.
