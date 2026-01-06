
import React, { useState } from 'react';
import { BLOG_ARTICLES } from '../constants';
import { BlogArticle } from '../types';

const Blog: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);

  if (selectedArticle) {
    return (
      <div className="pt-32 pb-24 px-6 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
        <button 
          onClick={() => setSelectedArticle(null)}
          className="text-gold mb-12 hover:underline flex items-center gap-2 uppercase tracking-widest text-[10px] font-bold group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Articles
        </button>
        
        <header className="mb-12">
          <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] mb-6 opacity-60">
            <span className="text-gold">{selectedArticle.author}</span>
            <span className="w-1 h-1 bg-gold/50 rounded-full"></span>
            <span>{selectedArticle.date}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif mb-10 leading-tight">
            {selectedArticle.title}
          </h1>
          <div className="relative rounded-[2rem] overflow-hidden border border-white/10 aspect-[16/9] shadow-2xl">
            <img src={selectedArticle.image} alt={selectedArticle.title} className="w-full h-full object-cover" />
          </div>
        </header>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          {/* Enhanced readability: Higher line spacing, serif font for the soul, adjusted font size */}
          <div className="font-serif text-lg md:text-xl leading-[1.8] md:leading-[2] whitespace-pre-wrap opacity-80 tracking-wide text-justify italic">
            {selectedArticle.content}
          </div>
        </div>

        <div className="mt-20 pt-10 border-t border-white/10 flex justify-between items-center">
          <div className="flex gap-4">
             <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer hover:border-gold transition-colors">✨</div>
             <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer hover:border-gold transition-colors">🔮</div>
          </div>
          <button 
            onClick={() => setSelectedArticle(null)}
            className="text-gold font-bold uppercase tracking-widest text-[10px]"
          >
            End Reading
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-20 space-y-6">
        <h1 className="text-5xl md:text-7xl font-serif text-gold">Celestial Insights</h1>
        <p className="uppercase tracking-[0.4em] text-xs opacity-50 max-w-2xl mx-auto leading-relaxed">
          True essence to be aware of your own character and horoscopic facts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {BLOG_ARTICLES.map((article) => (
          <div 
            key={article.id} 
            className="bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden hover:border-gold/30 transition-all duration-500 group cursor-pointer flex flex-col hover:-translate-y-2 hover:shadow-2xl hover:shadow-gold/5"
            onClick={() => {
              setSelectedArticle(article);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="h-64 overflow-hidden relative">
              <img 
                src={article.image} 
                alt={article.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            <div className="p-10 flex-1 flex flex-col">
              <div className="text-[10px] text-gold uppercase tracking-[0.3em] font-bold mb-4">{article.date}</div>
              <h3 className="text-2xl font-serif mb-6 group-hover:text-gold transition-colors leading-tight">{article.title}</h3>
              <p className="text-sm font-light leading-relaxed opacity-50 mb-8 flex-1">{article.excerpt}</p>
              <div className="mt-auto pt-6 border-t border-white/5 text-gold text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
                Read Intelligence <span>→</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
