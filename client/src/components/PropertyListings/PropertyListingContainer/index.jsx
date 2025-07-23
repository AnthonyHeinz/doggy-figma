import React from 'react';
import { useState, useEffect } from 'react';
import PropertyListingCard from '../PropertyListingCard';
import testDog from '../../../assets/testdog.jpeg';
import './styles.css';
import SortDropDown from '../SortDropDown';
import PropertyListingMap from '../PropertyListingMap';
import { formatLocationDisplay } from '../../../util/formatLocationDisplay';

function PropertyListingContainer({
  location,
  onToggleDropdown,
  dropdownStates,
  listings = [],
  paginationData = {},
  isLoading = false, 
}) {

  // TODO: We bring in pagination data to update the results number. 
  // Pagination for property listings is not implemented yet.

  const [resultsNumber, setResultsNumber] = useState(0);
  const [activeMobileView, setActiveMobileView] = useState(null);

  function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      const checkMobile = () => setIsMobile(window.innerWidth <= 768);
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return isMobile;
  }

  const isMobile = useIsMobile();

  // TODO: Move to Skeleton folder
  // ===== UPDATED LOADING SKELETON COMPONENT =====
  const LoadingCard = ({ index }) => (
    <div className='property-listing-card loading-card'>
      <div className='property-listing-image loading-skeleton'></div>
      <div className='property-listing-info'>
        <div className='loading-skeleton loading-price'></div>
        <div className='loading-skeleton loading-details'></div>
        <div className='loading-skeleton loading-address'></div>
        <div className='loading-skeleton loading-building'></div>
      </div>
    </div>
  );

  // ===== UTILITY FUNCTIONS FOR DATA TRANSFORMATION =====
  // TODO: MOVE TO UTIL FOLDER
  // Helper function to format price from number to "$X,XXX/mo" format
  const formatPrice = (price) => {
    if (!price || typeof price !== 'number') return 'Price not available';
    return `$${price.toLocaleString()}/mo`;
  };

  // Helper function to format building type (e.g., "single_family" -> "Single Family")
  const formatBuildingType = (type) => {
    if (!type || typeof type !== 'string') return 'Property Type Not Available';
    return type
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Helper function to construct full address from location object
  const formatAddress = (locationObj) => {
    if (!locationObj?.address) return 'Address not available';
    
    const { line, city, state_code, postal_code } = locationObj.address;
    const addressParts = [];
    
    if (line) addressParts.push(line);
    if (city) addressParts.push(city);
    if (state_code) addressParts.push(state_code);
    if (postal_code) addressParts.push(postal_code);
    
    return addressParts.length > 0 ? addressParts.join(', ') : 'Address not available';
  };

  const formatImageUrl = (url) => {
    let imageUrlArr = url.split('s.jpg');
    return imageUrlArr.join('rd-w1280_h960.jpg');
  }

  // TODO: Extract to util folder or something else
  // ===== TRANSFORM API DATA TO COMPONENT FORMAT =====
  const transformedListings = listings.map((listing) => {

    // ===== HANDLE PRICE RANGE ===== CURRENTLY DOESNT ADDRESS PRICE RANGE WHEN PRICE MAX AND MIN ARE NOT THE SAME
    let altPrice = listing.list_price_max === listing.list_price_min ? listing.list_price_min : listing.list_price_max;
    let price = listing.list_price ? listing.list_price : altPrice;

    // ===== HANDLE BEDS RANGE ===== CURRENTLY DOESNT ADDRESS BEDS RANGE WHEN BEDS MAX AND MIN ARE NOT THE SAME OR ZERO
    // NO BEDS POBABLY MEANS STUDIO APARTMENT
    let altBeds = listing.description?.beds_min === listing.description?.beds_max ? listing.description?.beds_min : listing.description?.beds_max;
    let beds = listing.description?.beds || altBeds;

    // ===== HANDLE BATHS RANGE ===== CURRENTLY DOESNT ADDRESS BATHS RANGE WHEN BATHS MAX AND MIN ARE NOT THE SAME OR ZERO
    let altBaths = listing.description?.baths_min === listing.description?.baths_max ? listing.description?.baths_min : listing.description?.baths_max;
    let baths = listing.description?.baths || altBaths;

    // ===== HANDLE SQFT RANGE ===== CURRENTLY DOESNT ADDRESS SQFT RANGE WHEN SQFT MAX AND MIN ARE NOT THE SAME OR ZERO
    let altSqft = listing.description?.sqft_min === listing.description?.sqft_max ? listing.description?.sqft_min : listing.description?.sqft_max;
    let sqft = listing.description?.sqft || altSqft;
    
    return {
      listing_id: listing.listing_id,
      property_id: listing.property_id,
      backgroundImage: formatImageUrl(listing.primary_photo?.href) || testDog,
      price: formatPrice(price),
      beds: beds || 'Studio',
      baths: baths || 'N/A', 
      sqft: sqft || 'N/A',
      address: formatAddress(listing.location),
      buildingName: formatBuildingType(listing.description?.type),
      url: listing.href,
    };
  });

  // Update results count
  useEffect(() => {
    if (isLoading) {
      setResultsNumber(0);
    } else {
      setResultsNumber(paginationData.totalRecords);
    }
  }, [transformedListings.length, isLoading]);

  // Render different states
  const renderListingCards = () => {
    if (isLoading) {
      return Array.from({ length: 8 }).map((_, index) => (
        <LoadingCard key={`loading-${index}`} index={index} />
      ));
    }

    if (transformedListings.length > 0) {
      return transformedListings.map((listing) => (
        <PropertyListingCard
          key={listing.listing_id}
          listing_id={listing.listing_id}
          property_id={listing.property_id}
          backgroundImage={listing.backgroundImage}
          price={listing.price}
          beds={listing.beds}
          baths={listing.baths}
          sqft={listing.sqft}
          address={listing.address}
          buildingName={listing.buildingName}
        />
      ));
    }

    return (
      <div className='no-results-container'>
        <div className='no-results-content'>
          <h3>No Properties Found</h3>
          <p>We couldn't find any properties matching your search criteria near {formatLocationDisplay(location)}.</p>
          <p>Try adjusting your search or check back later for new listings.</p>
        </div>
      </div>
    );
  };

  // Results text logic
  const getResultsText = () => {
    if (isLoading) {
      return 'Searching...';
    }
    if (transformedListings.length === 0) {
      return '0 Results';
    }
    return `${resultsNumber} Results`;
  };

  return (
    <div className='property-listing-results-map-container'>
      {!isMobile && <PropertyListingMap />}
      <section className='property-listing-results-container'>
        <h2 className='property-listing-results-container-h2-text'>
          Properties near {formatLocationDisplay(location)}
        </h2>
        <div className='property-listing-results-sort-button-container'>
          <h4 className='property-listing-results-sort-button-container-h4-text'>
            {getResultsText()}
          </h4>
          <button
            className='property-listing-sort-button'
            onClick={() => onToggleDropdown('sort')}
            disabled={isLoading}
          >
            Sort <span className='property-listing-sort-icon'>⇅</span>
          </button>
          {dropdownStates.sort && !isMobile && !isLoading && (
            <SortDropDown onClose={() => onToggleDropdown('sort')} />
          )}
        </div>
        <div className='property-listing-card-container'>
          {renderListingCards()}
        </div>
        {isMobile && (
          <>
            <div className='property-listing-mobile-toggle-bar'>
              <button
                onClick={() => setActiveMobileView('map')}
                className='property-listing-mobile-toggle-bar-button'
                disabled={isLoading}
              >
                Map
              </button>
              <span className='property-listing-mobile-toggle-bar-divider'>|</span>
              <button
                onClick={() => setActiveMobileView('sort')}
                className='property-listing-mobile-toggle-bar-button'
                disabled={isLoading}
              >
                Sort
              </button>
            </div>
            {activeMobileView === 'map' && !isLoading && (
              <div className='property-listing-mobile-overlay'>
                <PropertyListingMap />
                <button
                  onClick={() => setActiveMobileView(null)}
                  className='property-listing-mobile-overlay-button'
                >
                  Close
                </button>
              </div>
            )}
            {activeMobileView === 'sort' && !isLoading && (
              <div className='property-listing-mobile-overlay'>
                <SortDropDown onClose={() => setActiveMobileView(null)} />
              </div>
            )}
          </>
        )}
        <div id='property-listing-blurs'>
          <div id='property-listing-yellow-blur' />
          <div id='property-listing-pink-blur' />
          <div id='property-listing-blue-blur' />
          <div id='property-listing-orange-blur' />
        </div>
      </section>
    </div>
  );
}

export default PropertyListingContainer;
