import React from 'react';
import { useState } from 'react';
import './styles.css';
import dogIcon from '../../../assets/dibby_Dog_Logo.png';
import ConfirmAndPayPopUp from '../../ConfirmAndPayPopUp';
import testDog from '../../../assets/testdog.jpeg';

function TourThisProperty() {
  const [showSendViewerPopup, setShowSendViewerPopup] = useState(false);
  const [houseDetails, setHouseDetails] = useState({
    location: '627 Belmont Ave #6, Los Angeles, CA 90026',
    buildingName: 'Belmont Apartments',
    beds: 2,
    baths: 1,
    sqft: 875,
  });

  return (
    <div id='property-details-tour-this-property-container'>
      <img src={dogIcon} alt='dog icon' className='property-details-dog-icon' />
      <h5>Tour This Property</h5>
      <div id='property-details-send-viewer-list'>
        <h6>
          For <strong>$49</strong>, receive a full report on this property.{' '}
        </h6>
        <p>Send a viewer to receive the following:</p>
        <ul>
          <li>Interior and exterior photos/videos</li>
          <li>Written report</li>
          <li>FaceTime call</li>
          <li>Neighborhood tour</li>
          <li>Street parking report</li>
          <li>Smell and noise level tests</li>
        </ul>
      </div>
      <button
        id='property-details-send-a-viewer-button'
        onClick={() => setShowSendViewerPopup(true)}
      >
        Send a Viewer
      </button>
      <ConfirmAndPayPopUp
        isOpen={showSendViewerPopup}
        onClose={() => setShowSendViewerPopup(false)}
        backgroundImage={testDog}
        beds={houseDetails.beds}
        baths={houseDetails.baths}
        sqft={houseDetails.sqft}
        location={houseDetails.location}
        buildingName={houseDetails.buildingName}
      />
    </div>
  );
}

export default TourThisProperty;
