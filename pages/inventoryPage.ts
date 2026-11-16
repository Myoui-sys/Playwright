import { Page, Locator } from "@playwright/test";

export class InventoryPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async adicionarProdutoAoCarrinho(nomeProduto: string) {
    const produto = this.page
      .locator(".inventory_item")
      .filter({ hasText: nomeProduto });

    await produto.getByRole("button", { name: "Add to cart" }).click();
  }

  async acessarCarrinho() {
    await this.page.locator(".shopping_cart_link").click();
  }
}
