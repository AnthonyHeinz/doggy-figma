import React from 'react';
import { useState } from 'react';
import './styles.css';

function LeaseTypeDropDown({ onClose }) {
  const leaseTypes = ['Rent', 'Sublease'];
  const [selectedTypes, setSelectedTypes] = useState([]);

  const handleToggle = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  return (
    <div className='lease-type-dropdown-container'>
      {leaseTypes.map((type) => (
        <label key={type} className='lease-type-dropdown-option'>
          <input
            type='checkbox'
            checked={selectedTypes.includes(type)}
            onChange={() => handleToggle(type)}
          />
          <span className='lease-type-dropdown-custom-checkmark' />
          {type}
        </label>
      ))}
      <button id='lease-type-dropdown-apply-button' onClick={onClose}>
        Apply
      </button>
    </div>
  );
}

export default LeaseTypeDropDown;
