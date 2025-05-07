import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { TourType } from '../../lib/supabase';

interface TourCalendarProps {
  onDateSelect: (date: Date) => void;
  tourType: TourType;
}

const TourCalendar: React.FC<TourCalendarProps> = ({ onDateSelect, tourType }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Generate available days based on tour type
  const getAvailableDates = () => {
    const dates: Date[] = [];
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // For rocket tours - available on Mondays, Wednesdays, Fridays
    if (tourType.startsWith('rocket-')) {
      for (let day = 1; day <= 31; day++) {
        const date = new Date(year, month, day);
        if (date.getMonth() === month) {
          const dayOfWeek = date.getDay();
          if (dayOfWeek === 1 || dayOfWeek === 3 || dayOfWeek === 5) {
            dates.push(date);
          }
        }
      }
    }
    
    // For bioluminescent tours - available on Tuesdays, Thursdays, Saturdays
    if (tourType.startsWith('bio-')) {
      for (let day = 1; day <= 31; day++) {
        const date = new Date(year, month, day);
        if (date.getMonth() === month) {
          const dayOfWeek = date.getDay();
          if (dayOfWeek === 2 || dayOfWeek === 4 || dayOfWeek === 6) {
            dates.push(date);
          }
        }
      }
    }
    
    return dates;
  };

  // Get best bioluminescent viewing dates (around new moon)
  const getBestBioLuminDates = () => {
    const dates: Date[] = [];
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // Fake new moon dates - in a real app, this would be calculated or come from an API
    const newMoonDay = 15; // Example day for new moon
    
    for (let day = newMoonDay - 3; day <= newMoonDay + 3; day++) {
      const date = new Date(year, month, day);
      if (date.getMonth() === month) {
        dates.push(date);
      }
    }
    
    return dates;
  };

  const availableDates = getAvailableDates();
  const bestBioLuminDates = getBestBioLuminDates();

  // Get days in month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get day of week of first day in month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  // Handle date selection
  const handleDateClick = (date: Date) => {
    const isAvailable = availableDates.some(availableDate => 
      availableDate.getDate() === date.getDate() &&
      availableDate.getMonth() === date.getMonth() &&
      availableDate.getFullYear() === date.getFullYear()
    );
    
    if (isAvailable) {
      setSelectedDate(date);
      onDateSelect(date);
    }
  };

  // Check if a date is available
  const isDateAvailable = (date: Date) => {
    return availableDates.some(availableDate => 
      availableDate.getDate() === date.getDate() &&
      availableDate.getMonth() === date.getMonth() &&
      availableDate.getFullYear() === date.getFullYear()
    );
  };

  // Check if a date is one of the best for bioluminescence
  const isBestBioLuminDate = (date: Date) => {
    return bestBioLuminDates.some(bestDate => 
      bestDate.getDate() === date.getDate() &&
      bestDate.getMonth() === date.getMonth() &&
      bestDate.getFullYear() === date.getFullYear()
    );
  };

  // Check if a date is selected
  const isDateSelected = (date: Date) => {
    return selectedDate !== null &&
      selectedDate.getDate() === date.getDate() &&
      selectedDate.getMonth() === date.getMonth() &&
      selectedDate.getFullYear() === date.getFullYear();
  };

  // Get date class based on its status
  const getDateClass = (date: Date) => {
    const baseClass = "p-2 text-center rounded-md border border-transparent transition-colors duration-200 text-sm ";
    
    if (isDateSelected(date)) {
      return baseClass + "bg-rocket-red text-white font-bold border-rocket-red cursor-pointer";
    } 
    
    if (isDateAvailable(date)) {
      if (isBestBioLuminDate(date) && tourType.startsWith('bio-')) {
        return baseClass + "bg-blue-500/70 text-white cursor-pointer hover:bg-blue-600";
      }
      return baseClass + "bg-green-500/70 text-white cursor-pointer hover:bg-green-600";
    }
    
    return baseClass + "bg-gray-600/30 text-gray-500 cursor-not-allowed";
  };

  // Render calendar
  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    
    const days = [];
    const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    
    // Render day names
    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={`header-${i}`} className="text-center font-orbitron py-2 text-gray-400 text-sm">
          {dayNames[i]}
        </div>
      );
    }
    
    // Render empty cells for days before first day of month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }
    
    // Render days of month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      days.push(
        <div
          key={`day-${day}`}
          onClick={() => handleDateClick(date)}
          className={getDateClass(date)}
        >
          {day}
        </div>
      );
    }
    
    return days;
  };

  return (
    <div className="select-none">
      {/* Calendar header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="p-1 rounded-full hover:bg-steel-gray/60"
        >
          <ChevronLeft className="h-5 w-5 text-gray-300" />
        </button>
        
        <div className="font-orbitron text-white">
          {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </div>
        
        <button
          onClick={nextMonth}
          className="p-1 rounded-full hover:bg-steel-gray/60"
        >
          <ChevronRight className="h-5 w-5 text-gray-300" />
        </button>
      </div>
      
      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {renderCalendar()}
      </div>
      
      <div className="mt-4 text-sm text-gray-400">
        <p className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-green-500 inline-block mr-2"></span> 
          Available dates
        </p>
        <p className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-gray-600 inline-block mr-2"></span> 
          Unavailable dates
        </p>
        {tourType.startsWith('bio-') && (
          <p className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-blue-500 inline-block mr-2"></span> 
            Best visibility for bioluminescence (new moon)
          </p>
        )}
      </div>
    </div>
  );
};

export default TourCalendar;