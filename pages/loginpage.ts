
import { Page, Locator } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly campoUsuario: Locator;
    readonly campoSenha: Locator;
    readonly botaoLogin: Locator;

    constructor(page: Page) {
        this.page = page;
        this.campoUsuario = page.getByPlaceholder('Username');
        this.campoSenha = page.getByPlaceholder('Password');
        this.botaoLogin = page.getByRole('button', { name: 'Login' });
    }

    async acessar() {
        await this.page.goto('https://www.saucedemo.com');
    }

    async login(usuario: string, senha: string) {
        await this.campoUsuario.fill(usuario);
        await this.campoSenha.fill(senha);
        await this.botaoLogin.click();
    }
}
