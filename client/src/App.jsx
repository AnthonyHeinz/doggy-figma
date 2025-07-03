import React from 'react';
import LandingPage from './pages/LandingPage.jsx';
import PropertyListings from './pages/PropertyListings.jsx';
import PropertyDetails from './pages/PropertyDetails.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/property-listings' element={<PropertyListings />} />
        <Route path='/property-details' element={<PropertyDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
