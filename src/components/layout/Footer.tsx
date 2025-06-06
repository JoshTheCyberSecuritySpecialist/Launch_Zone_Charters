import React from 'react';
import { Rocket, Mail, Facebook, Instagram, Youtube } from 'lucide-react';
<<<<<<< HEAD

const Footer = () => {
  const footerLinks = [
    { name: 'Home', href: '#' },
    { name: 'Tours', href: '#rocket-tours' },
    { name: 'Book', href: '#booking' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
=======
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const footerLinks = [
    { name: 'Home', href: '/#home' },
    { name: 'Tours', href: '/#rocket-boat-tours' },
    { name: 'Book', href: '/#booking' },
    { name: 'FAQ', href: '/#faq' },
    { name: 'Contact', href: '/#contact' },
>>>>>>> a922503 (Update LaunchTracker component with countdown fix and error handling)
  ];

  const socialLinks = [
    { name: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61575876815286', icon: Facebook },
    { name: 'Instagram', href: '#', icon: Instagram },
    { name: 'YouTube', href: '#', icon: Youtube },
  ];

<<<<<<< HEAD
=======
  const renderLink = (link: { name: string; href: string }) => {
    if (link.href.startsWith('/#') && !isHomePage) {
      return (
        <Link
          to={link.href.substring(1)}
          className="text-gray-300 hover:text-white transition"
        >
          {link.name}
        </Link>
      );
    }

    return (
      <a
        href={link.href}
        className="text-gray-300 hover:text-white transition"
      >
        {link.name}
      </a>
    );
  };

>>>>>>> a922503 (Update LaunchTracker component with countdown fix and error handling)
  return (
    <footer id="contact" className="bg-steel-gray">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and info */}
          <div className="flex flex-col">
<<<<<<< HEAD
            <div className="flex items-center">
=======
            <Link to="/" className="flex items-center">
>>>>>>> a922503 (Update LaunchTracker component with countdown fix and error handling)
              <Rocket className="h-10 w-10 text-rocket-red" />
              <span className="ml-3 text-xl font-bold font-orbitron tracking-wider text-white">
                Launch Zone Charters
              </span>
<<<<<<< HEAD
            </div>
=======
            </Link>
>>>>>>> a922503 (Update LaunchTracker component with countdown fix and error handling)
            <p className="mt-4 text-gray-300">
              Experience rocket launches from the water and glowing bioluminescent kayak adventures in Titusville, Florida.
            </p>
            <div className="mt-4 flex items-center text-gray-300">
              <Mail className="h-5 w-5 mr-2 text-rocket-red" />
              <a href="mailto:joshua@launchzonecharters.com" className="hover:text-white transition">
                joshua@launchzonecharters.com
              </a>
            </div>
          </div>

          {/* Navigation links */}
          <div>
            <h3 className="text-white font-orbitron font-semibold text-lg mb-4">Navigation</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
<<<<<<< HEAD
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition"
                  >
                    {link.name}
                  </a>
=======
                  {renderLink(link)}
>>>>>>> a922503 (Update LaunchTracker component with countdown fix and error handling)
                </li>
              ))}
            </ul>
          </div>

          {/* Social links */}
          <div>
            <h3 className="text-white font-orbitron font-semibold text-lg mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-gray-300 hover:text-white transition"
                    aria-label={link.name}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon className="h-6 w-6" />
                  </a>
                );
              })}
            </div>
            <div className="mt-6">
              <p className="text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} Launch Zone Charters. All rights reserved.
              </p>
              <div className="mt-2 flex space-x-4 text-sm text-gray-400">
                <a href="#" className="hover:text-white transition">Privacy Policy</a>
                <a href="#" className="hover:text-white transition">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;