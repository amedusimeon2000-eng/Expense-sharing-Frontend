import { CallToAction } from '@/features/landing/ui/CallToAction';
import { LandingFooter } from '@/features/landing/ui/LandingFooter';
import { Features } from '@/features/landing/ui/Features';
import { Hero } from '@/features/landing/ui/Hero';
import { HowItWorks } from '@/features/landing/ui/HowItWorks';
import { LandingNav } from '@/features/landing/ui/LandingNav';

const LandingPage = () => (
  <div className='min-h-screen scroll-smooth bg-white'>
    <LandingNav />
    <Hero />
    <HowItWorks />
    <Features />
    <CallToAction />
    <LandingFooter />
  </div>
);

export default LandingPage;
