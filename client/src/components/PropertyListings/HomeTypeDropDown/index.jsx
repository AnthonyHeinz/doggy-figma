import React, { useState, useEffect } from 'react';
import './styles.css';
import { createPortal } from 'react-dom';
import { useIsMobile } from '../../../util/useIsMobile';

function HomeTypeDropDown({ onClose, onPropertyTypeChange, currentPropertyTypes }) {
  // Updated to match API property types
  const homeTypes = ['Apartment', 'Condo', 'House', 'Room'];
  const [selectedTypes, setSelectedTypes] = useState(currentPropertyTypes || []);
  const isMobile = useIsMobile();

  // Update local state when props change
  useEffect(() => {
    setSelectedTypes(currentPropertyTypes || []);
  }, [currentPropertyTypes]);

  const handleToggle = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleApply = () => {
    onPropertyTypeChange(selectedTypes);
    onClose();
  };

  const dropdown = (
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
      <button id='home-type-dropdown-apply-button' onClick={handleApply}>
        Apply
      </button>
    </div>
  );

  const portalRoot = document.getElementById('portal-root');

  if (isMobile && portalRoot) {
    return createPortal(dropdown, portalRoot);
  }

  return dropdown;
}

export default HomeTypeDropDown;
