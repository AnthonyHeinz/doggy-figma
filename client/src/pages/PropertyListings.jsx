import React from 'react';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import dogIcon from '../assets/dibby_Dog_Logo.png';
import './propertyListings.css';
import PropertySearch from '../assets/Property_Listing_Search.png';
import PriceDropDown from '../components/PropertyListings/PriceDropdown/index.jsx';
import BedAndBathDropDown from '../components/PropertyListings/BedAndBathDropdown/index.jsx';
import HomeTypeDropDown from '../components/PropertyListings/HomeTypeDropDown/index.jsx';
import LeaseTypeDropDown from '../components/PropertyListings/LeaseTypeDropDown/index.jsx';

function PropertyListings() {
  const [priceDropDown, setPriceDropDown] = useState(false);
  const [bedAndBathDropDown, setBedAndBathDropDown] = useState(false);
  const [homeTypeDropDown, setHomeTypeDropDown] = useState(false);
  const [leaseTypeDropDown, setLeaseTypeDropDown] = useState(false);
  const togglePriceDropdown = () => setPriceDropDown(!priceDropDown);
  const toggleBedAndBathDropdown = () =>
    setBedAndBathDropDown(!bedAndBathDropDown);
  const toggleHomeTypeDropDown = () => setHomeTypeDropDown(!homeTypeDropDown);
  const toggleLeaseTypeDropDown = () =>
    setLeaseTypeDropDown(!leaseTypeDropDown);

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
            <button id='property-listing-search-button'>
              <img
                src={PropertySearch}
                alt='Property Search'
                id='property-listing-search-glass'
              ></img>
            </button>
          </div>
          <button
            type='text'
            id='property-listing-price'
            className={priceDropDown ? 'selected' : ''}
            onClick={togglePriceDropdown}
          >
            Price
          </button>
          {priceDropDown && (
            <PriceDropDown onClose={() => setPriceDropDown(false)} />
          )}
          <button
            type='text'
            id='property-listing-bed-bath'
            className={bedAndBathDropDown ? 'selected' : ''}
            onClick={toggleBedAndBathDropdown}
          >
            Beds & Bath
          </button>
          {bedAndBathDropDown && (
            <BedAndBathDropDown onClose={() => setBedAndBathDropDown(false)} />
          )}
          <button
            type='text'
            className={`property-listing-home-lease-type ${
              homeTypeDropDown ? 'selected' : ''
            }`}
            onClick={toggleHomeTypeDropDown}
          >
            Home Type
          </button>
          {homeTypeDropDown && (
            <HomeTypeDropDown onClose={() => setHomeTypeDropDown(false)} />
          )}
          <button
            type='text'
            className={`property-listing-home-lease-type ${
              leaseTypeDropDown ? 'selected' : ''
            }`}
            onClick={toggleLeaseTypeDropDown}
          >
            Lease Type
          </button>
          {leaseTypeDropDown && (
            <LeaseTypeDropDown onClose={() => setLeaseTypeDropDown(false)} />
          )}
        </div>
        <img src={dogIcon} alt='dogIcon' id='property-listing-dog-icon'></img>
      </section>
    </div>
  );
}

export default PropertyListings;
