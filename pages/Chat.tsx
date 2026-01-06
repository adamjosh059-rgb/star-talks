
import React, { useState, useRef, useEffect } from 'react';
import { getAstrologerResponse, calculateSystemChart } from '../services/gemini';
import { BirthDetails, ChatMessage, ChartData, AstrologicalSystem } from '../types';

const SYSTEM_DATA: Record<AstrologicalSystem, { title: string, content: string, icon: string }> = {
  western: {
    title: 'Western Tropical',
    icon: '☀️',
    content: 'Western Tropical astrology is the world’s most widely recognized system because of its deep integration with modern psychological archetypes. It is centered on the Seasonal Zodiac, tracking the Sun’s relationship to the Earth’s orientation. Users consult this system to seek dedicated guidance on personality evolution, internal psychological drives, and the "why" behind their life choices. It is particularly adept at predicting cycles of personal growth, identity crises, and the integration of the shadow self into the conscious mind. By focusing on planetary "aspects" or geometric relationships, it maps the internal friction that leads to character development. If you seek to understand the structure of your ego and your potential for self-actualization, this is the mirror you need.'
  },
  vedic: {
    title: 'Vedic Sidereal',
    icon: '🕉️',
    content: 'Vedic astrology, or Jyotisha, is trusted by millions because of its astronomical precision and focus on the Sidereal zodiac, which tracks the actual fixed positions of the stars. It is widely known for its unparalleled accuracy in timing life events through the "Dasha" system—a dedicated timeline of planetary periods. You should consult this system if you seek dedicated guidance on Karma, spiritual purpose, and the objective timing of career, marriage, and health milestones. It is significantly more predictive about the "when" of life, providing a calculative map of destiny that allows you to align your actions with the cosmic rhythm. It provides the most honest assessment of the karmic luggage you carry and the specific spiritual lessons your soul has scripted for this incarnation.'
  },
  chinese: {
    title: 'Chinese BaZi',
    icon: '🐉',
    content: 'Chinese BaZi, or the Four Pillars of Destiny, is a sophisticated elemental system trusted for its focus on the harmony between the individual and the natural world. It is widely known for its use of the Five Elements (Wood, Fire, Earth, Metal, Water) and the 12 Zodiac Animals to decode the flow of "Qi" in a person’s life. Consult this system to seek dedicated guidance on environmental harmony, career suitability, and relational compatibility based on elemental balance. It is specifically predictive about life-cycles of luck and the structural strengths of your elemental constitution. Unlike planetary systems, BaZi offers a unique perspective on how to manage your destiny by balancing internal elements with external timing, helping you navigate the world with minimum resistance and maximum flow.'
  },
  hellenistic: {
    title: 'Hellenistic / Ancient',
    icon: '🏛️',
    content: 'Hellenistic astrology is the foundational architecture of all Mediterranean horoscopy, trusted for its stark, unflinching honesty regarding fate and objective life outcomes. It is widely known for its rigorous use of "Planetary Dignity" and the "Whole Sign" house system, which provides a clear, structural view of a person’s social standing, wealth, and longevity. You should consult this system if you seek dedicated, unsentimental guidance on the concrete realities of your existence. It is highly predictive about the structural successes and failures of one’s life path, identifying the "Lots" or points of fortune that dictate the physical reality of your journey. If you are tired of modern fluff and want a calculative, traditional assessment of the hand you have been dealt by the Fates, this ancient system is your gateway.'
  }
};

