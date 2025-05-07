import React, { useState, useEffect } from 'react';

interface CountdownProps {
  targetDate: Date;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timer);
  }, [targetDate]);

  const padWithZero = (num: number): string => {
    return num.toString().padStart(2, '0');
  };

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-4 font-orbitron text-center">
      <div className="flex flex-col">
        <div className="bg-steel-gray/80 backdrop-blur rounded-md p-2 sm:p-3">
          <span className="block text-2xl sm:text-4xl md:text-5xl text-rocket-red font-bold">
            {padWithZero(timeLeft.days)}
          </span>
        </div>
        <span className="text-xs sm:text-sm mt-1 text-gray-300">DAYS</span>
      </div>

      <div className="flex flex-col">
        <div className="bg-steel-gray/80 backdrop-blur rounded-md p-2 sm:p-3">
          <span className="block text-2xl sm:text-4xl md:text-5xl text-rocket-red font-bold">
            {padWithZero(timeLeft.hours)}
          </span>
        </div>
        <span className="text-xs sm:text-sm mt-1 text-gray-300">HOURS</span>
      </div>

      <div className="flex flex-col">
        <div className="bg-steel-gray/80 backdrop-blur rounded-md p-2 sm:p-3">
          <span className="block text-2xl sm:text-4xl md:text-5xl text-rocket-red font-bold">
            {padWithZero(timeLeft.minutes)}
          </span>
        </div>
        <span className="text-xs sm:text-sm mt-1 text-gray-300">MINUTES</span>
      </div>

      <div className="flex flex-col">
        <div className="bg-steel-gray/80 backdrop-blur rounded-md p-2 sm:p-3">
          <span className="block text-2xl sm:text-4xl md:text-5xl text-rocket-red font-bold">
            {padWithZero(timeLeft.seconds)}
          </span>
        </div>
        <span className="text-xs sm:text-sm mt-1 text-gray-300">SECONDS</span>
      </div>
    </div>
  );
};

export default Countdown;