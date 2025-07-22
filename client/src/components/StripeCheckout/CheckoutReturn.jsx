import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { apiService } from '../../services/apiService';
import './styles.css';

const CheckoutReturn = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState(null);
  const [customerDetails, setCustomerDetails] = useState('');
  const [metadata, setMetadata] = useState({});
  const [cost, setCost] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Flag to track if Google Sheets submission has been completed
  const hasSubmittedToSheets = useRef(false);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      setError('No session ID found in URL');
      setIsLoading(false);
      return;
    }

    const fetchSessionStatus = async () => {
      try {
        setIsLoading(true);
        const data = await apiService.getCheckoutSessionStatus(sessionId);
        setStatus(data.status);
        setCustomerDetails(data.customer_details || '');
        setMetadata(data.metadata || {});
        setCost(data.cost || 0);
      } catch (error) {
        console.error('Failed to fetch session status:', error);
        setError('Failed to verify payment status. Please contact support.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSessionStatus();
  }, [searchParams]);

  // ✅ CORRECT - Handle Google Sheets submission in useEffect
  useEffect(() => {
    const submitToGoogleSheets = async () => {
      if (status === 'complete' && !hasSubmittedToSheets.current) {
        console.log('Submitting to Google Sheets...');
        hasSubmittedToSheets.current = true; // Mark as submitted immediately
        
        try {
          await handleGoogleSheetsSubmit();
          console.log('Successfully submitted to Google Sheets');
        } catch (error) {
          console.error('Failed to submit to Google Sheets:', error);
          // Reset flag on error so user can retry if needed
          hasSubmittedToSheets.current = false;
        }
      }
    };

    submitToGoogleSheets();
  }, [status, customerDetails, metadata, cost]); // Dependencies ensure we have all data

  const handleGoogleSheetsSubmit = async () => {
    setError(null);
    let status = metadata.address ? 'Waiting for Viewer Assignment' : 'Reach Out for Property Details';

    try {
      // Prepare data for Google Sheets
      const pacificTime = new Date().toLocaleString('en-US', {
        timeZone: 'America/Los_Angeles',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });

      const rowData = [
        [
          pacificTime,           // Timestamp
          customerDetails.name,     // Full Name
          customerDetails.email,        // Email
          customerDetails.phone,  // Phone
          metadata.address,      // Property Address
          cost, // Cost
          status, // Status
          metadata.source_url,     // Property URL
        ]
      ];

      // Send to Google Sheets API
      await apiService.addRowToSheet('Sheet1!A:I', rowData);
    
    } catch (err) {
      setError('Failed to process payment. Please try again.');
      console.error('Submission error:', err);
      throw err; // Re-throw to let useEffect handle the error state
    }
  };

  // Redirect to checkout if session is still open
  if (status === 'open') {
    navigate('/checkout');
    return null;
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="checkout-return-container">
        <div className="checkout-return-loading">
          <h2>Verifying your payment...</h2>
          <p>Please wait while we confirm your transaction.</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="checkout-return-container">
        <div className="checkout-return-error">
          <h2>Payment Verification Error</h2>
          <p>{error}</p>
          <div className="checkout-return-actions">
            <button 
              className="return-home-button"
              onClick={() => navigate('/')}
            >
              Return Home
            </button>
            <button 
              className="retry-button"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ✅ CORRECT - Clean render without side effects
  if (status === 'complete') {
    return (
      <div className="checkout-return-container">
        <div className="checkout-return-success">
          <div className="success-icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" fill="#10B981"/>
              <path d="M8 12L11 15L16 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          
          <h2>Payment Successful!</h2>
          
          <p className="success-message">
            Thank you for your payment. Your transaction has been processed successfully.
          </p>
          
          {customerDetails && (
            <div className="email-confirmation">
              <p>
                A confirmation email has been sent to <strong>{customerDetails.email}</strong>
              </p>
              <p>
                <strong>Someone will reach out to you about this property viewing request</strong>
              </p>
            </div>
            
          )}

                    
          <div className="checkout-return-actions">
            <button 
              className="return-home-button primary"
              onClick={() => navigate('/')}
            >
              Return Home
            </button>
            <button 
              className="view-profile-button"
              onClick={() => navigate('/profile')}
            >
              View Profile
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Fallback for unknown status
  return (
    <div className="checkout-return-container">
      <div className="checkout-return-error">
        <h2>Unknown Payment Status</h2>
        <p>We couldn't determine your payment status. Please contact support if you have any concerns.</p>
        <button 
          className="return-home-button"
          onClick={() => navigate('/')}
        >
          Return Home
        </button>
      </div>
    </div>
  );
};

export default CheckoutReturn; 