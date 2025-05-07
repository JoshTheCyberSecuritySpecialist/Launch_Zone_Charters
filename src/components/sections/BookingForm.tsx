import React, { useState } from 'react';
import { Calendar, User, Mail, Phone, MessageSquare, CheckCircle } from 'lucide-react';
import { supabase, tourPrices, type TourType, type BookingFormData } from '../../lib/supabase';
import toast from 'react-hot-toast';

interface BookingFormProps {
  selectedDate: Date | null;
  selectedTour: TourType;
}

const BookingForm: React.FC<BookingFormProps> = ({ selectedDate, selectedTour }) => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    special_requests: '',
    participants: 1,
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate) {
      toast.error('Please select a date for your tour');
      return;
    }

    setIsSubmitting(true);

    const bookingData: BookingFormData = {
      ...formData,
      tour_type: selectedTour,
      selected_date: selectedDate,
      price: tourPrices[selectedTour],
    };

    try {
      const { error } = await supabase
        .from('bookings')
        .insert([bookingData]);

      if (error) throw error;

      setIsSubmitted(true);
      toast.success('Booking submitted successfully!');
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          full_name: '',
          email: '',
          phone: '',
          special_requests: '',
          participants: 1,
        });
      }, 5000);
    } catch (error) {
      console.error('Error submitting booking:', error);
      toast.error('Failed to submit booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const getTourName = (tourId: TourType) => {
    const names = {
      'rocket-premium': 'Premium Rocket Launch Tour',
      'rocket-private': 'Private Rocket Charter',
      'rocket-standby': 'Rocket Tour Standby',
      'bio-premium': 'Premium Bioluminescent Tour',
      'bio-private': 'Private Glow Tour',
      'bio-standby': 'Bioluminescent Standby',
    };
    return names[tourId];
  };

  return (
    <div className="bg-steel-gray/20 backdrop-blur-sm rounded-xl p-6">
      <h3 className="text-xl font-orbitron mb-6 text-white">
        Complete Your Reservation
      </h3>
      
      {isSubmitted ? (
        <div className="bg-success/20 border border-success/30 rounded-lg p-6 flex flex-col items-center text-center">
          <CheckCircle className="h-16 w-16 text-success mb-4" />
          <h4 className="text-xl font-orbitron font-semibold text-white mb-2">Booking Request Sent!</h4>
          <p className="text-gray-300">
            Thanks, we'll confirm your tour shortly! A confirmation email will be sent to your inbox.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {selectedDate && (
            <div className="bg-rocket-red/10 rounded-lg p-3 mb-4">
              <p className="text-white flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-rocket-red" />
                Selected: {getTourName(selectedTour)} on {selectedDate.toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Price: ${tourPrices[selectedTour]} {selectedTour.includes('private') ? 'total' : 'per person'}
              </p>
            </div>
          )}
          
          <div>
            <label htmlFor="full_name" className="block text-sm font-medium text-gray-300 mb-1">
              Full Name *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="full_name"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                required
                className="bg-steel-gray/40 border border-steel-gray/60 text-white rounded-lg pl-10 p-2.5 w-full focus:ring-rocket-red focus:border-rocket-red"
                placeholder="John Doe"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email Address *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-steel-gray/40 border border-steel-gray/60 text-white rounded-lg pl-10 p-2.5 w-full focus:ring-rocket-red focus:border-rocket-red"
                placeholder="you@example.com"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
              Phone Number (optional)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="bg-steel-gray/40 border border-steel-gray/60 text-white rounded-lg pl-10 p-2.5 w-full focus:ring-rocket-red focus:border-rocket-red"
                placeholder="(555) 123-4567"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="participants" className="block text-sm font-medium text-gray-300 mb-1">
              Number of Participants *
            </label>
            <select
              id="participants"
              name="participants"
              value={formData.participants}
              onChange={handleChange}
              required
              className="bg-steel-gray/40 border border-steel-gray/60 text-white rounded-lg p-2.5 w-full focus:ring-rocket-red focus:border-rocket-red"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                <option key={num} value={num}>{num} {num === 1 ? 'person' : 'people'}</option>
              ))}
              <option value="9">9+ people (group)</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="special_requests" className="block text-sm font-medium text-gray-300 mb-1">
              Special Requests (optional)
            </label>
            <div className="relative">
              <div className="absolute top-3 left-3 pointer-events-none">
                <MessageSquare className="h-5 w-5 text-gray-400" />
              </div>
              <textarea
                id="special_requests"
                name="special_requests"
                value={formData.special_requests}
                onChange={handleChange}
                rows={3}
                className="bg-steel-gray/40 border border-steel-gray/60 text-white rounded-lg pl-10 p-2.5 w-full focus:ring-rocket-red focus:border-rocket-red"
                placeholder="Any special requirements or questions?"
              />
            </div>
          </div>
          
          <button
            type="submit"
            disabled={!selectedDate || isSubmitting}
            className={`w-full py-3 px-5 font-orbitron font-medium rounded-lg text-sm text-center transition-colors ${
              selectedDate && !isSubmitting
                ? 'bg-rocket-red hover:bg-red-700 text-white' 
                : 'bg-gray-600 text-gray-300 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? 'Submitting...' : selectedDate ? 'Confirm Booking' : 'Please Select a Date'}
          </button>
          
          <p className="text-xs text-gray-400 mt-2">
            * Required fields. By submitting this form, you agree to our Terms of Service and Privacy Policy.
          </p>
        </form>
      )}
    </div>
  );
};

export default BookingForm;