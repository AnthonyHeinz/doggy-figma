import React, { useState } from 'react';
import './styles.css';
import { createPortal } from 'react-dom';
import { useIsMobile } from '../../../util/useIsMobile';

function LeaseTypeDropDown({ onClose }) {
  const leaseTypes = ['Rent', 'Sublease'];
  const [selectedTypes, setSelectedTypes] = useState([]);
  const isMobile = useIsMobile();

  const handleToggle = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const dropdown = (
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

  const portalRoot = document.getElementById('portal-root');

  if (isMobile && portalRoot) {
    return createPortal(dropdown, portalRoot);
  }

  return dropdown;
}

export default LeaseTypeDropDown;
