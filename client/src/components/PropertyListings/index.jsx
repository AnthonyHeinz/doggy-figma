import React from 'react';
import './styles.css';

function PriceDropDown({ onClose }) {
  return (
    <div className='price-dropdown-container'>
      <div className='price-dropdown-range-inputs'>
        <input
          type='text'
          placeholder='Min'
          className='price-dropdown-input selected'
        />
        <span>–</span>
        <input type='text' placeholder='Max' className='price-dropdown-input' />
      </div>
      <div className='price-dropdown-options-container'>
        <div className='price-dropdown-option'>No Min</div>
        <div className='price-dropdown-option'>$500</div>
        <div className='price-dropdown-option'>$700</div>
        <div className='price-dropdown-option'>$900</div>
      </div>
      <button className='apply-dropdown-button' onClick={onClose}>
        Apply
      </button>
    </div>
  );
}

export default PriceDropDown;
