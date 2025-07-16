import React from 'react';
import LandingPage from './pages/LandingPage.jsx';
import PropertyListings from './pages/PropertyListings.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import PropertyDetails from './pages/PropertyDetails.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter basename='/doggy-figma/'>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/property-listings' element={<PropertyListings />} />
        <Route path='/property-details' element={<PropertyDetails />} />
        <Route path='/property-details/:id' element={<PropertyDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
