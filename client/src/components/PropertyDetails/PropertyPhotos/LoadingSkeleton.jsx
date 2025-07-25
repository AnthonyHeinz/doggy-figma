import React from 'react';
import { SkeletonBox, SkeletonImage } from '../../Skeleton';
import { useState, useEffect } from 'react';

function PropertyPhotosSkeleton() {
  const [visibleCount, setVisibleCount] = useState(getVisibleCount());

  function getVisibleCount() {
    const width = window.innerWidth;
    if (width >= 1200) return 4;
    if (width >= 992) return 3;
    if (width >= 768) return 2;
    return 1;
  }

  const isMobile = visibleCount === 1;

  useEffect(() => {
    const handleResize = () => setVisibleCount(getVisibleCount());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div id='property-details-back-search-photos-container'>
      <div className='property-details-back-to-search'>
        <SkeletonBox height="40px" width="150px" />
      </div>

      {isMobile ? (
        <div className='property-details-carousel-wrapper'>
          <SkeletonBox height="40px" width="40px" />
          <div className='property-details-carousel-track'>
            <div className='property-details-carousel-card'>
              <SkeletonImage height="250px" />
            </div>
          </div>
          <SkeletonBox height="40px" width="40px" />
        </div>
      ) : (
        <div className='property-details-photo-container'>
          <div className='property-details-main-photo-container'>
            <SkeletonImage height="400px" />
          </div>
          <div className='property-details-photo-grid'>
            {Array.from({ length: 4 }).map((_, index) => (
              <SkeletonImage key={index} height="190px" />
            ))}
          </div>
        </div>
      )}

      <SkeletonBox height="48px" width="180px" className="skeleton-margin-top" />
    </div>
  );
}

export default PropertyPhotosSkeleton; 