import React from 'react';
import { useState } from 'react';
import './styles.css';
import testDog from '../../../assets/testdog.jpeg';
import photoIcon from '../../../assets/photo_icon.png';
import SeeAllPhotos from '../SeeAllPhotos';

function PropertyPhotos() {
  const [showAllPhotosPopup, setShowAllPhotosPopup] = useState(false);
  const [images, setImages] = useState([
    testDog,
    testDog,
    testDog,
    testDog,
    testDog,
  ]);
  return (
    <div id='property-details-back-search-photos-container'>
      <div className='property-details-back-to-search'>
        <div> {'<'} Back to Search</div>
      </div>
      <div className='property-details-photo-container'>
        <div className='property-details-main-photo-container'>
          <img
            src={images[0]}
            alt='Main Photo'
            className='property-details-main-image'
          />
        </div>
        <div className='property-details-photo-grid'>
          {images.slice(1).map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Gallery ${index + 1}`}
              className='property-details-image '
            />
          ))}
        </div>
        <button
          className='property-details-see-all-photos-button'
          onClick={() => setShowAllPhotosPopup(true)}
        >
          <img
            src={photoIcon}
            alt='photo-icon'
            id='property-details-photo-icon'
          />
          See All {images.length} Photos
        </button>

        <SeeAllPhotos
          isOpen={showAllPhotosPopup}
          onClose={() => setShowAllPhotosPopup(false)}
          images={images}
        />
      </div>
    </div>
  );
}

export default PropertyPhotos;
