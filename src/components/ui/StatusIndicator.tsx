import React from 'react';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

type StatusType = 'Go' | 'No-Go' | 'Pending';

interface StatusIndicatorProps {
  status: StatusType;
  label: string;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status, label }) => {
  const getStatusColor = (status: StatusType) => {
    switch (status) {
      case 'Go':
        return 'text-success';
      case 'No-Go':
        return 'text-error';
      case 'Pending':
        return 'text-warning';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: StatusType) => {
    switch (status) {
      case 'Go':
        return <CheckCircle className="w-5 h-5 md:w-6 md:h-6" />;
      case 'No-Go':
        return <XCircle className="w-5 h-5 md:w-6 md:h-6" />;
      case 'Pending':
        return <AlertTriangle className="w-5 h-5 md:w-6 md:h-6" />;
      default:
        return null;
    }
  };

  const getStatusBg = (status: StatusType) => {
    switch (status) {
      case 'Go':
        return 'bg-success/10';
      case 'No-Go':
        return 'bg-error/10';
      case 'Pending':
        return 'bg-warning/10';
      default:
        return 'bg-gray-700/50';
    }
  };

  return (
    <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${getStatusBg(status)}`}>
      <span className={getStatusColor(status)}>
        {getStatusIcon(status)}
      </span>
      <div>
        <p className="text-sm text-gray-300">{label}</p>
        <p className={`font-orbitron font-medium ${getStatusColor(status)}`}>
          {status}
        </p>
      </div>
    </div>
  );
};

export default StatusIndicator;