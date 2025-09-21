# Script de Sincronización de Documentación

Este script automatiza la sincronización de archivos de documentación desde el código fuente hacia Docusaurus.

## ¿Qué hace el script?

El script `sync-docs.mjs` busca todos los archivos `*.doc.md` en el directorio `frontend` y los copia al directorio `doc/docs` manteniendo la estructura de directorios original y adaptando los metadatos para Docusaurus.

## Características

- ✅ **Búsqueda recursiva**: Encuentra todos los archivos `*.doc.md` en cualquier subdirectorio
- ✅ **Estructura preservada**: Mantiene la jerarquía de directorios original
- ✅ **Metadatos adaptados**: Convierte los metadatos originales al formato de Docusaurus
- ✅ **Categorías automáticas**: Crea archivos `_category_.json` para organizar la documentación
- ✅ **Navegación jerárquica**: Genera una estructura de navegación clara en Docusaurus

## Uso

### Opción 1: Usando npm script (recomendado)
```bash
cd frontend
npm run docs:sync
```

### Opción 2: Ejecutando directamente
```bash
cd frontend
node scripts/sync-docs.mjs
```

## Estructura de archivos

### Archivos fuente
Los archivos de documentación deben tener la extensión `.doc.md` y pueden estar en cualquier lugar dentro del directorio `frontend`:

```
frontend/
├── screens/
│   └── users/
│       ├── Users.doc.md
│       └── components/
│           ├── Header/
│           │   └── Header.doc.md
│           └── MainContent/
│               └── MainContent.doc.md
└── services/
    └── growthbook/
        └── growthbook.doc.md
```

### Archivos generados
El script copia los archivos a `doc/docs` manteniendo la estructura:

```
doc/docs/
├── screens/
│   ├── _category_.json
│   └── users/
│       ├── _category_.json
│       ├── Users.md
│       └── components/
│           ├── _category_.json
│           ├── Header/
│           │   ├── _category_.json
│           │   └── Header.md
│           └── MainContent/
│               ├── _category_.json
│               └── MainContent.md
└── services/
    ├── _category_.json
    └── growthbook/
        ├── _category_.json
        └── growthbook.md
```

## Formato de metadatos

### Formato original (*.doc.md)
```yaml
---
title: Users
last_update: 2025-09-13
path: /users/header
---
```

### Formato convertido (Docusaurus)
```yaml
---
title: Users
sidebar_position: 1
last_update:
  date: 2025-09-13
  author: Sistema automático
slug: /users/header
---
```

## Flujo de trabajo recomendado

1. **Escribir documentación**: Crear archivos `*.doc.md` junto al código fuente
2. **Visualizar**: Ejecutar `cd doc && npm start` para ver la documentación (se sincroniza automáticamente)
3. **Repetir**: La documentación se actualiza automáticamente cada vez que inicias Docusaurus

## Sincronización Automática

⚡ **¡Novedad!** La documentación se sincroniza automáticamente cada vez que inicias Docusaurus, por lo que siempre tendrás la información más actualizada sin pasos adicionales.

## Ejemplo de uso completo

```bash
# 1. Ir al directorio de documentación
cd frontend/doc

# 2. Iniciar Docusaurus (sincroniza automáticamente)
npm start

# 3. Abrir http://localhost:3000 en el navegador
```

### Sincronización manual (opcional)

Si necesitas sincronizar manualmente sin iniciar Docusaurus:

```bash
# Desde el directorio frontend
cd frontend
npm run docs:sync

# O desde el directorio doc
cd frontend/doc
npm run sync-docs
```

## Ventajas de este enfoque

- **Documentación cerca del código**: Los archivos `.doc.md` están junto al código que documentan
- **Sincronización automática**: Un solo comando actualiza toda la documentación
- **Estructura mantenida**: La organización del código se refleja en la documentación
- **Metadatos consistentes**: Formato estándar para Docusaurus
- **Navegación automática**: Se genera la estructura de navegación automáticamente

## Troubleshooting

### El script no encuentra archivos
- Verificar que los archivos tengan la extensión `.doc.md`
- Asegurarse de estar en el directorio `frontend`

### Metadatos incorrectos
- Verificar que el front matter esté bien formateado
- Asegurarse de que empiece y termine con `---`

### Docusaurus no muestra la documentación
- Verificar que los archivos se copiaron a `doc/docs`
- Reiniciar el servidor de Docusaurus (`npm start`)
