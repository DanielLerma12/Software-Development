import { readdir, stat } from 'node:fs/promises'
import { join } from 'node:path'

// 1. Recuperar la carpeta a listar
const dir = process.argv[2] ?? '.'

// 2. Formateo simple de los tamaños
const formatBytes = (size) => {
  if (size < 1024) return `${size} B`
  return `${(size / 1024).toFixed(2)} KB`
}

// 3. Leer los nombres, sin info
const files = await readdir(dir)

// 4. Recuperar la info de cada file
const entries = await Promise.all(
  files.map(async (name) => {
    const fullPath = join(dir, name)
    const info = await stat(fullPath)

    return {
      name,
      isDir: info.isDirectory(),
      size: formatBytes(info.size)
    }
  })
)

// sort
// 1. Que aparezcan primero las carpetas
// 2. Que esten en orden alfabetico los ficheros

// filter
// tener en cuenta flags como --files-only o --dirs-only

for (const entry of entries) {
  // Renderizar la información
  const icon = entry.isDir ? '📁' : '📄'
  const size = entry.isDir ? '-' : ` ${entry.size}`
  console.log(`${icon} ${entry.name.padEnd(25)}    ${size}`)
}