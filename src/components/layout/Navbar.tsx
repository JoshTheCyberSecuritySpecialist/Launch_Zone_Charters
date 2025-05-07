import React, { useState, useEffect } from 'react';
import { Rocket, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Rocket Boat Tours', href: '#rocket-boat-tours' },
    { name: 'Bioluminescent Tours', href: '#bioluminescence-tour' },
    { name: 'Book Now', href: '#booking' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Blog', href: '/blog' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-space-black/90 backdrop-blur-sm shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 flex items-center">
            <Rocket className="h-10 w-10 text-rocket-red" />
            <span className="ml-3 text-xl font-bold font-orbitron tracking-wider">
              Launch Zone Charters
            </span>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`
                    px-3 py-2 text-sm font-medium transition-colors
                    ${link.name === 'Book Now' 
                      ? 'bg-rocket-red/90 hover:bg-rocket-red text-white rounded-md' 
                      : 'text-gray-300 hover:text-white'}
                  `}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-space-black/95 backdrop-blur-sm">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`
                  block px-3 py-2 text-base font-medium
                  ${link.name === 'Book Now'
                    ? 'bg-rocket-red/90 text-white rounded-md'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700 rounded-md'}
                `}
                onClick={toggleMenu}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;