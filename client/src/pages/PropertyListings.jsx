import React from 'react';
import Navbar from '../components/Navbar';
import dogIcon from '../assets/dibby_Dog_Logo.png';
import './propertyListings.css';
import PropertySearch from '../assets/Property_Listing_Search.png';

function PropertyListings() {
  return (
    <div>
      <Navbar />
      <section id='property-listing-bar'>
        <div id='property-listing-inputs'>
          <div className='search-bar-wrapper'>
            <input
              type='text'
              id='property-listing-search-bar'
              placeholder='Enter city or ZIP Code'
            />
            <button id='property-listingsearch-button'>
              <img
                src={PropertySearch}
                alt='Property Search'
                id='property-listing-search-glass'
              ></img>
            </button>
          </div>
          <input type='text' id='property-listing-price' />
          <input type='text' id='property-listing-bed-bath' />
          <input type='text' className='property-listing-home-lease-type' />
          <input type='text' className='property-listing-home-lease-type' />
        </div>
        <img src={dogIcon} alt='dogIcon' id='property-listing-dog-icon'></img>
      </section>
    </div>
  );
}

export default PropertyListings;
