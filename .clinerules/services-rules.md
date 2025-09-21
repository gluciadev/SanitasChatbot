# Services Layer Rules

La carpeta **`services/`** concentra **infraestructura y acceso a datos** compartidos por toda la app.
Su objetivo es **desacoplar** las *screens* de la obtención de datos, *feature flags*, clientes HTTP y estados globales.

> Aplica **[SOLID](solid-rules.md)** y **[KISS](kiss-rules.md)**: cada módulo con una responsabilidad única, simple y testeable.

---

## Estructura actual (ejemplo real del repo)
```
services/
  api/                               // Hooks/funciones de datos listos para la UI (React Query/SWR)
    <resource>/                      // Nombre del conjunto de servicios asociados a una screen o datos por ejemplo "users/" tendra todas las llamadas  backend que implica obtener/editar información asociada a users
      index.ts                       // Barrel para importar todas las funcionalidades que exponga el <serviceName>
      <resourceAPI>.ts               // Acción para consumir un endpoint como ejemplos: useGetUserData.ts | usePostNewUser.ts ...
      <resource>KeyFactory.ts        // Conjunto de claves e Id's que se le dan a las llamadas api para poder obtener informacion o cancelarla con tanstack en cualquier parte del código.
  domain/                            // Capa de dominio: modelos y clientes (sin React)
    client/
      clientFactory/
        axiosClient.ts               // Instancia central de Axios como cliente HTTP
        clientFactory.ts             // Fábrica de clientes HTTP, partiendo de la instancia común (axiosClient), crea clientes por recurso (users, orders, etc.) con basePath, tipos y operaciones estándar.
      <apiCall>.ts                   // Definicion de endpoints a consumir por ejemplo users.ts tendria dentro el  getCall<UserDTO[]>(`https://jsonplaceholder.typicode.com/users/${userId}`);
    model/
      <serviceDTO>.ts                // Contrato y typado del servicio a consumir, modelos/DTO recibidos del backend
  growthbook/                        // Feature Flags (providers, hooks, tipos) definido en Growthbook rules
    growthbook-provider.tsx
    instance.ts
    types.ts
    useFeatureFlags.tsx
    growthbook.doc.md
  zustand/                           // Estados globales simples (no dependientes de React Query).
    <nameStore>.ts                   
  query.ts                           // Configuración de React Query (client, defaults)
