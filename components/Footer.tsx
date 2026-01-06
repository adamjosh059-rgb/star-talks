
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 border-t border-white/10 bg-[#05050a]/90 relative z-10">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="text-gold text-2xl">✨</span>
          <span className="text-2xl font-serif font-bold tracking-widest text-gold uppercase">Star Talks</span>
        </div>
        <p className="text-gray-500 text-sm max-w-lg mx-auto mb-8">
          The stars impel, they do not compel. Vedic Astrology is a spiritual discipline intended for self-growth and understanding.
        </p>
        <div className="flex justify-center gap-8 text-xs font-bold uppercase tracking-widest text-gray-400">
          <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-gold transition-colors">Copyright © 2024</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
