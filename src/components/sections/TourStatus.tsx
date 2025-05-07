import React from 'react';
import StatusIndicator from '../ui/StatusIndicator';
import LaunchCountdown from '../ui/LaunchCountdown';
import { Cloud, Droplets, Wind, Moon } from 'lucide-react';

const TourStatus = () => {
  // This would typically come from an API or backend
  const weatherData = {
    temperature: 72,
    windSpeed: 6,
    tideHeight: 2.4,
    cloudCover: 15,
    moonPhase: 'Waning Crescent',
  };

  return (
    <section id="tour-status" className="bg-space-black py-8 border-y border-steel-gray/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Launch Countdown */}
          <LaunchCountdown />

          {/* Weather Widget */}
          <div className="bg-steel-gray/20 backdrop-blur-sm rounded-xl p-4 md:p-6">
            <h3 className="text-xl font-orbitron mb-4 text-white">Current Conditions</h3>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center space-x-2">
                <Wind className="text-gray-400" />
                <div>
                  <span className="text-sm text-gray-400">Wind</span>
                  <p className="text-white">{weatherData.windSpeed} mph</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Droplets className="text-gray-400" />
                <div>
                  <span className="text-sm text-gray-400">Tide</span>
                  <p className="text-white">{weatherData.tideHeight} ft</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Cloud className="text-gray-400" />
                <div>
                  <span className="text-sm text-gray-400">Cloud Cover</span>
                  <p className="text-white">{weatherData.cloudCover}%</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Moon className="text-gray-400" />
                <div>
                  <span className="text-sm text-gray-400">Moon</span>
                  <p className="text-white">{weatherData.moonPhase}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tour Status Indicators */}
          <div className="bg-steel-gray/20 backdrop-blur-sm rounded-xl p-4 md:p-6">
            <h3 className="text-xl font-orbitron mb-4 text-white">Tour Status</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <StatusIndicator status="Go" label="Rocket Launch Tour" />
              <StatusIndicator status="No-Go" label="Bioluminescent Kayak Tour" />
            </div>
            
            <p className="mt-4 text-sm text-gray-300">
              Status updates based on weather conditions, visibility, and launch schedules. 
              Check back for the latest information or subscribe to our alerts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TourStatus;