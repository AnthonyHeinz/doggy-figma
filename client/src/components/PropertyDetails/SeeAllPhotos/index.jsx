import React, { useState } from 'react';
import './styles.css';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import ConfirmAndPayPopUp from '../../ConfirmAndPayPopUp/index.jsx';
import testDog from '../../../assets/testdog.jpeg';

function SeeAllPhotos({ isOpen, onClose, images, address }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSendViewerPopup, setShowSendViewerPopup] = useState(false);
  const [houseDetails, setHouseDetails] = useState({
    location: '627 Belmont Ave #6, Los Angeles, CA 90026',
    buildingName: 'Belmont Apartments',
    beds: 2,
    baths: 1,
    sqft: 875,
  });

  if (!isOpen) return null;

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className='see-all-overlay' onClick={onClose}>
      <div className='see-all-box' onClick={(e) => e.stopPropagation()}>
        <div className='see-all-header'>
          <div className='see-all-popup-x-back-buttons'>
            {/* <button
              className='see-all-back-button'
              onClick={() => console.log('Back')}
            >
              {'<'} Back to Listing
            </button> */}
            <button className='see-all-close-button' onClick={onClose}>
              ×
            </button>
          </div>
          <div className='see-all-location-send-viewer-button'>
            <span>{address.line}, {address.city}, {address.state} {address.postal_code}</span>
            {/* <button
              id='see-all-send-a-viewer-button'
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
            /> */}
          </div>
        </div>
        <div className='see-all-main-container'>
          <button className='see-all-arrow left' onClick={goToPrevious}>
            <IoIosArrowBack size={28} />
          </button>
          <img
            src={images[currentIndex]}
            alt='Main'
            className='see-all-main-image'
          />
          <button className='see-all-arrow right' onClick={goToNext}>
            <IoIosArrowForward size={28} />
          </button>
        </div>

        <div className='see-all-thumbnails'>
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`thumb-${index}`}
              className={`see-all-thumbnail ${
                index === currentIndex ? 'active' : ''
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SeeAllPhotos;
