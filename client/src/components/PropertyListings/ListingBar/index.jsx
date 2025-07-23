import React from 'react';
import dogIcon from '../../../assets/dibby_Dog_Logo.png';
import PriceDropDown from '../PriceDropdown/index.jsx';
import BedAndBathDropDown from '../BedAndBathDropdown/index.jsx';
import HomeTypeDropDown from '../HomeTypeDropDown/index.jsx';
import LeaseTypeDropDown from '../LeaseTypeDropDown/index.jsx';
import LocationSearch from '../../LocationSearch/index.jsx';
import './styles.css';

function ListingBar({
  onToggleDropdown,
  dropdownStates,
  onLocationSearch,
  isLoading,
  filters,
  filterHandlers,
}) {
  return (
    <section id='property-listing-bar'>
      <div id='property-listing-inputs'>
        <div id='property-listing-search-bar-wrapper'>
          <LocationSearch
            apiKey={import.meta.env.VITE_REALTOR_API_KEY}
            placeholder="Enter city, ZIP code, or address"
            onSearch={onLocationSearch}
            disabled={isLoading}
            className="property-listing-location-search"
            inputClassName="property-listing-search-input"
            buttonClassName="property-listing-search-button"
          />
        </div>
        
        <div className='property-listing-filters-row'>
          <div className="filter-dropdown-wrapper">
            <button
              type='button'
              id='property-listing-price'
              className={dropdownStates.price ? 'selected' : ''}
              onClick={() => onToggleDropdown('price')}
              disabled={isLoading}
            >
              Price
              <span
                className={`property-listing-custom-arrow ${
                  dropdownStates.price ? 'selected' : ''
                }`}
              />
            </button>
            {dropdownStates.price && (
              <PriceDropDown 
                onClose={() => onToggleDropdown('price')}
                onPriceChange={filterHandlers.onPriceChange}
                currentMin={filters.priceMin}
                currentMax={filters.priceMax}
              />
            )}
          </div>

          <div className="filter-dropdown-wrapper">
            <button
              type='button'
              id='property-listing-bed-bath'
              className={dropdownStates.bedsBaths ? 'selected' : ''}
              onClick={() => onToggleDropdown('bedsBaths')}
              disabled={isLoading}
            >
              Beds &amp; Bath
              <span
                className={`property-listing-custom-arrow ${
                  dropdownStates.bedsBaths ? 'selected' : ''
                }`}
              />
            </button>
            {dropdownStates.bedsBaths && (
              <BedAndBathDropDown 
                onClose={() => onToggleDropdown('bedsBaths')}
                onBedroomChange={filterHandlers.onBedroomChange}
                onBathroomChange={filterHandlers.onBathroomChange}
                currentBedrooms={filters.bedrooms}
                currentBathrooms={filters.bathrooms}
              />
            )}
          </div>

          <div className="filter-dropdown-wrapper">
            <button
              type='button'
              className={`property-listing-home-lease-type ${
                dropdownStates.homeType ? 'selected' : ''
              }`}
              onClick={() => onToggleDropdown('homeType')}
              disabled={isLoading}
            >
              Home Type
              <span
                className={`property-listing-custom-arrow ${
                  dropdownStates.homeType ? 'selected' : ''
                }`}
              />
            </button>
            {dropdownStates.homeType && (
              <HomeTypeDropDown 
                onClose={() => onToggleDropdown('homeType')}
                onPropertyTypeChange={filterHandlers.onPropertyTypeChange}
                currentPropertyTypes={filters.propertyType}
              />
            )}
          </div>

          <div className="filter-dropdown-wrapper">
            <button
              type='type'
              className={`property-listing-home-lease-type ${
                dropdownStates.leaseType ? 'selected' : ''
              }`}
              onClick={() => onToggleDropdown('leaseType')}
              disabled={isLoading}
            >
              Lease Type
              <span
                className={`property-listing-custom-arrow ${
                  dropdownStates.leaseType ? 'selected' : ''
                }`}
              />
            </button>
            {dropdownStates.leaseType && (
              <LeaseTypeDropDown onClose={() => onToggleDropdown('leaseType')} />
            )}
          </div>
        </div>
      </div>

      <img src={dogIcon} alt='dogIcon' id='property-listing-dog-icon' />
    </section>
  );
}

export default ListingBar;
