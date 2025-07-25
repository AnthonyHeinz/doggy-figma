import React, { useRef, useEffect } from 'react';
import { useLocationSearch } from '../../util/useLocationSearch';
import { formatSuggestionText } from '../../util/formatLocationDisplay';
import './styles.css';

/**
 * Enhanced Location Search Component with Autocomplete
 * @param {Object} props - Component props
 * @param {string} props.apiKey - RapidAPI key for autocomplete service
 * @param {string} props.placeholder - Input placeholder text
 * @param {string} props.className - Additional CSS class for the wrapper
 * @param {string} props.inputClassName - CSS class for the input field
 * @param {string} props.buttonClassName - CSS class for the search button
 * @param {string} props.suggestionClassName - CSS class for suggestion items
 * @param {React.ReactNode} props.searchIcon - Search icon component or image source
 * @param {Function} props.onSearch - Custom search handler
 * @param {Function} props.onSelect - Custom selection handler
 * @param {Function} props.validator - Input validation function
 * @param {string} props.navigateTo - Navigation destination
 * @param {string} props.queryParam - Query parameter name
 * @param {boolean} props.disabled - Whether the search is disabled
 * @param {number} props.debounceMs - Debounce delay in milliseconds
 * @param {number} props.suggestionLimit - Maximum number of suggestions
 * @param {Object} props.searchOptions - Additional options for search hook
 */
const LocationSearch = ({
  apiKey,
  placeholder = 'Enter city, ZIP code, or address',
  className = '',
  inputClassName = '',
  buttonClassName = '',
  suggestionClassName = '',
  searchIcon = null,
  onSearch,
  onSelect,
  validator,
  navigateTo,
  queryParam,
  disabled = false,
  debounceMs = 200,
  suggestionLimit = 10,
  searchOptions = {},
  ...props
}) => {
  const searchRef = useRef(null);
  const suggestionsRef = useRef(null);

  const {
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
  } = useLocationSearch({
    apiKey,
    navigateTo,
    queryParam,
    onSearch,
    onSelect,
    validator,
    debounceMs,
    suggestionLimit,
    ...searchOptions,
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!disabled && !isSearching) {
      handleSearchSubmit();
    }
  };

  // Handle clicking outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target)
      ) {
        closeSuggestions();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [closeSuggestions]);

  // Format suggestion display text
  const formatSuggestionTextLocal = (suggestion) => {
    return formatSuggestionText(suggestion);
  };

  // Get suggestion type label
  const getSuggestionTypeLabel = (suggestion) => {
    switch (suggestion.area_type) {
      case 'city':
        return 'City';
      case 'neighborhood':
        return 'Neighborhood';
      case 'postal_code':
        return 'ZIP Code';
      case 'county':
        return 'County';
      case 'state':
        return 'State';
      case 'school':
        return 'School';
      case 'university':
        return 'University';
      default:
        return 'Location';
    }
  };

  return (
    <div className={`location-search-wrapper ${className}`} {...props}>
      <form onSubmit={handleSubmit} className="location-search-form">
        <div className="location-search-input-container" ref={searchRef}>
          <div className="location-search-input-wrapper">
            <input
              type="text"
              placeholder={placeholder}
              className={`location-search-input ${inputClassName} ${error ? 'error' : ''}`}
              value={searchValue}
              onChange={(e) => handleInputChange(e.target.value)}
              onFocus={handleInputFocus}
              onKeyDown={handleKeyDown}
              disabled={disabled || isSearching}
              autoComplete="off"
              role="combobox"
              aria-expanded={showSuggestions}
              aria-haspopup="listbox"
              aria-autocomplete="list"
              aria-activedescendant={
                activeSuggestionIndex >= 0 
                  ? `suggestion-${activeSuggestionIndex}` 
                  : undefined
              }
            />
            
            {/* Loading indicator */}
            {isLoadingSuggestions && (
              <div className="location-search-loading">
                <div className="location-search-spinner"></div>
              </div>
            )}
            
            {/* Search button */}
            <button
              type="submit"
              className={`location-search-button ${buttonClassName}`}
              disabled={disabled || isSearching || !searchValue.trim()}
              aria-label="Search"
            >
              {isSearching ? (
                <div className="location-search-spinner small"></div>
              ) : (
                searchIcon || (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )
              )}
            </button>
          </div>

          {/* Autocomplete suggestions */}
          {showSuggestions && suggestions.length > 0 && (
            <div 
              className="location-search-suggestions" 
              ref={suggestionsRef}
              role="listbox"
            >
              {suggestions.map((suggestion, index) => (
                <div
                  key={`${suggestion.id}-${index}`}
                  id={`suggestion-${index}`}
                  className={`location-search-suggestion ${suggestionClassName} ${
                    index === activeSuggestionIndex ? 'active' : ''
                  }`}
                  onClick={() => handleSuggestionSelect(suggestion)}
                  role="option"
                  aria-selected={index === activeSuggestionIndex}
                >
                  <div className="location-search-suggestion-content">
                    <div className="location-search-suggestion-text">
                      {formatSuggestionTextLocal(suggestion)}
                    </div>
                    <div className="location-search-suggestion-type">
                      {getSuggestionTypeLabel(suggestion)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* No results message */}
          {showSuggestions && suggestions.length === 0 && !isLoadingSuggestions && searchValue.length >= 2 && (
            <div className="location-search-no-results">
              No locations found
            </div>
          )}
        </div>
      </form>

      {/* Error message */}
      {error && (
        <div className="location-search-error" role="alert">
          {error}
        </div>
      )}

      {/* Selected location indicator (optional) */}
      {selectedLocationId && (
        <input 
          type="hidden" 
          name="selectedLocationId" 
          value={selectedLocationId} 
        />
      )}
    </div>
  );
};

export default LocationSearch; 