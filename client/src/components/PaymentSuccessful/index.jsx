import React from 'react';
import './styles.css';

function PaymentSuccessful({ isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <div className='confirm-pay-popup-overlay' onClick={onClose}>
      <div
        className='confirm-pay-popup-box'
        onClick={(e) => e.stopPropagation()}
      ></div>
    </div>
  );
}

export default PaymentSuccessful;
