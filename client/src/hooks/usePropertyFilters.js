import { useState, useCallback, useMemo } from 'react';

export const usePropertyFilters = () => {
  const [filters, setFilters] = useState({
    propertyType: [],
    priceMin: '',
    priceMax: '',
    bedrooms: null,
    bathrooms: null,
  });

  const updateFilter = useCallback((filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  }, []);

  const updatePriceFilter = useCallback((type, value) => {
    setFilters(prev => ({
      ...prev,
      [`price${type}`]: value
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      propertyType: [],
      priceMin: '',
      priceMax: '',
      bedrooms: null,
      bathrooms: null,
    });
  }, []);

  // Convert filters to API format
  const apiFilters = useMemo(() => {
    const params = {};
    
    // Property types - convert to comma-separated string
    if (filters.propertyType.length > 0) {
      const typeMapping = {
        'Apartment': 'apartment',
        'Condo': 'condo',
        'House': 'single_family',
        'Room': 'other'
      };
      const mappedTypes = filters.propertyType.map(type => typeMapping[type] || 'other');
      params.propertyType = mappedTypes.join(',');
    }
    
    // Prices - format as "min,max"
    if (filters.priceMin || filters.priceMax) {
      const min = filters.priceMin.replace(/[\$,]/g, '') || '';
      const max = filters.priceMax.replace(/[\$,]/g, '') || '';
      params.prices = `${min},${max}`;
    }
    
    // Bedrooms - convert display format to API format
    if (filters.bedrooms !== null) {
      const bedroomMapping = {
        'Studio': 0,
        '1+': 1,
        '2+': 2,
        '3+': 3,
        '4+': 4,
        '5+': 5
      };
      params.bedrooms = bedroomMapping[filters.bedrooms];
    }
    
    // Bathrooms - convert display format to API format
    if (filters.bathrooms !== null) {
      const bathroomMapping = {
        '1+': 1,
        '2+': 2,
        '3+': 3,
        '4+': 4,
        '5+': 5
      };
      params.bathrooms = bathroomMapping[filters.bathrooms];
    }
    
    return params;
  }, [filters]);

  return {
    filters,
    updateFilter,
    updatePriceFilter,
    clearFilters,
    apiFilters
  };
}; 