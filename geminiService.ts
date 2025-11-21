import { GoogleGenAI } from "@google/genai";
import { THROTTLING_METHODS } from '../constants';

// Helper to format the knowledge base for the AI
const getSystemInstruction = () => {
  const methodsInfo = THROTTLING_METHODS.map(m => 
    `Name: ${m.name}
     Desc: ${m.description}
     Mechanism: ${m.mechanism}
     Pros: ${m.pros.join(', ')}
     Cons: ${m.cons.join(', ')}
     Apps: ${m.applications.join(', ')}`
  ).join('\n---\n');

  return `You are an expert AI Teaching Assistant specialized in Hydrostatic Bearings (液体静压支承).
  
  Your knowledge base includes:
  1. Basic definition: External pump provides pressurized oil, separating surfaces with an oil film. No metal-to-metal contact.
  2. Key features: High stiffness, high damping, high precision (error averaging effect), no starting friction.
  3. Detailed Throttling Methods:
  ${methodsInfo}
  
  Instructions:
  - Answer questions accurately in Chinese.
  - Be concise but technical.
  - When comparing throttling methods, use the provided pros/cons.
  - If asked about formulas, describe the relationship (e.g., Linear for capillary, Square root for orifice).
  - Be helpful and encouraging like a university professor.
  `;
};

let client: GoogleGenAI | null = null;

const getClient = () => {
  if (!client) {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.error("API_KEY not found in environment variables");
      throw new Error("API Key missing");
    }
    client = new GoogleGenAI({ apiKey });
  }
  return client;
};

export const streamChatResponse = async (
  history: { role: 'user' | 'model'; text: string }[],
  newMessage: string,
  onChunk: (text: string) => void
) => {
  const ai = getClient();
  
  try {
    // Convert history to Gemini format
    // Note: @google/genai expects 'user' and 'model' roles, which matches our interface
    const historyForApi = history.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }],
    }));

    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: getSystemInstruction(),
        temperature: 0.3, // Keep it factual
      },
      history: historyForApi
    });

    const result = await chat.sendMessageStream({ message: newMessage });

    for await (const chunk of result) {
      if (chunk.text) {
        onChunk(chunk.text);
      }
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    onChunk("抱歉，我遇到了一些连接问题，请稍后再试。");
  }
};
