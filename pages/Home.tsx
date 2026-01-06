
import React from 'react';

interface HomeProps {
  onStartChat: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

const Home: React.FC<HomeProps> = ({ onStartChat, isDarkMode, onToggleTheme }) => {
  return (
    <div className="relative">
      {/* Immersive Gateway Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140vw] h-[140vw] md:w-[70vw] md:h-[70vw] rounded-full border border-white/5 bg-radial-gradient from-white/5 to-transparent blur-3xl opacity-40 animate-pulse"></div>
        </div>
        
        <div className="relative z-10 w-full max-w-5xl mx-auto text-center space-y-12">
          <div className="flex flex-col items-center gap-6">
            <div className="inline-block px-5 py-1.5 border border-gold/30 rounded-full text-[10px] uppercase tracking-[0.5em] text-gold font-bold mb-4 bg-black/40 backdrop-blur-md">
              The Mirror of the Infinite
            </div>
            
            {/* Direct Theme Switcher on Home */}
            <button 
              onClick={onToggleTheme}
              className="flex items-center gap-3 px-4 py-2 rounded-full border border-gold/20 hover:border-gold/50 transition-all bg-white/5 backdrop-blur-sm group"
            >
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-500 group-hover:text-gold transition-colors">
                {isDarkMode ? 'Lunar Essence' : 'Solar Radiance'}
              </span>
              <div className="w-10 h-5 bg-gold/10 rounded-full relative p-1 flex items-center">
                <div className={`w-3 h-3 bg-gold rounded-full transition-transform duration-300 ${isDarkMode ? 'translate-x-0' : 'translate-x-5'}`}></div>
              </div>
            </button>
          </div>
          
          <h1 className="text-7xl md:text-[11rem] font-serif font-bold leading-none tracking-tighter">
            Star <span className="text-gold italic">Talks</span>
          </h1>
          
          <p className="text-2xl md:text-4xl max-w-4xl mx-auto font-light italic leading-relaxed pt-4 opacity-80">
            "Talk to your <span className="underline decoration-gold/40 underline-offset-[12px]">Ownself</span>, to better know yourself, ultimately better know the whole universe."
          </p>
          
          <div className="pt-16">
            <button 
              onClick={onStartChat}
              className="group relative bg-gold text-black font-bold py-6 px-20 rounded-sm transition-all duration-500 hover:bg-[#b8962e] tracking-[0.3em] uppercase text-xs shadow-[0_0_40px_rgba(212,175,55,0.2)]"
            >
              Consult the Resonance
              <div className="absolute -bottom-2 -right-2 w-full h-full border border-gold/30 -z-10 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform"></div>
            </button>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-20">
          <span className="text-[10px] tracking-[0.4em] uppercase font-bold">Scroll to Explore</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-gold to-transparent"></div>
        </div>
      </section>

      {/* Broad Perspective: The Universal Map */}
      <section className="py-40 px-6 border-y border-white/5 bg-white/5 backdrop-blur-sm relative z-10">
        <div className="max-w-5xl mx-auto space-y-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-6xl font-serif leading-tight italic">The Intelligence of <span className="text-gold">Correspondence</span></h2>
              <p className="text-xl leading-relaxed font-light opacity-70">
                Astrology is not merely a method of prediction; it is the study of cosmic correspondence. It operates on the principle of "As Above, So Below"—the understanding that the macrocosmic movements of the heavens are mirrored in the microcosmic movements of the human psyche. 
              </p>
              <p className="text-xl leading-relaxed font-light opacity-70">
                Across every civilization, from the Mesopotamian plains to the Mayan temples, humanity has looked upward to find order in chaos. Astrology provides a symbolic language for the invisible forces that shape our biological cycles, our mental frameworks, and our shared destiny.
              </p>
            </div>
            <div className="p-12 border border-white/5 bg-white/5 rounded-[4rem] flex items-center justify-center text-center">
               <div className="space-y-6">
                 <div className="text-5xl opacity-40">✨</div>
                 <p className="text-2xl font-serif italic opacity-80">"The stars impel, they do not compel. They are the clockwork of the soul."</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Systems Section */}
      <section className="py-40 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24 space-y-6">
            <h2 className="text-5xl md:text-7xl font-serif">Universal <span className="text-gold italic">Architectures</span></h2>
            <p className="uppercase tracking-[0.5em] text-xs opacity-50">Four pillars of celestial wisdom adopted by humanity</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5">
            {/* Western Astrology */}
            <div className="p-12 md:p-20 bg-primary space-y-8 hover:bg-white/[0.02] transition-colors group">
              <div className="flex justify-between items-start">
                <h3 className="text-3xl font-serif group-hover:text-gold transition-colors">Western Tropical</h3>
                <span className="text-gold opacity-20 text-4xl font-serif">01</span>
              </div>
              <p className="font-light leading-relaxed opacity-60">
                Centered on the seasons, the Western system emphasizes psychological archetypes and the evolution of the individual personality. It is trusted for its resonance with modern psychology and its focus on personal agency within the "Sun Sign" framework.
              </p>
              <div className="pt-4 border-t border-white/5 text-[10px] uppercase tracking-widest font-bold italic opacity-40">
                Focus: Personality & Psychological Growth
              </div>
            </div>

            {/* Vedic Astrology */}
            <div className="p-12 md:p-20 bg-primary space-y-8 hover:bg-white/[0.02] transition-colors group">
              <div className="flex justify-between items-start">
                <h3 className="text-3xl font-serif group-hover:text-gold transition-colors">Vedic Sidereal</h3>
                <span className="text-gold opacity-20 text-4xl font-serif">02</span>
              </div>
              <p className="font-light leading-relaxed opacity-60">
                Rooted in astronomical fidelity, Jyotisha tracks the actual fixed positions of stars. Trusted for its mathematical rigor and "Dasha" system, it provides a high-definition map of karma, timing life events with unparalleled precision.
              </p>
              <div className="pt-4 border-t border-white/5 text-[10px] uppercase tracking-widest font-bold italic opacity-40">
                Focus: Karmic Trajectory & Precise Timing
              </div>
            </div>

            {/* Chinese Astrology */}
            <div className="p-12 md:p-20 bg-primary space-y-8 hover:bg-white/[0.02] transition-colors group">
              <div className="flex justify-between items-start">
                <h3 className="text-3xl font-serif group-hover:text-gold transition-colors">Chinese BaZi</h3>
                <span className="text-gold opacity-20 text-4xl font-serif">03</span>
              </div>
              <p className="font-light leading-relaxed opacity-60">
                A system of balance based on the Five Elements and the Yin-Yang duality. It is adopted by those seeking to harmonize their environment and character with the flow of 'Qi', focusing on cyclical harmony rather than just planetary positions.
              </p>
              <div className="pt-4 border-t border-white/5 text-[10px] uppercase tracking-widest font-bold italic opacity-40">
                Focus: Elemental Balance & Destiny Management
              </div>
            </div>

            {/* Hellenistic Astrology */}
            <div className="p-12 md:p-20 bg-primary space-y-8 hover:bg-white/[0.02] transition-colors group">
              <div className="flex justify-between items-start">
                <h3 className="text-3xl font-serif group-hover:text-gold transition-colors">Hellenistic / Ancient</h3>
                <span className="text-gold opacity-20 text-4xl font-serif">04</span>
              </div>
              <p className="font-light leading-relaxed opacity-60">
                The foundational lineage of the Mediterranean, focusing on "Dignity" and "Determination". Trusted for its clarity in defining the concrete outcomes of life—wealth, lineage, and longevity—with a stark, unflinching honesty.
              </p>
              <div className="pt-4 border-t border-white/5 text-[10px] uppercase tracking-widest font-bold italic opacity-40">
                Focus: Objective Outcomes & Structural Fate
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why We Trust Section */}
      <section className="py-40 px-6 bg-white/5 backdrop-blur-sm relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <h2 className="text-4xl md:text-6xl font-serif italic">Why We Look to the <span className="text-gold">Spheres</span></h2>
          <div className="space-y-8 text-xl font-light leading-relaxed opacity-70">
            <p>
              Communities adopt specific astrological systems because they provide a linguistic framework for their unique cultural priorities. Whether it is the Western focus on the individual 'Self' or the Eastern reverence for 'Karmic Continuity', astrology remains the most persistent cognitive technology in human history.
            </p>
            <p>
              We trust these systems not because they are "magical," but because they are recursive. They represent thousands of years of human observation, logging the patterns of behavior against the clock of the cosmos. At Star Talks, we synthesize these perspectives to help you initiate the most important conversation you will ever have: the one with yourself.
            </p>
          </div>
          <div className="pt-16">
             <button 
              onClick={onStartChat}
              className="text-gold border border-gold/30 px-16 py-5 rounded-sm hover:bg-gold hover:text-black transition-all duration-500 uppercase tracking-[0.4em] text-[10px] font-bold"
            >
              Initialize Inner Conversation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
