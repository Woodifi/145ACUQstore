/**
 * Q-Store IMS Authentication Module
 * Handles MSAL login and token management
 */

const AUTH_CONFIG = {
  backendUrl: process.env.NODE_ENV === 'production' 
    ? 'https://yourdomain.com' 
    : 'http://localhost:3000',
  
  msalConfig: {
    auth: {
      clientId: 'YOUR_PUBLIC_CLIENT_ID', // From Azure Portal - NOT SECRET
      authority: 'https://login.microsoftonline.com/YOUR_TENANT_ID',
      redirectUri: 'http://localhost:3000/auth/callback'
    },
    cache: { cacheLocation: 'sessionStorage' },
    system: { loggerOptions: { loggerCallback() {}, piiLoggingEnabled: false } }
  },
  
  scopes: ['user.read']
};

class QStoreAuth {
  constructor() {
    this.msalInstance = null;
    this.account = null;
    this.accessToken = null;
    this.tokenExpiresAt = null;
  }

  /**
   * Initialize MSAL after library loads
   */
  async init() {
    if (!window.__msalReady) {
      console.error('MSAL not ready');
      return false;
    }

    try {
      this.msalInstance = new msal.PublicClientApplication(AUTH_CONFIG.msalConfig);
      await this.msalInstance.initialize();
      
      const accounts = this.msalInstance.getAllAccounts();
      if (accounts.length > 0) {
        this.account = accounts[0];
        console.log('User already logged in:', this.account.username);
        return true;
      }
      return false;
    } catch (error) {
      console.error('MSAL initialization error:', error);
      return false;
    }
  }

  /**
   * Initiate login flow
   */
  async login() {
    try {
      const response = await this.msalInstance.loginPopup({
        scopes: AUTH_CONFIG.scopes,
        prompt: 'select_account'
      });

      this.account = response.account;
      this.msalInstance.setActiveAccount(this.account);

      // Exchange code with backend
      await this.exchangeCodeForToken(response.accessToken);
      
      console.log('Login successful:', this.account.username);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  }

  /**
   * Exchange MSAL token with backend for secure session
   */
  async exchangeCodeForToken(code) {
    try {
      const response = await fetch(`\`${AUTH_CONFIG.backendUrl}/api/auth/token\``, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
        credentials: 'include' // Send session cookie
      });

      if (!response.ok) {
        throw new Error('Token exchange failed');
      }

      const data = await response.json();
      this.accessToken = data.accessToken;
      this.tokenExpiresAt = Date.now() + (data.expiresIn * 1000);

      return data.accessToken;
    } catch (error) {
      console.error('Token exchange error:', error);
      throw error;
    }
  }

  /**
   * Get valid access token (refresh if needed)
   */
  async getAccessToken() {
    // Check if token is still valid (with 5-minute buffer)
    if (this.accessToken && this.tokenExpiresAt > Date.now() + 300000) {
      return this.accessToken;
    }

    // Token expired, try to refresh
    try {
      const response = await fetch(`\`${AUTH_CONFIG.backendUrl}/api/auth/refresh\``, {
        method: 'POST',
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        this.accessToken = data.accessToken;
        this.tokenExpiresAt = Date.now() + (data.expiresIn * 1000);
        return data.accessToken;
      }
    } catch (error) {
      console.error('Token refresh error:', error);
    }

    throw new Error('Unable to get valid token');
  }

  /**
   * Get current user info
   */
  async getCurrentUser() {
    try {
      const response = await fetch(`\`${AUTH_CONFIG.backendUrl}/api/auth/me\``, {
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to get user info');
      }

      return await response.json();
    } catch (error) {
      console.error('Get user error:', error);
      return null;
    }
  }

  /**
   * Logout
   */
  async logout() {
    try {
      await fetch(`\`${AUTH_CONFIG.backendUrl}/api/auth/logout\``, {
        method: 'POST',
        credentials: 'include'
      });

      if (this.msalInstance) {
        await this.msalInstance.logout();
      }

      this.account = null;
      this.accessToken = null;
      this.tokenExpiresAt = null;

      console.log('Logged out successfully');
      return true;
    } catch (error) {
      console.error('Logout error:', error);
      return false;
    }
  }

  /**
   * Check if authenticated
   */
  isAuthenticated() {
    return !!this.account && !!this.accessToken;
  }

  /**
   * Get current account
   */
  getAccount() {
    return this.account;
  }
}

// Global instance
window.qstoreAuth = new QStoreAuth();

// Auto-initialize when MSAL loads
document.addEventListener('DOMContentLoaded', async () => {
  const maxWait = 30; // 30 seconds
  let waited = 0;
  
  while (!window.__msalReady && waited < maxWait) {
    await new Promise(resolve => setTimeout(resolve, 100));
    waited += 0.1;
  }

  if (window.__msalReady) {
    await window.qstoreAuth.init();
  }
});