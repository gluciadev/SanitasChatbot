---
title: Header
sidebar_position: 1
last_update:
  date: 2025-09-15
  author: Sistema automático
---

---
title: Users
last_update: 2025-09-13
path: /users/header
---

# Users

## Descripción funcional
Breve explicación de la funcionalidad que cubre esta pantalla.

## Hooks utilizados
| Hook               | Propósito breve                              |
|--------------------|-----------------------------------------------|
| `useUsersQuery`    | Obtiene la lista de usuarios vía adapter.     |
| `useFeatureIsOn`   | Activa/desactiva el nuevo listado (flag).     |

## Helpers utilizados
| Helper             | Propósito breve                              |
|--------------------|-----------------------------------------------|
| `formatDate`       | Dar formato consistente a fechas en la vista. |

## Flags utilizadas
- `users.newTable` → activa la nueva tabla en vez del listado clásico.

## Traducciones
| Key            | es            | en          |
|----------------|---------------|-------------|
| `users.title`  | Usuarios      | Users       |
| `users.error`  | Error general | General error |

## Contexto (si aplica)
**Provider:** `UsersProvider`  
**Valores expuestos:**
- `users`: lista de usuarios cargados.
- `selectedUserId`: id actual seleccionado.
- `setSelectedUserId(id: string)`: cambia la selección.