const SystemChart: React.FC<{ data: ChartData }> = ({ data }) => {
  if (data.system === 'chinese') {
    return (
      <div className="space-y-6">
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-max md:grid md:grid-cols-4 md:min-w-0">
            {Object.entries(data.pillars || {}).map(([pillar, val]: [string, any]) => (
              <div key={pillar} className="bg-white/5 p-4 rounded-xl border border-white/10 text-center flex-1 min-w-[140px]">
                <div className="text-[10px] text-gold uppercase tracking-widest mb-2 font-bold">{pillar}</div>
                <div className="text-xl font-bold text-white mb-1">{val.animal}</div>
                <div className="text-xs text-slate-500 uppercase font-medium">{val.element}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white/5 p-6 rounded-2xl border border-white/10 italic text-slate-400 text-sm leading-relaxed border-l-2 border-l-gold">
          {data.summary}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white/5 px-6 py-4 rounded-xl border border-white/10">
        <span className="text-xs uppercase tracking-[0.2em] text-slate-500 font-bold">Lagna / Ascendant</span>
        <span className="text-gold font-bold text-lg">{data.lagna}</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {data.positions.map((p, i) => (
          <div key={i} className="bg-white/5 p-4 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
            <div className="text-gold font-bold text-xs uppercase tracking-widest mb-2">{p.planet}</div>
            <div className="text-white text-sm font-medium">{p.sign}</div>
            <div className="text-slate-500 text-[10px] uppercase mt-1">House {p.house} {p.isRetrograde && '• Retrograde'}</div>
          </div>
        ))}
      </div>
      <div className="bg-white/5 p-6 rounded-2xl border border-white/10 italic text-slate-400 text-sm leading-relaxed border-l-2 border-l-gold">
        {data.summary}
      </div>
    </div>
  );
};

const Chat: React.FC = () => {
  const [step, setStep] = useState<'select' | 'form' | 'results' | 'chat'>('select');
  const [selectedSystem, setSelectedSystem] = useState<AstrologicalSystem | null>(null);
  const [details, setDetails] = useState<BirthDetails>({ name: '', date: '', time: '', location: '' });
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loading]);

  const handleSystemSelect = (sys: AstrologicalSystem) => {
    setSelectedSystem(sys);
    setStep('form');
    setError(null);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep('results');
    setError(null);
  };

  const handleGetChart = async () => {
    if (!selectedSystem) return;
    setLoading(true);
    setError(null);
    try {
      const data = await calculateSystemChart(details, selectedSystem);
      setChartData(data);
    } catch (e: any) {
      setError(e.message || "Failed to calculate birth architecture.");
    }
    setLoading(false);
  };

  const handleStartDiscussion = async () => {
    if (!selectedSystem) return;
    setStep('chat');
    setLoading(true);
    setError(null);
    try {
      const initialMsg = `Please provide a high-level opening assessment based on my ${selectedSystem} profile. I want to know the true structure of my character and what current cycles I should be aware of.`;
      const response = await getAstrologerResponse([{ role: 'user', content: initialMsg }], chartData, details, selectedSystem);
      setMessages([{ role: 'model', content: response }]);
    } catch (e: any) {
      setError(e.message || "Failed to initiate AI conversation.");
    }
    setLoading(false);
  };

  const handleChatSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading || !selectedSystem) return;
    const userMsg = input.trim();
    setInput('');
    const newMsgs: ChatMessage[] = [...messages, { role: 'user', content: userMsg }];
    setMessages(newMsgs);
    setLoading(true);
    setError(null);
    try {
      const response = await getAstrologerResponse(newMsgs, chartData, details, selectedSystem);
      setMessages([...newMsgs, { role: 'model', content: response }]);
    } catch (e: any) {
      setError(e.message || "The cosmic link was interrupted.");
    }
    setLoading(false);
  };

  const ErrorAlert = ({ message }: { message: string }) => (
    <div className="bg-red-900/20 border border-red-500/50 p-6 rounded-2xl text-red-200 text-sm flex items-center justify-between gap-4 animate-in fade-in slide-in-from-top-4">
      <div className="flex items-center gap-3">
        <span className="text-xl">⚠️</span>
        <p>{message}</p>
      </div>
      <button onClick={() => setError(null)} className="text-xs uppercase tracking-widest font-bold hover:text-white">Dismiss</button>
    </div>
  );

  if (step === 'select') {
    return (
      <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-6">
          <h1 className="text-5xl md:text-8xl font-serif text-white">Choose Your <span className="text-gold italic">Mirror</span></h1>
          <p className="text-slate-500 uppercase tracking-[0.4em] text-xs max-w-2xl mx-auto leading-relaxed">Four paths to the one truth: yourself. Each system offers a dedicated directional guidance through its own unique calculated intelligence.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {(Object.keys(SYSTEM_DATA) as AstrologicalSystem[]).map((sys) => (
            <div key={sys} className="group p-8 md:p-12 bg-white/5 rounded-[3rem] border border-white/10 hover:border-gold/30 transition-all flex flex-col justify-between h-full backdrop-blur-md">
              <div className="space-y-6">
                <div className="flex items-center gap-6">
                  <span className="text-5xl group-hover:scale-110 transition-transform">{SYSTEM_DATA[sys].icon}</span>
                  <h2 className="text-2xl md:text-3xl font-serif text-white group-hover:text-gold transition-colors uppercase tracking-widest">{SYSTEM_DATA[sys].title}</h2>
                </div>
                <p className="text-slate-400 text-sm md:text-base leading-relaxed font-light">
                  {SYSTEM_DATA[sys].content}
                </p>
              </div>
              <button 
                onClick={() => handleSystemSelect(sys)}
                className="mt-10 py-5 bg-gold text-black font-bold uppercase tracking-[0.4em] text-[10px] rounded-full hover:bg-white transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-gold/10"
              >
                Lets Dive →
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (step === 'form') {
    return (
      <div className="pt-40 pb-24 px-6 max-w-2xl mx-auto">
        <div className="bg-white/5 border border-white/10 p-10 md:p-16 rounded-[3rem] shadow-2xl backdrop-blur-2xl">
          <button onClick={() => setStep('select')} className="text-slate-500 hover:text-white uppercase tracking-[0.3em] text-[10px] font-bold mb-10 flex items-center gap-2 group">
            <span className="group-hover:-translate-x-1 transition-transform">←</span> Change System
          </button>
          <h2 className="text-4xl font-serif text-white mb-8">Establish Your <span className="text-gold italic">Coordinates</span></h2>
          <form onSubmit={handleFormSubmit} className="space-y-10">
            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold opacity-70">Essence Name</label>
              <input type="text" required placeholder="Full Name" className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-gold transition-all text-white placeholder:text-slate-800" value={details.name} onChange={e => setDetails({...details, name: e.target.value})} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold opacity-70">Date of Origin</label>
                <input type="date" required className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-gold transition-all text-white color-scheme-dark" value={details.date} onChange={e => setDetails({...details, date: e.target.value})} />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold opacity-70">Time of Origin</label>
                <input type="time" required className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-gold transition-all text-white color-scheme-dark" value={details.time} onChange={e => setDetails({...details, time: e.target.value})} />
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold opacity-70">Place of Origin</label>
              <input type="text" required placeholder="City, Country" className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-gold transition-all text-white placeholder:text-slate-800" value={details.location} onChange={e => setDetails({...details, location: e.target.value})} />
            </div>
            <button type="submit" className="w-full bg-gold text-black font-bold py-6 rounded-full hover:bg-white transition-all uppercase tracking-[0.4em] text-xs shadow-xl shadow-gold/5 active:scale-95">
              Synchronize →
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (step === 'results') {
    return (
      <div className="pt-40 pb-24 px-6 max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <span className="text-gold text-5xl inline-block animate-bounce-slow">⚡</span>
          <h2 className="text-5xl font-serif text-white italic">Synchronization Complete</h2>
          <p className="text-slate-500 uppercase tracking-[0.4em] text-[10px]">Your {selectedSystem} data is ready for deep-dive extraction</p>
        </div>

        {error && <ErrorAlert message={error} />}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <button 
            onClick={handleGetChart}
            disabled={loading}
            className={`group relative h-64 border rounded-[2rem] transition-all flex flex-col items-center justify-center space-y-4 overflow-hidden ${
              chartData ? 'bg-gold border-gold/20' : 'bg-white/5 border-white/10 hover:border-gold/50'
            }`}
          >
            <span className={`text-4xl group-hover:scale-110 transition-transform ${loading ? 'animate-spin' : ''}`}>🔭</span>
            <span className={`text-serif text-2xl ${chartData ? 'text-black' : 'text-white group-hover:text-gold'}`}>Get Your Birth Chart</span>
            <p className={`text-[10px] uppercase tracking-widest px-10 text-center ${chartData ? 'text-black/60' : 'text-slate-500'}`}>Professional-grade {selectedSystem} calculation architecture</p>
          </button>

          <button 
            onClick={handleStartDiscussion}
            disabled={loading}
            className="group relative h-64 bg-white/5 border border-white/10 rounded-[2rem] hover:border-gold/50 hover:bg-gold transition-all flex flex-col items-center justify-center space-y-4 overflow-hidden"
          >
            <span className="text-4xl group-hover:scale-110 transition-transform">👁️</span>
            <span className="text-white group-hover:text-black font-serif text-2xl">Lets Discuss Yourself</span>
            <p className="text-[10px] text-slate-500 group-hover:text-black/60 uppercase tracking-widest px-10 text-center">Initialize dedicated AI intelligence session</p>
          </button>
        </div>

        {loading && (
          <div className="text-center space-y-4 py-10">
            <div className="flex justify-center gap-1">
              <div className="w-1 h-1 bg-gold rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
              <div className="w-1 h-1 bg-gold rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-1 h-1 bg-gold rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <p className="text-gold uppercase tracking-[0.6em] text-[9px] font-bold">Connecting to Celestial Nodes...</p>
          </div>
        )}

        {chartData && (
          <div className="animate-fade-in space-y-12">
            <div className="bg-white/5 p-8 md:p-16 rounded-[3rem] border border-white/10 shadow-2xl backdrop-blur-md">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-white/5 pb-8">
                <h3 className="text-3xl md:text-4xl font-serif text-white">The {selectedSystem} <span className="text-gold italic">Engine</span></h3>
                <div className="text-[10px] text-slate-500 uppercase tracking-widest bg-white/5 px-4 py-2 rounded-full border border-white/5">Calculated Intelligence</div>
              </div>
              
              <SystemChart data={chartData} />
              
              <div className="mt-16 pt-12 border-t border-white/5 space-y-10">
                <div className="flex items-center gap-4">
                   <div className="h-px bg-gold/30 flex-grow"></div>
                   <h4 className="text-xs font-bold text-gold uppercase tracking-[0.4em]">Genuine Structural Infrastructure</h4>
                   <div className="h-px bg-gold/30 flex-grow"></div>
                </div>
                <div className="prose prose-invert max-w-none">
                  <div className="text-slate-400 font-light leading-loose whitespace-pre-wrap text-base italic text-justify opacity-80">
                    {chartData.structuralAnalysis}
                  </div>
                </div>
              </div>
            </div>
            
            <button 
              onClick={handleStartDiscussion}
              className="w-full py-8 bg-white text-black font-bold uppercase tracking-[0.5em] text-xs rounded-full hover:bg-gold transition-all shadow-2xl active:scale-95"
            >
              Discuss Your Profile with AI →
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="pt-32 pb-6 px-6 max-w-6xl mx-auto h-[90vh] flex flex-col">
       {error && <div className="mb-4"><ErrorAlert message={error} /></div>}
       <div className="flex-grow flex flex-col h-full bg-white/5 border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl backdrop-blur-3xl relative">
          {/* Header */}
          <div className="p-8 border-b border-white/10 flex justify-between items-center bg-[#05050a]/60 sticky top-0 z-10">
            <div className="flex items-center gap-4">
               <span className="text-3xl animate-pulse">{SYSTEM_DATA[selectedSystem!].icon}</span>
               <div>
                  <h3 className="text-lg md:text-xl font-serif text-white tracking-widest">{selectedSystem?.toUpperCase()} INTELLIGENCE</h3>
                  <p className="text-[9px] text-slate-500 tracking-[0.3em] uppercase">Consultant: Star Talks AI • Profiling: {details.name}</p>
               </div>
            </div>
            <button onClick={() => { setStep('results'); setMessages([]); setError(null); }} className="text-slate-500 hover:text-white uppercase tracking-widest text-[9px] font-bold transition-colors">Terminate Session</button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-grow p-6 md:p-12 overflow-y-auto space-y-10 scrollbar-thin">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}>
                <div className={`max-w-[90%] md:max-w-[80%] p-8 rounded-[2.5rem] ${
                  msg.role === 'user' ? 'bg-gold text-black shadow-2xl rounded-tr-none' : 'bg-white/5 text-slate-200 border border-white/5 rounded-tl-none backdrop-blur-md'
                }`}>
                  <div className={`text-[9px] font-bold uppercase tracking-widest mb-4 opacity-50 ${msg.role === 'user' ? 'text-black' : 'text-gold'}`}>
                    {msg.role === 'user' ? 'The Seeker' : 'The System Architecture'}
                  </div>
                  <div className="leading-relaxed whitespace-pre-wrap text-sm md:text-base font-light italic">
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white/5 text-gold/60 p-6 rounded-[2.5rem] rounded-tl-none text-[10px] uppercase tracking-[0.4em] border border-white/5 italic">
                  Decoding current transits and elemental flux...
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-6 md:p-8 bg-[#05050a]/80 border-t border-white/10 backdrop-blur-xl">
            <form onSubmit={handleChatSend} className="flex flex-col sm:flex-row gap-4 max-w-5xl mx-auto">
              <input 
                type="text" 
                placeholder="Ask about your destiny, current cycles, or specific life questions..." 
                className="flex-grow bg-white/5 border border-white/10 rounded-full px-8 py-5 text-white focus:outline-none focus:border-gold transition-all placeholder:text-slate-700 text-sm md:text-base"
                value={input}
                onChange={e => setInput(e.target.value)}
              />
              <button 
                type="submit" 
                disabled={loading || !input.trim()} 
                className="px-12 bg-gold text-black font-bold rounded-full hover:bg-white transition-all uppercase tracking-widest text-xs py-5 disabled:opacity-30 shadow-xl shadow-gold/5 active:scale-95"
              >
                Inquire
              </button>
            </form>
          </div>
       </div>
    </div>
  );
};

export default Chat;
