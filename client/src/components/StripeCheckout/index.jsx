import React, { useCallback, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';
import { apiService } from '../../services/apiService';
import './styles.css';

// Initialize Stripe outside the component to avoid re-creation
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const StripeCheckout = ({ priceId = null, metadata = {} }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  
  // Get property data from navigation state
  const { propertyData, serviceType } = location.state || {};

  const fetchClientSecret = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Use priceId from props or default
      const defaultPriceId = import.meta.env.VITE_STRIPE_DEFAULT_PRICE_ID || 'price_default';
      const finalPriceId = priceId || defaultPriceId;
      
      // Combine provided metadata with property data
      const sessionMetadata = {
        ...metadata,
        ...(propertyData && {
          address: propertyData.location,
          source_url: propertyData.propertyUrl,
        })
      };

      console.log('Creating checkout session with metadata:', sessionMetadata);

      const data = await apiService.createCheckoutSession(finalPriceId, sessionMetadata);
      return data.clientSecret;
    } catch (error) {
      console.error('Failed to create checkout session:', error);
      setError('Failed to initialize checkout. Please try again.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [priceId, metadata, propertyData, serviceType]);

  const options = { 
    fetchClientSecret,
    onComplete: () => {
      console.log('Checkout completed successfully');
    }
  };

  if (error) {
    return (
      <div className="stripe-checkout-container">
        <div className="stripe-checkout-error">
          <h2>Payment Error</h2>
          <p>{error}</p>
          <button 
            className="retry-button"
            onClick={() => {
              setError(null);
              window.location.reload();
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="stripe-checkout-container">
      <div className="stripe-checkout-header">
        <h1>Complete Your Payment</h1>
        <p>Secure checkout powered by Stripe</p>
        {propertyData && (
          <div className="property-summary">
            <h3>Send a Viewer Service</h3>
            { propertyData.city && propertyData.state && propertyData.zipCode && (
              <p><strong>Property:</strong> {propertyData.location}</p>
            )}
            {propertyData.propertyUrl && (
              <p><strong>Property URL:</strong> <a href={propertyData.propertyUrl} target="_blank" rel="noopener noreferrer">View Listing</a></p>
            )}
          </div>
        )}
      </div>
      
      {isLoading && (
        <div className="stripe-checkout-loading">
          <p>Loading checkout...</p>
        </div>
      )}

      <div className="stripe-checkout-wrapper">
        <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>
    </div>
  );
};

export default StripeCheckout; 