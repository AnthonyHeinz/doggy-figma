import React from 'react';
import LandingPage from './pages/LandingPage.jsx';
import PropertyListings from './pages/PropertyListings.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import PropertyDetails from './pages/PropertyDetails.jsx';
import StripeCheckout from './components/StripeCheckout/index.jsx';
import CheckoutReturn from './components/StripeCheckout/CheckoutReturn.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter basename='/doggy-figma/'>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/property-listings' element={<PropertyListings />} />
        <Route path='/property-details/:id?' element={<PropertyDetails />} />
        <Route path='/checkout' element={<StripeCheckout />} />
        <Route path='/return' element={<CheckoutReturn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
