import React from 'react';
import CloseWindow from '../../../../assets/closeWindow.png';
import './styles.css';

function UpdateEmailPopUp({ onClose }) {

    

    return (
        <div className='update-email-wrapper'>
          <div className='update-email-content'>
            <h6>Update Email Address</h6>
            <div className='update-email-form'>
              <input
                type='text'
                placeholder='New Email Address'
              />
              <button className='update-email-continue'>
                Continue
              </button>
            </div>
          </div>
          <button onClick={onClose} className='update-email-close-window'>
            <img src={CloseWindow} />
          </button>
        </div>
      );
}

export default UpdateEmailPopUp;