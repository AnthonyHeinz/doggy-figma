import React from 'react';
import { useState } from 'react';
import './styles.css';
import TourThisProperty from '../TourThisProperty';

function ListingContainer() {
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

  return (
    <div id='property-details-listing-container'>
      <div id='property-details-price-special-features'>
        <section id='property-details-price-bed-bath'>
          <div id='property-details-price-location'>
            <h4>${houseDetails.price}/mo</h4>
            <p id='property-details-location'>{houseDetails.location}</p>
            <p id='property-details-location-two'>
              {houseDetails.buildingName}
            </p>
          </div>
          <div id='property-details-bed-bath-sqft'>
            <div className='property-listing-contents'>
              <h4>{houseDetails.beds}</h4>
              <p>beds</p>
            </div>
            <div className='property-listing-contents'>
              <h4>{houseDetails.baths}</h4>
              <p>baths</p>
            </div>
            <div className='property-listing-contents'>
              <h4>{houseDetails.sqft}</h4>
              <p>sqft</p>
            </div>
          </div>
        </section>
        <section id='property-details-whats-special'>
          <h4>What's Special</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </section>
        <div className='property-details-grey-line'></div>
        <section id='property-details-apartment-features'>
          <h4>Apartment Features</h4>
          <h6 id='property-details-apartment-features-h6-text'>
            Features & Appliances
          </h6>
          <div className='property-details-list-container'>
            {features.map((item, index) => (
              <span className='property-details-list-item' key={index}>
                {item}
              </span>
            ))}
          </div>
        </section>
        <div className='property-details-grey-line'></div>
      </div>
      <div id='property-details-tour-dibby-container'>
        <TourThisProperty />
      </div>
    </div>
  );
}

export default ListingContainer;
