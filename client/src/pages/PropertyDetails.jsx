import React from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/Navbar/index.jsx';
import Footer from '../components/Footer/index.jsx';
import ListingContainer from '../components/PropertyDetails/ListingContainer/index.jsx';
import PropertyPhotos from '../components/PropertyDetails/PropertyPhotos/index.jsx';

function PropertyDetails() {
  const { id } = useParams();

  return (
    <div>
      <NavBar hideOnMobile />
      <PropertyPhotos propertyId={id} />
      <ListingContainer propertyId={id} />
      <Footer />
    </div>
  );
}

export default PropertyDetails;
