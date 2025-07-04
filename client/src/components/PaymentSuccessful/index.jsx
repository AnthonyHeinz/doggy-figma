import React from 'react';
import './styles.css';

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
      </div>
    </div>
  );
}

export default PaymentSuccessful;
