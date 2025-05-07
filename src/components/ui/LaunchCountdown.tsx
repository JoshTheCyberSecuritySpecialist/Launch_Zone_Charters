import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { formatDistanceToNowStrict, parseISO } from 'date-fns';
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
}

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch launch data');
  return res.json();
};

const LaunchCountdown = () => {
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [timeLeft, setTimeLeft] = useState<string | null>(null);
  
  const { data: launches, error, mutate } = useSWR<Launch[]>(
    'https://api.spacexdata.com/v4/launches/upcoming',
    fetcher,
    { 
      refreshInterval: 90000, // Refresh every 90 seconds
      revalidateOnFocus: true
    }
  );

  const floridaLaunch = launches?.find(launch => {
    const launchTime = new Date(launch.date_utc);
    const now = new Date();
    const in24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    return launchTime >= now && launchTime <= in24Hours;
  });

  useEffect(() => {
    const updateCountdown = () => {
      if (floridaLaunch) {
        const launchTime = parseISO(floridaLaunch.date_utc);
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
      <div className="bg-error/10 border border-error/30 rounded-lg p-4 text-error">
        Error loading launch data. Please try again later.
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
            <p className="text-gray-300">
              {floridaLaunch.details || 'Launch details pending...'}
            </p>
          </div>

          <div className="text-2xl font-orbitron text-white mb-4">
            {timeLeft}
          </div>

          {floridaLaunch.links.patch?.small && (
            <img 
              src={floridaLaunch.links.patch.small} 
              alt={`${floridaLaunch.name} mission patch`}
              className="h-16 w-16 object-contain"
            />
          )}
        </>
      ) : (
        <p className="text-gray-300">
          No launches scheduled in the next 24 hours
        </p>
      )}

      <div className="mt-4 text-xs text-gray-400">
        Last updated: {lastUpdate.toLocaleTimeString()}
      </div>
    </div>
  );
};

export default LaunchCountdown;