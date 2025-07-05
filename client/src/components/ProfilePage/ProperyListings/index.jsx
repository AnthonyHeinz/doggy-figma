import React from 'react';
import DogIcon from '../../../assets/dibby_Dog_Logo.png';
import './styles.css';

function MyPropertyListings() {
  const [published, setPublished] = useState('true');

  const hardCodedListingInfo = {
    address: '627 Belmont Ave #6, Los Angeles, CA 90026',
    beds: '2',
    bath: '1',
    sqft: '875',
    listingPrice: '2800',
    added: 'June 1st, 2025'
  };

  return (
    <div>
      <div className='my-prop-list'>
        <h4>My Property Listings</h4>
        <div className='listings'>
            
        </div>
      </div>
      <img src={DogIcon} alt='dogIcon' className='my-prop-list-dog-icon' />
      <div className='my-prop-list-gradient-one'></div>
      <div className='my-prop-list-gradient-two'></div>
      <div className='my-prop-list-gradient-three'></div>
      <div className='my-prop-list-gradient-four'></div>
    </div>
  );
}

export default MyPropertyListings;
