import { expect, test } from '@playwright/test';

const paginaDeLogin = 'https://moodle.aponti.org.br/login/index.php';

test.describe('Ações básicas no Moodle', () => {
  test('Click: abrir a página de recuperação de senha', async ({ page }) => {
    await page.goto(paginaDeLogin);

    await page.getByRole('link', { name: 'Perdeu a senha?' }).click();

    await expect(page).toHaveURL(/forgot_password\.php/);
  });

  test('Fill: preencher os campos de CPF e senha', async ({ page }) => {
    await page.goto(paginaDeLogin);

    const campoCpf = page.getByRole('textbox', { name: 'CPF' });
    const campoSenha = page.getByRole('textbox', { name: 'Senha' });

    await campoCpf.fill('12345678900');
    await campoSenha.fill('senha123');

    await expect(campoCpf).toHaveValue('12345678900');
    await expect(campoSenha).toHaveValue('senha123');
  });

  test('Submit: enviar o formulário com dados inválidos', async ({ page }) => {
    await page.goto(paginaDeLogin);
    await page.getByRole('textbox', { name: 'CPF' }).fill('12345678900');
    await page.getByRole('textbox', { name: 'Senha' }).fill('senha_invalida');

    await page.getByRole('button', { name: 'Acessar', exact: true }).click();

    await expect(page.getByRole('alert')).toContainText('Nome de usuário ou senha errados');
  });

  test('Download: baixar o edital disponível na página inicial', async ({ page }, testInfo) => {
    await page.goto('https://moodle.aponti.org.br/');

    const linkDoEdital = page.getByRole('link', { name: /Edital FAP\.2026/ }).first();
    const enderecoDoArquivo = await linkDoEdital.getAttribute('href');
    expect(enderecoDoArquivo).not.toBeNull();

    const resposta = await page.request.get(enderecoDoArquivo!);
    const arquivo = await resposta.body();

    expect(resposta.ok()).toBeTruthy();
    expect(arquivo.length).toBeGreaterThan(0);

    await testInfo.attach('edital-baixado', {
      body: arquivo,
      contentType: resposta.headers()['content-type'] ?? 'application/octet-stream',
    });
  });
});
