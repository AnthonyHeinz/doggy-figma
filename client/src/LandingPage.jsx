import CitySection from './components/LandingPageSections/CitySection/index.jsx';
import Footer from './components/LandingPageSections/Footer/index.jsx';
import HowItWorks from './components/LandingPageSections/HowItWorksSection/index.jsx';
import Navbar from './components/Navbar/index.jsx';
import TheDibbyExperience from './components/LandingPageSections/TheDibbyExperienceSection/index.jsx';
import WhyPeopleChooseDibby from './components/LandingPageSections/WhyPeopleChooseDibbySection/index.jsx';
import YourHomeYourChoice from './components/LandingPageSections/YourHomeYourChoiceSection/index.jsx';

function LandingPage() {
  return (
    <div>
      <Navbar />
      <CitySection />
      <HowItWorks />
      <TheDibbyExperience />
      <YourHomeYourChoice />
      <WhyPeopleChooseDibby />
      <Footer />
    </div>
  );
}

export default LandingPage;
