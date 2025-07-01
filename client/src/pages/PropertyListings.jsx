import React from 'react';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import './propertyListings.css';
import PropertyListingContainer from '../components/PropertyListings/PropertyListingContainer/index.jsx';
import ListingBar from '../components/PropertyListings/ListingBar/index.jsx';

function PropertyListings() {
  const [searchValue, setSearchValue] = useState('');
  const [dropdownStates, setDropdownStates] = useState({
    price: false,
    bedsBaths: false,
    homeType: false,
    leaseType: false,
  });

  const toggleDropdown = (key) => {
    setDropdownStates((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
  return (
    <div>
      <Navbar />
      <ListingBar
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        dropdownStates={dropdownStates}
        onToggleDropdown={toggleDropdown}
      />
      <div className='property-listing-results-map-container'>
        <section className='property-listing-map'></section>
        <PropertyListingContainer location='Los Angeles, CA' />
      </div>
    </div>
  );
}

export default PropertyListings;
