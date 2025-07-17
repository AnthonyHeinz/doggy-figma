import React, { useState } from 'react';
import './styles.css';
import dogIcon from '../../../assets/dibby_Dog_Logo.png';
import { useNavigate } from 'react-router-dom';
import SendAViewer from '../SendAViewer/index.jsx';

function YourHomeYourChoice() {
  const [showSendAViewerPopup, setShowSendAViewerPopup] = useState(false);
  const navigate = useNavigate();

  const handleClickStartBrowsing = () => {
    navigate('/property-listings');
  };

  return (
    <section className='home-choice-section'>
      <img src={dogIcon} alt='dogIcon' className='dog-icon' />
      <div className='home-choice-content'>
        <h1>Your Home, Your Choice</h1>
        <p>
          Use Dibby to schedule a property tour from our selection of listings
          or any other home you've found online.
        </p>
        <div className='home-choice-buttons'>
          <button
            className='home-choice-start-browsing-button'
            onClick={() => {
              handleClickStartBrowsing();
            }}
          >
            Start Browsing on Dibby
          </button>
          <button
            className='home-choice-send-a-viewer-button'
            onClick={() => setShowSendAViewerPopup(true)}
          >
            Send a Viewer to a Property You've Found
          </button>
        </div>
      </div>
      <SendAViewer
        isOpen={showSendAViewerPopup}
        onClose={() => setShowSendAViewerPopup(false)}
      />
    </section>
  );
}

export default YourHomeYourChoice;
