import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
    <Router>
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
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;