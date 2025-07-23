import React from 'react';
import dogIcon from '../../../assets/dibby_Dog_Logo.png';
import PriceDropDown from '../PriceDropdown/index.jsx';
import BedAndBathDropDown from '../BedAndBathDropdown/index.jsx';
import HomeTypeDropDown from '../HomeTypeDropDown/index.jsx';
import LeaseTypeDropDown from '../LeaseTypeDropDown/index.jsx';
import LocationSearch from '../../LocationSearch/index.jsx';
import './styles.css';

function ListingBar({
  searchValue,
  onSearchChange,
  onToggleDropdown,
  dropdownStates,
  onLocationSearch, // New prop for handling location search
  isLoading, // New prop to disable search during loading
}) {
  return (
    <section id='property-listing-bar'>
      <div id='property-listing-inputs'>
        <div id='property-listing-search-bar-wrapper'>
          {/* Replace the simple input/button with LocationSearch */}
          <LocationSearch
            apiKey={import.meta.env.VITE_REALTOR_API_KEY}
            placeholder="Enter city, ZIP code, or address"
            onSearch={onLocationSearch} // Custom search handler
            disabled={isLoading}
            className="property-listing-location-search"
            inputClassName="property-listing-search-input"
            buttonClassName="property-listing-search-button"
            // Don't use navigateTo since we want custom behavior
          />
        </div>
        
        {/* Keep existing filter dropdowns unchanged */}
        <div className='property-listing-filters-row'>
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
            <PriceDropDown onClose={() => onToggleDropdown('price')} />
          )}

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
            <BedAndBathDropDown onClose={() => onToggleDropdown('bedsBaths')} />
          )}

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
            <HomeTypeDropDown onClose={() => onToggleDropdown('homeType')} />
          )}

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

      <img src={dogIcon} alt='dogIcon' id='property-listing-dog-icon' />
    </section>
  );
}

export default ListingBar;