```

---

## Responsabilidades por subcarpeta

### `domain/`
- **`model/`**: Definir **DTOs y tipos** tal como llegan/salen del backend.
- **`client/`**: Implementar **clientes HTTP** por recurso (p. ej. `users.ts`) usando una **factory** (`clientFactory/`) que crea el cliente (`axiosClient.ts`).
- **Sin React**: esta capa es *pura*, reutilizable y testeable con unit tests.
- **No hace mapeos a ViewModel**: esa adaptación vive en `screens/<View>/adapters/`.

### `api/`
- Exponer **hooks/funciones de datos** para la UI (p. ej. `useGetUserById.ts`).
- Usar **React Query** (o SWR) y **key factories** (`usersKeyFactory.ts`) para claves estables.
- Encapsular **caché, reintentos, staleTime**, y políticas de error/`enabled`.
- No mezclar lógica de presentación: devolver datos crudos (DTO) o **datos mínimos enriquecidos**, dejando la **adaptación final** a la *screen*.

### `growthbook/`
- **Provider global** y **hooks** de *feature flags*.
- Tipado de flags y helpers de evaluación.
- No mezclar reglas de negocio con flags: las flags solo habilitan/condicionan comportamientos.
- Documentado más a fondo en **[Growthbook Rules](growthbook-rules.md)**

### `zustand/`
- Estados **globales simples** (no dependientes de React Query).
- Stores **pequeños**, con **acciones puras** y sin efectos colaterales pesados.
- Para sincronización con servidor, preferir `api/` + React Query y usar `zustand` solo para orquestación de UI.

### `query.ts`
- Configuración central de React Query (**QueryClient**, *defaults*, *retry*, *staleTime*, *logger*).
- **Única fuente de verdad** para políticas de cache a nivel app.

---

## Reglas de uso y límites (Boundary Rules)
- **Dependencias permitidas**: `screens` ➜ `services/api` ➜ `services/domain`.  
  `services/growthbook` y `services/zustand` pueden ser consumidos directamente por *screens*.
- **Prohibido**: `services` importar desde `screens` o desde componentes de UI.
- **Adaptadores de vista** (**VM**) viven en `screens/<View>/adapters/`, no en `services/`.
- **Nombres y consistencia**: usar **inglés** y **plural** donde aplique (`users`, `adapters`, `components`).

---

## Convenciones de código
- **TypeScript estricto** (`strictNullChecks` activado). Tipos en `domain/model` y en firmas públicas.
- **Key Factories** en `api/<resource>/<resource>KeyFactory.ts` con métodos `list`, `detail(id)`, etc.
- **Hooks**: `useGetXxx`, `useListXxx`, `useCreateXxx`…; exponer `data`, `isLoading`, `error` y callbacks.
- **Errores**: no ocultar errores; normalizar mensajes y lanzar/propagar donde corresponda.
- **AbortController** o cancelación soportada por el cliente HTTP en peticiones activas desde efectos.
- **Tests**: 
  - `domain` con tests unitarios puro (mocks de HTTP).
  - `api` con tests de hooks (React Testing Library + MSW recomendado).

---

## Flujo recomendado para un nuevo recurso (ej. *Users*)
1. **Dominio**
   - Crear DTOs en `services/domain/model/usersDTO.ts`.
   - Implementar cliente en `services/domain/client/users.ts` usando `clientFactory`.
2. **API**
   - Crear `usersKeyFactory.ts` con claves (`list`, `detail(id)`, …).
   - Crear hooks (`useGetUserById.ts`, `useListUsers.ts`, etc.) que usen el cliente de dominio.
3. **Screen**
   - Consumir los hooks en `screens/Users/...`.
   - Adaptar DTO → ViewModel en `screens/Users/adapters/` (si hace falta).
   - Renderizar componentes puros; mantener la lógica de presentación fuera de `services/`.

---

## Ejemplos mínimos

### `services/domain/client/users.ts`
```ts
import { axiosClient } from './clientFactory/axiosClient';
import type { UserDTO } from '../model/usersDTO';

export const usersClient = {
  async getById(id: string): Promise<UserDTO> {
    const { data } = await axiosClient.get(`/users/${id}`);
    return data;
  },
};
```

### `services/api/users/usersKeyFactory.ts`
```ts
export const usersKey = {
  all: ['users'] as const,
  detail: (id: string) => [...usersKey.all, 'detail', id] as const,
};
```

### `services/api/users/useGetUserById.ts`
```ts
import { useQuery } from '@tanstack/react-query';
import { usersClient } from '@/services/domain/client/users';
import { usersKey } from './usersKeyFactory';

export const useGetUserById = (id: string, enabled = true) =>
  useQuery({
    queryKey: usersKey.detail(id),
    queryFn: () => usersClient.getById(id),
    enabled: Boolean(id) && enabled,
    staleTime: 60_000,
  });
```

---

## Anti‑patrones a evitar
- Poner **adaptación a ViewModel** dentro de `services/` (debe vivir en `screens/`).
- Crear hooks en `api/` que **retornen JSX** o dependan de componentes.
- Hacer que `zustand` duplique cache de servidor que ya maneja React Query.
- Lógica de negocio compleja incrustada en `growthbook` (flags no son reglas de negocio).
- Clientes HTTP que no pasen por la **factory** (rompe consistencia de interceptores, auth, tracing, etc.).

---

## Checklist rápido
- [ ] ¿El módulo tiene **una sola responsabilidad**?  
- [ ] ¿`services` **no** importa nada de `screens`?  
- [ ] ¿Los DTOs viven en `domain/model` y los clientes en `domain/client`?  
- [ ] ¿Hay **key factory** para cada hook de datos?  
- [ ] ¿La adaptación a UI se hace en `screens/.../adapters/`, si es necesario?  
- [ ] ¿Existen tests mínimos para `domain` y `api`?  
