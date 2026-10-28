import { expect, Page, test } from '@playwright/test';

// Função reutilizável para evitar repetir o login em vários testes.
async function login(page: Page, usuario: string, senha: string) {
  await page.goto('/');
  await page.getByPlaceholder('Username').fill(usuario);
  await page.getByPlaceholder('Password').fill(senha);
  await page.getByRole('button', { name: 'Login' }).click();
}

// Função reutilizável para adicionar um produto pelo nome.
async function adicionarProdutoAoCarrinho(page: Page, nomeProduto: string) {
  const produto = page.locator('.inventory_item').filter({ hasText: nomeProduto });
  await produto.getByRole('button', { name: 'Add to cart' }).click();
}

test.describe('Testes da loja SauceDemo', () => {
  test('1. login com credenciais válidas', async ({ page }) => {
    await login(page, 'standard_user', 'secret_sauce');

    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.getByText('Products', { exact: true })).toBeVisible();
  });

  test('2. login com credenciais inválidas', async ({ page }) => {
    await login(page, 'invalid_user', 'invalid_password');

    await expect(page.getByText('Username and password do not match', { exact: false })).toBeVisible();
    await expect(page).toHaveURL('/');
  });

  test('3. acessar os detalhes de um produto e voltar', async ({ page }) => {
    await login(page, 'standard_user', 'secret_sauce');

    await page.getByRole('button', { name: 'View details for Sauce Labs Backpack' }).first().click();
    await expect(page.getByText('Sauce Labs Backpack', { exact: true })).toBeVisible();

    await page.getByRole('button', { name: 'Back to products' }).click();
    await expect(page.getByText('Products', { exact: true })).toBeVisible();
  });

  test('4. ordenar os produtos pelo menor preço', async ({ page }) => {
    await login(page, 'standard_user', 'secret_sauce');

    await page.getByRole('combobox', { name: 'Sort products' }).selectOption('lohi');

    const textosDosPrecos = await page.locator('.inventory_item_price').allTextContents();
    const precos = textosDosPrecos.map((preco) => Number(preco.replace('$', '')));
    const precosOrdenados = [...precos].sort((a, b) => a - b);

    expect(precos).toEqual(precosOrdenados);
  });

  test('5. adicionar produtos e finalizar a compra', async ({ page }) => {
    await login(page, 'standard_user', 'secret_sauce');

    await adicionarProdutoAoCarrinho(page, 'Sauce Labs Backpack');
    await adicionarProdutoAoCarrinho(page, 'Sauce Labs Bike Light');
    await expect(page.getByRole('button', { name: 'Cart, 2 items' })).toBeVisible();

    await page.getByRole('button', { name: /Cart/ }).click();
    await expect(page.getByRole('button', { name: 'View details for Sauce Labs Backpack' }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: 'View details for Sauce Labs Bike Light' }).first()).toBeVisible();

    await page.getByRole('button', { name: 'Checkout' }).click();
    await page.getByPlaceholder('First Name').fill('Maria');
    await page.getByPlaceholder('Last Name').fill('Silva');
    await page.getByPlaceholder('Zip/Postal Code').fill('01310-100');
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.getByText(/^Total: \$/)).toBeVisible();
    await page.getByRole('button', { name: 'Finish' }).click();
    await expect(page.getByRole('heading', { name: 'Thank you for your order!' })).toBeVisible();
  });
});
