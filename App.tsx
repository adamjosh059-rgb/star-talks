
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CelestialBackground from './components/CelestialBackground';
import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Chat from './pages/Chat';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');

  // Handle hash change for simple routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || 'home';
      setCurrentPage(hash);
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    // Set initial page from hash
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: string) => {
    window.location.hash = page;
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onStartChat={() => navigateTo('chat')} />;
      case 'about':
        return <About />;
      case 'blog':
        return <Blog />;
      case 'chat':
        return <Chat />;
      case 'contact':
        return <Contact />;
      default:
        return <Home onStartChat={() => navigateTo('chat')} />;
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col">
      <CelestialBackground />
      <Navbar currentPage={currentPage} onPageChange={navigateTo} />
      
      <main className="flex-grow z-10">
        {renderPage()}
      </main>

      <Footer />
    </div>
  );
};

export default App;
