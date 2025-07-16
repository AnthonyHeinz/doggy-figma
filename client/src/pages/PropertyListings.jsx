import React from 'react';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import PropertyListingContainer from '../components/PropertyListings/PropertyListingContainer/index.jsx';
import ListingBar from '../components/PropertyListings/ListingBar/index.jsx';

function PropertyListings() {
  const [searchValue, setSearchValue] = useState('');
  const [submittedLocation, setSubmittedLocation] = useState('');
  const [dropdownStates, setDropdownStates] = useState({
    price: false,
    bedsBaths: false,
    homeType: false,
    leaseType: false,
    sort: false,
  });

  const handleSearchSubmit = () => {
    const trimmed = searchValue.trim();
    if (trimmed) setSubmittedLocation(trimmed);
  };

  const toggleDropdown = (key) => {
    setDropdownStates((prev) => {
      if (prev[key]) {
        return {
          ...prev,
          [key]: false,
        };
      }
      return {
        price: false,
        bedsBaths: false,
        homeType: false,
        leaseType: false,
        sort: false,
        [key]: true,
      };
    });
  };
  return (
    <div>
      <Navbar />
      <ListingBar
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        onToggleDropdown={toggleDropdown}
        dropdownStates={dropdownStates}
        onSearchSubmit={handleSearchSubmit}
      />
      {submittedLocation && (
        <PropertyListingContainer
          location={submittedLocation}
          onToggleDropdown={toggleDropdown}
          dropdownStates={dropdownStates}
        />
      )}
    </div>
  );
}

export default PropertyListings;
