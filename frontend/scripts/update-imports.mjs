import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const apiDir = path.resolve(__dirname, '..', 'src', 'app', 'api');

function getAllRouteFiles(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getAllRouteFiles(fullPath));
    } else if (entry.name === 'route.ts') {
      files.push(fullPath);
    }
  }
  return files;
}

function findBodyBrace(content, funcStart) {
  const rest = content.slice(funcStart);
  const parenStart = rest.indexOf('(');
  if (parenStart === -1) return -1;

  let parenDepth = 1;
  let braceDepth = 0;

  for (let i = parenStart + 1; i < rest.length; i++) {
    const ch = rest[i];
    if (ch === '(') {
      parenDepth++;
    } else if (ch === ')') {
      parenDepth--;
      if (parenDepth === 0) {
        for (let j = i + 1; j < rest.length; j++) {
          if (rest[j] === '{') {
            return funcStart + j;
          }
        }
        return -1;
      }
    } else if (ch === '{') {
      braceDepth++;
    } else if (ch === '}') {
      braceDepth--;
    }
  }
  return -1;
}

function processFile(filePath) {
  const original = fs.readFileSync(filePath, 'utf-8');
  let content = original;

  if (!content.includes(`import { prisma } from "@/lib/prisma"`)) {
    return false;
  }

  content = content.replace(
    `import { prisma } from "@/lib/prisma"`,
    `import { getPrisma } from "@/lib/prisma"`
  );

  const handlerRE = /export async function (GET|POST|PUT|DELETE|PATCH)\b/g;
  const insertions = [];
  let match;

  while ((match = handlerRE.exec(content)) !== null) {
    const bodyBraceIndex = findBodyBrace(content, match.index);
    if (bodyBraceIndex === -1) {
      console.error(`  WARN: Could not find body brace in ${filePath}`);
      continue;
    }
    insertions.push({
      index: bodyBraceIndex + 1,
      text: '\n  const prisma = getPrisma();'
    });
  }

  insertions.sort((a, b) => b.index - a.index);
  for (const ins of insertions) {
    content = content.slice(0, ins.index) + ins.text + content.slice(ins.index);
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf-8');
    return true;
  }
  return false;
}

const files = getAllRouteFiles(apiDir);
console.log(`Found ${files.length} route files`);

let modified = 0;
let unchanged = 0;

for (const file of files) {
  const rel = path.relative(process.cwd(), file);
  if (processFile(file)) {
    console.log(`  MODIFIED: ${rel}`);
    modified++;
  } else {
    unchanged++;
  }
}

console.log(`\nDone: ${modified} modified, ${unchanged} unchanged`);
