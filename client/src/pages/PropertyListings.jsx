import React from 'react';
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PropertyListingContainer from '../components/PropertyListings/PropertyListingContainer/index.jsx';
import ListingBar from '../components/PropertyListings/ListingBar/index.jsx';

function PropertyListings() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [submittedLocation, setSubmittedLocation] = useState('');
  const [dropdownStates, setDropdownStates] = useState({
    price: false,
    bedsBaths: false,
    homeType: false,
    leaseType: false,
    sort: false,
  });

  useEffect(() => {
    const locationParam = searchParams.get('location');
    if (locationParam) {
      setSearchValue(locationParam);
      setSubmittedLocation(locationParam);
    }
  }, [searchParams]);

  const handleSearchSubmit = () => {
    const trimmed = searchValue.trim();
    if (trimmed) {
      setSubmittedLocation(trimmed);
      navigate(`/property-listings?location=${encodeURIComponent(trimmed)}`);
    }
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
