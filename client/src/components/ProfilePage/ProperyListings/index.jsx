import React from 'react';
import PropertyListingCard from '../PropertyListingCard/index.jsx';
import './styles.css';

function MyPropertyListings() {

  const hardCodedListingInfo = {
    address: '627 Belmont Ave #6, Los Angeles, CA 90026',
    beds: '2',
    bath: '1',
    sqft: '875',
    price: '2800',
    added: 'June 1st, 2025'
  };

  return (
    <div>
      <div className='my-prop-list'>
        <h4>My Property Listings</h4>
        <div className='listings'>
            <PropertyListingCard hardCodedListingInfo={hardCodedListingInfo} />
             <PropertyListingCard hardCodedListingInfo={hardCodedListingInfo} />
        </div>
      </div>

    </div>
  );
}

export default MyPropertyListings;
