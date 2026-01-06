
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
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  // Toggle Theme
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (!isDarkMode) {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || 'home';
      setCurrentPage(hash);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: string) => {
    window.location.hash = page;
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onStartChat={() => navigateTo('chat')} isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />;
      case 'about':
        return <About />;
      case 'blog':
        return <Blog />;
      case 'chat':
        return <Chat />;
      case 'contact':
        return <Contact />;
      default:
        return <Home onStartChat={() => navigateTo('chat')} isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />;
    }
  };

  return (
    <div className={`min-h-screen relative flex flex-col ${isDarkMode ? 'dark' : 'light'}`}>
      <CelestialBackground isDarkMode={isDarkMode} />
      <Navbar 
        currentPage={currentPage} 
        onPageChange={navigateTo} 
        isDarkMode={isDarkMode} 
        onToggleTheme={toggleTheme} 
      />
      
      <main className="flex-grow z-10">
        {renderPage()}
      </main>

      <Footer />
    </div>
  );
};

export default App;
