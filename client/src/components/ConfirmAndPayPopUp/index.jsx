import React from 'react';
import './styles.css';
import { useState } from 'react';
import dogIcon from '../../assets/dibby_Dog_Logo.png';
import PaymentSuccessful from '../PaymentSuccessful';
import ReusableForm from '../ReusableForm';
import { apiService } from '../../services/apiService';

function ConfirmAndPayPopUp({
  isOpen,
  onClose,
  backgroundImage,
  beds,
  baths,
  sqft,
  location,
  buildingName,
  url,
}) {
  const [showPaymentSuccessfulPopup, setShowPaymentSuccessfulPopup] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  // Contact form configuration
  const contactFormInitialValues = {
    fullName: '',
    phoneNumber: '',
    email: '',
  };

  const contactFormValidationSchema = {
    fullName: {
      required: true,
      requiredMessage: 'Full name is required',
    },
    phoneNumber: {
      required: true,
      requiredMessage: 'Phone number is required',
      pattern: /^\d{10,}$/,
      validate: (value) => {
        const cleaned = value.replace(/\D/g, '');
        if (cleaned.length < 10) {
          return 'Please enter a valid phone number';
        }
        return null;
      },
    },
    email: {
      required: true,
      requiredMessage: 'Email is required',
      pattern: /\S+@\S+\.\S+/,
      patternMessage: 'Please enter a valid email address',
    },
  };

  const contactFormFields = [
    {
      name: 'fullName',
      type: 'text',
      placeholder: 'Full Name',
      inputClassName: 'confirm-pay-step-container-inputs',
      containerClassName: 'form-input-container',
    },
    {
      name: 'phoneNumber',
      type: 'tel',
      placeholder: 'Phone Number',
      inputClassName: 'confirm-pay-step-container-inputs',
      containerClassName: 'form-input-container',
    },
    {
      name: 'email',
      type: 'email',
      placeholder: 'Email Address',
      inputClassName: 'confirm-pay-step-container-inputs',
      containerClassName: 'form-input-container',
    },
  ];

  // Payment form configuration
  const paymentFormFields = [
    {
      name: 'cardNumber',
      type: 'text',
      placeholder: 'Card Number',
      inputClassName: 'confirm-pay-step-container-inputs',
      containerClassName: 'form-input-container',
    },
    {
      name: 'expiryDate',
      type: 'text',
      placeholder: 'MM/YY',
      inputClassName: 'confirm-pay-step-container-inputs',
      containerClassName: 'form-input-container',
    },
    {
      name: 'cvc',
      type: 'text',
      placeholder: 'CVC',
      inputClassName: 'confirm-pay-step-container-inputs',
      containerClassName: 'form-input-container',
    },
    {
      name: 'zipCode',
      type: 'text',
      placeholder: 'ZIP Code',
      inputClassName: 'confirm-pay-step-container-inputs',
      containerClassName: 'form-input-container',
    },
    {
      name: 'country',
      type: 'text',
      placeholder: 'Country/Region',
      inputClassName: 'confirm-pay-step-container-inputs',
      containerClassName: 'form-input-container',
    },
  ];

  const handleFormSubmit = async (contactFormData, { setFieldError }) => {
    setError(null);

    try {
      // Prepare data for Google Sheets
      const currentDate = new Date().toISOString();
      const rowData = [
        [
          currentDate,           // Timestamp
          contactFormData.fullName,     // Full Name
          contactFormData.email,        // Email
          contactFormData.phoneNumber,  // Phone
          location,              // Property Address
          buildingName,          // Building Name
          `${beds} beds, ${baths} baths, ${sqft} sqft`, // Property Details
          '$49',                 // Payment Amount
          'Confirmed',            // Status
          url,                    // Property URL
        ]
      ];

      // Send to Google Sheets API
      await apiService.addRowToSheet('Sheet1!A:I', rowData);
      
      // Show success popup
      setShowPaymentSuccessfulPopup(true);
      
    } catch (err) {
      setError('Failed to process payment. Please try again.');
      console.error('Submission error:', err);
      throw err; // Re-throw to let form handle the error state
    }
  };

  return (
    <div className='confirm-pay-popup-overlay' onClick={onClose}>
      <div
        className='confirm-pay-popup-box'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='confirm-pay-popup-header'>
          <button
            className='confirm-pay-back-button'
            onClick={() => console.log('Back')}
          >
            {'<'} Back
          </button>
          <button className='confirm-pay-close-button' onClick={onClose}>
            ×
          </button>
        </div>
        <div id='confirm-pay-body'>
          <section id='confirm-pay-left-side'>
            <h5 id='confirm-pay-left-side-h5-text'>Confirm and Pay</h5>
            <div id='confirm-pay-location-info'>
              <h6 className='confirm-pay-location-info-h6-text'>
                Send a Viewer to this Address:
              </h6>
              {backgroundImage ? (
                <img
                  src={backgroundImage}
                  alt='location-picture'
                  id='confirm-pay-picture'
                />
              ) : (
                <img
                  src={dogIcon}
                  alt='dibby dog'
                  className='confirm-pay-bottom-dog-icon'
                />
              )}
              <div className='confirm-pay-info'>
                <p className='confirm-pay-address'>{location}</p>
                <p className='confirm-pay-building'>{buildingName}</p>
                <p className='confirm-pay-details'>
                  {beds} bds | {baths} ba | {sqft} sqft
                </p>
              </div>
            </div>
            <div id='confirm-pay-viewing-details'>
              <h6 id='confirm-pay-viewing-details-h6-text'>Viewing Details</h6>
              <p className='confirm-pay-viewing-details-p-text'>
                Viewings will be completed within 3 business days.
              </p>
              <p className='confirm-pay-viewing-details-p-text'>
                Viewing report will include the following:
              </p>
              <ul className='confirm-pay-list'>
                <li className='confirm-pay-li-text'>
                  Interior and exterior photos/videos
                </li>
                <li className='confirm-pay-li-text'>Written report</li>
                <li className='confirm-pay-li-text'>FaceTime call</li>
                <li className='confirm-pay-li-text'>Neighborhood tour</li>
                <li className='confirm-pay-li-text'>Street parking report</li>
                <li className='confirm-pay-li-text'>
                  Smell and noise level tests
                </li>
              </ul>
            </div>
          </section>
          <section id='confirm-pay-right-side'>
            <div className='confirm-pay-step-container'>
              <h6 className='confirm-pay-step-container-h6-text'>
                1. Payment Price: <span className='confirm-pay-price'>$49</span>
              </h6>

              <h6 className='confirm-pay-step-container-h6-text'>
                2. Enter contact information
              </h6>
              
              {error && (
                <div className="error-message">
                  {error}
                </div>
              )}

              <ReusableForm
                initialValues={contactFormInitialValues}
                validationSchema={contactFormValidationSchema}
                fields={contactFormFields}
                onSubmit={handleFormSubmit}
                submitButtonText="Confirm and Pay"
                className="contact-form"
              >
                <h6 className='confirm-pay-step-container-h6-text'>
                  3. Add Payment Method
                </h6>
                
                {/* Payment fields - could also be converted to use ReusableForm */}
                <div className="form-input-container">
                  <input
                    type='text'
                    placeholder='Card Number'
                    className='confirm-pay-step-container-inputs'
                  />
                </div>
                <div className='confirm-pay-input-row'>
                  <div className="form-input-container">
                    <input
                      type='text'
                      placeholder='MM/YY'
                      className='confirm-pay-step-container-inputs'
                    />
                  </div>
                  <div className="form-input-container">
                    <input
                      type='text'
                      placeholder='CVC'
                      className='confirm-pay-step-container-inputs'
                    />
                  </div>
                </div>
                <div className="form-input-container">
                  <input
                    type='text'
                    placeholder='ZIP Code'
                    className='confirm-pay-step-container-inputs'
                  />
                </div>
                <div className="form-input-container">
                  <input
                    type='text'
                    placeholder='Country/Region'
                    className='confirm-pay-step-container-inputs'
                  />
                </div>
              </ReusableForm>
            </div>
          </section>
        </div>
        <img src={dogIcon} alt='dog icon' className='confirm-pay-dog-icon' />
      </div>
      <PaymentSuccessful
        isOpen={showPaymentSuccessfulPopup}
        onClose={() => {
          setShowPaymentSuccessfulPopup(false);
          onClose(); // Close the main popup too
        }}
      />
    </div>
  );
}

export default ConfirmAndPayPopUp;
