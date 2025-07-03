import React from 'react';
import NavBar from '../components/Navbar/index.jsx';
import Footer from '../components/Footer/index.jsx';
import ListingContainer from '../components/PropertyDetails/ListingContainer/index.jsx';
import PropertyPhotos from '../components/PropertyDetails/PropertyPhotos/index.jsx';

function PropertyDetails() {
  return (
    <div>
      <NavBar />
      <PropertyPhotos />
      <ListingContainer />
      <Footer />
    </div>
  );
}

export default PropertyDetails;
