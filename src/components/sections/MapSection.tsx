import React from 'react';
import { MapPin, Navigation, ParkingMeter as Parking } from 'lucide-react';

const MapSection = () => {
  const locations = [
    { 
      icon: <Navigation className="h-5 w-5 text-rocket-red" />,
      title: "Boat Launch Dock",
      description: "Our rocket launch tours depart from here."
    },
    { 
      icon: <MapPin className="h-5 w-5 text-blue-400" />,
      title: "Kayak Meetup Point",
      description: "Check in for bioluminescent tours here."
    },
    { 
      icon: <Parking className="h-5 w-5 text-gray-300" />,
      title: "Parking Zone",
      description: "Free parking available for all guests."
    },
  ];

  return (
    <section id="location" className="py-16 bg-space-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-orbitron font-bold mb-4 text-white">
            Find Us
          </h2>
          <p className="max-w-2xl mx-auto text-gray-300">
            Located on Florida's Space Coast in Titusville, we offer the perfect viewing position for rocket launches and bioluminescent adventures.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 rounded-xl overflow-hidden h-[400px] relative">
<<<<<<< HEAD
            {/* In a real implementation, this would be an iframe with Google Maps */}
            <div className="absolute inset-0 bg-steel-gray/50 flex items-center justify-center">
              <div className="text-center p-8">
                <p className="text-xl font-orbitron mb-4 text-white">Google Maps Embed</p>
                <p className="text-gray-300">
                  1 A. Max Brewer Memorial Pkwy, Titusville, FL 32796
                </p>
              </div>
            </div>
=======
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.544205403183!2d-80.80268188456647!3d28.620153982418837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e0a65d06c18695%3A0x6c8f0b45c76d6aa1!2s1%20A.%20Max%20Brewer%20Memorial%20Pkwy%2C%20Titusville%2C%20FL%2032796!5e0!3m2!1sen!2sus!4v1629308075754!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Launch Zone Charters Location"
              className="absolute inset-0"
            />
>>>>>>> a922503 (Update LaunchTracker component with countdown fix and error handling)
          </div>
          
          <div className="space-y-6">
            <h3 className="text-xl font-orbitron text-white">Location Information</h3>
            
            <div className="space-y-4">
              {locations.map((location, index) => (
                <div key={index} className="bg-steel-gray/20 backdrop-blur-sm rounded-lg p-4 flex">
                  <div className="mr-3 mt-1">{location.icon}</div>
                  <div>
                    <h4 className="font-orbitron font-medium text-white">{location.title}</h4>
                    <p className="text-sm text-gray-300">{location.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-rocket-red/10 rounded-lg p-4 border border-rocket-red/30">
              <h4 className="font-orbitron font-medium text-white mb-2">Getting Here</h4>
              <p className="text-sm text-gray-300">
                From I-95, take exit 220 and head east on FL-406/Garden St. Continue onto Max Brewer Bridge. The launch site is located on the east side of the bridge.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;