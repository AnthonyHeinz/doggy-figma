import React from 'react';
import NavBar from '../components/Navbar/index.jsx';
import Footer from '../components/Footer/index.jsx';
import ListingContainer from '../components/PropertyDetails/ListingContainer/index.jsx';

function PropertyDetails() {
  return (
    <div>
      <NavBar />
      <ListingContainer />
      <Footer />
    </div>
  );
}

export default PropertyDetails;
