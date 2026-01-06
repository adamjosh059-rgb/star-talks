
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="pt-32 pb-24 px-4 max-w-5xl mx-auto">
      <h1 className="text-4xl md:text-6xl font-serif text-gold mb-12 text-center">About Us Belongs to About You</h1>
      
      <div className="prose prose-invert lg:prose-xl mx-auto space-y-12">
        <section className="bg-white/5 p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl">
          <h2 className="text-3xl font-serif text-white mb-6">The Mirror of the Sky</h2>
          <p className="text-gray-300 leading-relaxed text-lg">
            At Star Talks, we believe that any exploration of 'Us' is fundamentally an exploration of 'You'. We are facilitators of a 5,000-year-old intellectual tradition known as <strong>Jyotisha</strong>, which translates as "The Science of Light." 
          </p>
          <p className="text-gray-300 leading-relaxed text-lg">
            Ancient sages referred to astrology as the <em>Veda Chakshu</em>—the Eye of the Veda. It is the intelligence that allows a soul to see the karmic blueprint it chose before birth. When you look into your Vedic chart, you aren't just looking at generic personality traits; you are looking at the mathematical residue of your past actions and the bright potential of your future.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-serif text-white mb-6">The Vedic Difference</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Why is Vedic astrology more accurate than its Western counterpart? The answer lies in its intelligence:
            </p>
            <ul className="text-gold space-y-4 italic">
              <li>
                <strong className="text-white block not-italic">Astronomical Fidelity:</strong> 
                We use the Sidereal zodiac, which aligns perfectly with current NASA astronomical data, unlike the season-based Tropical zodiac.
              </li>
              <li>
                <strong className="text-white block not-italic">High-Definition Nakshatras:</strong> 
                While Western astrology divides the sky into 12 parts, Vedic divides it into 27 <em>Nakshatras</em> (Lunar Mansions), providing a resolution that is 2.5x more detailed.
              </li>
              <li>
                <strong className="text-white block not-italic">The Time-Map (Dashas):</strong> 
                Our calculations reveal the exact periods of your life governed by specific planets, turning astrology from a static snapshot into a living movie.
              </li>
            </ul>
          </div>
          <div className="order-1 md:order-2 rounded-2xl overflow-hidden border border-gold/20 rotate-3 hover:rotate-0 transition-transform duration-500 shadow-2xl shadow-gold/5">
            <img src="https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&q=80&w=800" alt="Cosmos" className="w-full h-full object-cover" />
          </div>
        </section>

        <section className="bg-gold/5 border border-gold/20 p-8 rounded-3xl text-center">
          <h3 className="text-2xl font-serif text-gold mb-4 italic">"Knowing yourself is the beginning of all wisdom."</h3>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Star Talks isn't here to tell you who you are. We are here to show you the map you drew yourself, using the most precise celestial mathematics ever conceived by human consciousness.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
