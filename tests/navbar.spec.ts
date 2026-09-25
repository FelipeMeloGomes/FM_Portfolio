import { expect, test } from "@playwright/test";

test.describe("Navbar", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/pt");
  });

  test("deve estar visivel", async ({ page }) => {
    await expect(page.locator("nav")).toBeVisible();
  });

  test("deve ter toggle de tema", async ({ page }) => {
    const toggle = page.locator(
      "button[aria-label*='tema'], button[aria-label*='theme']"
    );
    await expect(toggle.first()).toBeVisible();
  });

  test("deve alternar para ingles", async ({ page }) => {
    await page
      .locator("button:has-text('EN'), a:has-text('EN')")
      .first()
      .click();
    await expect(page).toHaveURL(/\/en/);
  });

  test("deve alternar para portugues", async ({ page }) => {
    await page.goto("/en");
    await page
      .locator("button:has-text('PT'), a:has-text('PT')")
      .first()
      .click();
    await expect(page).toHaveURL(/\/pt/);
  });

  const active = (page: import("@playwright/test").Page) =>
    page.locator('nav a[aria-current="true"]');

  test("deve marcar Home no topo da pagina", async ({ page }) => {
    await expect(active(page)).toHaveCount(1);
    await expect(active(page)).toHaveAttribute("href", "#home");
  });

  test("deve marcar a secao clicada na navbar", async ({ page, viewport }) => {
    // Só desktop: abaixo de md o <ul> da navbar é `hidden md:flex` e o projeto
    // não tem menu mobile, então os links existem no DOM mas não são visíveis —
    // clicar neles é impossível e o timeout não significaria falha do produto.
    test.skip(
      (viewport?.width ?? 0) < 768,
      "links da navbar não são visíveis abaixo de md"
    );

    // Regressão: o probe precisa ser MAIOR que o scroll-padding-top, senão a
    // seção recém-clicada nunca é marcada e o item anterior continua ativo.
    for (const section of [
      "about",
      "carreira",
      "skills",
      "projects",
      "books",
    ]) {
      await page.locator(`nav a[href="#${section}"]`).click();
      await expect(active(page)).toHaveCount(1);
      await expect(active(page)).toHaveAttribute("href", `#${section}`);
    }
  });

  test("deve marcar a ultima secao ao chegar no rodape", async ({ page }) => {
    // Repetir o scroll dentro de toPass: sob carga o layout ainda cresce depois
    // de scrollHeight ser lido, e a rolagem não chega ao fundo. Nesse caso o
    // probe não marca #contact, que é o comportamento correto.
    await expect(async () => {
      await page.evaluate(() =>
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "instant",
        })
      );
      await expect(active(page)).toHaveAttribute("href", "#contact");
    }).toPass({ timeout: 15000 });
  });

  test("nunca deve marcar mais de um item", async ({ page }) => {
    for (const y of [0, 800, 2000, 3500, 5000, 7000]) {
      await page.evaluate((top) => {
        window.scrollTo({ top, behavior: "instant" });
      }, y);
      await expect(active(page)).toHaveCount(1);
    }
  });
});
