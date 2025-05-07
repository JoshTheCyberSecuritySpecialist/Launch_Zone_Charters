import React, { useState } from 'react';
import { X } from 'lucide-react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<null | { url: string, alt: string }>(null);
  
  // Gallery images - in a real app these would likely come from a CMS or API
  const galleryImages = [
    {
      url: "https://images.pexels.com/photos/14902529/pexels-photo-14902529.jpeg",
      alt: "Rocket launch from boat in Titusville",
      category: "rocket",
    },
    {
      url: "https://images.pexels.com/photos/586053/pexels-photo-586053.jpeg",
      alt: "SpaceX launch viewed from water",
      category: "rocket",
    },
    {
      url: "https://images.pexels.com/photos/2265876/pexels-photo-2265876.jpeg", 
      alt: "Night kayaking in Florida waters",
      category: "bioluminescent",
    },
    {
      url: "https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpg",
      alt: "Bioluminescent kayak adventure at night",
      category: "bioluminescent",
    },
    {
      url: "https://images.pexels.com/photos/13018060/pexels-photo-13018060.jpeg",
      alt: "Rocket launch moment capture",
      category: "rocket",
    },
    {
      url: "https://images.pexels.com/photos/176400/pexels-photo-176400.jpeg",
      alt: "Cocoa Beach bioluminescent kayak tour",
      category: "bioluminescent",
    },
  ];
  
  const openLightbox = (image: { url: string, alt: string }) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };
  
  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <section id="gallery" className="py-16 bg-steel-gray/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-orbitron font-bold mb-4 text-white">
            Experience Gallery
          </h2>
          <p className="max-w-2xl mx-auto text-gray-300">
            See the unforgettable moments from our rocket launch viewings and bioluminescent kayak adventures.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <div 
              key={index} 
              onClick={() => openLightbox(image)}
              className="relative h-60 sm:h-72 overflow-hidden rounded-lg cursor-pointer group"
            >
              <img 
                src={image.url} 
                alt={image.alt} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-orbitron text-sm">{image.alt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Lightbox */}
        {selectedImage && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
            <button 
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white p-2 rounded-full hover:bg-white/20"
            >
              <X className="h-8 w-8" />
            </button>
            
            <div className="relative max-w-4xl max-h-[80vh]">
              <img 
                src={selectedImage.url} 
                alt={selectedImage.alt} 
                className="max-h-[80vh] max-w-full object-contain" 
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/50">
                <p className="text-white text-center">{selectedImage.alt}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;