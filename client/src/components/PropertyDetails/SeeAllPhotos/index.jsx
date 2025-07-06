import React, { useState } from 'react';
import './styles.css';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

function SeeAllPhotos({ isOpen, onClose, images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

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
          <div className='see-all-back'>
            <IoIosArrowBack size={20} />
            Back to Listing
          </div>
          <div className='see-all-address'>
            627 Belmont Ave #6, Los Angeles, CA 90026
          </div>
          <button className='see-all-send-viewer'>Send a Viewer</button>
          <button className='see-all-close' onClick={onClose}>
            ×
          </button>
        </div>

        <div className='see-all-main'>
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
