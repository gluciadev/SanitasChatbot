# KISS rules

Este documento define cómo aplicar el principio **KISS (Keep It Simple, Stupid)** en el proyecto.  
Su propósito es mantener el código simple, claro y fácil de mantener, evitando complejidad accidental y soluciones rebuscadas.

---

## Principio KISS
**La solución más simple que funcione suele ser la correcta.**

- Prefiere **claridad sobre sofisticación**.
- Evita sobre‑ingeniería y abstracciones innecesarias.
- El código debe poder ser entendido por cualquier miembro del equipo en pocos minutos.

---

## Aplicación en el proyecto

### En Screens
- Cada screen **solo orquesta** y renderiza componentes, sin lógica extra.
- No mezclar fetch de datos ni cálculos complejos en la screen; delegar en `services/` o `helpers/`.
- Si una screen crece demasiado, dividir en subcomponentes simples.

### En Components
- Componentes pequeños, con responsabilidades claras.
- Props mínimas y significativas, evitar objetos con decenas de propiedades.
- Prefiere composición antes que herencia.

### En Services
- Clientes de dominio (`usersClient`, `ordersClient`) con funciones directas y predecibles.
- Hooks de API (`useGetUser`) que devuelven `data`, `isLoading`, `error`, sin lógica extra.
- Estados globales en `zustand` simples y predecibles, sin mezclar con caché de servidor.

### En Helpers y Hooks
- Helpers: funciones puras, fáciles de leer, sin efectos secundarios.
- Hooks: lógica de estado encapsulada, sin crecer en exceso; dividir si empieza a manejar múltiples responsabilidades.

---

## Reglas Prácticas KISS

1. **Una línea vale más que tres**: si se puede simplificar sin perder claridad, hazlo.  
2. **Evita nesting profundo**: usar early returns en lugar de condicionales anidados.  
3. **Prefiere lo explícito**: un nombre largo y claro es mejor que abreviaturas crípticas.  
4. **Elimina lo innecesario**: código muerto, props no usadas, imports sobrantes.  
5. **Divide para simplificar**: si una función o componente crece demasiado, extráelo.  
6. **Consistencia primero**: sigue siempre las mismas convenciones, aunque parezca repetitivo.  

---

## Ejemplos

### ❌ Mal ejemplo (no KISS)
```tsx
function Users({ list, onClick }: { list: any[]; onClick: (u: any) => void }) {
  return (
    <>
      {list?.map((u, i) => (
        <div key={i} onClick={() => onClick(u)}>
          {u?.n || "—"}
        </div>
      ))}
    </>
  );
}
```

### ✅ Buen ejemplo (KISS aplicado)
```tsx
type User = { id: string; name: string };

function Users({ users, onSelect }: { users: User[]; onSelect: (u: User) => void }) {
  return (
    <>
      {users.map((user) => (
        <div key={user.id} onClick={() => onSelect(user)}>
          {user.name}
        </div>
      ))}
    </>
  );
}
```

---

## Checklist KISS

- [ ] ¿El componente/hook tiene **solo lo necesario** para funcionar?  
- [ ] ¿El código puede entenderse sin comentarios adicionales?  
- [ ] ¿Se evita nesting y condicionales profundos?  
- [ ] ¿Los nombres son claros y autoexplicativos?  
- [ ] ¿Se eliminó lo innecesario o duplicado?  
- [ ] ¿La solución es la más simple que cumple el requerimiento?  

---

## Conclusión

Aplicar **KISS** en cada capa garantiza que el proyecto se mantenga:  
- Fácil de leer.  
- Simple de extender.  
- Libre de sobre‑ingeniería.  

> **KISS + SOLID** = Código modular, simple y sostenible a largo plazo.
