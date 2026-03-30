import { test, expect } from '@playwright/test';
import { LoginPage } from '../modulewise/LoginPage';
import { RegisterPage } from '../modulewise/RegisterPage';

test.describe('Authentication Regression & Validation Flows', () => {
    
  test('Login Flow - Form Field Validations', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    // Step 1: Navigate to the login page
    await loginPage.goto();

    // Step 2: Attempt to login with intentionally invalid credentials
    await test.step('Submit invalid credentials to trigger validation', async () => {
      await loginPage.login('fake@email.com', 'wrongpassword');
      // Assert the application catches this securely
      await loginPage.verifyValidationError('Invalid credentials or server unavailable.');
    });
  });

  test('Registration Flow - Password Match Validation', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    
    // Step 1: Navigate to Registration
    await registerPage.goto();

    // Step 2: Trigger the password mismatch field validation logic
    await test.step('Submit passwords that do not match', async () => {
        await registerPage.register(
            'Test User', 
            'test@fitmanager.com', 
            'SecurePass123!', 
            'DifferentPass456!'  // Explicitly mismatching
        );
        // Assuming the app has client/server side validation for passwords:
        await registerPage.verifyErrorMessage('Passwords do not match');
    });
  });

  // Future Tests: Successful Login, Password Strength validation, etc.
});
