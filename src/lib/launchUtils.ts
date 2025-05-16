import { format, addDays, parseISO, isBefore } from 'date-fns';

interface LaunchData {
  id: string;
  name: string;
  launchTime: string; // Store as ISO 8601 for parsing
  displayTime: string; // Store formatted string for UI
  location: string;
  missionDescription?: string;
  status: string;
}

const CACHE_KEY = 'launchData';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

async function fetchLaunchData(): Promise<LaunchData[]> {
  // Check cache first
  const cachedData = localStorage.getItem(CACHE_KEY);
  if (cachedData) {
    const { data, timestamp } = JSON.parse(cachedData);
    console.log('Cached data:', { data, timestamp });
    if (Date.now() - timestamp < CACHE_DURATION) {
      return data;
    }
  }

  try {
    // Try LL2 API first
    const response = await fetch('https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=10&mode=detailed');
    console.log('LL2 API response status:', response.status);
    if (!response.ok) {
      const retryAfter = response.headers.get('Retry-After');
      if (retryAfter) {
        console.log(`Throttled. Waiting ${retryAfter} seconds before fallback.`);
        await new Promise(resolve => setTimeout(resolve, retryAfter * 1000)); // Wait before retrying
        return fetchLaunchData(); // Retry after delay
      }
      throw new Error(`LL2 API failed with status ${response.status}`);
    }

    const data = await response.json();
    console.log('Raw API response:', data);

    // Filter and transform the data
    const thirtyDaysFromNow = addDays(new Date(), 30);
    const launches = data.results
      .filter((launch: any) => {
        const launchDate = parseISO(launch.net);
        return isBefore(launchDate, thirtyDaysFromNow);
      })
      .map((launch: any) => ({
        id: launch.id,
        name: launch.name,
        launchTime: launch.net,
        displayTime: format(parseISO(launch.net), 'PPpp'),
        location: `${launch.pad.name}, ${launch.pad.location.name}`,
        missionDescription: launch.mission?.description,
        status: launch.status.name
      }));

    console.log('Processed launches:', launches);

    // Cache the processed data
    localStorage.setItem(CACHE_KEY, JSON.stringify({
      data: launches,
      timestamp: Date.now()
    }));

    return launches;
  } catch (error) {
    console.error('Error fetching launch data from LL2:', error);
    
    // Fallback to RocketLaunch.Live API
    try {
      const response = await fetch('https://fdo.rocketlaunch.live/json/launches/next/5', {
        headers: {
          'Authorization': 'Bearer YOUR_API_KEY_HERE' // Replace with your RocketLaunch.Live API key
        }
      });
      console.log('Fallback API response status:', response.status);
      if (!response.ok) {
        throw new Error(`Fallback API failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log('Raw fallback API response:', data);

      const launches = data.result.map((launch: any) => ({
        id: launch.id.toString(),
        name: launch.name,
        launchTime: launch.t0,
        displayTime: format(new Date(launch.t0), 'PPpp'),
        location: launch.pad.location.name,
        missionDescription: launch.mission_description,
        status: launch.status_name
      }));

      console.log('Processed fallback launches:', launches);

      localStorage.setItem(CACHE_KEY, JSON.stringify({
        data: launches,
        timestamp: Date.now()
      }));

      return launches;
    } catch (fallbackError) {
      console.error('Fallback API also failed:', fallbackError);
      return [];
    }
  }
}

export { fetchLaunchData, type LaunchData };