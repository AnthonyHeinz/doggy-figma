import React from 'react';
import { useState } from 'react';
import '../BedAndBathDropDown/styles.css';

function BedAndBathDropDown({ onClose }) {
  const [selectedBed, setSelectedBed] = useState('Any');
  const [selectedBath, setSelectedBath] = useState('Any');
  const bedOptions = ['Any', 'Studio', '1+', '2+', '3+'];
  const bathOptions = ['Any', '1+', '2+', '3+'];

  return (
    <div id='bed-and-bath-dropdown-container'>
      <h3>Beds</h3>
      <div className='bed-and-bath-dropdown-option-row'>
        {bedOptions.map((option) => (
          <button
            key={option}
            className={`bed-and-bath-dropdown-option-button ${
              selectedBed === option ? 'selected' : ''
            }`}
            onClick={() => setSelectedBed(option)}
          >
            {option}
          </button>
        ))}
      </div>
      <h3>Baths</h3>
      <div className='bed-and-bath-dropdown-option-row'>
        {bathOptions.map((option) => (
          <button
            key={option}
            className={`bed-and-bath-dropdown-option-button ${
              selectedBath === option ? 'selected' : ''
            }`}
            onClick={() => setSelectedBath(option)}
          >
            {option}
          </button>
        ))}
      </div>
      <button id='bed-and-bath-dropdown-apply-button' onClick={onClose}>
        Apply
      </button>
    </div>
  );
}

export default BedAndBathDropDown;
