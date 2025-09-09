import NavBar from './landing/NavBar';
import Hero from './landing/Hero';
import Stats from './landing/Stats';
import Features from './landing/Features';
import HowItWorks from './landing/HowItWorks';
import CTA from './landing/CTA';
import Footer from './landing/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <NavBar />
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <CTA />
      <Footer />
    </div>
  );
};

export default LandingPage;
