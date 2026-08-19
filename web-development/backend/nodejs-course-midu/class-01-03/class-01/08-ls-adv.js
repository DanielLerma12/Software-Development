const fs = require("node:fs/promises");
const path = require("node:path");
const pc = require("picocolors");

const folder = process.argv[2] ?? ".";

async function ls(folder) {
  let files;
  try {
    files = await fs.readdir(folder);
  } catch {
    console.error(pc.red(`no se pudo leer el directorio ${folder}`));
    process.exit(1);
  }

  const filesPromises = files.map(async (file) => {
    // el mapeo con map es en paralelo, para hacerlo secuencial se podría usar for of
    const filePath = path.join(folder, file);
    let stats;
    try {
      stats = await fs.stat(filePath);
    } catch {
      console.error(`no se pudo leer el archivo ${filePath}`);
      process.exit(1);
    }

    const isDirectory = stats.isDirectory(); // es una carpeta
    const fileType = isDirectory ? "d" : "f";

    const fileSize = stats.size;
    const fileModified = stats.mtime.toLocaleString();

    return `${fileType} ${pc.blue(file.padEnd(40))} ${pc.green(fileSize.toString().padStart(10))} ${pc.yellow(fileModified)}`; // agregar vacios al resultado o la cadena
  });

  const filesInfo = await Promise.all(filesPromises);

  filesInfo.forEach((fileInfo) => {
    console.log(fileInfo);
  });
}

ls(folder);
