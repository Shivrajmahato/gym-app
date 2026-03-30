import { Page, Locator, expect } from '@playwright/test';

export class RegisterPage {
  readonly page: Page;
  readonly fullNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    // We define clean selectors for interacting with the page
    this.fullNameInput = page.locator('input[placeholder="John Doe"]');
    this.emailInput = page.locator('input[type="email"]');
    this.passwordInput = page.locator('input[placeholder="••••••••"]').first();
    this.confirmPasswordInput = page.locator('input[placeholder="••••••••"]').nth(1);
    this.submitButton = page.locator('button[type="submit"]');
    this.errorMessage = page.locator('.badge-danger');
  }

  async goto() {
    await this.page.goto('/register');
  }

  async register(fullName: string, email: string, password: string, confirm: string) {
    await this.fullNameInput.fill(fullName);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(confirm);
    await this.submitButton.click();
  }

  async verifyErrorMessage(expectedMessage: string) {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(expectedMessage);
  }
}
