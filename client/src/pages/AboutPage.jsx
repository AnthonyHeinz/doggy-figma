import React from 'react';
import NavBar from '../components/Navbar/index.jsx';
import Footer from '../components/LandingPageSections/Footer/index.jsx';
import HeroSection from '../components/AboutPageSections/HeroSection/index.jsx';
import WhoAreWe from '../components/AboutPageSections/WhoAreWeSection/index.jsx'
import OurMission from '../components/AboutPageSections/OurMissionSection/index.jsx';

function AboutPage () {
    return(
        <div>
            <NavBar />
            <HeroSection />
            <WhoAreWe />
            <OurMission />
            <Footer />
        </div>
    )
}

export default AboutPage;