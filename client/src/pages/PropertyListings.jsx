import React from 'react';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PropertyListingContainer from '../components/PropertyListings/PropertyListingContainer/index.jsx';
import ListingBar from '../components/PropertyListings/ListingBar/index.jsx';

function PropertyListings() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [submittedLocation, setSubmittedLocation] = useState('');
  const [propertyListings, setPropertyListings] = useState([]);
  const [propertListingsPaginationData, setPropertListingsPaginationData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [dropdownStates, setDropdownStates] = useState({
    price: false,
    bedsBaths: false,
    homeType: false,
    leaseType: false,
    sort: false,
  });

  // Initialize from URL parameters
  useEffect(() => {
    const locationParam = searchParams.get('locationId') || searchParams.get('location');
    if (locationParam) {
      setSubmittedLocation(locationParam);
    }
  }, [searchParams]);

  // Handle location search from LocationSearch component
  const handleLocationSearch = (searchTerm, locationId) => {
    // Set immediate search state
    setIsSearching(true);
    
    // Update URL
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('location', searchTerm);
    if (locationId) {
      newSearchParams.set('locationId', locationId);
    }
    setSearchParams(newSearchParams);
    
    // Use locationId for API call, fallback to searchTerm if no locationId
    const apiLocation = locationId || searchTerm;
    setSubmittedLocation(apiLocation);
  };

  // Enhanced API integration with loading states
  useEffect(() => {
    if (!submittedLocation || submittedLocation.trim() === '') {
      return;
    }

    console.log(`🔍 Fetching property listings for location: "${submittedLocation}"`);

    // TODO: Move to util folder or create a custom hook for this
    const fetchPropertyListings = async () => {
      try {
        setIsLoading(true);
        setIsSearching(false);

        const apiUrl = new URL('https://realtor-search.p.rapidapi.com/properties/search-rent');
        apiUrl.searchParams.append('location', submittedLocation);
        apiUrl.searchParams.append('resultsPerPage', '20');
        apiUrl.searchParams.append('page', '1');
        apiUrl.searchParams.append('sortBy', 'best_match');

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

  }, [submittedLocation]);

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
        onToggleDropdown={toggleDropdown}
        dropdownStates={dropdownStates}
        onLocationSearch={handleLocationSearch}
        isLoading={isLoading || isSearching}
      />
      {submittedLocation && (
        <PropertyListingContainer
          location={submittedLocation}
          onToggleDropdown={toggleDropdown}
          dropdownStates={dropdownStates}
          listings={propertyListings}
          paginationData={propertListingsPaginationData}
          isLoading={isLoading || isSearching}
        />
      )}
    </div>
  );
}

export default PropertyListings;
