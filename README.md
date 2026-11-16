# Testes Automatizados com Playwright

Este projeto contém testes automatizados desenvolvidos com **Playwright e TypeScript**, utilizando a aplicação [SauceDemo](https://www.saucedemo.com/) e o Moodle Aponti Academy como ambientes de teste.

O projeto utiliza o padrão **Page Object Model (POM)** para organizar os elementos e as ações das páginas, promovendo a reutilização de código, a manutenção e a organização dos testes.

## Tecnologias utilizadas

- TypeScript
- Playwright
- Node.js
- Page Object Model (POM)

## Estrutura do projeto

```text
Playwright/
├── pages/
│   ├── loginPage.ts
│   ├── inventoryPage.ts
│   └── cartPage.ts
│
├── tests/
│   ├── acoes.spec.ts
│   ├── asserts.spec.ts
│   └── loja.spec.ts
│
├── playwright.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

### Organização das páginas e dos testes

A estrutura utiliza o padrão Page Object Model (POM), separando as responsabilidades:

- **loginPage.ts:** centraliza os seletores e as ações relacionadas ao login, incluindo preenchimento dos campos e autenticação.
- **inventoryPage.ts:** concentra as ações da página de produtos, como adicionar produtos ao carrinho e acessar o carrinho.
- **cartPage.ts:** concentra as ações relacionadas ao carrinho, como remover produtos.
- **loja.spec.ts:** contém os cenários de teste e as validações realizadas na aplicação.

Essa organização evita a repetição de comandos e facilita a manutenção dos testes.

## Casos de teste e validações — SauceDemo

O arquivo `tests/loja.spec.ts` contém cinco cenários de testes automatizados.

### 1. Login com credenciais válidas

- Preenche o usuário e a senha;
- Clica no botão de login;
- Valida se o usuário foi direcionado para a página de produtos;
- Valida se o texto `Products` está visível.

### 2. Login com credenciais inválidas

- Preenche um usuário e uma senha inválidos;
- Clica no botão de login;
- Valida se a mensagem de erro é exibida;
- Valida se o usuário continua na página de login.

### 3. Navegação para os detalhes do produto

- Realiza o login;
- Acessa os detalhes da mochila `Sauce Labs Backpack`;
- Valida se o nome do produto está visível;
- Retorna para o catálogo e valida se a página de produtos foi exibida.

### 4. Ordenação dos produtos por preço

- Realiza o login;
- Seleciona a opção de menor para maior preço;
- Obtém os preços apresentados na tela;
- Valida se os preços estão na ordem correta.

### 5. Carrinho e finalização da compra

- Realiza o login;
- Adiciona dois produtos ao carrinho;
- Valida se o carrinho contém dois itens;
- Valida se os produtos escolhidos aparecem no carrinho;
- Preenche os dados do cliente;
- Valida se o valor total é exibido;
- Finaliza a compra e valida a mensagem de sucesso.

As validações são realizadas com o comando `expect` do Playwright, comparando os resultados encontrados na aplicação com os resultados esperados.

## Testes de ações básicas — Moodle Aponti Academy

O arquivo `tests/acoes.spec.ts` contém quatro testes realizados no Moodle Aponti Academy:

1. **Click:** clica no link `Perdeu a senha?` e valida a mudança de página.
2. **Fill:** preenche os campos de CPF e senha e valida os valores informados.
3. **Submit:** envia o formulário com dados inválidos e valida a mensagem de erro.
4. **Download:** baixa o edital disponível na página inicial e valida se o arquivo foi recebido.

Para executar somente esses testes no Chromium:

```bash
npx playwright test tests/acoes.spec.ts --project=chromium
```

## Mapa de localizadores do Moodle

O arquivo [`MAPA_DE_LOCALIZADORES_MOODLE.md`](./MAPA_DE_LOCALIZADORES_MOODLE.md) apresenta seis elementos da página de login do Moodle Aponti Academy.

Para cada elemento, o documento informa:

- Seletor CSS;
- Localização por texto;
- Localização por role;
- Disponibilidade de test-id;
- Localizador escolhido para o teste;
- Justificativa da escolha.

Os elementos foram verificados diretamente no HTML da página em 16/10/2026.

## Instalação e execução

### 1. Instalar as dependências

```bash
npm install
```

### 2. Instalar os navegadores do Playwright

```bash
npx playwright install
```

### 3. Executar todos os testes

```bash
npm test
```

### 4. Executar os testes com o navegador visível

```bash
npm run test:headed
```

### 5. Executar um arquivo específico

```bash
npx playwright test tests/loja.spec.ts
```

## Evidências da execução

O Playwright gera um relatório HTML com os resultados dos testes.

No teste de download, o edital baixado também é anexado ao relatório como evidência.

Para abrir o relatório após a execução:

```bash
npm run report
```

---

**Objetivo do projeto:** praticar automação de testes com Playwright e TypeScript, aplicar técnicas de validação com `expect`, trabalhar com diferentes ações de interação e organizar os testes utilizando o padrão Page Object Model (POM).
