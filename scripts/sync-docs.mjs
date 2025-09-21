#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración
const FRONTEND_DIR = path.resolve(__dirname, '..');
const DOC_DIR = path.resolve(__dirname, '../doc');
const DOCS_OUTPUT_DIR = path.resolve(DOC_DIR, 'docs');

/**
 * Busca recursivamente todos los archivos *.doc.md en un directorio
 */
async function findDocFiles(dir, basePath = '') {
  const files = [];
  
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativePath = path.join(basePath, entry.name);
      
      if (entry.isDirectory()) {
        // Recursivamente buscar en subdirectorios
        const subFiles = await findDocFiles(fullPath, relativePath);
        files.push(...subFiles);
      } else if (entry.isFile() && entry.name.endsWith('.doc.md')) {
        files.push({
          fullPath,
          relativePath,
          name: entry.name
        });
      }
    }
  } catch (error) {
    console.warn(`No se pudo leer el directorio ${dir}:`, error.message);
  }
  
  return files;
}

/**
 * Procesa los metadatos del archivo para Docusaurus
 */
function processMetadata(content, relativePath) {
  const lines = content.split('\n');
  let frontMatterStart = -1;
  let frontMatterEnd = -1;
  let frontMatter = {};
  
  // Buscar el front matter
  if (lines[0] === '---') {
    frontMatterStart = 0;
    for (let i = 1; i < lines.length; i++) {
      if (lines[i] === '---') {
        frontMatterEnd = i;
        break;
      }
      
      const line = lines[i].trim();
      if (line) {
        const [key, ...valueParts] = line.split(':');
        if (key && valueParts.length > 0) {
          frontMatter[key.trim()] = valueParts.join(':').trim();
        }
      }
    }
  }
  
  // Generar el path basado en la estructura de directorios
  const pathParts = relativePath.split(path.sep);
  
  // Crear nuevos metadatos para Docusaurus
  const newFrontMatter = {
    title: frontMatter.title || pathParts[pathParts.length - 2] || 'Documentación',
    sidebar_position: 1,
    last_update: {
      date: frontMatter.last_update || new Date().toISOString().split('T')[0],
      author: 'Sistema automático'
    }
  };
  
  // Si existe un path personalizado, usarlo
  if (frontMatter.path) {
    newFrontMatter.slug = frontMatter.path;
  }
  
  // Construir el nuevo contenido
  const newFrontMatterLines = [
    '---',
    `title: ${newFrontMatter.title}`,
    `sidebar_position: ${newFrontMatter.sidebar_position}`,
    'last_update:',
    `  date: ${newFrontMatter.last_update.date}`,
    `  author: ${newFrontMatter.last_update.author}`
  ];
  
  if (newFrontMatter.slug) {
    newFrontMatterLines.push(`slug: ${newFrontMatter.slug}`);
  }
  
  newFrontMatterLines.push('---');
  
  // Obtener el contenido sin el front matter original
  let contentWithoutFrontMatter;
  if (frontMatterStart !== -1 && frontMatterEnd !== -1) {
    // Remover el front matter original completamente
    contentWithoutFrontMatter = lines.slice(frontMatterEnd + 1).join('\n').trim();
  } else {
    contentWithoutFrontMatter = content.trim();
  }
  
  return newFrontMatterLines.join('\n') + '\n\n' + contentWithoutFrontMatter;
}

/**
 * Crea la estructura de directorios necesaria
 */
async function ensureDirectoryExists(filePath) {
  const dir = path.dirname(filePath);
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

/**
 * Crea archivos _category_.json para organizar la documentación
 */
async function createCategoryFiles(outputPath, categoryName) {
  const categoryFile = path.join(outputPath, '_category_.json');
  
  try {
    await fs.access(categoryFile);
  } catch {
    const categoryConfig = {
      label: categoryName.charAt(0).toUpperCase() + categoryName.slice(1),
      position: 1,
      link: {
        type: 'generated-index',
        description: `Documentación de ${categoryName}`
      }
    };
    
    await fs.writeFile(categoryFile, JSON.stringify(categoryConfig, null, 2));
    console.log(`✅ Creado archivo de categoría: ${categoryFile}`);
  }
}

/**
 * Función principal
 */
async function syncDocs() {
  console.log('🔄 Iniciando sincronización de documentación...\n');
  
  try {
    // Buscar todos los archivos *.doc.md
    console.log('📁 Buscando archivos *.doc.md...');
    const docFiles = await findDocFiles(FRONTEND_DIR);
    
    if (docFiles.length === 0) {
      console.log('⚠️  No se encontraron archivos *.doc.md');
      return;
    }
    
    console.log(`📄 Encontrados ${docFiles.length} archivos de documentación:\n`);
    docFiles.forEach(file => {
      console.log(`   - ${file.relativePath}`);
    });
    console.log('');
    
    // Procesar cada archivo
    for (const file of docFiles) {
      console.log(`🔄 Procesando: ${file.relativePath}`);
      
      // Leer el contenido del archivo
      const content = await fs.readFile(file.fullPath, 'utf-8');
      
      // Procesar metadatos
      const processedContent = processMetadata(content, file.relativePath);
      
      // Determinar la ruta de salida
      const relativeDirPath = path.dirname(file.relativePath);
      const outputDir = path.join(DOCS_OUTPUT_DIR, relativeDirPath);
      const outputFileName = file.name.replace('.doc.md', '.md');
      const outputPath = path.join(outputDir, outputFileName);
      
      // Crear directorio si no existe
      await ensureDirectoryExists(outputPath);
      
      // Crear archivos de categoría para organizar la documentación
      const pathParts = relativeDirPath.split(path.sep).filter(Boolean);
      let currentPath = DOCS_OUTPUT_DIR;
      
      for (const part of pathParts) {
        currentPath = path.join(currentPath, part);
        await createCategoryFiles(currentPath, part);
      }
      
      // Escribir el archivo procesado
      await fs.writeFile(outputPath, processedContent);
      console.log(`✅ Copiado a: ${path.relative(process.cwd(), outputPath)}`);
    }
    
    console.log('\n🎉 Sincronización completada exitosamente!');
    console.log(`📚 Archivos copiados a: ${path.relative(process.cwd(), DOCS_OUTPUT_DIR)}`);
    console.log('\n💡 Para ver la documentación, ejecuta:');
    console.log('   cd frontend/doc && npm start');
    
  } catch (error) {
    console.error('❌ Error durante la sincronización:', error.message);
    process.exit(1);
  }
}

// Ejecutar el script
syncDocs();
