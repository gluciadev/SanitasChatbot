# GrowthBook Rules

El proyecto utiliza **GrowthBook** como sistema de feature flags y experimentación.  
Su objetivo es **habilitar, deshabilitar o condicionar funcionalidades** sin modificar el código principal.  

> ⚠️ GrowthBook **no es una capa de negocio**, solo de configuración y control de flags.

---

## 1) Ubicación en el proyecto
- La inicialización de GrowthBook se hace en `services/growthbook/`.
- El provider se inyecta en el layout global (`app/layout.tsx`):

```tsx
<body>
  <GrowthbookProvider>{children}</GrowthbookProvider>
</body>
```

- Los flags se consumen únicamente desde las **screens** o subcomponentes, nunca desde `services/`.

---

## 2) Consumo de flags
- El consumo de feature flags se hace **exclusivamente mediante el hook `useFeatureFlags`** definido en `services/growthbook/useFeatureFlags.ts`.  
- Este hook expone propiedades con nombres semánticos, en lugar de acceder a GrowthBook directamente.

Ejemplo:

```tsx
// services/growthbook/useFeatureFlags.ts
import { useMemo } from "react";
import { useFeatureValue } from "@growthbook/growthbook-react";
import { FeatureFlags } from "./types";

export const useFeatureFlags = () => {
  const isEnableTestingFlag = useFeatureValue(FeatureFlags.TESTING_FIRST_KEY_FLAG, false );
  return useMemo(
    () => ({isEnableTestingFlag}),
    [isEnableTestingFlag]
  );
};
```

```tsx
// screens/Users/Users.tsx
import { useFeatureFlags } from "@/services/growthbook/useFeatureFlags";

export function Users() {
  const { isEnableTestingFlag } = useFeatureFlags();

  return (
    <div>
      <h2>GrowthBook Feature Flags</h2>
      {isEnableTestingFlag ? <NewTable /> : <LegacyList />}
    </div>
  );
}
```

---

## 3) Principios de uso
- **KISS** → el hook `useFeatureFlags` devuelve solo lo necesario.  
- **SOLID** → cada screen decide qué hacer con los flags, pero nunca accede directamente a GrowthBook.  
- Nunca persistir el valor del flag en estado global (Zustand). Siempre obtenerlo del hook.  
- Flags deben ser temporales, para experimentos o despliegues progresivos.

---

## 4) Documentación de flags
En cada screen que consuma un flag, añadir en su doc (`<ScreenName>.doc.md`):

```
## Flags utilizadas
- `usersNewTable` → activa la nueva tabla en vez del listado clásico.
- `uiDarkMode` → habilita el modo oscuro.
```

---


## 5) Ejemplo completo de consumo

Cuando la tarea que debes realizar especifica el uso de un flag y ademas se da el nombre por ejemplo "exampleFlagName"

### 5.1) Definir la flag
- Definir la nueva flag en el fichero de `types.ts` dentro de `services/growthbook/`

```ts
export enum FeatureFlags {
  TESTING_FIRST_KEY_FLAG = "exampleFlagName",
}
```

### 5.2) Exponer el flag para su uso en el customHook
- Definir el type generado en el customHook para exponer su uso en cualquier componente que lo necesite.

```ts
import { useMemo } from "react";
import { useFeatureValue } from "@growthbook/growthbook-react";
import { FeatureFlags } from "./types";

export const useFeatureFlags = () => {
   const isEnableTestingFlag = useFeatureValue(FeatureFlags.TESTING_FIRST_KEY_FLAG, false );
// const <flagNameToUseInCode> = useFeatureValue(FeatureFlags.<keyFlagDefinedOnTypes>, <defaultValue> )  --> Ejemplo de como debe nombrarse siempre

  return useMemo(
    () => ({
      isEnableTestingFlag, //nombre que se expone para el uso en screens
    }),
    [isEnableTestingFlag]
  );
};
```

---

## 6) Checklist rápido
- [ ] ¿El flag está definido en `services/growthbook/types.ts`?  
- [ ] ¿Está mapeado en `useFeatureFlags` con un nombre semántico?  
- [ ] ¿Se consume solo mediante `useFeatureFlags` en screens/componentes?  
- [ ] ¿La lógica asociada es simple (no anidada)?  
- [ ] ¿Está documentado en el `.doc.md` de la screen?  

---

**Objetivo final:** centralizar el acceso a flags mediante `useFeatureFlags`, evitando dependencias directas con GrowthBook y asegurando consistencia y simplicidad en toda la aplicación.
