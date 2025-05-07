import React from 'react';
import { Calendar, Clock, MapPin, UserCheck, DollarSign, Star, Users } from 'lucide-react';

const BioluminescentTour = () => {
  const tourFeatures = [
    {
      icon: <Calendar className="h-8 w-8 text-rocket-red" />,
      title: "Seasonal Experience",
      description: "Best visibility from May to November, with peak glow around new moon nights."
    },
    {
      icon: <Clock className="h-8 w-8 text-rocket-red" />,
      title: "2-Hour Adventure",
      description: "Guided tour through the glowing waters of Indian River & Banana River lagoons."
    },
    {
      icon: <MapPin className="h-8 w-8 text-rocket-red" />,
      title: "Prime Location",
      description: "Launch from Titusville near Kennedy Space Center for minimal light pollution."
    },
    {
      icon: <UserCheck className="h-8 w-8 text-rocket-red" />,
      title: "All Skill Levels",
      description: "No prior kayaking experience needed. Our guides ensure a safe, enjoyable experience."
    }
  ];

  const tourPackages = [
    {
      name: "Premium Bioluminescent Tour",
      price: "$69",
      priceDetail: "per person",
      features: [
        "2-hour guided tour",
        "Small group (max 8)",
        "Kayak & gear included",
        "LED light provided",
        "Guide narration",
        "Glow tracking updates"
      ],
      highlight: true,
      icon: <Star className="h-6 w-6" />
    },
    {
      name: "Private Glow Tour",
      price: "$300",
      priceDetail: "up to 4 people",
      features: [
        "Private guide & gear",
        "Flexible scheduling",
        "Perfect for families",
        "GoPro footage (optional)",
        "Extended photo stops",
        "Personalized experience"
      ],
      highlight: false,
      icon: <Users className="h-6 w-6" />
    },
    {
      name: "Budget Standby Option",
      price: "$40",
      priceDetail: "per person",
      features: [
        "Same great experience",
        "Standby list only",
        "Subject to availability",
        "Same-day notification",
        "All gear included",
        "Perfect for flexible plans"
      ],
      highlight: false,
      icon: <Clock className="h-6 w-6" />
    }
  ];

  return (
    <section id="bioluminescence-tour" className="py-16 bg-space-black relative overflow-hidden">
      {/* Background effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20 z-0"
        style={{ 
          backgroundImage: "url('https://images.pexels.com/photos/6992/forest-trees-northwestisbest-exploress.jpg')" 
        }}
      ></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-orbitron font-bold mb-4 text-white">
            Bioluminescent Kayak Adventures
          </h2>
          <p className="max-w-3xl mx-auto text-xl text-gray-300">
            Paddle through waters that glow with every movement, creating a magical experience under the stars.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-16">
          <div>
            <div className="relative h-80 md:h-96 lg:h-[500px] rounded-xl overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/216927/pexels-photo-216927.jpeg" 
                alt="Bioluminescent kayaking tour at night in Florida" 
                className="absolute inset-0 w-full h-full object-cover" 
              />
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-orbitron font-semibold mb-6 text-white">
              Explore the Glowing Waters of Florida's Space Coast
            </h3>
            
            <p className="text-gray-300 mb-6">
              Experience one of nature's most magical phenomena as bioluminescent dinoflagellates illuminate the water with an ethereal blue glow. Each paddle stroke and movement creates waves of light in the water around you.
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
        <div className="mb-8">
          <h3 className="text-2xl md:text-3xl font-orbitron font-bold text-center mb-8 text-white">
            Bioluminescent Kayak Tours – Pricing & Packages
          </h3>
          <p className="text-center text-gray-300 max-w-3xl mx-auto mb-12">
            Paddle glowing waters under the stars during Florida's magical new moon nights. Choose your experience:
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
    </section>
  );
};

export default BioluminescentTour;