import React from 'react';
import './styles.css';
import greenCheck from '../../assets/green_Check_Mark.png';

function PaymentSuccessful({ isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <div className='payment-successful-popup-overlay' onClick={onClose}>
      <div
        className='payment-successful-popup-box'
        onClick={(e) => e.stopPropagation()}
      >
        <button className='payment-successful-close-button' onClick={onClose}>
          ×
        </button>

        <div id='payment-successful-word-box'>
          <img
            src={greenCheck}
            alt='Green-Check'
            id='payment-successful-green-check'
          />
          <h5>Payment Successful</h5>
          <p>
            A confirmation email has been sent to you. Your Viewer will send
            your report within 3 business days.
          </p>
          <button id='payment-successful-send-a-viewer-button'>
            Return to Property Listing
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccessful;
