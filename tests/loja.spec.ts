import { expect, Page, test } from "@playwright/test";

import { LoginPage } from "../pages/loginPage";
import { InventoryPage } from "../pages/inventoryPage";
import { CartPage } from "../pages/cartPage";

test.describe("Testes da loja SauceDemo", () => {
  test("1. Login com credenciais válidas", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.acessar();
    await loginPage.login("standard_user", "secret_sauce");

    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.getByText("Products")).toBeVisible();
  });

  test("2. Login com credenciais inválidas", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.acessar();
    await loginPage.login("usuario_invalido", "senha_invalida");

    await expect(page.locator('[data-test="error"]')).toBeVisible();
  });

  test("3. Adicionar produto ao carrinho", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.acessar();
    await loginPage.login("standard_user", "secret_sauce");

    await inventoryPage.adicionarProdutoAoCarrinho("Sauce Labs Backpack");

    await expect(page.locator(".shopping_cart_badge")).toHaveText("1");
  });

  test("4. Remover produto do carrinho", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await loginPage.acessar();
    await loginPage.login("standard_user", "secret_sauce");

    await inventoryPage.adicionarProdutoAoCarrinho("Sauce Labs Backpack");

    await inventoryPage.acessarCarrinho();

    await cartPage.removerProduto("Sauce Labs Backpack");

    await expect(page.locator(".cart_item")).toHaveCount(0);
  });
});
