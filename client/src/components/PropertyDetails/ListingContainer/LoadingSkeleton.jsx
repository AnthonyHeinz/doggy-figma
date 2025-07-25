import React from 'react';
import { SkeletonBox, SkeletonText, SkeletonImage } from '../../Skeleton';
import './styles.css';

function ListingContainerSkeleton() {
  return (
    <div id='property-details-listing-container'>
      <div id='property-details-price-special-features'>
        <section id='property-details-price-bed-bath'>
          <div id='property-details-price-location'>
            <SkeletonBox height="32px" width="150px" />
            <SkeletonBox height="20px" width="120px" className="skeleton-margin-top" />
            <SkeletonBox height="16px" width="250px" className="skeleton-margin-top" />
            <SkeletonBox height="16px" width="180px" className="skeleton-margin-top" />
          </div>
          <div id='property-details-bed-bath-sqft'>
            {[1, 2, 3].map((index) => (
              <div className='property-listing-contents' key={index}>
                <SkeletonBox height="24px" width="40px" />
                <SkeletonBox height="14px" width="50px" className="skeleton-margin-top" />
              </div>
            ))}
          </div>
        </section>
        
        <section id='property-details-whats-special'>
          <SkeletonBox height="24px" width="150px" />
          <SkeletonText lines={3} className="skeleton-margin-top" />
        </section>
        
        <div className='property-details-grey-line'></div>
        
        <section id='property-details-apartment-features'>
          <SkeletonBox height="24px" width="200px" />
          <div className="skeleton-margin-top">
            <SkeletonBox height="18px" width="120px" />
            <div className="skeleton-margin-top">
              {[1, 2, 3].map((index) => (
                <SkeletonBox key={index} height="14px" width="150px" className="skeleton-margin-small" />
              ))}
            </div>
          </div>
        </section>
        
        <div className='property-details-grey-line'></div>
        
        <SkeletonBox height="24px" width="130px" />
        <SkeletonImage height="200px" className="skeleton-margin-top" />
      </div>
      
      <div id='property-details-tour-dibby-container'>
        <SkeletonBox height="300px" width="100%" />
      </div>
    </div>
  );
}

export default ListingContainerSkeleton; 