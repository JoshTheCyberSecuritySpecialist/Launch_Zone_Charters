import React from 'react';
import Countdown from '../ui/Countdown';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  // Set next launch date - this would typically come from an API
  const nextLaunch = new Date();
  nextLaunch.setDate(nextLaunch.getDate() + 7); // Example: Launch in 7 days

  return (
    <section 
      id="home" 
      className="relative h-screen flex items-center justify-center bg-cover bg-center" 
      style={{ 
        backgroundImage: "url('https://images.pexels.com/photos/23764/pexels-photo.jpg')" 
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 z-0"></div>
      
      {/* Subtle star animation - could be implemented with a background pattern */}
      <div className="absolute inset-0 z-0 opacity-30 overflow-hidden">
        {/* Stars would be implemented here with CSS */}
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-orbitron font-bold mb-4 text-white">
          Watch Rockets Launch from the <span className="text-rocket-red">Best Seat</span> on the Water
        </h1>
        
        <p className="mb-6 md:mb-8 text-xl text-gray-300 max-w-3xl mx-auto">
          Experience the thrill of rocket launches up close from our boats, or explore the magical glow of bioluminescent waters on our night kayak tours.
        </p>
        
        <div className="mb-8">
          <h2 className="text-xl md:text-2xl font-orbitron mb-4 text-white">Next Launch In:</h2>
          <Countdown targetDate={nextLaunch} />
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <a 
            href="#booking" 
            className="px-8 py-3 bg-rocket-red hover:bg-red-700 text-white font-orbitron font-semibold rounded-md transition duration-300 transform hover:scale-105 hover:animate-glow"
          >
            Book Your Launch Experience
          </a>
          
          <a 
            href="#rocket-boat-tours"
            className="px-8 py-3 bg-transparent border-2 border-white/50 hover:border-white text-white font-orbitron font-semibold rounded-md transition duration-300"
          >
            More About Boat Tours
          </a>
        </div>
      </div>
      
      {/* Scroll down indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <ChevronDown className="h-10 w-10 text-white/70" />
      </div>
    </section>
  );
};

export default Hero;