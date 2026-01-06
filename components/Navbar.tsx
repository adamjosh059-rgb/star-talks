
import React, { useState } from 'react';

interface NavbarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onPageChange, isDarkMode, onToggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'HOME' },
    { id: 'about', label: 'ABOUT US' },
    { id: 'blog', label: 'BLOG' },
    { id: 'chat', label: 'TALK TO AI' },
    { id: 'contact', label: 'CONTACT' },
  ];

  const handleNavClick = (id: string) => {
    onPageChange(id);
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-primary/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-24">
          {/* Logo Section */}
          <div 
            className="flex items-center gap-4 cursor-pointer group"
            onClick={() => handleNavClick('home')}
          >
            <div className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center bg-transparent group-hover:border-gold transition-colors overflow-hidden">
               <svg viewBox="0 0 24 24" className="w-6 h-6 fill-gold">
                <path d="M12,2L14.5,9.5L22,12L14.5,14.5L12,22L9.5,14.5L2,12L9.5,9.5L12,2Z" />
              </svg>
            </div>
            <span className="text-xl font-serif font-bold tracking-[0.2em] text-gold uppercase transition-all">
              STAR TALKS
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-12">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-1 py-2 text-[10px] font-bold tracking-[0.2em] transition-all duration-300 uppercase group ${
                  currentPage === item.id ? 'text-gold' : 'opacity-60 hover:opacity-100'
                }`}
              >
                {item.label}
                <span className={`absolute bottom-0 left-0 h-[2px] bg-gold transition-all duration-300 ${
                  currentPage === item.id ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </button>
            ))}

            {/* Theme Toggle Button */}
            <button 
              onClick={onToggleTheme}
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-gold transition-colors"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-4 lg:hidden">
            <button onClick={onToggleTheme} className="text-xl">
              {isDarkMode ? '☀️' : '🌙'}
            </button>
            <button 
              className="text-gold p-2 transition-transform active:scale-90"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      <div className={`lg:hidden fixed inset-0 top-24 bg-primary z-[99] transition-all duration-500 ease-in-out ${
        isMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}>
        <div className="flex flex-col items-center justify-center h-full space-y-10 pb-24">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`text-xl font-bold tracking-[0.3em] uppercase transition-all duration-300 ${
                currentPage === item.id ? 'text-gold scale-110' : 'opacity-50 hover:opacity-100'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-10 border-t border-white/10 w-24"></div>
          <p className="text-[10px] opacity-40 tracking-[0.5em] uppercase">Celestial Intelligence</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
