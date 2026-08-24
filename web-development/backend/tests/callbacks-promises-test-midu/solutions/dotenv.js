const fs = require("node:fs/promises");

async function config() {
  try {
    const archivo = await fs.readFile(".env", "utf8");

    const separado = archivo.split(/\r?\n/);
    const nuevo = separado.filter((parte) => parte !== "");

    for (const item of nuevo) {
      const arrayKeyValue = item.split("=");

      process.env[arrayKeyValue[0]] = arrayKeyValue[1];
    }
  } catch (error) {}
}

module.exports = {
  config,
};
