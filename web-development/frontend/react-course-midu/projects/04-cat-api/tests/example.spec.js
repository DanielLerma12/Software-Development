// @ts-check
import { test, expect } from "@playwright/test";

const LOCALHOST_URL = "http://localhost:5173/";

test("app shows the fact and animals", async ({ page }) => {
  await page.goto(LOCALHOST_URL);

  const text = page.locator("p").nth(1);
  const image = page.getByRole("img");

  await expect(text).not.toBeEmpty();

  await expect(image).toHaveAttribute(
    "src",
    /https:\/\/cataas\.com\/cat\/says\//,
  );
});
