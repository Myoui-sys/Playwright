# Testes automatizados com Playwright

Este projeto contém cinco testes automatizados da aplicação [SauceDemo](https://www.saucedemo.com/), desenvolvidos com Playwright e TypeScript.

## Casos de teste e validações

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

As validações são feitas com o comando `expect` do Playwright. Ele compara o resultado encontrado na aplicação com o resultado esperado pelo teste.

## Reutilização de código

O arquivo `tests/loja.spec.ts` possui duas funções reutilizáveis:

- `login`: realiza o acesso à aplicação;
- `adicionarProdutoAoCarrinho`: adiciona um produto usando seu nome.

Essas funções evitam repetir os mesmos comandos em vários testes.

## Como executar

Instale as dependências e os navegadores:

```bash
npm install
npx playwright install
```

Execute os testes:

```bash
npm test
```

Para acompanhar os testes no navegador:

```bash
npm run test:headed
```

## Testes de ações básicas

O arquivo `tests/acoes.spec.ts` contém quatro testes realizados no Moodle Aponti Academy:

1. **Click:** clica no link `Perdeu a senha?` e valida a mudança de página;
2. **Fill:** preenche os campos de CPF e senha e valida os valores informados;
3. **Submit:** envia o formulário com dados inválidos e valida a mensagem de erro;
4. **Download:** baixa o edital disponível na página inicial e valida se o arquivo foi recebido.

Execute somente esses testes com:

```bash
npx playwright test tests/acoes.spec.ts --project=chromium
```

### Evidência da execução

O Playwright gera um relatório HTML com o resultado dos testes. No teste de download, o edital baixado também é anexado ao relatório como evidência.

Para abrir o relatório após a execução:

```bash
npm run report
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
