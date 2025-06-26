import CitySection from './components/CitySection';
import Footer from './components/Footer';
import HowItWorks from './components/HowItWorks';
import Navbar from './components/navbar';
import TheDibbyExperience from './components/TheDibbyExperience';
import WhyPeopleChooseDibby from './components/WhyPeopleChooseDibby';
import YourHomeYourChoice from './components/YourHomeYourChoice';

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
