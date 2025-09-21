import {readdir, readFile, writeFile, mkdir, stat} from 'fs/promises';
import path from 'path';

const ROOTS = ['screens']; 
const LOCALES = ['es', 'en'];
const OUT_DIR = 'global-messages';

async function walk(dir) {
  let entries;
  try { entries = await readdir(dir, {withFileTypes: true}); }
  catch { return []; }
  const files = await Promise.all(entries.map(async (d) => {
    const res = path.join(dir, d.name);
    if (d.isDirectory()) return await walk(res);
    return res;
  }));
  return files.flat();
}

async function build() {
  const byLocale = Object.fromEntries(LOCALES.map((l) => [l, {}]));
  
  for (const root of ROOTS) {
    // si el root no existe, sáltalo
    try { await stat(root); } catch { continue; }
    const files = await walk(root);
    
    for (const locale of LOCALES) {
      const suffix = path.join('locales', `${locale}.json`);
      const matches = files.filter((f) => f.endsWith(suffix));
      
      for (const file of matches) {
        let json;
        try {
          const raw = await readFile(file, 'utf8');
          json = JSON.parse(raw);
        } catch (e) {
          console.error(`❌ JSON inválido: ${file}\n${e}`);
          process.exit(1);
        }
        
        // Simplemente agregar todas las claves del archivo al objeto global
        // El desarrollador es responsable de usar claves únicas
        Object.assign(byLocale[locale], json);
      }
    }
  }
  
  await mkdir(OUT_DIR, {recursive: true});
  for (const locale of LOCALES) {
    const outFile = path.join(OUT_DIR, `${locale}.json`);
    await writeFile(outFile, JSON.stringify(byLocale[locale], null, 2), 'utf8');
    console.log(`✔ Generado ${outFile}`);
  }
}

build().catch((e) => {
  console.error(e);
  process.exit(1);
});
