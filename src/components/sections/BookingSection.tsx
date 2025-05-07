import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import BookingForm from './BookingForm';
import TourCalendar from './TourCalendar';

const BookingSection = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTour, setSelectedTour] = useState<string>('rocket-premium');
  
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleTourSelect = (tourType: string) => {
    setSelectedTour(tourType);
  };

  const tourTypes = [
    { 
      id: 'rocket-premium',
      name: 'Premium Rocket Launch Tour',
      price: '$150',
      description: 'Front-row views, 5 guests max'
    },
    { 
      id: 'rocket-private',
      name: 'Private Rocket Charter',
      price: '$600',
      description: 'Private boat, up to 5 guests'
    },
    { 
      id: 'rocket-standby',
      name: 'Rocket Tour Standby',
      price: '$85',
      description: 'Subject to availability'
    },
    { 
      id: 'bio-premium',
      name: 'Premium Bioluminescent Tour',
      price: '$69',
      description: 'Small group, max 8 people'
    },
    { 
      id: 'bio-private',
      name: 'Private Glow Tour',
      price: '$300',
      description: 'Private guide, up to 4 people'
    },
    { 
      id: 'bio-standby',
      name: 'Bioluminescent Standby',
      price: '$40',
      description: 'Subject to availability'
    }
  ];

  return (
    <section id="booking" className="py-16 bg-steel-gray/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-orbitron font-bold mb-4 text-white">
            Book Your Space Coast Adventure
          </h2>
          <p className="max-w-2xl mx-auto text-gray-300">
            Select your preferred experience and date to begin your booking.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Tour Selection and Calendar */}
          <div className="bg-steel-gray/20 backdrop-blur-sm rounded-xl p-6">
            <h3 className="text-xl font-orbitron mb-6 text-white flex items-center">
              <Calendar className="mr-2 text-rocket-red" /> 
              Select Experience & Date
            </h3>
            
            {/* Tour type selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-4">
                Choose your adventure:
              </label>
              <div className="space-y-3">
                {tourTypes.map((tour) => (
                  <button
                    key={tour.id}
                    onClick={() => handleTourSelect(tour.id)}
                    className={`
                      w-full px-4 py-3 rounded-lg text-left transition
                      ${selectedTour === tour.id 
                        ? 'bg-rocket-red text-white' 
                        : 'bg-steel-gray/40 text-gray-300 hover:bg-steel-gray/60'}
                    `}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-orbitron">{tour.name}</div>
                        <div className="text-sm opacity-80">{tour.description}</div>
                      </div>
                      <div className="font-orbitron">{tour.price}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Calendar */}
            <TourCalendar onDateSelect={handleDateSelect} tourType={selectedTour} />
          </div>
          
          {/* Booking Form */}
          <BookingForm selectedDate={selectedDate} selectedTour={selectedTour} />
        </div>
      </div>
    </section>
  );
};

export default BookingSection;