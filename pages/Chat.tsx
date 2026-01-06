
import React, { useState, useRef, useEffect } from 'react';
import { getAstrologerResponse, calculateVedicChart } from '../services/gemini';
import { BirthDetails, ChatMessage, ChartData, PlanetaryPosition } from '../types';

const NorthIndianChart: React.FC<{ data: ChartData }> = ({ data }) => {
  const houseMap: Record<number, PlanetaryPosition[]> = {};
  data.positions.forEach(p => {
    if (!houseMap[p.house]) houseMap[p.house] = [];
    houseMap[p.house].push(p);
  });

  const houseCenters: Record<number, { x: number, y: number }> = {
    1: { x: 200, y: 100 },
    2: { x: 100, y: 40 },
    3: { x: 40, y: 100 },
    4: { x: 100, y: 200 },
    5: { x: 40, y: 300 },
    6: { x: 100, y: 360 },
    7: { x: 200, y: 300 },
    8: { x: 300, y: 360 },
    9: { x: 360, y: 300 },
    10: { x: 300, y: 200 },
    11: { x: 360, y: 100 },
    12: { x: 300, y: 40 }
  };

  return (
    <div className="w-full max-w-lg mx-auto aspect-square relative bg-black/40 border border-gold/30 rounded-2xl overflow-hidden shadow-2xl p-4">
      <svg viewBox="0 0 400 400" className="w-full h-full stroke-gold/40 fill-none">
        <rect x="0" y="0" width="400" height="400" strokeWidth="2" />
        <line x1="0" y1="0" x2="400" y2="400" strokeWidth="1.5" />
        <line x1="400" y1="0" x2="0" y2="400" strokeWidth="1.5" />
        <polygon points="200,0 400,200 200,400 0,200" strokeWidth="1.5" />
        
        {Object.entries(houseCenters).map(([house, pos]) => (
          <text 
            key={`num-${house}`} 
            x={pos.x} 
            y={pos.y - 15} 
            textAnchor="middle" 
            className="fill-gold/30 text-[10px] font-bold"
          >
            {house}
          </text>
        ))}

        {Object.entries(houseMap).map(([house, planets]) => {
          const center = houseCenters[parseInt(house)];
          return (
            <g key={`planets-${house}`}>
              {planets.map((p, idx) => {
                const offset = planets.length > 1 ? 15 : 0;
                const angle = (idx / planets.length) * 2 * Math.PI;
                const px = center.x + Math.cos(angle) * offset;
                const py = center.y + Math.sin(angle) * offset;
                const planetCode = p.planet.substring(0, 2).toUpperCase();
                
                return (
                  <text 
                    key={`${p.planet}-${idx}`}
                    x={px} 
                    y={py + 5} 
                    textAnchor="middle" 
                    className={`text-[12px] font-bold ${p.isRetrograde ? 'fill-red-400' : 'fill-white'}`}
                  >
                    {planetCode}{p.isRetrograde ? ' (R)' : ''}
                  </text>
                );
              })}
            </g>
          );
        })}
      </svg>
      <div className="absolute top-4 left-4 text-[10px] text-gold/60 uppercase tracking-widest font-bold bg-black/40 px-3 py-1 rounded-full border border-gold/20">
        Lagna: {data.lagna}
      </div>
      <div className="absolute bottom-4 right-4 text-[9px] text-red-400/80 italic font-medium">
        (R) Indicates Retrograde
      </div>
    </div>
  );
};

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [calculating, setCalculating] = useState(false);
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [birthDetails, setBirthDetails] = useState<BirthDetails>({
    date: '',
    time: '',
    location: ''
  });
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleStartConsultation = async (e: React.FormEvent) => {
    e.preventDefault();
    setCalculating(true);
    
    try {
      const chart = await calculateVedicChart(birthDetails);
      setChartData(chart);
      
      const promptText = `Please provide a personalized opening reading based on my birth details: ${JSON.stringify(birthDetails)} and chart summary: ${chart.summary}`;
      const firstResponse = await getAstrologerResponse(
        [{ role: 'user', content: promptText }], 
        chart,
        birthDetails
      );
      
      setMessages([
        { role: 'model', content: `Calculation complete for ${birthDetails.location}. Your Lagna (Ascendant) is ${chart.lagna}. ${chart.summary}` },
        { role: 'model', content: firstResponse }
      ]);
    } catch (err) {
      console.error(err);
    } finally {
      setCalculating(false);
    }
  };

  const handleChatSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    const newMessages: ChatMessage[] = [...messages, { role: 'user', content: userMsg }];
    setMessages(newMessages);
    setLoading(true);

    const response = await getAstrologerResponse(newMessages, chartData, birthDetails);
    setMessages([...newMessages, { role: 'model', content: response }]);
    setLoading(false);
  };

  return (
    <div className="pt-24 pb-12 px-4 max-w-6xl mx-auto min-h-screen flex flex-col">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-serif text-gold">Celestial Oracle</h1>
        <p className="text-gray-400 italic">"Talk to your Ownself, to better know yourself."</p>
      </div>

      {!chartData ? (
        <div className="max-w-md mx-auto w-full bg-white/5 border border-white/10 p-8 rounded-3xl shadow-2xl backdrop-blur-md">
          <h2 className="text-2xl font-serif text-white mb-6 text-center">Establish Cosmic Connection</h2>
          <form onSubmit={handleStartConsultation} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-gold font-bold">Date of Birth</label>
              <input 
                type="date" 
                required
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold transition-colors"
                value={birthDetails.date}
                onChange={e => setBirthDetails({...birthDetails, date: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-gold font-bold">Time of Birth</label>
              <input 
                type="time" 
                required
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold transition-colors"
                value={birthDetails.time}
                onChange={e => setBirthDetails({...birthDetails, time: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-gold font-bold">Place of Birth</label>
              <input 
                type="text" 
                required
                placeholder="City, Country"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold transition-colors"
                value={birthDetails.location}
                onChange={e => setBirthDetails({...birthDetails, location: e.target.value})}
              />
            </div>
            <button 
              type="submit"
              disabled={calculating}
              className="w-full bg-gold text-black font-bold py-4 rounded-xl hover:bg-[#b8962e] transition-all disabled:opacity-50 uppercase tracking-widest text-sm shadow-lg shadow-gold/20"
            >
              {calculating ? 'Syncing with Ephemeris...' : 'Generate Birth Chart'}
            </button>
          </form>
        </div>
      ) : (
        <div className="flex flex-col gap-8 flex-1">
          <div className="flex flex-col h-[65vh]">
            <div 
              ref={scrollRef}
              className="flex-1 bg-white/5 border border-white/10 rounded-3xl p-6 overflow-y-auto space-y-6 shadow-2xl backdrop-blur-md"
            >
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-5 rounded-2xl ${msg.role === 'user' ? 'bg-gold text-black shadow-lg shadow-gold/10' : 'bg-white/10 text-gray-200 border border-white/5 shadow-inner'}`}>
                    <div className="text-[10px] font-bold uppercase tracking-widest mb-2 opacity-50">
                      {msg.role === 'user' ? 'Seeker' : 'Oracle'}
                    </div>
                    <div className="leading-relaxed whitespace-pre-wrap text-sm md:text-base">{msg.content}</div>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white/10 text-gold/60 p-4 rounded-2xl animate-pulse text-xs uppercase tracking-widest border border-white/5">Consulting planetary alignments...</div>
                </div>
              )}
            </div>

            <form onSubmit={handleChatSend} className="mt-4 flex gap-3">
              <input 
                type="text"
                placeholder="Inquire further about your soul path..."
                className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-gold/50 outline-none shadow-inner"
                value={input}
                onChange={e => setInput(e.target.value)}
              />
              <button 
                type="submit"
                disabled={loading}
                className="bg-gold hover:bg-[#b8962e] text-black font-bold px-10 rounded-2xl transition-all disabled:opacity-50 shadow-lg shadow-gold/10"
              >
                Inquire
              </button>
            </form>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl shadow-xl backdrop-blur-md">
              <h3 className="text-xl font-serif text-gold mb-8 text-center uppercase tracking-[0.2em]">Celestial Blueprint</h3>
              <NorthIndianChart data={chartData} />
            </div>

            <div className="space-y-6">
              <div className="p-8 bg-white/5 rounded-3xl border border-white/10 shadow-xl h-full flex flex-col justify-center">
                <h4 className="text-xs font-bold text-gold uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                  <span className="text-xl">🕉️</span> Astrological Synthesis
                </h4>
                <p className="text-gray-300 text-lg leading-relaxed italic font-serif">"{chartData.summary}"</p>
                <div className="mt-8 pt-6 border-t border-white/10 space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 uppercase tracking-widest text-[10px]">Reference Point</span>
                    <span className="text-white font-medium">{birthDetails.location}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 uppercase tracking-widest text-[10px]">Time Stream</span>
                    <span className="text-white font-medium">{birthDetails.date} @ {birthDetails.time}</span>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => {setChartData(null); setMessages([]);}}
                className="w-full py-4 text-xs text-gray-500 uppercase tracking-[0.3em] hover:text-gold transition-all bg-white/5 rounded-2xl border border-white/5 hover:border-gold/20"
              >
                Reset Cosmic Path
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
