import { APIRequestContext } from '@playwright/test';

/**
 * Service-wise architecture:
 * Using this class to establish direct API interactions to setup state,
 * seed data, bypassing UI steps when doing deep regression.
 */
export class ApiHelper {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  /**
   * Example: Authenticate directly against the API to fetch a token 
   * for state setup in advanced Test suites instead of UI login.
   */
  async getAuthToken(email: string, password: string): Promise<string | null> {
    try {
        const response = await this.request.post('http://127.0.0.1:8000/api/login', {
            data: { email, password }
        });
        if (response.ok()) {
            const body = await response.json();
            return body.access_token;
        }
        return null;
    } catch(e) {
        return null;
    }
  }

  // Future: Seed test data, cleanup test data, etc.
}
