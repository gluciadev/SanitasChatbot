---
title: Login
last_update: 2025-09-21
path: /[locale]
---

# Login

## Descripción funcional
Renderiza la pantalla de login que se muestra automáticamente al iniciar la aplicación. Permite al usuario ingresar su correo electrónico y nombre de usuario mediante un formulario validado que almacena las credenciales en el estado global.

---

## Hooks utilizados
| Hook             | Propósito breve                              |
|------------------|-----------------------------------------------|
| `useForm`        | Maneja el estado del formulario y validaciones con React Hook Form |
| `useTranslations`| Obtiene las traducciones según el idioma actual |
| `useAuthStore`   | Accede al estado global para almacenar credenciales |

---

## Helpers utilizados
No se utilizan helpers específicos en este componente.

---

## Flags utilizadas
No se utilizan feature flags en este componente.

---

## Traducciones
| Key                           | es                    | en           |
|-------------------------------|-----------------------|--------------|
| `login-title`                 | Iniciar Sesión       | Sign In      |
| `login-email-placeholder`     | Correo                | Mail         |
| `login-username-placeholder`  | Nombre de usuario     | User name    |
| `login-submit-button`         | Iniciar sesión        | Sign in      |

---

## Contexto
No utiliza contexto local. El estado se maneja mediante Zustand en `services/zustand/authStore.ts`.

---

## Tipado
Referencia a `types.ts` asociado con las interfaces principales:  
```ts
export interface LoginFormData {
  email: string;
  username: string;
}

export interface LoginProps {
  locale: string;
}
```

---

## Testing
- **Archivo:** `Login.test.tsx`  
- **Cobertura mínima:** renderizado, validaciones de formulario, estados de loading/error, integración con Zustand.  
- **Mocks:** `Login.mocks.ts` con factories para props y datos de prueba.

---

## Estilos
- **Archivo:** `Login.module.css`  
- Utiliza **CSS Modules** con convención camelCase.
- Diseño centrado con gradiente azul de Sanitas (#0066cc a #004499).
- Estados de focus, hover y loading implementados.

---

## Ejemplo de uso
```tsx
import { Login } from "@/screens/Login/Login";

<Login locale="es" />
```

---

## Notas adicionales
- El formulario incluye validaciones de email y longitud mínima de username.
- Los datos se almacenan en Zustand mediante `setCredentials(email, username)`.
- El componente simula un delay de 500ms en el envío para mostrar el estado de loading.
- Sigue los principios SOLID y KISS del proyecto.
- Compatible con internacionalización (i18n) mediante next-intl.
