import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const [openItem, setOpenItem] = useState<number | null>(0);
  
  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index);
  };
  
  const faqItems = [
    {
      question: "What should I bring for the rocket launch tour?",
      answer: "We recommend bringing water, sunscreen, a light jacket (evenings can get cool on the water), a camera, and any snacks you might want. We provide life jackets and all necessary safety equipment."
    },
    {
      question: "What is the best time to see the bioluminescence?",
      answer: "The best time is around the new moon when the sky is darkest, typically from May through November. The bioluminescent organisms are most active in warmer months, with peak activity usually in August and September."
    },
    {
      question: "Are the tours kid-friendly?",
      answer: "Yes, both our rocket launch and bioluminescent tours are family-friendly. Children ages 5 and up are welcome. We provide appropriately sized life jackets for all passengers including children."
    },
    {
      question: "Do I need kayaking experience for the bioluminescent tour?",
      answer: "No prior experience is needed. Our guides provide comprehensive instructions before launching, and the waters we paddle are typically calm. We use stable, easy-to-maneuver kayaks appropriate for beginners."
    },
    {
      question: "What happens if a rocket launch is scrubbed or delayed?",
      answer: "Rocket launches can be delayed or scrubbed due to weather or technical issues. If a launch is scrubbed before your tour, we'll contact you to reschedule or offer a refund. If scrubbed during the tour, we apply our 'Scrub Policy' which includes a discount on a future tour."
    },
    {
      question: "How close do we get to the rocket launches?",
      answer: "Our boats position at the closest safe viewing distance permitted by the Coast Guard, typically 3-5 miles from the launch pad. This provides an exceptional view while ensuring safety."
    },
  ];

  return (
    <section id="faq" className="py-16 bg-space-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-orbitron font-bold mb-4 text-white">
            Frequently Asked Questions
          </h2>
          <p className="max-w-2xl mx-auto text-gray-300">
            Find answers to common questions about our tours and experiences.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div 
                key={index} 
                className="bg-steel-gray/20 backdrop-blur-sm rounded-lg overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="flex justify-between items-center w-full px-6 py-4 text-left"
                >
                  <span className="font-orbitron text-white">{item.question}</span>
                  <span className="text-gray-400 flex-shrink-0 ml-2">
                    {openItem === index ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </span>
                </button>
                
                <div 
                  className={`px-6 overflow-hidden transition-all duration-300 ${
                    openItem === index ? 'max-h-96 pb-6' : 'max-h-0'
                  }`}
                >
                  <p className="text-gray-300">{item.answer}</p>
                  
                  {/* Add "Book Now" link at the bottom of some answers */}
                  {[1, 2, 3].includes(index) && (
                    <a 
                      href="#booking" 
                      className="inline-block mt-2 text-rocket-red hover:text-red-400 font-medium"
                    >
                      Book your tour now →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-300 mb-4">
              Have more questions? We're happy to help!
            </p>
            <a 
              href="mailto:contact@launchzonecharters.com" 
              className="inline-block px-6 py-3 bg-steel-gray/40 hover:bg-steel-gray/60 text-white font-orbitron rounded-lg transition"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;