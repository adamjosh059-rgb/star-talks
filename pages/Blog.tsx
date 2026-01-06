
import React, { useState } from 'react';
import { BLOG_ARTICLES } from '../constants';
import { BlogArticle } from '../types';

const Blog: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);

  if (selectedArticle) {
    return (
      <div className="pt-32 pb-24 px-4 max-w-4xl mx-auto">
        <button 
          onClick={() => setSelectedArticle(null)}
          className="text-gold mb-8 hover:underline flex items-center gap-2"
        >
          ← Back to Articles
        </button>
        <img src={selectedArticle.image} alt={selectedArticle.title} className="w-full h-96 object-cover rounded-3xl mb-10 shadow-2xl border border-white/10" />
        <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
          <span className="text-gold uppercase tracking-widest">{selectedArticle.author}</span>
          <span>•</span>
          <span>{selectedArticle.date}</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif text-white mb-8 leading-tight">{selectedArticle.title}</h1>
        <div className="prose prose-invert lg:prose-xl text-gray-300 leading-relaxed space-y-6 whitespace-pre-wrap">
          {selectedArticle.content}
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-serif text-gold mb-4">Celestial Insights</h1>
        <p className="text-gray-400 max-w-2xl mx-auto italic">True essence to be aware of your own character and horoscopic facts.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {BLOG_ARTICLES.map((article) => (
          <div 
            key={article.id} 
            className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-gold/50 transition-all duration-300 group cursor-pointer flex flex-col"
            onClick={() => setSelectedArticle(article)}
          >
            <div className="h-56 overflow-hidden">
              <img 
                src={article.image} 
                alt={article.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <div className="text-xs text-gold uppercase tracking-widest mb-3">{article.date}</div>
              <h3 className="text-2xl font-serif text-white mb-4 group-hover:text-gold transition-colors">{article.title}</h3>
              <p className="text-gray-400 text-sm mb-6 flex-1">{article.excerpt}</p>
              <div className="mt-auto pt-4 border-t border-white/10 text-gold text-xs font-bold uppercase tracking-widest">
                Read Article →
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
