import { React, useState } from 'react';
import Pencil from '../../../assets/updatePencil.png';
import PreviewEye from '../../../assets/previewicons.png';
import TrashCan from '../../../assets/TrashCan.png';
import PropertyPic from '../../../assets/apartmentPreviewImage.png';
import './styles.css';

function PropertyListingCard({
  hardCodedListingInfo,
}) {
    const [published, setPublished] = useState('true');
    
  return (
    <div className='card-wrapper'>
      <div className='card-content'>
        <img src={PropertyPic} alt='property-pic' className='property-pic' />
        <div className='card-content-text'>
          <div className='listing-info'>
            <div className='listing-info-top-container'>
              <div className='apartment-details'>
              <div className='address'>{hardCodedListingInfo.address}</div>
              <div className='unit-info'>
                {hardCodedListingInfo.beds} bds | {hardCodedListingInfo.bath} ba
                | {hardCodedListingInfo.sqft} sqft
              </div>
              <div className='listing-price'>
                Listing Price: ${hardCodedListingInfo.price}/mo
              </div>
              </div>
            <button
              onClick={() =>
                setPublished(published === 'true' ? 'false' : 'true')
              }
              className={published === 'true' ? 'published' : 'unpublished'}
            >
              {published === 'true' ? 'Published' : 'Unpublished'}
            </button>
            </div>
          <div className='listing-info-bottom-container'>
            <div className='date-added'>
              Added: {hardCodedListingInfo.added}
            </div>
            <div className='listing-info-buttons'>
              <button className='edit'>
                <img src={Pencil} alt='pencil' className='edit-pencil' /> <span>Edit</span>
              </button>
              <button className='delete'>
                <img src={TrashCan} alt='trash' className='trash-can' /> <span>Delete</span>
              </button>
              <button className='preview'>
                <img src={PreviewEye} alt='eye' className='preview-eye' />{' '}
                <span>Preview</span>
              </button>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyListingCard;
