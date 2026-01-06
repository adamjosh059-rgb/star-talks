
import { GoogleGenAI, Type } from "@google/genai";
import { BirthDetails, ChatMessage, ChartData, AstrologicalSystem } from "../types";

const ai = new GoogleGenAI({ 
  apiKey: import.meta.env.VITE_GEMINI_API_KEY as string 
});
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
      contents: `Act as a professional high-fidelity ${system.toUpperCase()} calculation engine. 
        Perform a precise calculation for: 
        Name: ${details.name}
        Date: ${details.date}
        Time: ${details.time}
        Location: ${details.location}
        
        Methodology: ${systemContexts[system]}
        
        CRITICAL: Limit 'structuralAnalysis' to exactly 3 concise paragraphs (max 250 words total).
        Limit 'positions' to the main significant bodies only (max 12 items).
        Return valid JSON only. 
        
        For Western/Vedic/Hellenistic: Include 'lagna' (Ascendant), 'positions' (planet, house, sign, isRetrograde), 'summary' (2 sentences), and 'structuralAnalysis'.
        For Chinese: Include 'pillars' (Year, Month, Day, Hour with animal and element), 'positions' (pillar elemental breakdown), 'summary', and 'structuralAnalysis'.`,
      config: {
        responseMimeType: "application/json",
        thinkingConfig: { thinkingBudget: 1000 },
        maxOutputTokens: 3000,
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
                  },
                  required: ["animal", "element"]
                },
                Month: { 
                  type: Type.OBJECT, 
                  properties: { 
                    animal: { type: Type.STRING }, 
                    element: { type: Type.STRING } 
                  },
                  required: ["animal", "element"]
                },
                Day: { 
                  type: Type.OBJECT, 
                  properties: { 
                    animal: { type: Type.STRING }, 
                    element: { type: Type.STRING } 
                  },
                  required: ["animal", "element"]
                },
                Hour: { 
                  type: Type.OBJECT, 
                  properties: { 
                    animal: { type: Type.STRING }, 
                    element: { type: Type.STRING } 
                  },
                  required: ["animal", "element"]
                }
              },
              required: ["Year", "Month", "Day", "Hour"]
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
                },
                required: ["planet"]
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
    if (error instanceof SyntaxError) {
      throw new Error("The celestial calculation was too complex for a single pass. Please try again.");
    }
    throw new Error(error instanceof Error ? error.message : "The celestial alignment calculation failed.");
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
    5. Be concise but deep. No fluff.
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
        thinkingConfig: { thinkingBudget: 2000 },
        temperature: 0.75
      }
    });

    return response.text || "The oracle is silent. The transits are unclear at this moment.";
  } catch (error) {
    console.error("Astrologer Response Error:", error);
    throw new Error("Communication with the celestial intelligence was interrupted. Please re-initiate the inquiry.");
  }
};
