import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatSuggestionText } from './formatLocationDisplay';

/**
 * Custom hook for location search with autocomplete functionality
 * @param {Object} options - Configuration options
 * @param {string} options.apiKey - RapidAPI key for autocomplete service
 * @param {string} options.navigateTo - Base URL to navigate to (default: '/property-listings')
 * @param {string} options.queryParam - Query parameter name (default: 'location')
 * @param {Function} options.onSearch - Optional callback when search is performed
 * @param {Function} options.onSelect - Optional callback when autocomplete item is selected
 * @param {Function} options.validator - Optional function to validate search input
 * @param {number} options.debounceMs - Debounce delay in milliseconds (default: 200)
 * @param {number} options.suggestionLimit - Maximum number of suggestions (default: 10)
 * @returns {Object} Search state and handlers
 */
export const useLocationSearch = ({
  apiKey,
  navigateTo = '/property-listings',
  queryParam,
  onSearch,
  onSelect,
  validator,
  debounceMs = 200,
  suggestionLimit = 10,
} = {}) => {
  const [searchValue, setSearchValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [lastSearchValue, setLastSearchValue] = useState('');
  const [selectedLocationId, setSelectedLocationId] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [error, setError] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  
  const navigate = useNavigate();
  const debounceRef = useRef(null);
  const abortControllerRef = useRef(null);

  // Fetch autocomplete suggestions from API
  const fetchSuggestions = useCallback(async (input) => {
    if (!input.trim() || input.length < 2) {
      setSuggestions([]);
      setLastSearchValue('');
      setShowSuggestions(false);
      return;
    }

    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller
    abortControllerRef.current = new AbortController();

    setIsLoadingSuggestions(true);
    setError('');

    const apiUrl = `https://realtor-search.p.rapidapi.com/properties/auto-complete?input=${encodeURIComponent(input)}&limit=${suggestionLimit}`;
    
    const headers = {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': 'realtor-search.p.rapidapi.com'
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: headers,
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        let errorDetails = '';
        try {
          const errorBody = await response.text();
          errorDetails = errorBody;
        } catch {
          // Ignore error reading response body
        }

        if (response.status === 403) {
          setError('Access denied. Please check your API key and subscription.');
        } else {
          setError(`API request failed: ${response.status} ${response.statusText}`);
        }
        
        throw new Error(`API request failed: ${response.status} ${response.statusText}${errorDetails ? ` - ${errorDetails}` : ''}`);
      }

      const data = await response.json();
      
      if (data?.data?.autocomplete) {
        setSuggestions(data.data.autocomplete);
        setLastSearchValue(input);
        setShowSuggestions(true);
        setActiveSuggestionIndex(-1);
      } else {
        setSuggestions([]);
        setLastSearchValue('');
        setShowSuggestions(false);
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        if (err.message.includes('403')) {
          setError('Access denied. Please check your API key and subscription.');
        } else {
          setError('Failed to load suggestions');
        }
        setSuggestions([]);
        setLastSearchValue('');
        setShowSuggestions(false);
      }
    } finally {
      setIsLoadingSuggestions(false);
    }
  }, [apiKey, suggestionLimit]);

  // Debounced fetch suggestions
  const debouncedFetchSuggestions = useCallback((input) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    
    debounceRef.current = setTimeout(() => {
      fetchSuggestions(input);
    }, debounceMs);
  }, [fetchSuggestions, debounceMs]);

  // Core navigation function
  const performNavigation = useCallback(async (searchTerm, locationId) => {
    // Custom validation if provided
    if (validator) {
      const validationError = validator(searchTerm);
      if (validationError) {
        setError(validationError);
        return false;
      }
    }

    setIsSearching(true);
    setShowSuggestions(false);

    try {
      // Call custom onSearch callback if provided
      if (onSearch) {
        await onSearch(searchTerm, locationId);
      } else {
        // Default navigation behavior
        const searchParams = new URLSearchParams();
        searchParams.set(queryParam, searchTerm);
        if (locationId) {
          searchParams.set('locationId', locationId);
        }
        const navigationUrl = `${navigateTo}?${searchParams.toString()}`;
        navigate(navigationUrl);
      }
      return true;
    } catch (err) {
      console.error('Search failed:', err);
      setError('Search failed. Please try again.');
      return false;
    } finally {
      setIsSearching(false);
    }
  }, [validator, onSearch, queryParam, navigateTo, navigate]);

  // Handle input changes
  const handleInputChange = useCallback((value) => {
    setSearchValue(value);
    setSelectedLocationId('');
    
    // Clear error when user starts typing
    if (error) {
      setError('');
    }

    // Fetch suggestions with debouncing
    debouncedFetchSuggestions(value);
  }, [error, debouncedFetchSuggestions]);

  // Handle input focus
  const handleInputFocus = useCallback(() => {
    const trimmedValue = searchValue.trim();
    
    if (
      suggestions.length > 0 && 
      trimmedValue.length >= 2 && 
      lastSearchValue && 
      (lastSearchValue.toLowerCase().includes(trimmedValue.toLowerCase()) || 
       trimmedValue.toLowerCase().includes(lastSearchValue.toLowerCase()))
    ) {
      setShowSuggestions(true);
      setActiveSuggestionIndex(-1);
    }
  }, [searchValue, suggestions, lastSearchValue]);

  // Handle suggestion selection
  const handleSuggestionSelect = useCallback(async (suggestion) => {
    // Use the proper formatting function
    const displayName = formatSuggestionText(suggestion);
    
    // Update local state first
    setSearchValue(displayName);
    setSelectedLocationId(suggestion.id);
    setShowSuggestions(false);
    setActiveSuggestionIndex(-1);
    
    // Call custom onSelect callback if provided
    if (onSelect) {
      onSelect(suggestion, displayName);
    }

    // Clear any previous errors
    setError('');

    // Perform navigation with the selected suggestion
    await performNavigation(displayName, suggestion.id);
  }, [onSelect, performNavigation]);

  // Handle search submission
  const handleSearchSubmit = useCallback(async () => {
    const trimmed = searchValue.trim();
    
    // Clear previous errors
    setError('');
    
    // Validate input
    if (!trimmed) {
      setError('Please enter a search term');
      return;
    }

    // If no location is selected but we have suggestions, automatically use the first one
    if (!selectedLocationId && suggestions.length > 0) {
      const firstSuggestion = suggestions[0];
      const displayName = formatSuggestionText(firstSuggestion);
      
      // Update local state to reflect the selection
      setSearchValue(displayName);
      setSelectedLocationId(firstSuggestion.id);
      setShowSuggestions(false);
      setActiveSuggestionIndex(-1);
      
      // Call custom onSelect callback if provided
      if (onSelect) {
        onSelect(firstSuggestion, displayName);
      }
      
      // Perform navigation with the first suggestion
      await performNavigation(displayName, firstSuggestion.id);
      return;
    }

    // Perform navigation with current search value (either with selectedLocationId or raw text)
    await performNavigation(trimmed, selectedLocationId);
  }, [searchValue, selectedLocationId, suggestions, onSelect, performNavigation]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e) => {
    if (!showSuggestions || suggestions.length === 0) {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSearchSubmit();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveSuggestionIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveSuggestionIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (activeSuggestionIndex >= 0 && suggestions[activeSuggestionIndex]) {
          handleSuggestionSelect(suggestions[activeSuggestionIndex]);
        } else {
          handleSearchSubmit();
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setActiveSuggestionIndex(-1);
        break;
      default:
        break;
    }
  }, [showSuggestions, suggestions, activeSuggestionIndex, handleSuggestionSelect, handleSearchSubmit]);

  // Close suggestions when clicking outside
  const closeSuggestions = useCallback(() => {
    setShowSuggestions(false);
    setActiveSuggestionIndex(-1);
  }, []);

  // Clear search
  const clearSearch = useCallback(() => {
    setSearchValue('');
    setSelectedLocationId('');
    setSuggestions([]);
    setLastSearchValue('');
    setShowSuggestions(false);
    setActiveSuggestionIndex(-1);
    setError('');
    
    // Cancel pending requests
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    searchValue,
    suggestions,
    selectedLocationId,
    isSearching,
    isLoadingSuggestions,
    error,
    showSuggestions,
    activeSuggestionIndex,
    handleInputChange,
    handleInputFocus,
    handleSuggestionSelect,
    handleSearchSubmit,
    handleKeyDown,
    closeSuggestions,
    clearSearch,
  };
}; 