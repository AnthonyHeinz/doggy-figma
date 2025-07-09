import React from 'react';
import PropertySearch from '../../../assets/Property_Listing_Search.png';
import dogIcon from '../../../assets/dibby_Dog_Logo.png';
import PriceDropDown from '../PriceDropdown/index.jsx';
import BedAndBathDropDown from '../BedAndBathDropdown/index.jsx';
import HomeTypeDropDown from '../HomeTypeDropDown/index.jsx';
import LeaseTypeDropDown from '../LeaseTypeDropDown/index.jsx';
import './styles.css';

function ListingBar({
  searchValue,
  onSearchChange,
  onToggleDropdown,
  dropdownStates,
  onSearchSubmit,
}) {
  return (
    <section id='property-listing-bar'>
      <div id='property-listing-inputs'>
        <div id='property-listing-search-bar-wrapper'>
          <input
            type='text'
            id='property-listing-search-bar'
            placeholder='Enter city or ZIP Code'
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <button id='property-listing-search-button' onClick={onSearchSubmit}>
            <img
              src={PropertySearch}
              alt='Property Search'
              id='property-listing-search-glass'
            />
          </button>
        </div>
        <div className='property-listing-filters-row'>
          <button
            type='button'
            id='property-listing-price'
            className={dropdownStates.price ? 'selected' : ''}
            onClick={() => onToggleDropdown('price')}
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
            type='button'
            className={`property-listing-home-lease-type ${
              dropdownStates.leaseType ? 'selected' : ''
            }`}
            onClick={() => onToggleDropdown('leaseType')}
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
