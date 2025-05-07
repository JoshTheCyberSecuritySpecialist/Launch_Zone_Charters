import React, { useState, useEffect } from 'react';
import { Rocket, Compass, Radio, Sunset, Users, Clock, Star, DollarSign } from 'lucide-react';

const RocketBoatTour = () => {
  const [showBookButton, setShowBookButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const threshold = 500; // Adjust this value as needed
      setShowBookButton(scrollPosition > threshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const tourFeatures = [
    {
      icon: <Rocket className="h-8 w-8 text-rocket-red" />,
      title: "Launch Tracking",
      description: "Real-time updates on launch status and positioning for the best views."
    },
    {
      icon: <Compass className="h-8 w-8 text-rocket-red" />,
      title: "Prime Location",
      description: "Optimal viewing distance from launch pads, away from crowds and traffic."
    },
    {
      icon: <Radio className="h-8 w-8 text-rocket-red" />,
      title: "Expert Narration",
      description: "Live commentary on mission details and Space Coast history."
    },
    {
      icon: <Sunset className="h-8 w-8 text-rocket-red" />,
      title: "Sunset Departures",
      description: "Evening launches offer spectacular sky views and photo opportunities."
    }
  ];

  const tourPackages = [
    {
      name: "Premium Rocket Launch Tour",
      price: "$150",
      priceDetail: "per person",
      features: [
        "2-hour duration",
        "Maximum 5 guests",
        "Front-row Indian River view",
        "Captain's live commentary",
        "Refreshments included",
        "Group photo"
      ],
      highlight: true,
      icon: <Star className="h-6 w-6" />
    },
    {
      name: "Private Charter",
      price: "$600",
      priceDetail: "up to 5 guests",
      features: [
        "2-hour private tour",
        "Exclusive boat access",
        "Perfect for families",
        "Flexible departure times",
        "Personalized experience",
        "Premium viewing spot"
      ],
      highlight: false,
      icon: <Users className="h-6 w-6" />
    },
    {
      name: "Budget Standby Ticket",
      price: "$85",
      priceDetail: "per person",
      features: [
        "Standby list only",
        "Subject to availability",
        "Same great experience",
        "Last-minute booking",
        "Sign-up required",
        "Limited spots"
      ],
      highlight: false,
      icon: <Clock className="h-6 w-6" />
    }
  ];

  return (
    <section id="rocket-boat-tours" className="py-16 bg-space-black relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20 z-0"
        style={{ 
          backgroundImage: "url('https://images.pexels.com/photos/586053/pexels-photo-586053.jpeg')" 
        }}
      ></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-orbitron font-bold mb-4 text-white">
            Rocket Launch Boat Tours – Front Row Views of Space
          </h2>
          <p className="max-w-3xl mx-auto text-xl text-gray-300">
            Join Launch Zone Charters on the Indian River Lagoon for a once-in-a-lifetime experience: watching rocket launches like SpaceX Starlink and NASA Artemis from the water. No crowds. No traffic. Just sky, stars, and liftoff.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-16">
          <div>
            <div className="relative h-80 md:h-96 lg:h-[500px] rounded-xl overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/14902529/pexels-photo-14902529.jpeg" 
                alt="Private rocket launch boat tour near Kennedy Space Center" 
                className="absolute inset-0 w-full h-full object-cover" 
              />
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-orbitron font-semibold mb-6 text-white">
              The Ultimate Launch Viewing Experience
            </h3>
            
            <p className="text-gray-300 mb-6">
              Experience the raw power of rocket launches from the best vantage point possible - the water. Our expert captains position you for perfect views of Kennedy Space Center's launch pads while maintaining a safe distance for the most spectacular views.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {tourFeatures.map((feature, index) => (
                <div key={index} className="flex flex-col bg-steel-gray/30 backdrop-blur-sm rounded-lg p-4">
                  <div className="mb-3">{feature.icon}</div>
                  <h4 className="font-orbitron font-medium text-lg mb-2 text-white">{feature.title}</h4>
                  <p className="text-sm text-gray-300">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing Packages */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-orbitron font-bold text-center mb-8 text-white">
            Rocket Boat Tour Packages
          </h3>
          <p className="text-center text-gray-300 max-w-3xl mx-auto mb-12">
            Experience the power of a rocket launch from the best seat on the Space Coast — the water. Choose from our carefully crafted packages:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tourPackages.map((pkg, index) => (
              <div 
                key={index}
                className={`
                  relative rounded-xl overflow-hidden
                  ${pkg.highlight 
                    ? 'bg-rocket-red/10 border-2 border-rocket-red' 
                    : 'bg-steel-gray/20 border border-steel-gray/40'}
                  backdrop-blur-sm p-6
                `}
              >
                {pkg.highlight && (
                  <div className="absolute top-4 right-4">
                    <Star className="h-6 w-6 text-rocket-red" fill="currentColor" />
                  </div>
                )}
                
                <div className="flex items-center mb-4">
                  <div className={`
                    p-2 rounded-lg mr-3
                    ${pkg.highlight ? 'bg-rocket-red/20' : 'bg-steel-gray/40'}
                  `}>
                    {pkg.icon}
                  </div>
                  <h4 className="font-orbitron font-semibold text-lg text-white">
                    {pkg.name}
                  </h4>
                </div>
                
                <div className="mb-6">
                  <span className="text-3xl font-orbitron text-white">{pkg.price}</span>
                  <span className="text-gray-400 ml-2">{pkg.priceDetail}</span>
                </div>
                
                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-300">
                      <DollarSign className="h-4 w-4 mr-2 text-rocket-red" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <a 
                  href="#booking" 
                  className={`
                    block text-center py-3 px-6 rounded-lg font-orbitron font-medium
                    transition duration-300 transform hover:scale-105
                    ${pkg.highlight 
                      ? 'bg-rocket-red hover:bg-red-700 text-white' 
                      : 'bg-steel-gray/40 hover:bg-steel-gray/60 text-white'}
                  `}
                >
                  Book This Package
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Book Now Button */}
      <div 
        className={`
          fixed bottom-6 right-6 z-50 transform transition-all duration-300
          ${showBookButton ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}
        `}
      >
        <a 
          href="#booking"
          className="bg-rocket-red hover:bg-red-700 text-white font-orbitron font-semibold px-6 py-3 rounded-full shadow-lg transition duration-300 flex items-center"
        >
          <Rocket className="h-5 w-5 mr-2" />
          Book Now
        </a>
      </div>
    </section>
  );
};

export default RocketBoatTour;