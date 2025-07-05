import React from 'react';
import LandingPage from './pages/LandingPage.jsx';
import PropertyListings from './pages/PropertyListings.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import AboutPage from './pages/AboutPage.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/property-listings' element={<PropertyListings />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/about' element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
