import React from 'react';
<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
=======
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
>>>>>>> a922503 (Update LaunchTracker component with countdown fix and error handling)
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import TourStatus from './components/sections/TourStatus';
import RocketBoatTour from './components/sections/RocketBoatTour';
import BioluminescentTour from './components/sections/BioluminescentTour';
import BookingSection from './components/sections/BookingSection';
import MapSection from './components/sections/MapSection';
import Gallery from './components/sections/Gallery';
import FAQ from './components/sections/FAQ';
import Footer from './components/layout/Footer';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import BlogAdmin from './pages/BlogAdmin';

function App() {
  return (
<<<<<<< HEAD
    <Router>
=======
    <Router basename={import.meta.env.BASE_URL}>
>>>>>>> a922503 (Update LaunchTracker component with countdown fix and error handling)
      <div className="min-h-screen bg-space-black text-white font-space">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <main>
              <Hero />
              <TourStatus />
              <RocketBoatTour />
              <BioluminescentTour />
              <BookingSection />
              <Gallery />
              <MapSection />
              <FAQ />
            </main>
          } />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/admin/blog" element={<BlogAdmin />} />
<<<<<<< HEAD
=======
          <Route path="*" element={<Navigate to="/" replace />} />
>>>>>>> a922503 (Update LaunchTracker component with countdown fix and error handling)
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;