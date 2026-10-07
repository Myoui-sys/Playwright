import { test, expect, Page } from '@playwright/test'

async function login(page: Page, nome: string, senha: string) {
    await page.goto('https://www.saucedemo.com');
    await page.getByPlaceholder('Username').fill(nome);
    await page.getByPlaceholder('Password').fill(senha);
    await page.getByRole('button', { name: 'Login' }).click();
}

test.describe("login", () => {
    test("login com credenciais válidas", async ({ page }) => {
        await login(page, "standard_user", "secret_sauce");
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    });

    test("login com credenciais inválidas", async ({ page }) => {
        await login(page, "invalid_user", "invalid_password");
        await expect(page.getByText("Epic sadface: Username and password do not match any user in this service")).toBeVisible();
    });
});