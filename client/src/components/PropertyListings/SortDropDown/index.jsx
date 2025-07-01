import React from 'react';
import { useState } from 'react';
import './styles.css';

function SortDropDown({ onClose }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const sortOptions = [
    'Homes for you',
    'Newest',
    'Price (Low to High)',
    'Price (High to Low)',
  ];

  return (
    <div className='price-dropdown-container'>
      <div id='property-listing-sort-dropdown-options-container'>
        {sortOptions.map((option, idx) => (
          <div
            key={idx}
            className={`sort-dropdown-option ${
              selectedOption === option ? 'selected' : ''
            }`}
            onClick={() => setSelectedOption(option)}
          >
            {option}
          </div>
        ))}
        <div className='sort-dropdown-apply-button-container'>
          <button className='sort-dropdown-apply-button' onClick={onClose}>
            Sort
          </button>
        </div>
      </div>
    </div>
  );
}

export default SortDropDown;
