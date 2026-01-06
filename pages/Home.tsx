
import React from 'react';
import { NINE_GRAHAS } from '../constants';

interface HomeProps {
  onStartChat: () => void;
}

const Home: React.FC<HomeProps> = ({ onStartChat }) => {
  return (
    <div className="relative pt-20">
      {/* Hero Section */}
      <section className="min-h-[90vh] flex flex-col items-center justify-center text-center px-4">
        <div className="animate-pulse mb-8">
          <div className="w-24 h-24 rounded-full border-2 border-gold flex items-center justify-center">
            <span className="text-4xl">✨</span>
          </div>
        </div>
        <h1 className="text-5xl md:text-8xl font-serif font-bold mb-6 tracking-tight text-white">
          Star <span className="text-gold">Talks</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mb-10 leading-relaxed italic">
          "Talk to your Ownself, to better know yourself, ultimately better know the whole universe."
        </p>
        <button 
          onClick={onStartChat}
          className="bg-gold hover:bg-[#b8962e] text-black font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-gold/20 tracking-widest uppercase text-sm"
        >
          Begin Your Cosmic Dialogue
        </button>
      </section>

      {/* The intelligence of Vedic calculation Section */}
      <section className="py-24 bg-[#05050a]/60 backdrop-blur-md border-y border-white/5">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">The Astronomical Edge</h2>
            <p className="text-gold uppercase tracking-[0.3em] text-sm font-bold">Why Vedic Calculations Rule the Sky</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="p-6 bg-white/5 border-l-4 border-gold rounded-r-xl">
                <h3 className="text-xl font-bold text-white mb-2">Sidereal vs. Tropical</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Western astrology uses the <strong>Tropical Zodiac</strong>, which is fixed to the seasons. However, due to the Earth's "wobble" (Precession of the Equinoxes), the stars have shifted. Vedic astrology uses the <strong>Sidereal Zodiac</strong>, which tracks the <em>actual, physical positions</em> of the stars in the sky today.
                </p>
              </div>
              <div className="p-6 bg-white/5 border-l-4 border-gold rounded-r-xl">
                <h3 className="text-xl font-bold text-white mb-2">The 24-Degree Discrepancy</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Most people born under a Western "Aries" Sun are actually <strong>Pisces</strong> in the real sky. Western astrology is currently about 24 degrees out of sync with astronomy. Vedic calculations correct this via the <em>Ayanamsha</em>, ensuring your chart matches the literal heavens.
                </p>
              </div>
              <div className="p-6 bg-white/5 border-l-4 border-gold rounded-r-xl">
                <h3 className="text-xl font-bold text-white mb-2">The Dasha Engine</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  While Western astrology looks at transits, Vedic intelligence utilizes <strong>Vimshottari Dashas</strong>—a unique 120-year planetary cycle that predicts <em>when</em> specific karmas will ripen with uncanny precision.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-gold/10 blur-3xl rounded-full"></div>
              <div className="relative bg-black/40 border border-white/10 p-8 rounded-3xl shadow-2xl">
                <h4 className="text-gold font-serif text-2xl mb-6 text-center italic">The Accuracy Gap</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 border-b border-white/5">
                    <span className="text-gray-500 text-xs uppercase">Basis</span>
                    <span className="text-white text-sm">Actual Fixed Stars</span>
                  </div>
                  <div className="flex justify-between items-center p-3 border-b border-white/5">
                    <span className="text-gray-500 text-xs uppercase">Zodiac</span>
                    <span className="text-white text-sm font-bold">Sidereal (Astronomical)</span>
                  </div>
                  <div className="flex justify-between items-center p-3 border-b border-white/5 text-gold">
                    <span className="text-xs uppercase">Precision</span>
                    <span className="text-sm font-bold">Matches NASA Data</span>
                  </div>
                  <div className="pt-6 text-center">
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest leading-loose">
                      Vedic intelligence doesn't just guess your personality;<br/>It calculates your soul's trajectory using the literal physics of the universe.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-[#05050a]/40 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-8">The Philosophy of Self-Dialogue</h2>
          <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
            <p>
              In the ancient Vedic tradition, the external world is considered a "Mahadakasha" (Great Space), while the internal world of the human heart is the "Chidakasha" (Space of Consciousness).
            </p>
            <p>
              When we say "Talk to your Ownself," we refer to the process of using your birth chart as a high-fidelity prompt for deep introspection. Unlike generic Western horoscopes, Vedic charts are built on the <strong>Nakshatras</strong>—27 lunar mansions that divide the sky into precise psychological archetypes.
            </p>
            <p className="text-gold italic font-serif text-xl pt-6">
              "Vedic astrology is the 'Eye of the Veda'—it is the intelligence required to see the invisible threads of destiny."
            </p>
          </div>
        </div>
      </section>

      {/* Nine Grahas Grid */}
      <section className="py-24 bg-white/5 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-white mb-4">The Nine Celestial Sovereigns</h2>
            <p className="text-gray-400">The primary planetary forces that shape the human psychological experience.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {NINE_GRAHAS.map((graha, idx) => (
              <div key={idx} className="p-8 rounded-2xl bg-black/40 border border-white/10 hover:border-gold/40 transition-all duration-500 group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 text-gold/10 text-4xl font-serif">{idx + 1}</div>
                <div className="text-gold font-serif text-2xl mb-2 group-hover:scale-110 transition-transform origin-left">{graha.name}</div>
                <div className="text-xs uppercase tracking-widest text-gray-500 mb-4">{graha.role}</div>
                <p className="text-gray-400 text-sm leading-relaxed">{graha.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The 12 Bhavas (Houses) */}
      <section className="py-24 bg-[#05050a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2">
              <h2 className="text-4xl font-serif text-white mb-8">The 12 Bhavas: The Stage of Life</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Your birth chart is divided into twelve segments called "Bhavas" or Houses. While Western houses are often debated, Vedic houses are mathematically solidified through the <em>Sripati</em> and <em>Placidus</em> systems for objective accuracy.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  "1st: Personality & Vitality", "2nd: Wealth & Family",
                  "3rd: Courage & Communication", "4th: Home & Emotions",
                  "5th: Creativity & Children", "6th: Health & Service",
                  "7th: Partnerships & Marriage", "8th: Transformation & Mystery",
                  "9th: Wisdom & Fortune", "10th: Career & Legacy",
                  "11th: Gains & Social Networks", "12th: Spirituality & Release"
                ].map((house, i) => (
                  <div key={i} className="text-sm text-gray-400 border-l border-gold/30 pl-4 py-2 hover:bg-white/5 transition-colors">
                    {house}
                  </div>
                ))}
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="aspect-square rounded-full border border-gold/20 flex items-center justify-center p-12 relative overflow-hidden bg-radial-gradient">
                <div className="absolute inset-0 bg-gold/5 animate-pulse"></div>
                <div className="text-center relative z-10">
                  <div className="text-6xl mb-4">☸️</div>
                  <p className="text-gray-300 italic font-serif text-lg">
                    "Each house is a specific stage where the unique drama of your karma unfolds in real-time."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <div className="h-1 w-20 bg-gold mx-auto mb-10"></div>
          <h2 className="text-3xl md:text-5xl font-serif text-white mb-10 leading-tight">
            The universe is speaking in the language of light. Are you ready to hear your own voice?
          </h2>
          <button 
            onClick={onStartChat}
            className="text-gold border border-gold px-12 py-4 rounded-full hover:bg-gold hover:text-black transition-all duration-500 uppercase tracking-widest text-sm font-bold shadow-2xl shadow-gold/10"
          >
            Start Your Inner Conversation
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
