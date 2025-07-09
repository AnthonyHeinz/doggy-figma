import React from 'react';
import NavBar from '../components/Navbar/index.jsx';
import Footer from '../components/Footer/index.jsx';
import HeroSection from '../components/AboutPageSections/HeroSection/index.jsx';
import WhoAreWe from '../components/AboutPageSections/WhoAreWeSection/index.jsx'
import OurMission from '../components/AboutPageSections/OurMissionSection/index.jsx';
import MeetTheFounder from '../components/AboutPageSections/MeetTheFounderSection/index.jsx';

function AboutPage () {
    return(
        <div style={{ overflowX: 'hidden'}}>
            <NavBar />
            <HeroSection />
            <WhoAreWe />
            <OurMission />
            <MeetTheFounder />
            <Footer />
        </div>
    )
}

export default AboutPage;