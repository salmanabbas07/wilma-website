import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Button from './components/Button/Button';
import Home from './components/Home/Home';
import About from './pages/About/About';
import Services from './pages/Services/Services';
import Contact from './pages/Contact/Contact';
import FAQ from './pages/FAQ/FAQ';
import Blog from './pages/Blog/Blog';
import './App.css';

/**
 * ScrollToTop helper component
 * Ensures window scrolls to top on route navigation
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
}

/**
 * PageNotFound fallback component in Slovenian
 */
function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center py-20 px-4 text-center">
      <div className="max-w-md mx-auto">
        <h1 className="text-6xl font-black text-brand-green mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Stran ni bila najdena
        </h2>
        <p className="text-gray-600 text-sm mb-6 leading-relaxed">
          Stran, ki jo iščete, ne obstaja ali pa je bila premaknjena na drug naslov.
        </p>
        <Button to="/" variant="primary" size="md">
          Nazaj na prvo stran
        </Button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-white text-gray-800">
        <Navbar />
        <main className="flex-1 page-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/o-nas" element={<About />} />
            <Route path="/storitve" element={<Services />} />
            <Route path="/pogosta-vprasanja" element={<FAQ />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/kontakt" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
