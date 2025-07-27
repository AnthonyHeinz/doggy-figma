import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import { point, polygon } from '@turf/helpers';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ListingBar from '../components/PropertyListings/ListingBar/index.jsx';
import PropertyListingContainer from '../components/PropertyListings/PropertyListingContainer/index.jsx';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll.js';
import { usePropertyFilters } from '../hooks/usePropertyFilters.js';
import { formatLocationDisplay } from '../util/formatLocationDisplay';

function PropertyListings() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [submittedLocation, setSubmittedLocation] = useState('');
  const [submittedLocationDisplay, setSubmittedLocationDisplay] = useState('');
  const [propertyListings, setPropertyListings] = useState([]);
  const [propertyListingsPaginationData, setPropertyListingsPaginationData] = useState({});
  const [mapBoundary, setMapBoundary] = useState({});
  console.log('mapBoundary', mapBoundary);
  // Map Boundary Object looks like this:
  // {
  //   "type": ShapeType (circle, polygon, etc.)
  //   "coordinates": array of array of coordinates
  // }
  // For Property Coordinates, consider batchloading from fetch property listings
  // and then using the map boundary to filter the properties to only include those within the boundary
  // This will reduce the number of API calls and improve performance
  // For example, if the map boundary is a circle, we can use the radius to filter the properties
  // If the map boundary is a polygon, we can use the coordinates to filter the properties
  // If the map boundary is a rectangle, we can use the coordinates to filter the properties

  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownStates, setDropdownStates] = useState({
    price: false,
    bedsBaths: false,
    homeType: false,
    leaseType: false,
    sort: false,
  });

  const { filters, updateFilter, updatePriceFilter, clearFilters, apiFilters } = usePropertyFilters();

  const {
    lastElementRef,
    setLoadMoreCallback,
    isLoading: isLoadingMore,
    setIsLoading: setIsLoadingMore,
    hasMore,
    setHasMore,
  } = useInfiniteScroll();

  // Initialize from URL parameters
  useEffect(() => {
    const locationParam = searchParams.get('locationId') || searchParams.get('location');
    if (locationParam) {
      setSubmittedLocation(locationParam);
    }
  }, [searchParams]);

  // Handle location search from LocationSearch component
  const handleLocationSearch = useCallback((searchTerm, locationId) => {

    // Prevent duplicate calls with the same parameters
    if (submittedLocation === (locationId || searchTerm) && !isSearching) {
      return;
    }

    setIsSearching(true);

    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('location', searchTerm);
    if (locationId) {
      newSearchParams.set('locationId', locationId);
    }
    setSearchParams(newSearchParams);

    // Reset pagination when searching new location
    setCurrentPage(1);
    setPropertyListings([]);
    setHasMore(true);

    const apiLocation = locationId || searchTerm;
    setSubmittedLocation(apiLocation);
    setSubmittedLocationDisplay(searchTerm);
  }, [searchParams, setSearchParams, setHasMore, submittedLocation, isSearching]);

  // Enhanced API integration with pagination support
  const fetchPropertyListings = useCallback(async (location, filterParams, page = 1, append = false) => {
    if (!location || location.trim() === '') {
      return;
    }


    try {
      if (page === 1) {
        setIsLoading(true);
        setIsSearching(false);
      } else {
        setIsLoadingMore(true);
      }

      const apiUrl = new URL('https://realtor-search.p.rapidapi.com/properties/search-rent');
      apiUrl.searchParams.append('location', location);
      apiUrl.searchParams.append('resultsPerPage', '20');
      apiUrl.searchParams.append('page', page.toString());
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

      console.log('data', data);

      if (data.data && data.data.results && Array.isArray(data.data.results)) {
      const newListings = data.data.results;
      setMapBoundary(data.data.boundary);

      // Boundary filtering
      let filteredListings = newListings;
      if (data.data.boundary?.type === 'Polygon' && Array.isArray(data.data.boundary.coordinates)) {
        const coordinates = data.data.boundary.coordinates;
        // Ensure it's properly shaped
        const boundaryPoly = polygon(
          Array.isArray(coordinates[0][0])
            ? coordinates  // already shaped like [[[]]]
            : [coordinates]  // shape it like [[[]]]
        );

        console.log("boundaryPoly", boundaryPoly);

        filteredListings = newListings.filter((listing) => {
          console.log("listing", listing)
          const lat = listing.location.address?.coordinate?.lat;
          const lon = listing.location.address?.coordinate?.lon;

          if (lat !== undefined && lon !== undefined) {
            console.log("got inside this if statement")
            const pt = point([lon, lat]);
            return booleanPointInPolygon(pt, boundaryPoly);
          }

          return false;
        });
      }


      if (append && page > 1) {
        setPropertyListings(prev => [...prev, ...filteredListings]);
      } else {
        setPropertyListings(filteredListings);
      }

      setPropertyListingsPaginationData(data.meta || {});
      const totalPages = data.meta ? Math.ceil(data.meta.totalRecords / 20) : 1;
      setHasMore(page < totalPages);
    } else {
        if (!append) {
          setPropertyListings([]);
        }
        setHasMore(false);
      }

    } catch (error) {
      console.error('❌ Error fetching property listings:', error);
      if (!append) {
        setPropertyListings([]);
      }
      setHasMore(false);
    } finally {
      if (page === 1) {
        setIsLoading(false);
      } else {
        setIsLoadingMore(false);
      }
    }
  }, [setHasMore, setIsLoadingMore]);

  // Load more function for infinite scroll
  const loadMore = useCallback(() => {
    if (!isLoadingMore && hasMore && submittedLocation) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchPropertyListings(submittedLocation, apiFilters, nextPage, true);
    }
  }, [currentPage, submittedLocation, apiFilters, fetchPropertyListings, isLoadingMore, hasMore]);

  // Set up the infinite scroll callback
  useEffect(() => {
    setLoadMoreCallback(loadMore);
  }, [loadMore, setLoadMoreCallback]);

  // Effect to trigger API calls when location or filters change (first page only)
  useEffect(() => {
    if (submittedLocation) {
      setCurrentPage(1);
      setHasMore(true);
      fetchPropertyListings(submittedLocation, apiFilters, 1, false);
    }
  }, [submittedLocation, apiFilters, fetchPropertyListings, setHasMore]);

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
          location={submittedLocationDisplay || formatLocationDisplay(submittedLocation)}
          onToggleDropdown={toggleDropdown}
          dropdownStates={dropdownStates}
          listings={propertyListings}
          boundary={mapBoundary}
          paginationData={propertyListingsPaginationData}
          isLoading={isLoading || isSearching}
          isLoadingMore={isLoadingMore}
          hasMore={hasMore}
          lastElementRef={lastElementRef}
        />
      )}
    </div>
  );
}

export default PropertyListings;
