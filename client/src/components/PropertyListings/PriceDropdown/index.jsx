import React, { useState, useEffect } from 'react';
import './styles.css';
import { createPortal } from 'react-dom';
import { useIsMobile } from '../../../util/useIsMobile';

function PriceDropDown({ onClose, onPriceChange, currentMin, currentMax }) {
  const [minPrice, setMinPrice] = useState(currentMin || '');
  const [maxPrice, setMaxPrice] = useState(currentMax || '');
  const [focusedInput, setFocusedInput] = useState('min');
  const isMobile = useIsMobile();

  const minOptions = ['No Min', '$500', '$700', '$900', '$1,100', '$1,300'];
  const maxOptions = ['$1,500', '$1,700', '$1,900', '$2,100', '$2,500', 'No Max'];

  const optionsToShow = focusedInput === 'min' ? minOptions : maxOptions;

  const handleOptionClick = (option) => {
    if (focusedInput === 'min') {
      const value = option === 'No Min' ? '' : option;
      setMinPrice(value);
    } else {
      const value = option === 'No Max' ? '' : option;
      setMaxPrice(value);
    }
  };

  const handleApply = () => {
    onPriceChange(minPrice, maxPrice);
    onClose();
  };

  // Update local state when props change
  useEffect(() => {
    setMinPrice(currentMin || '');
    setMaxPrice(currentMax || '');
  }, [currentMin, currentMax]);

  const dropdown = (
    <div className='price-dropdown-container'>
      <div className='price-dropdown-range-inputs'>
        <input
          type='text'
          placeholder='Min'
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className={`price-dropdown-input ${focusedInput === 'min' ? 'selected' : ''}`}
          onFocus={() => setFocusedInput('min')}
        />
        <span id='price-dropdown-spacer'>–</span>
        <input
          type='text'
          placeholder='Max'
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className={`price-dropdown-input ${focusedInput === 'max' ? 'selected' : ''}`}
          onFocus={() => setFocusedInput('max')}
        />
      </div>
      <div className='price-dropdown-options-container'>
        <div className={`price-dropdown-options-container ${focusedInput === 'max' ? 'align-right' : 'align-left'}`}>
          {optionsToShow.map((option, idx) => (
            <div
              key={idx}
              className={`price-dropdown-option ${
                (focusedInput === 'min' && minPrice === option) ||
                (focusedInput === 'max' && maxPrice === option)
                  ? 'selected' : ''
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      </div>
      <div className='price-dropdown-apply-button-container'>
        <button className='price-dropdown-apply-button' onClick={handleApply}>
          Apply
        </button>
      </div>
    </div>
  );

  const portalRoot = document.getElementById('portal-root');

  if (isMobile && portalRoot) {
    return createPortal(dropdown, portalRoot);
  }

  return dropdown;
}

export default PriceDropDown;
