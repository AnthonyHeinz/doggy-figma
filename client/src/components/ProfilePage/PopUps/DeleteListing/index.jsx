import React from 'react';
import CloseWindow from '../../../../assets/closeWindow.png';
import './styles.css';

function DeleteListingPopUp({ onClose }) {
  return (
    <div className='delete-listing-wrapper'>
      <div className='delete-listing-content'>
        <div className='delete-listing-content-text'>
          <h6>Delete this listing?</h6>
          <p>This listing will be removed permanently.</p>
        </div>
        <div className='delete-listing-content-buttons'>
          <button onClick={onClose} className='delete-listing-cancel'>
            Cancel
          </button>
          <button className='delete-listing-confirm'>Delete</button>
        </div>
        <button onClick={onClose} className='delete-listing-close-window'>
          <img src={CloseWindow} />
        </button>
      </div>
    </div>
  );
}

export default DeleteListingPopUp;
