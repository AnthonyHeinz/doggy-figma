import React from 'react';
import { useState } from 'react';
import './styles.css';

function ListingContainer() {
  const [price, setPrice] = useState('2800');
  const [location, setLocation] = useState(
    '627 Belmont Ave #6, Los Angeles, CA 90026'
  );
  const [locationTwo, setLocationTwo] = useState('Belmont Apartments');

  return (
    <div id='property-details-listing-container'>
      <div id='property-details-price-special-features'>
        <div id='property-details-price-bed-bath'>
          <div id='property-details-price-location'>
            <h4>${price}/mo</h4>
            <p id='property-details-location'>{location}</p>
            <p id='property-details-location-two'>{locationTwo}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListingContainer;
