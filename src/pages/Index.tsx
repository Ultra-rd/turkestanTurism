
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Destinations from '@/components/Destinations';
import Attractions from '@/components/Attractions';
import Tours from '@/components/tours/Tours';
import Events from '@/components/Events';
import PlanTrip from '@/components/PlanTrip';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Destinations />
      <Attractions />
      <Tours />
      <Events />
      <PlanTrip />
      <About />
      <Contact />
      <Footer />
      
      {/* Back to top button */}
      <a 
        href="#" 
        className="fixed bottom-8 right-8 bg-turkestan-purple hover:bg-turkestan-blue text-white p-3 rounded-full shadow-lg transition-colors"
      >
        <ArrowRight className="h-6 w-6 rotate-[-90deg]" />
      </a>
    </div>
  );
};

export default Index;
