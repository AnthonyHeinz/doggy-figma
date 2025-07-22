import React from 'react';
import './styles.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmAndPayPopUp from '../../ConfirmAndPayPopUp/index.jsx';
import ReusableForm from '../../ReusableForm';
import dogIcon from '../../../assets/dibby_Dog_Logo.png';

function SendAViewer({ isOpen, onClose }) {
  const [showConfirmAndPayPopup, setShowConfirmAndPayPopup] = useState(false);
  const [propertyData, setPropertyData] = useState(null);
  const navigate = useNavigate();
  
  // Default property details (beds, baths, sqft, buildingName) that don't need to be collected in the form
  const defaultPropertyDetails = {
    beds: 2,
    baths: 1,
    sqft: 875,
    buildingName: 'Property Listing', // Generic default since we don't collect building name
  };

  if (!isOpen) return null;

  // Form configuration for property information
  const propertyFormInitialValues = {
    propertyUrl: '',
    address: '',
    unit: '',
    city: '',
    state: '',
    zipCode: '',
  };

  // const propertyFormValidationSchema = {
  //   address: {
  //     required: true,
  //     requiredMessage: 'Property address is required',
  //   },
  //   city: {
  //     required: true,
  //     requiredMessage: 'City is required',
  //   },
  //   state: {
  //     required: true,
  //     requiredMessage: 'State is required',
  //   },
  //   zipCode: {
  //     required: true,
  //     requiredMessage: 'ZIP code is required',
  //     pattern: /^\d{5}(-\d{4})?$/,
  //     patternMessage: 'Please enter a valid ZIP code',
  //   },
  //   propertyUrl: {
  //     validate: (value) => {
  //       if (value && value.trim() !== '') {
  //         // Basic URL validation
  //         try {
  //           new URL(value);
  //           return null;
  //         } catch {
  //           return 'Please enter a valid URL';
  //         }
  //       }
  //       return null;
  //     },
  //   },
  // };

  const propertyFormFields = [
    {
      name: 'propertyUrl',
      type: 'url',
      placeholder: 'Property URL',
      inputClassName: 'landing-send-a-viewer-inputs',
      containerClassName: 'form-field-container',
    },
    {
      name: 'address',
      type: 'text',
      placeholder: 'Address',
      inputClassName: 'landing-send-a-viewer-inputs',
      containerClassName: 'form-field-container',
    },
    {
      name: 'unit',
      type: 'text',
      placeholder: 'Apt, Unit, Floor, etc.',
      inputClassName: 'landing-send-a-viewer-inputs',
      containerClassName: 'form-field-container',
    },
    {
      name: 'city',
      type: 'text',
      placeholder: 'City',
      inputClassName: 'landing-send-a-viewer-inputs',
      containerClassName: 'form-field-container',
    },
  ];

  // Create a custom component for state/zip row
  const StateZipRow = ({ formData, handleInputChange, validationErrors, disabled }) => (
    <div className='landing-send-a-viewer-state-zip-inputs-box'>
      <div className="form-field-container">
        <input
          name="state"
          type="text"
          placeholder="State"
          className={`landing-send-a-viewer-inputs half-width ${
            validationErrors.state ? 'error' : ''
          }`}
          value={formData.state || ''}
          onChange={(e) => handleInputChange('state', e.target.value)}
          disabled={disabled}
        />
        {validationErrors.state && (
          <span className="form-field-error">{validationErrors.state}</span>
        )}
      </div>
      <div className="form-field-container">
        <input
          name="zipCode"
          type="text"
          placeholder="Zip Code"
          className={`landing-send-a-viewer-inputs half-width ${
            validationErrors.zipCode ? 'error' : ''
          }`}
          value={formData.zipCode || ''}
          onChange={(e) => handleInputChange('zipCode', e.target.value)}
          disabled={disabled}
        />
        {validationErrors.zipCode && (
          <span className="form-field-error">{validationErrors.zipCode}</span>
        )}
      </div>
    </div>
  );

  const handleFormSubmit = async (formData) => {
    // Construct the location string from form data
    let location = formData.address;
    if (formData.unit && formData.unit.trim()) {
      location += `, ${formData.unit}`;
    }
    location += `, ${formData.city}, ${formData.state} ${formData.zipCode}`;

    // Prepare the complete property data
    const completePropertyData = {
      ...defaultPropertyDetails,
      location: location.length > 5 ? location : '',
      propertyUrl: formData.propertyUrl || '',
      buildingName: defaultPropertyDetails.buildingName,
    };

    // Navigate to checkout page with property data as state
    navigate('/checkout', {
      state: {
        propertyData: completePropertyData,
        serviceType: 'send-a-viewer'
      }
    });
  };

  return (
    <div className='landing-send-a-viewer-popup-overlay'>
      <div className='landing-send-a-viewer-popup-box'>
        <button
          className='landing-send-a-viewer-close-button'
          onClick={onClose}
        >
          ×
        </button>
        <div className='landing-send-a-viewer-words-input-box'>
          <h5 className='landing-send-a-viewer-h5-text'>Send a Viewer</h5>
          <p className='landing-send-a-viewer-p-text'>
            For $49, you can send one of our trusted Viewers to tour and inspect
            an existing property listing that isn't listed on Dibby.
          </p>
          
          <ReusableForm
            initialValues={propertyFormInitialValues}
            fields={propertyFormFields}
            onSubmit={handleFormSubmit}
            submitButtonText="Continue to Payment"
            className="property-form"
          >
            {/* Custom state/zip row component */}
            <StateZipRow />
          </ReusableForm>
          
          {/* TODO: Is this still needed? */}
          {/* {showConfirmAndPayPopup && propertyData && (
            <ConfirmAndPayPopUp
              isOpen={showConfirmAndPayPopup}
              onClose={() => setShowConfirmAndPayPopup(false)}
              beds={propertyData.beds}
              baths={propertyData.baths}
              sqft={propertyData.sqft}
              location={propertyData.location}
              buildingName={propertyData.buildingName}
              url={propertyData.propertyUrl}
            />
          )} */}
        </div>
        
        <img
          src={dogIcon}
          alt='dog icon'
          className='landing-send-a-viewer-dog-icon'
        />
      </div>
    </div>
  );
}

export default SendAViewer;
