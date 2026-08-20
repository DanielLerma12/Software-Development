import { test } from "node:test";
import { Stagehand } from "@browserbasehq/stagehand";

test("Un usuario puede logearse en el chat con credenciales válidas", async () => {
  const stagehand = new Stagehand({
    env: "LOCAL",
    model: "google/gemini-2.5-flash",
    localBrowserLaunchOptions: {
      executablePath:
        "C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe",
    },
  });

  await stagehand.init();

  const page = stagehand.context.pages()[0];

  await page.goto("https://chat-socketio-jtuc.onrender.com/");

  await stagehand.act(
    "Escribe el username 'danielito123' en el campo de usuario",
  );

  await stagehand.act(
    "Escribe la contraseña 'Gatos123&' en el campo de contraseña",
  );

  await stagehand.act("Haz click en el botón de login");

  await stagehand.close();
});
