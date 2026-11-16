import { Page, Locator } from "@playwright/test";

export class CartPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async removerProduto(nomeProduto: string) {
    const produto = this.page
      .locator(".cart_item")
      .filter({ hasText: nomeProduto });

    await produto.getByRole("button", { name: "Remove" }).click();
  }
}
