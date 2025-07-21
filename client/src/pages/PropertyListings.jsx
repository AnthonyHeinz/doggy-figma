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
  const [propertyListings, setPropertyListings] = useState([]);
  const [propertListingsPaginationData, setPropertListingsPaginationData] = useState({})

  // ===== NEW STATE FOR LOADING =====
  const [isLoading, setIsLoading] = useState(false);
  const [dropdownStates, setDropdownStates] = useState({
    price: false,
    bedsBaths: false,
    homeType: false,
    leaseType: false,
    sort: false,
  });

  useEffect(() => {
    const locationParam = searchParams.get('locationId');
    if (locationParam) {
      setSearchValue(locationParam);
      setSubmittedLocation(locationParam);
    }
  }, [searchParams]);

  // ===== ENHANCED API INTEGRATION WITH LOADING STATES =====
  useEffect(() => {
    if (!submittedLocation || submittedLocation.trim() === '') {
      return;
    }

    console.log(`🔍 Fetching property listings for location: "${submittedLocation}"`);

    // TODO: Move to util folder or create a custom hook for this
    const fetchPropertyListings = async () => {
      try {
        // ===== START LOADING =====
        setIsLoading(true);
        setPropertyListings([]); 

        const apiUrl = new URL('https://realtor-search.p.rapidapi.com/properties/search-rent');
        apiUrl.searchParams.append('location', submittedLocation);
        apiUrl.searchParams.append('resultsPerPage', '20');
        apiUrl.searchParams.append('page', '1');
        apiUrl.searchParams.append('sortBy', 'best_match');

        console.log(`📡 Making API request to: ${apiUrl.toString()}`);

        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'x-rapidapi-key': import.meta.env.VITE_REALTOR_API_KEY,
            'x-rapidapi-host': 'realtor-search.p.rapidapi.com'
          }
        });

        if (!response.ok) {
          throw new Error(`API request failed with status: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        
        console.log('✅ Property listings API response received successfully:');
        console.log('📋 Full API Response:', data);
        
        // ===== UPDATE STATE WITH API RESULTS =====
        if (data.data.results && Array.isArray(data.data.results)) {
          setPropertyListings(data.data.results);
          setPropertListingsPaginationData(data.meta);
          console.log(`📊 Number of properties found: ${data.data.results.length}`);
          console.log('🏠 First property sample:', data.data.results[0]);
        } else {
          console.log('⚠️ No results array found in API response');
          setPropertyListings([]);
        }

      } catch (error) {
        console.error('❌ Error fetching property listings:', error);
        setPropertyListings([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPropertyListings();

    return () => {
      console.log(`🧹 Cleanup: API call effect for location "${submittedLocation}" is being cleaned up`);
    };

  }, [submittedLocation]);

  const handleSearchSubmit = () => {
    const trimmed = searchValue.trim();
    if (trimmed) {
      setSubmittedLocation(trimmed);
      navigate(`/property-listings?locationId=${encodeURIComponent(trimmed)}`);
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
          listings={propertyListings}
          paginationData={propertListingsPaginationData}
          isLoading={isLoading} 
        />
      )}
    </div>
  );
}

export default PropertyListings;
