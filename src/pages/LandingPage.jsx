import { useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Hero from '../components/Hero/Hero';
import Services from '../components/Services/Services';
import Testimonial from '../components/Testimonial/Testimonial';
import AOS from 'aos';
import 'aos/dist/aos.css';

// This page was moved into a dedicated pages folder so it can be routed as the home screen.
// The AOS effect is kept here because the landing page uses animation effects for sections.
const LandingPage = () => {
  useEffect(() => {
    AOS.init({
      offset: 200,
      duration: 800,
      easing: 'ease-in-sine',
      delay: 100,
    });
  }, []);

  // The landing page renders the full homepage structure: navbar, hero banner, services, and testimonials.
  return (
    <div className="pt-20">
      <Navbar />
      <Hero />
      <Services />
      <Testimonial />
    </div>
  );
};

export default LandingPage;
