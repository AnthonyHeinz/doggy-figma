class ApiService {
  constructor() {
    this.baseURL = 'http://localhost:3000/api';
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async addRowToSheet(range, values) {
    return this.request('/sheets/add-row', {
      method: 'POST',
      body: JSON.stringify({
        range,
        values,
      }),
    });
  }

  // Stripe integration methods
  async createCheckoutSession(priceId, metadata = {}) {
    const response = await this.request('/stripe/checkout-session', {
      method: 'POST',
      body: JSON.stringify({
        priceId,
        metadata,
      }),
    });
    
    // Extract the client_secret from the server response structure
    // Server returns: { success: true, data: { client_secret: "..." } }
    return {
      clientSecret: response.data.client_secret
    };
  }

  async getCheckoutSessionStatus(sessionId) {
    const response = await this.request(`/stripe/checkout-session/status?session_id=${sessionId}`, {
      method: 'GET',
    });
    
    // Extract the data from the server response structure
    // Server returns: { success: true, data: { status: "...", customer_email: "...", payment_status: "..." } }
    console.log('response', response);
    return {
      status: response.data.status,
      customer_details: response.data.customer_details,
      payment_status: response.data.payment_status,
      metadata: response.data.metadata,
      cost: response.data.amount_total / 100
    };
  }
}

export const apiService = new ApiService(); 