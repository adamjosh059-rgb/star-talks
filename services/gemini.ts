
import { GoogleGenAI, Type } from "@google/genai";
import { BirthDetails, ChatMessage, ChartData, AstrologicalSystem } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const calculateSystemChart = async (details: BirthDetails, system: AstrologicalSystem): Promise<ChartData> => {
  const systemContexts = {
    western: "Western Tropical Astrology using Placidus houses. Calculate Sun, Moon, Rising, and planets (Mercury to Pluto) with precise degrees. Focus on major aspects (Conjunction, Square, etc.) and psychological archetypes.",
    vedic: "Vedic Sidereal Astrology (Lahiri Ayanamsha). Focus on the D1 Rashi Chart, the 12 Bhavas (houses), Grahas (planets including Rahu/Ketu), and mention current Mahadasha based on Vimshottari logic.",
    chinese: "Chinese BaZi (Four Pillars of Destiny). Calculate the Year, Month, Day, and Hour pillars. Identify the 'Day Master' (Heavenly Stem of the day) and the strength of the 5 elements (Wood, Fire, Earth, Metal, Water).",
    hellenistic: "Traditional Hellenistic Astrology using Whole Sign Houses. Focus on the 7 traditional planets (up to Saturn), Planetary Dignity (Essential/Accidental), Sect (Day/Night), and calculation of the Lot of Fortune."
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Act as a high-fidelity ${system.toUpperCase()} calculation engine. 
        Calculate the precise professional birth architecture for: 
        Name: ${details.name}
        Date: ${details.date}
        Time: ${details.time}
        Location: ${details.location}
        
        Methodology: ${systemContexts[system]}
        
        Return JSON only. 
        For Western/Vedic/Hellenistic: Include 'lagna' (Ascendant/Rising), 'positions' (array of {planet, house, sign, isRetrograde}), a 2-sentence 'summary', and a 3-paragraph 'structuralAnalysis' detailing the professional-grade calculation used (Ayanamsha, House system, etc.).
        For Chinese: Include 'pillars' (Year, Month, Day, Hour with animal and element), 'positions' (each pillar's elemental breakdown), 'summary', and 'structuralAnalysis' identifying the Day Master and elemental balance.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            system: { type: Type.STRING },
            lagna: { type: Type.STRING },
            pillars: { 
              type: Type.OBJECT,
              properties: {
                Year: { 
                  type: Type.OBJECT, 
                  properties: { 
                    animal: { type: Type.STRING }, 
                    element: { type: Type.STRING } 
                  }
                },
                Month: { 
                  type: Type.OBJECT, 
                  properties: { 
                    animal: { type: Type.STRING }, 
                    element: { type: Type.STRING } 
                  }
                },
                Day: { 
                  type: Type.OBJECT, 
                  properties: { 
                    animal: { type: Type.STRING }, 
                    element: { type: Type.STRING } 
                  }
                },
                Hour: { 
                  type: Type.OBJECT, 
                  properties: { 
                    animal: { type: Type.STRING }, 
                    element: { type: Type.STRING } 
                  }
                }
              }
            },
            positions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  planet: { type: Type.STRING },
                  house: { type: Type.INTEGER },
                  sign: { type: Type.STRING },
                  element: { type: Type.STRING },
                  animal: { type: Type.STRING },
                  isRetrograde: { type: Type.BOOLEAN }
                }
              }
            },
            summary: { type: Type.STRING },
            structuralAnalysis: { type: Type.STRING }
          },
          required: ["summary", "structuralAnalysis", "positions"]
        }
      }
    });

    const text = response.text || "{}";
    const data = JSON.parse(text);
    return { ...data, system } as ChartData;
  } catch (error) {
    console.error("Chart Calculation Error:", error);
    throw new Error("The celestial alignment calculation failed. Please ensure birth coordinates are precise.");
  }
};

export const getAstrologerResponse = async (
  history: ChatMessage[],
  chart: ChartData | null,
  details: BirthDetails | null,
  system: AstrologicalSystem
): Promise<string> => {
  const systemInstructions = {
    western: "You are a master of Psychological Western Astrology. You excel at interpreting archetypes and internal growth cycles. You talk like a wise therapist of the stars.",
    vedic: "You are a senior Jyotishi master. You prioritize karmic patterns, planetary periods (Dashas), and spiritual purification through alignment with cosmic time.",
    chinese: "You are a legendary BaZi Master. You interpret the flow of Qi and the interaction of the Five Elements. You focus on environmental harmony and destiny management.",
    hellenistic: "You are an ancient Hellenistic sage. You follow the lineage of Vettius Valens and Ptolemy. You speak with authority on fate, dignity, and objective life outcomes."
  };

  const systemInstruction = `
    ${systemInstructions[system]}
    
    Current User Identity: ${JSON.stringify(details)}
    Computed Professional Chart: ${JSON.stringify(chart)}
    
    MISSION:
    1. The tagline "Talk to your Ownself" is your guiding philosophy.
    2. Provide honest, calculative, and deeply intelligent responses.
    3. Use the professional data of the ${system} system to answer personal queries.
    4. Maintain a profound, high-end, and slightly mysterious yet technical tone.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.content }]
      })),
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.75
      }
    });

    return response.text || "The oracle is silent. The transits are unclear at this moment.";
  } catch (error) {
    console.error("Astrologer Response Error:", error);
    throw new Error("Communication with the celestial intelligence was interrupted. Please re-initiate the inquiry.");
  }
};
