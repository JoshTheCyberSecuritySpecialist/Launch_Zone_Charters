import React, { useState, useEffect } from 'react';
import { Rocket, Menu, X } from 'lucide-react';
<<<<<<< HEAD
=======
import { Link, useLocation } from 'react-router-dom';
>>>>>>> a922503 (Update LaunchTracker component with countdown fix and error handling)

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
<<<<<<< HEAD
=======
  const location = useLocation();
>>>>>>> a922503 (Update LaunchTracker component with countdown fix and error handling)

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
<<<<<<< HEAD
    { name: 'Home', href: '#' },
    { name: 'Rocket Boat Tours', href: '#rocket-boat-tours' },
    { name: 'Bioluminescent Tours', href: '#bioluminescence-tour' },
    { name: 'Book Now', href: '#booking' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Blog', href: '/blog' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

=======
    { name: 'Home', href: '/#home' },
    { name: 'Rocket Boat Tours', href: '/#rocket-boat-tours' },
    { name: 'Bioluminescent Tours', href: '/#bioluminescence-tour' },
    { name: 'Book Now', href: '/#booking' },
    { name: 'Gallery', href: '/#gallery' },
    { name: 'Blog', href: '/blog' },
    { name: 'FAQ', href: '/#faq' },
    { name: 'Contact', href: '/#contact' },
  ];

  const isHomePage = location.pathname === '/';

  const renderLink = (link: { name: string; href: string }) => {
    const baseClasses = `
      block px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap
      ${link.name === 'Book Now' 
        ? 'bg-rocket-red/90 hover:bg-rocket-red text-white rounded-md' 
        : 'text-gray-300 hover:text-white'}
    `;

    if (link.href.startsWith('/#') && !isHomePage) {
      return (
        <Link
          to={link.href.substring(1)}
          className={baseClasses}
        >
          {link.name}
        </Link>
      );
    }

    return (
      <a
        href={link.href}
        className={baseClasses}
      >
        {link.name}
      </a>
    );
  };

>>>>>>> a922503 (Update LaunchTracker component with countdown fix and error handling)
  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-space-black/90 backdrop-blur-sm shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
<<<<<<< HEAD
          <div className="flex-shrink-0 flex items-center">
            <Rocket className="h-10 w-10 text-rocket-red" />
            <span className="ml-3 text-xl font-bold font-orbitron tracking-wider">
              Launch Zone Charters
            </span>
=======
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <Rocket className="h-10 w-10 text-rocket-red" />
              <span className="ml-3 text-xl font-bold font-orbitron tracking-wider">
                Launch Zone Charters
              </span>
            </Link>
>>>>>>> a922503 (Update LaunchTracker component with countdown fix and error handling)
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:block">
<<<<<<< HEAD
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
=======
            <div className="flex items-center space-x-1">
              {navLinks.map((link) => (
                <div key={link.name}>
                  {renderLink(link)}
                </div>
>>>>>>> a922503 (Update LaunchTracker component with countdown fix and error handling)
              ))}
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
<<<<<<< HEAD
=======
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
>>>>>>> a922503 (Update LaunchTracker component with countdown fix and error handling)
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-space-black/95 backdrop-blur-sm">
<<<<<<< HEAD
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
=======
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <div key={link.name}>
                {renderLink(link)}
              </div>
>>>>>>> a922503 (Update LaunchTracker component with countdown fix and error handling)
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;