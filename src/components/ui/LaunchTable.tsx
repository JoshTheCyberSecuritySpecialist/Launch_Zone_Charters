import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import type { LaunchData } from '../../lib/launchUtils';

interface LaunchTableProps {
  launches: LaunchData[];
  isLoading: boolean;
  error?: string;
}

const LaunchTable: React.FC<LaunchTableProps> = ({ launches, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-16 bg-steel-gray/20 rounded-lg"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-error bg-error/10 rounded-lg p-4">
        {error}
      </div>
    );
  }

  if (!launches.length) {
    return (
      <div className="text-gray-400 text-center py-4">
        No upcoming launches found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left border-b border-steel-gray/20">
            <th className="py-2 px-4 font-orbitron text-gray-300">Mission</th>
            <th className="py-2 px-4 font-orbitron text-gray-300">Date/Time</th>
            <th className="py-2 px-4 font-orbitron text-gray-300">Location</th>
            <th className="py-2 px-4 font-orbitron text-gray-300">Status</th>
          </tr>
        </thead>
        <tbody>
          {launches.map((launch) => (
            <tr key={launch.id} className="border-b border-steel-gray/20">
              <td className="py-4 px-4">
                <div className="font-medium text-white">{launch.name}</div>
                {launch.missionDescription && (
                  <div className="text-sm text-gray-400 mt-1">{launch.missionDescription}</div>
                )}
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center text-gray-300">
                  <Calendar className="h-4 w-4 mr-2" />
                  {launch.launchTime}
                </div>
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center text-gray-300">
                  <MapPin className="h-4 w-4 mr-2" />
                  {launch.location}
                </div>
              </td>
              <td className="py-4 px-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rocket-red/20 text-rocket-red">
                  {launch.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LaunchTable;