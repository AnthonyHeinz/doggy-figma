import React from 'react';
import { useState, useEffect } from 'react';
import './styles.css';
import TourThisProperty from '../TourThisProperty';
import NeighborhoodTestImage from '../../../assets/Neighborhood_Test_Image.png';

function ListingContainer({propertyDetails}) {
  const gradients = [0, 1, 2, 3, 4];
  const {price, beds, baths, sqft, type, property_name, address, description, details} = propertyDetails;
  

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

  const [houseDetails, setHouseDetails] = useState({
    price: '2800',
    location: '627 Belmont Ave #6, Los Angeles, CA 90026',
    buildingName: 'Belmont Apartments',
    beds: 2,
    baths: 1,
    sqft: 875,
  });

  const [features, setFeatures] = useState([
    'Lorem ipsum',
    'Lorem ipsum',
    'Lorem ipsum',
    'Consectetur adipiscing',
    'Consectetur adipiscing',
    'Consectetur adipiscing',
    'Lorem ipsum dolor',
    'Lorem ipsum dolor',
    'Lorem ipsum dolor',
  ]);

  function getFeatures(features) {
    
    return features.map((detail) => (
      <div key={detail.category}>
        <h6 id='property-details-apartment-features-h6-text'>
          {detail.category}
        </h6>
        <ul className='property-details-list-container'>
          {detail.text.map((feature, index) => (
            <li className='property-details-list-item' key={index}>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    ))
    
  }

  const addressString = address ? `${address.line}, ${address.city}, ${address.state_code} ${address.postal_code}` : '';
  return (
    <div id='property-details-listing-container'>
      <div id='property-details-price-special-features'>
        <section id='property-details-price-bed-bath'>
          <div id='property-details-price-location'>
            <h4>${price}/mo</h4>
            <h5>{type}</h5>
            <p id='property-details-location'>{addressString}</p>
            <p id='property-details-location-two'>
              {property_name ? property_name : ''}
            </p>
          </div>
          <div id='property-details-bed-bath-sqft'>
            <div className='property-listing-contents'>
              <h4 className='property-details-bed-bath-sqft-h4-text'>
                {beds < 1 ? 'Studio' : beds}
              </h4>
              <p>beds</p>
            </div>
            <div className='property-listing-contents'>
              <h4 className='property-details-bed-bath-sqft-h4-text'>
                {baths}
              </h4>
              <p>{baths === 1 ? 'bath' : 'baths'}</p>
            </div>
            <div className='property-listing-contents'>
              <h4 className='property-details-bed-bath-sqft-h4-text'>
                {sqft}
              </h4>
              <p>sqft</p>
            </div>
          </div>
        </section>
        <section id='property-details-whats-special'>
          <h4 className='property-details-bed-bath-sqft-h4-text'>
            What's Special
          </h4>
          <p>
            {description ? description : ''}
          </p>
        </section>
        <div className='property-details-grey-line'></div>
        <section id='property-details-apartment-features'>
          <h4 className='property-details-bed-bath-sqft-h4-text'>
            Features & Amenities
          </h4>
          {details ? getFeatures(details) : ''}
        </section>
        <div className='property-details-grey-line'></div>
        <h4 className='property-details-bed-bath-sqft-h4-text'>Neighborhood</h4>
        <img
          src={NeighborhoodTestImage}
          alt='neighborhood-test-image'
          id='property-details-list-map'
        ></img>
      </div>
      <div id='property-details-tour-dibby-container'>
        <TourThisProperty isMobile={isMobile} />
      </div>
      {gradients.map((_, index) => (
        <div className={`property-details-gradient-${index}`} key={index}></div>
      ))}
    </div>
  );
}

export default ListingContainer;
