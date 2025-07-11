import React from 'react';
import { useState, useEffect } from 'react';
import './styles.css';
import testDog from '../../../assets/testdog.jpeg';
import photoIcon from '../../../assets/photo_icon.png';
import SeeAllPhotos from '../SeeAllPhotos';

function PropertyPhotos() {
  const [images, setImages] = useState([
    testDog,
    testDog,
    testDog,
    testDog,
    testDog,
  ]);
  const [showAllPhotosPopup, setShowAllPhotosPopup] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(getVisibleCount());
  const [animateDirection, setAnimateDirection] = useState('');
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  function getVisibleCount() {
    const width = window.innerWidth;
    if (width >= 1200) return 4;
    if (width >= 992) return 3;
    if (width >= 768) return 2;
    return 1;
  }

  const isMobile = visibleCount === 1;

  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(getVisibleCount());
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (animateDirection) {
      const timeout = setTimeout(() => setAnimateDirection(''), 300);
      return () => clearTimeout(timeout);
    }
  }, [animateDirection]);

  const handleNext = () => {
    if (startIndex + visibleCount >= images.length) return;
    setAnimateDirection('property-details-slide-left');
    setStartIndex((prev) => Math.min(prev + 1, images.length - visibleCount));
  };

  const handlePrev = () => {
    if (startIndex === 0) return;
    setAnimateDirection('property-details-slide-right');
    setStartIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleTouchStart = (e) => setTouchStartX(e.touches[0].clientX);
  const handleTouchMove = (e) => setTouchEndX(e.touches[0].clientX);
  const handleTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) return;
    const distance = touchStartX - touchEndX;
    const minSwipeDistance = 50;
    if (distance > minSwipeDistance) handleNext();
    else if (distance < -minSwipeDistance) handlePrev();
    setTouchStartX(null);
    setTouchEndX(null);
  };

  const visibleImages = images.slice(startIndex, startIndex + visibleCount);

  return (
    <div id='property-details-back-search-photos-container'>
      <div className='property-details-back-to-search'>
        <div>{'<'} Back to Search</div>
      </div>

      {isMobile ? (
        <div className='property-details-carousel-wrapper'>
          <button
            className='property-details-carousel-btn'
            onClick={handlePrev}
            disabled={startIndex === 0}
          >
            ‹
          </button>
          <div
            className={`property-details-carousel-track ${animateDirection}`}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {visibleImages.map((src, index) => (
              <div className='property-details-carousel-card' key={index}>
                <div
                  className='property-details-background'
                  style={{ backgroundImage: `url(${src})` }}
                ></div>
              </div>
            ))}
          </div>
          <button
            className='property-details-carousel-btn'
            onClick={handleNext}
            disabled={startIndex + visibleCount >= images.length}
          >
            ›
          </button>
        </div>
      ) : (
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
                className='property-details-image'
              />
            ))}
          </div>
        </div>
      )}

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
  );
}

export default PropertyPhotos;
