import React from 'react';
import { useState } from 'react';
import './styles.css';

function HomeTypeDropDown({ onClose }) {
  const homeTypes = ['Room', 'Apartment', 'Condo', 'House'];
  const [selectedTypes, setSelectedTypes] = useState([]);

  const handleToggle = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  return (
    <div className='home-type-dropdown-container'>
      {homeTypes.map((type) => (
        <label key={type} className='home-type-dropdown-option'>
          <input
            type='checkbox'
            checked={selectedTypes.includes(type)}
            onChange={() => handleToggle(type)}
          />
          <span className='home-type-dropdown-custom-checkmark' />
          {type}
        </label>
      ))}
      <button id='home-type-dropdown-apply-button' onClick={onClose}>
        Apply
      </button>
    </div>
  );
}

export default HomeTypeDropDown;
