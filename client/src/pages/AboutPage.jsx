import React from 'react';
import NavBar from '../components/Navbar/index.jsx';
import Footer from '../components/LandingPageSections/Footer/index.jsx';
import HeroSection from '../components/AboutPageSections/HeroSection/index.jsx';

function AboutPage () {
    return(
        <div>
            <NavBar />
            <HeroSection />
            <Footer />
        </div>
    )
}

export default AboutPage;