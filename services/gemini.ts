
import { GoogleGenAI, Type } from "@google/genai";
import { BirthDetails, ChatMessage, ChartData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const calculateVedicChart = async (details: BirthDetails): Promise<ChartData> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Calculate a high-fidelity Vedic Birth Chart (Sidereal) for: 
      Date: ${details.date}
      Time: ${details.time}
      Location: ${details.location}
      
      Return JSON only with planetary positions (Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, Ketu) in houses 1-12, the Lagna sign name, and a 2-sentence summary. 
      Crucially, for each planet, specify if it is currently in retrograde motion (isRetrograde: true/false).`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          lagna: { type: Type.STRING },
          positions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                planet: { type: Type.STRING },
                house: { type: Type.INTEGER },
                sign: { type: Type.STRING },
                isRetrograde: { type: Type.BOOLEAN }
              }
            }
          },
          summary: { type: Type.STRING }
        },
        required: ["lagna", "positions", "summary"]
      }
    }
  });

  const text = response.text || "{}";
  return JSON.parse(text) as ChartData;
};

export const getAstrologerResponse = async (
  history: ChatMessage[],
  chart: ChartData | null,
  details: BirthDetails | null
): Promise<string> => {
  const systemInstruction = `
    You are a Master Vedic Astrologer. You have access to the user's specific birth details and chart.
    
    User Birth Details:
    - Date: ${details?.date || 'Unknown'}
    - Time: ${details?.time || 'Unknown'}
    - Location: ${details?.location || 'Unknown'}
    
    Birth Chart Data: ${chart ? JSON.stringify(chart) : 'No chart generated yet'}.
    
    If the chart is provided, use it to answer all questions with deep Vedic insight. 
    Focus on the Lagna, the positions of the Grahas (including retrograde planets which indicate deep internal karmic focus), and the current karmic cycle.
    
    Be professional, universal, and profound. Use the tagline "Talk to your Ownself" as your guiding light. 
    Do not use region-specific greetings like "Namaste". 
    Instead of generic advice, be specific to their house placements (e.g., "With your Jupiter in the 9th house, your path to wisdom is...").
    
    Always maintain the context of the birth chart, including the exact time and location provided, in every response to ensure the most personalized interpretation.
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

    return response.text || "The stars are momentarily obscured. Please ask again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The cosmic connection is interrupted. Please try again.";
  }
};
