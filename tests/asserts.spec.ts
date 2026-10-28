import { test, expect } from "@playwright/test";

test.describe("Testes de login - SauceDemo", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
  });

  test("01 - Deve verificar o título da página", async ({ page }) => {
    await expect(page).toHaveTitle("Swag Labs");
  });

  test("02 - Deve verificar se o campo de usuário está visível", async ({
    page,
  }) => {
    const campoUsuario = page.getByPlaceholder("Username");

    await expect(campoUsuario).toBeVisible();
  });

  test("03 - Deve verificar se o botão de login está habilitado", async ({
    page,
  }) => {
    const botaoLogin = page.getByRole("button", { name: "Login" });

    await expect(botaoLogin).toBeEnabled();
  });

  test("04 - Deve realizar login com sucesso", async ({ page }) => {
    await page.getByPlaceholder("Username").fill("standard_user");
    await page.getByPlaceholder("Password").fill("secret_sauce");

    await page.getByRole("button", { name: "Login" }).click();

    await expect(page).toHaveURL(/inventory.html/);
  });

  test("05 - Deve verificar o título da página de produtos", async ({
    page,
  }) => {
    await page.getByPlaceholder("Username").fill("standard_user");
    await page.getByPlaceholder("Password").fill("secret_sauce");

    await page.getByRole("button", { name: "Login" }).click();

    const tituloProdutos = page.locator(".title");

    await expect(tituloProdutos).toHaveText("Products");
  });

  test("06 - Deve verificar a quantidade de produtos exibidos", async ({
    page,
  }) => {
    await page.getByPlaceholder("Username").fill("standard_user");
    await page.getByPlaceholder("Password").fill("secret_sauce");

    await page.getByRole("button", { name: "Login" }).click();

    const produtos = page.locator(".inventory_item");

    await expect(produtos).toHaveCount(6);
  });

  test("07 - Deve exibir uma mensagem de erro ao tentar login sem preencher os campos", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Login" }).click();

    const mensagemErro = page.locator('[data-test="error"]');

    await expect(mensagemErro).toContainText("Username is required");
  });
});

// 1. Escolhi o toHaveTitle() para verificar se o título da aba do navegador corresponde ao esperado.

// 2. Escolhi o toBeVisible() para verificar se o campo de usuário está visível na tela e disponível para interação.

// 3. Escolhi o toBeEnabled() para verificar se o botão de login está habilitado e pode ser utilizado pelo usuário.

// 4. Escolhi o toHaveURL() para verificar se, após o login com credenciais válidas, o usuário é redirecionado para a página de produtos.

// 5. Escolhi o toHaveText() para verificar se o título da página de produtos corresponde exatamente ao texto esperado.

// 6. Escolhi o toHaveCount() para verificar se a quantidade de produtos exibidos corresponde ao resultado esperado.

// 7. Escolhi o toContainText() para verificar se a mensagem de erro contém o texto esperado ao tentar realizar o login sem informar o usuário.
