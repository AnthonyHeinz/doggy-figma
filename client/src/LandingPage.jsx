import CitySection from './components/CitySection/index.jsx';
import Footer from './components/Footer/index.jsx';
import HowItWorks from './components/HowItWorksSection/index.jsx';
import Navbar from './components/Navbar/index.jsx';
import TheDibbyExperience from './components/TheDibbyExperienceSection/index.jsx';
import WhyPeopleChooseDibby from './components/WhyPeopleChooseDibbySection/index.jsx';
import YourHomeYourChoice from './components/YourHomeYourChoiceSection/index.jsx';

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
