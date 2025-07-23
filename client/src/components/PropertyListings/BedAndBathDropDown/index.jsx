import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import '../BedAndBathDropDown/styles.css';
import { useIsMobile } from '../../../util/useIsMobile';

function BedAndBathDropDown({ 
  onClose, 
  onBedroomChange, 
  onBathroomChange, 
  currentBedrooms, 
  currentBathrooms 
}) {
  const [selectedBed, setSelectedBed] = useState(currentBedrooms || 'Any');
  const [selectedBath, setSelectedBath] = useState(currentBathrooms || 'Any');
  const isMobile = useIsMobile();

  const bedOptions = ['Any', 'Studio', '1+', '2+', '3+', '4+', '5+'];
  const bathOptions = ['Any', '1+', '2+', '3+', '4+', '5+'];

  // Update local state when props change
  useEffect(() => {
    setSelectedBed(currentBedrooms || 'Any');
    setSelectedBath(currentBathrooms || 'Any');
  }, [currentBedrooms, currentBathrooms]);

  const handleApply = () => {
    onBedroomChange(selectedBed === 'Any' ? null : selectedBed);
    onBathroomChange(selectedBath === 'Any' ? null : selectedBath);
    onClose();
  };

  const dropdown = (
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
      <button id='bed-and-bath-dropdown-apply-button' onClick={handleApply}>
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

export default BedAndBathDropDown;
