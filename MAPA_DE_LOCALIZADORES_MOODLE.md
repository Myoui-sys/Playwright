# Mapa de localizadores — Moodle Aponti Academy

**Página analisada:** [Login do Moodle Aponti Academy](https://moodle.aponti.org.br/login/index.php)  
**Data da inspeção:** 16/10/2026

Este documento apresenta seis elementos importantes da página de login. Para cada elemento, foram registradas alternativas de localização por CSS, texto, role e test-id. Os seletores CSS e a existência de test-id foram verificados diretamente no HTML da página.

> Observação: nenhum dos seis elementos analisados possui os atributos `data-testid` ou `data-test`. Por esse motivo, a opção por test-id foi marcada como indisponível.

## 1. Título “Acesso a Aponti Academy”

HTML encontrado:

```html
<h1 class="login-heading sr-only">Acesso a Aponti Academy</h1>
```

| Forma | Localizador |
|---|---|
| CSS | `h1.login-heading` |
| Texto | `page.getByText('Acesso a Aponti Academy')` |
| Role | `page.getByRole('heading', { name: 'Acesso a Aponti Academy' })` |
| Test-id | Não disponível |

**Localizador escolhido:** `page.getByRole('heading', { name: 'Acesso a Aponti Academy' })`

**Justificativa:** o título possui a função semântica de heading e um nome único na página. O localizador representa o conteúdo percebido pelo usuário e não depende da posição do título no layout.

## 2. Campo de CPF

HTML encontrado:

```html
<input type="text" name="username" id="username" class="form-control form-control-lg" placeholder="CPF">
```

| Forma | Localizador |
|---|---|
| CSS | `#username` |
| Texto | Não disponível no próprio campo; alternativa: `page.getByPlaceholder('CPF')` |
| Role | `page.getByRole('textbox', { name: 'CPF' })` |
| Test-id | Não disponível |

**Localizador escolhido:** `page.getByRole('textbox', { name: 'CPF' })`

**Justificativa:** existe apenas um campo com o nome acessível “CPF”. Esse localizador descreve como o usuário identifica o campo e continua funcionando caso ele mude de posição na página.

## 3. Campo de senha

HTML encontrado:

```html
<input type="password" name="password" id="password" class="form-control form-control-lg" placeholder="Senha">
```

| Forma | Localizador |
|---|---|
| CSS | `#password` |
| Texto | Não disponível no próprio campo; alternativa: `page.getByPlaceholder('Senha')` |
| Role | `page.getByRole('textbox', { name: 'Senha' })` |
| Test-id | Não disponível |

**Localizador escolhido:** `page.getByRole('textbox', { name: 'Senha' })`

**Justificativa:** o campo é identificado de maneira única pelo nome acessível “Senha”. A escolha não depende das classes de estilo nem da organização visual da página.

## 4. Botão “Acessar”

HTML encontrado:

```html
<button class="btn btn-primary btn-block btn-lg" type="submit" id="loginbtn">Acessar</button>
```

| Forma | Localizador |
|---|---|
| CSS | `#loginbtn` |
| Texto | `page.getByText('Acessar', { exact: true })` |
| Role | `page.getByRole('button', { name: 'Acessar', exact: true })` |
| Test-id | Não disponível |

**Localizador escolhido:** `page.getByRole('button', { name: 'Acessar', exact: true })`

**Justificativa:** role e nome identificam exatamente o botão que o usuário utiliza para entrar. O localizador permanece válido mesmo que as classes CSS ou a posição do botão sejam alteradas.

## 5. Link “Perdeu a senha?”

HTML encontrado:

```html
<a href="https://moodle.aponti.org.br/login/forgot_password.php">Perdeu a senha?</a>
```

| Forma | Localizador |
|---|---|
| CSS | `a[href*="forgot_password.php"]` |
| Texto | `page.getByText('Perdeu a senha?', { exact: true })` |
| Role | `page.getByRole('link', { name: 'Perdeu a senha?' })` |
| Test-id | Não disponível |

**Localizador escolhido:** `page.getByRole('link', { name: 'Perdeu a senha?' })`

**Justificativa:** o elemento é um link único e seu nome corresponde ao texto visível. Essa escolha expressa a intenção do teste e não depende da URL completa nem da posição do link.

## 6. Botão “Acessar como visitante”

HTML encontrado:

```html
<button class="btn btn-secondary btn-block" type="submit">Acessar como visitante</button>
```

| Forma | Localizador |
|---|---|
| CSS | `button.btn-secondary[type="submit"]` |
| Texto | `page.getByText('Acessar como visitante', { exact: true })` |
| Role | `page.getByRole('button', { name: 'Acessar como visitante' })` |
| Test-id | Não disponível |

**Localizador escolhido:** `page.getByRole('button', { name: 'Acessar como visitante' })`

**Justificativa:** o botão tem um nome visível e único que informa diretamente sua finalidade. O localizador por role resiste melhor a mudanças de layout ou de classes CSS.

## Conclusão

Os localizadores por `role` foram escolhidos nos seis casos porque representam melhor a forma como uma pessoa encontra e utiliza os elementos na tela. Eles também deixam os testes mais legíveis e menos dependentes da estrutura interna do HTML. Quando um elemento não possui texto próprio, como os campos de CPF e senha, o nome acessível fornecido pelo placeholder permite localizá-lo pela role.
