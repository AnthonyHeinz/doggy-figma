import React from 'react';
import Pencil from '../../../assets/updatePencil.png';
import PreviewEye from '../../../assets/previewicons.png';
import TrashCan from '../../../assets/TrashCan.png';
import PropertyPic from '../../../assets/apartmentPreviewImage.png';
import './styles.css';

function PropertyListingCard({
  hardCodedListingInfo,
  published,
  setPublished,
}) {
  return (
    <div className='card-wrapper'>
      <div className='card-content'>
        <img src={PropertyPic} alt='property-pic' />
        <div className='listing-info'>
          <button
            onClick={() =>
              setPublished(published === 'true' ? 'false' : 'true')
            }
            className={published === 'true' ? 'published' : 'unpublished'}
          >
            {published === 'true' ? 'Published' : 'Unpublished'}
          </button>
          <div className='address'>{hardCodedListingInfo.address}</div>
          <div className='unitInfo'>
            {hardCodedListingInfo.beds} bds | {hardCodedListingInfo.bath} ba |{' '}
            {hardCodedListingInfo.sqft} sqft
          </div>
          <div className='listing-price'>
            Listing Price: ${hardCodedListingInfo.price}/mo
          </div>
        </div>
        <div className='date-added'>Added: {hardCodedListingInfo.added}</div>
        <div className='listing-info-buttons'>
          <button className='edit'>
            <img src={Pencil} alt='pencil' className='edit-pencikl' /> Edit
          </button>
          <button className='delete'>
            <img src={TrashCan} alt='trash' className='trash-can' /> Delete
          </button>
          <button className='preview'>
            <img src={PreviewEye} alt='eye' className='preview-eye' /> Preview
          </button>
        </div>
      </div>
    </div>
  );
}

export default PropertyListingCard;
