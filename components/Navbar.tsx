
import React from 'react';

interface NavbarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onPageChange }) => {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'blog', label: 'Blog' },
    { id: 'chat', label: 'Talk to AI' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#05050a]/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div 
            className="flex-shrink-0 flex items-center gap-2 cursor-pointer"
            onClick={() => onPageChange('home')}
          >
            <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center border border-gold/50">
              <span className="text-gold text-2xl">✨</span>
            </div>
            <span className="text-2xl font-serif font-bold tracking-widest text-gold uppercase">Star Talks</span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onPageChange(item.id)}
                  className={`${
                    currentPage === item.id
                      ? 'text-gold border-b-2 border-gold'
                      : 'text-gray-300 hover:text-gold'
                  } px-3 py-2 text-sm font-medium transition-all duration-300 tracking-wider uppercase`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <div className="md:hidden">
            {/* Mobile menu button would go here, simplified for now */}
            <span className="text-gold">☰</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
