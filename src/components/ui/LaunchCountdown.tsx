import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { formatDistanceToNowStrict, parseISO } from 'date-fns';
<<<<<<< HEAD
import { RefreshCw } from 'lucide-react';

interface Launch {
  name: string;
  date_utc: string;
  details: string;
  links: {
    patch: {
      small: string | null;
    };
  };
=======
import { RefreshCw, Rocket, Link as LinkIcon, MapPin } from 'lucide-react';

interface Launch {
  id: string;
  name: string;
  net: string; // Launch time
  status: {
    name: string;
  };
  pad: {
    name: string;
    location: {
      name: string;
    };
  };
  mission?: {
    description: string;
  };
  vidURLs: string[];
>>>>>>> a922503 (Update LaunchTracker component with countdown fix and error handling)
}

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch launch data');
  return res.json();
};

const LaunchCountdown = () => {
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [timeLeft, setTimeLeft] = useState<string | null>(null);
  
<<<<<<< HEAD
  const { data: launches, error, mutate } = useSWR<Launch[]>(
    'https://api.spacexdata.com/v4/launches/upcoming',
=======
  // Fetch launches from Launch Library 2 API
  const { data, error, mutate } = useSWR<{ results: Launch[] }>(
    'https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=5&mode=detailed',
>>>>>>> a922503 (Update LaunchTracker component with countdown fix and error handling)
    fetcher,
    { 
      refreshInterval: 90000, // Refresh every 90 seconds
      revalidateOnFocus: true
    }
  );

<<<<<<< HEAD
  const floridaLaunch = launches?.find(launch => {
    const launchTime = new Date(launch.date_utc);
    const now = new Date();
    const in24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    return launchTime >= now && launchTime <= in24Hours;
=======
  // Find next Florida launch (Kennedy Space Center or Cape Canaveral)
  const floridaLaunch = data?.results.find(launch => {
    const location = launch.pad.location.name.toLowerCase();
    return (location.includes('kennedy') || location.includes('canaveral'));
>>>>>>> a922503 (Update LaunchTracker component with countdown fix and error handling)
  });

  useEffect(() => {
    const updateCountdown = () => {
      if (floridaLaunch) {
<<<<<<< HEAD
        const launchTime = parseISO(floridaLaunch.date_utc);
=======
        const launchTime = parseISO(floridaLaunch.net);
>>>>>>> a922503 (Update LaunchTracker component with countdown fix and error handling)
        setTimeLeft(formatDistanceToNowStrict(launchTime, { addSuffix: true }));
      } else {
        setTimeLeft(null);
      }
      setLastUpdate(new Date());
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [floridaLaunch]);

  if (error) {
    return (
<<<<<<< HEAD
      <div className="bg-error/10 border border-error/30 rounded-lg p-4 text-error">
        Error loading launch data. Please try again later.
=======
      <div className="bg-error/10 border border-error/30 rounded-lg p-4">
        <p className="text-error flex items-center">
          <Rocket className="h-5 w-5 mr-2" />
          Error loading launch data. Please try again later.
        </p>
>>>>>>> a922503 (Update LaunchTracker component with countdown fix and error handling)
      </div>
    );
  }

  return (
    <div className="bg-steel-gray/20 backdrop-blur-sm rounded-lg p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-orbitron text-white">Next Launch</h3>
        <button 
          onClick={() => mutate()} 
          className="text-gray-400 hover:text-white transition-colors"
          title="Refresh launch data"
        >
          <RefreshCw className="h-5 w-5" />
        </button>
      </div>

      {floridaLaunch ? (
        <>
          <div className="mb-4">
            <h4 className="text-lg font-orbitron text-rocket-red mb-2">
              {floridaLaunch.name}
            </h4>
<<<<<<< HEAD
            <p className="text-gray-300">
              {floridaLaunch.details || 'Launch details pending...'}
            </p>
=======
            <p className="text-gray-300 mb-2">
              {floridaLaunch.mission?.description || 'Launch details pending...'}
            </p>
            <div className="flex items-center text-gray-400 text-sm mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              {floridaLaunch.pad.name}, {floridaLaunch.pad.location.name}
            </div>
            <div className="flex items-center text-gray-400 text-sm">
              <LinkIcon className="h-4 w-4 mr-1" />
              Status: {floridaLaunch.status.name}
            </div>
>>>>>>> a922503 (Update LaunchTracker component with countdown fix and error handling)
          </div>

          <div className="text-2xl font-orbitron text-white mb-4">
            {timeLeft}
          </div>

<<<<<<< HEAD
          {floridaLaunch.links.patch?.small && (
            <img 
              src={floridaLaunch.links.patch.small} 
              alt={`${floridaLaunch.name} mission patch`}
              className="h-16 w-16 object-contain"
            />
=======
          {floridaLaunch.vidURLs.length > 0 && (
            <a
              href={floridaLaunch.vidURLs[0]}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-rocket-red hover:text-red-400 transition-colors text-sm"
            >
              <Rocket className="h-4 w-4 mr-1" />
              Watch Livestream
            </a>
>>>>>>> a922503 (Update LaunchTracker component with countdown fix and error handling)
          )}
        </>
      ) : (
        <p className="text-gray-300">
<<<<<<< HEAD
          No launches scheduled in the next 24 hours
=======
          No launches scheduled in Florida at this time
>>>>>>> a922503 (Update LaunchTracker component with countdown fix and error handling)
        </p>
      )}

      <div className="mt-4 text-xs text-gray-400">
        Last updated: {lastUpdate.toLocaleTimeString()}
      </div>
    </div>
  );
};

export default LaunchCountdown;