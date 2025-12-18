
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getSmartPoolingAdvice = async (inventoryNeeds: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are KioskConnect AI, a retail specialist for small duka/spaza shops. 
      Analyze this inventory need: "${inventoryNeeds}". 
      Provide a concise JSON response with:
      1. Potential savings estimate (%).
      2. Recommendation on whether to pool now or wait for better prices.
      3. A small tip on demand forecasting for the specific item.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            savingsPercent: { type: Type.NUMBER },
            recommendation: { type: Type.STRING },
            demandTip: { type: Type.STRING }
          },
          required: ["savingsPercent", "recommendation", "demandTip"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
};

export const getMarketTrends = async () => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "List the top 3 items currently trending for bulk purchase in East African micro-retail markets based on seasonal patterns. Provide brief reason.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              item: { type: Type.STRING },
              reason: { type: Type.STRING }
            },
            required: ["item", "reason"]
          }
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Trends Error:", error);
    return [];
  }
};
