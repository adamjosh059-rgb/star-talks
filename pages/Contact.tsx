
import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', query: '', interest: 'reading' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-32 pb-24 px-4 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
      <div className="space-y-8">
        <h1 className="text-5xl font-serif text-gold">Reach Out to the Stars</h1>
        <p className="text-gray-300 text-lg leading-relaxed italic">
          "Whether you seek a personalized guide or have questions about your cosmic path, our sanctuary is open to all seekers."
        </p>
        
        <div className="space-y-6 pt-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold text-xl">📍</div>
            <div>
              <h4 className="text-white font-bold">Temple of Light</h4>
              <p className="text-gray-400">108 Celestial Way, Astral Heights, Earth</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold text-xl">📧</div>
            <div>
              <h4 className="text-white font-bold">Direct Resonance</h4>
              <p className="text-gray-400">wisdom@startalks.cosmos</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold text-xl">🔮</div>
            <div>
              <h4 className="text-white font-bold">Personalized Support</h4>
              <p className="text-gray-400">Available Mon-Fri during peak cosmic alignment.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/5 p-10 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
        {submitted ? (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in duration-700">
            <div className="text-6xl">🌟</div>
            <h2 className="text-3xl font-serif text-gold">Submission Received</h2>
            <p className="text-gray-300">Your message has been sent into the void, but it will not go unanswered. Wait for the signal.</p>
            <button onClick={() => setSubmitted(false)} className="text-gold border-b border-gold uppercase tracking-widest text-sm py-1">Send another</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-gold font-bold">What is your essence?</label>
              <input 
                type="text" 
                required
                placeholder="Name"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold/50 transition-colors"
                value={formState.name}
                onChange={(e) => setFormState({...formState, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-gold font-bold">Where can we reach you?</label>
              <input 
                type="email" 
                required
                placeholder="Email Address"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold/50 transition-colors"
                value={formState.email}
                onChange={(e) => setFormState({...formState, email: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-gold font-bold">How can we guide you?</label>
              <select 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold/50 transition-colors appearance-none"
                value={formState.interest}
                onChange={(e) => setFormState({...formState, interest: e.target.value})}
              >
                <option value="reading" className="bg-[#05050a]">Birth Chart Reading</option>
                <option value="remedy" className="bg-[#05050a]">Vedic Remedies</option>
                <option value="muhurta" className="bg-[#05050a]">Finding Auspicious Time</option>
                <option value="other" className="bg-[#05050a]">Other Guidance</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-gold font-bold">Your Query</label>
              <textarea 
                rows={4}
                required
                placeholder="Share your cosmic questions..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold/50 transition-colors resize-none"
                value={formState.query}
                onChange={(e) => setFormState({...formState, query: e.target.value})}
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-gold hover:bg-[#b8962e] text-black font-bold py-4 rounded-xl transition-all duration-300 shadow-lg shadow-gold/20 uppercase tracking-widest text-sm mt-4"
            >
              Transmit Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Contact;
