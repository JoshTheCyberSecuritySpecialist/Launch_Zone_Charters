import React, { useEffect, useState } from 'react';
import { RefreshCw, Rocket, Link as LinkIcon, MapPin, Clock } from 'lucide-react';
import { fetchLaunchData } from '../../lib/launchUtils';
import type { LaunchData } from '../../lib/launchUtils';

const LaunchTracker = () => {
  const [launches, setLaunches] = useState<LaunchData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const fetchLaunches = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchLaunchData();
      console.log('Fetched launches:', data); // Log the fetched data
      setLaunches(data);
      setLastUpdate(new Date());
    } catch (err) {
      console.error('Error fetching launches:', err);
      setError('Unable to load launch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLaunches();
    const refreshInterval = setInterval(fetchLaunches, 5 * 60 * 1000);
    return () => clearInterval(refreshInterval);
  }, []);

  useEffect(() => {
    if (!launches.length) return;

    const calculateTimeLeft = () => {
      const launchTimeStr = launches[0].launchTime;
      console.log('Raw launchTime:', launchTimeStr);
      const launchTime = new Date(launchTimeStr);
      console.log('Parsed launchTime:', launchTime);

      if (isNaN(launchTime.getTime())) {
        console.error('Invalid launch time format:', launchTimeStr);
        setError('Invalid launch time format');
        return;
      }

      const now = new Date();
      const difference = launchTime.getTime() - now.getTime();
      console.log('Difference:', difference);

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setCountdown({ days, hours, minutes, seconds });
      } else {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        fetchLaunches();
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [launches]);

  const formatCountdown = () => {
    const pad = (num: number) => num.toString().padStart(2, '0');
    return `T-${countdown.days}d ${pad(countdown.hours)}:${pad(countdown.minutes)}:${pad(countdown.seconds)}`;
  };

  if (error) {
    return (
      <div className="bg-steel-gray/20 backdrop-blur-sm rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-orbitron text-white">Next Launch</h3>
        </div>
        <div className="bg-error/10 border border-error/30 rounded-lg p-4">
          <div className="flex items-center text-error mb-2">
            <Rocket className="h-5 w-5 mr-2" />
            <span className="font-medium">{error}</span>
          </div>
          <button
            onClick={fetchLaunches}
            className="mt-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  const nextLaunch = launches[0];

  return (
    <div className="bg-steel-gray/20 backdrop-blur-sm rounded-lg p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-orbitron text-white">Next Launch</h3>
        <button
          onClick={fetchLaunches}
          className="text-gray-400 hover:text-white transition-colors"
          title="Refresh launch data"
        >
          <RefreshCw className="h-5 w-5" />
        </button>
      </div>

      {loading ? (
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-steel-gray/40 rounded w-3/4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-steel-gray/40 rounded"></div>
            <div className="h-4 bg-steel-gray/40 rounded w-5/6"></div>
          </div>
        </div>
      ) : nextLaunch ? (
        <>
          <div className="mb-4">
            <h4 className="text-lg font-orbitron text-rocket-red mb-2">
              {nextLaunch.name}
            </h4>
            {nextLaunch.missionDescription && (
              <p className="text-gray-300 mb-2">{nextLaunch.missionDescription}</p>
            )}
            <div className="flex items-center text-gray-400 text-sm mb-2">
              <Clock className="h-4 w-4 mr-1" />
              {nextLaunch.displayTime}
            </div>
            <div className="flex items-center text-gray-400 text-sm">
              <MapPin className="h-4 w-4 mr-1" />
              {nextLaunch.location}
            </div>
          </div>

          <div className="font-orbitron text-2xl text-rocket-red mt-4">
            {formatCountdown()}
          </div>

          <span className="text-sm text-gray-400">Launch time shown in your local time zone</span>

          <div className="mt-4 text-xs text-gray-400">
            Last updated: {lastUpdate.toLocaleTimeString()}
          </div>
        </>
      ) : (
        <p className="text-gray-300">No upcoming launches scheduled.</p>
      )}
    </div>
  );
};

export default LaunchTracker;