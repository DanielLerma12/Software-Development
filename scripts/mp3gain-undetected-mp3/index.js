const { execFile } = require("child_process");
const ffmpeg = require("ffmpeg-static");
const pico = require("picocolors");

const fs = require("fs");
const path = require("path");

const carpeta = process.argv[2] ?? ".";

const cola = [];
let procesosActivos = 0;
const MAX_PROCESOS = 4;

// ─────────────────────────────
// Recorrer carpetas
// ─────────────────────────────

async function leerCarpeta(dir) {
  try {
    const entries = await fs.promises.readdir(dir, {
      withFileTypes: true,
    });

    for (const entry of entries) {
      const ruta = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        await leerCarpeta(ruta);
      } else if (path.extname(entry.name).toLowerCase() === ".mp3") {
        cola.push(ruta);
        procesarCola();
      }
    }
  } catch (err) {
    console.error("Error al leer el directorio:", err);
  }
}

// ─────────────────────────────
// Procesar cola
// ─────────────────────────────

function procesarCola() {
  while (procesosActivos < MAX_PROCESOS && cola.length > 0) {
    const ruta = cola.shift();

    procesosActivos++;

    obtenerVolumen(ruta).finally(() => {
      procesosActivos--;
      procesarCola();
    });
  }
}

// ─────────────────────────────
// Obtener volumen
// ─────────────────────────────

function obtenerVolumen(ruta) {
  return new Promise((resolve) => {
    execFile(
      ffmpeg,
      ["-i", ruta, "-map", "0:a:0", "-af", "replaygain", "-f", "null", "NUL"],
      (error, stdout, stderr) => {
        if (error) {
          console.error("Error:", ruta);
          resolve();
          return;
        }

        const match = stderr.match(/track_gain\s*=\s*(-?\d+(?:\.\d+)?)\s*dB/);

        if (!match) {
          console.error("No se pudo obtener el volumen:", ruta);
          resolve();
          return;
        }

        const gain = parseFloat(match[1]);
        const volume = 89 - gain;
        const volumeFinal = volume.toFixed(2);

        if (volume > 96.0 || volume < 94.0) {
          console.log(pico.magenta(`${ruta} → ${volumeFinal} dB`));
        } else {
        }

        resolve();
      },
    );
  });
}

// ─────────────────────────────
// Iniciar
// ─────────────────────────────

leerCarpeta(carpeta);
