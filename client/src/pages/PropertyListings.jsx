import React from 'react';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PropertyListingContainer from '../components/PropertyListings/PropertyListingContainer/index.jsx';
import ListingBar from '../components/PropertyListings/ListingBar/index.jsx';
import { usePropertyFilters } from '../hooks/usePropertyFilters.js';
import { formatLocationDisplay } from '../util/formatLocationDisplay';

function PropertyListings() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [submittedLocation, setSubmittedLocation] = useState('');
  const [submittedLocationDisplay, setSubmittedLocationDisplay] = useState(''); // Add this
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

  const { filters, updateFilter, updatePriceFilter, clearFilters, apiFilters } = usePropertyFilters();

  // Initialize from URL parameters
  useEffect(() => {
    const locationParam = searchParams.get('locationId') || searchParams.get('location');
    if (locationParam) {
      setSubmittedLocation(locationParam);
    }
  }, [searchParams]);

  // Handle location search from LocationSearch component
  const handleLocationSearch = useCallback((searchTerm, locationId) => {
    setIsSearching(true);
    
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('location', searchTerm);
    if (locationId) {
      newSearchParams.set('locationId', locationId);
    }
    setSearchParams(newSearchParams);
    
    // Use locationId for API call, fallback to searchTerm if no locationId
    const apiLocation = locationId || searchTerm;
    setSubmittedLocation(apiLocation);
    setSubmittedLocationDisplay(searchTerm); // Store the display name
  }, [searchParams, setSearchParams]);

  // Enhanced API integration with filtering
  const fetchPropertyListings = useCallback(async (location, filterParams) => {
    if (!location || location.trim() === '') {
      return;
    }

    console.log(`🔍 Fetching property listings for location: "${location}" with filters:`, filterParams);

    try {
      setIsLoading(true);
      setIsSearching(false);

      const apiUrl = new URL('https://realtor-search.p.rapidapi.com/properties/search-rent');
      apiUrl.searchParams.append('location', location);
      apiUrl.searchParams.append('resultsPerPage', '20');
      apiUrl.searchParams.append('page', '1');
      apiUrl.searchParams.append('sortBy', 'best_match');

      // Add filter parameters
      Object.entries(filterParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          apiUrl.searchParams.append(key, value);
        }
      });

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
      
      if (data.data.results && Array.isArray(data.data.results)) {
        setPropertyListings(data.data.results);
        setPropertListingsPaginationData(data.meta);
        console.log(`📊 Number of properties found: ${data.data.results.length}`);
      } else {
        setPropertyListings([]);
      }

    } catch (error) {
      console.error('❌ Error fetching property listings:', error);
      setPropertyListings([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Effect to trigger API calls when location or filters change
  useEffect(() => {
    if (submittedLocation) {
      fetchPropertyListings(submittedLocation, apiFilters);
    }
  }, [submittedLocation, apiFilters, fetchPropertyListings]);

  const toggleDropdown = useCallback((key) => {
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
  }, []);

  // Memoized filter handlers
  const filterHandlers = useMemo(() => ({
    onPriceChange: (min, max) => {
      updatePriceFilter('Min', min);
      updatePriceFilter('Max', max);
    },
    onBedroomChange: (bedrooms) => {
      updateFilter('bedrooms', bedrooms);
    },
    onBathroomChange: (bathrooms) => {
      updateFilter('bathrooms', bathrooms);
    },
    onPropertyTypeChange: (propertyTypes) => {
      updateFilter('propertyType', propertyTypes);
    },
    onClearFilters: clearFilters
  }), [updateFilter, updatePriceFilter, clearFilters]);

  return (
    <div>
      <Navbar />
      <ListingBar
        onToggleDropdown={toggleDropdown}
        dropdownStates={dropdownStates}
        onLocationSearch={handleLocationSearch}
        isLoading={isLoading || isSearching}
        filters={filters}
        filterHandlers={filterHandlers}
      />
      {submittedLocation && (
        <PropertyListingContainer
          location={submittedLocationDisplay || formatLocationDisplay(submittedLocation)} // Use display name
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
