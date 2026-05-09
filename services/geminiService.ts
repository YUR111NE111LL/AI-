import { GoogleGenAI, GenerateContentResponse, Content, Part } from "@google/genai";
import { Message } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODEL_NAME = 'gemini-3-flash-preview';

/**
 * Sends a message to Gemini, including conversation history for context.
 */
export const sendMessageToGemini = async (
  prompt: string,
  imageBase64?: string,
  history: Message[] = []
): Promise<string> => {
  try {
    // 1. Convert app history to Gemini Content objects
    // Filter out error messages and only keep valid turns to maintain context
    const validHistory = history.filter(h => !h.isError);

    const contents: Content[] = validHistory.map(msg => {
      const parts: Part[] = [];
       if (msg.image) {
          const cleanBase64 = msg.image.split(',')[1] || msg.image;
          parts.push({
            inlineData: {
              mimeType: 'image/jpeg',
              data: cleanBase64
            }
          });
       }
       if (msg.text) {
         parts.push({ text: msg.text });
       }
       return {
         role: msg.role,
         parts: parts
       };
    });

    // 2. Add the NEW message
    const newParts: Part[] = [];
    if (imageBase64) {
      const cleanBase64 = imageBase64.split(',')[1] || imageBase64;
      newParts.push({
        inlineData: {
          mimeType: 'image/jpeg',
          data: cleanBase64,
        },
      });
    }
    if (prompt) {
      newParts.push({ text: prompt });
    }

    contents.push({
      role: 'user',
      parts: newParts
    });

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: contents, 
      config: {
        systemInstruction: "You are a helpful, concise mobile assistant. Keep answers short and easy to read on a phone screen. Use Markdown for formatting.",
      }
    });

    return response.text || "I couldn't generate a text response.";

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to connect to Gemini.");
  }
};