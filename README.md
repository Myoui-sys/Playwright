# Testes automatizados com Playwright

Suíte E2E com cinco cenários para a aplicação pública [SauceDemo](https://www.saucedemo.com/):

1. Login com usuário válido;
2. Validação de credenciais inválidas;
3. Navegação entre catálogo e detalhes de produto;
4. Ordenação dos produtos por preço;
5. Fluxo completo de carrinho e checkout.

## Organização

- `tests/pages`: Page Objects com as interações reutilizáveis;
- `tests/fixtures`: criação das páginas e pré-condição de usuário autenticado;
- `tests/data`: usuários, produtos e dados de checkout centralizados;
- `tests/loja.spec.ts`: cenários de negócio concisos, sem duplicar detalhes de interface.

## Execução

```bash
npm install
npx playwright install
npm test
```

Para acompanhar a execução no navegador, use `npm run test:headed`. O relatório HTML é gerado em `playwright-report` e pode ser aberto com `npm run report`.

Por padrão, os testes usam `https://www.saucedemo.com`. Para outro ambiente, defina `BASE_URL` antes da execução.

Se o download dos navegadores não estiver disponível, é possível executar o projeto Chromium com uma instalação local do Google Chrome definindo `PLAYWRIGHT_USE_SYSTEM_CHROME=1`.
