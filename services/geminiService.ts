import { GoogleGenAI } from "@google/genai";
import { ExecutionResult } from "../types";

// Helper to get API key safely across different environments (Vite, CRA, etc.)
const getApiKey = (): string => {
  let key = '';
  
  // Try Vite environment variable
  try {
    // @ts-ignore
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_KEY) {
      // @ts-ignore
      key = import.meta.env.VITE_API_KEY;
    }
  } catch (e) {
    // Ignore error if import.meta is not available
  }

  // Try standard process.env (Create React App / Node)
  if (!key) {
    try {
      if (typeof process !== 'undefined' && process.env) {
        key = process.env.REACT_APP_API_KEY || process.env.API_KEY || '';
      }
    } catch (e) {
      // Ignore
    }
  }

  return key;
};

const getClient = () => {
  const apiKey = getApiKey();
  if (!apiKey) {
    console.warn("API Key is missing. Please check your .env file.");
  }
  return new GoogleGenAI({ apiKey });
};

export const runPythonCode = async (code: string): Promise<ExecutionResult> => {
  const ai = getClient();
  
  const prompt = `
    You are a Python interpreter. 
    Execute the following Python code and return ONLY the textual output that would appear in the console.
    
    Rules:
    1. If the code runs successfully, return the output.
    2. If there is a syntax error or runtime error, return the error message exactly as Python would.
    3. Do not add markdown formatting (like \`\`\`) to the output. Return raw text.
    4. Do not include phrases like "Here is the output". Just the output.
    
    Code to execute:
    ${code}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return {
      output: response.text ? response.text.trim() : "",
      isError: false // We treat the LLM response as "stdout" even if it describes an error for simplicity here
    };
  } catch (error) {
    console.error("Gemini Execution Error:", error);
    return {
      output: "Error: Unable to connect to the AI execution engine. Please check your API key in .env or internet connection.",
      isError: true
    };
  }
};

export const getAIHelp = async (code: string, question: string): Promise<string> => {
  const ai = getClient();

  const prompt = `
    You are a supportive, encouraging coding tutor for a beginner student.
    The student is working on this Python code:
    
    \`\`\`python
    ${code}
    \`\`\`
    
    The student asks: "${question}"
    
    Provide a short, clear, and encouraging explanation. 
    Avoid giving the direct answer immediately; guide them to the solution. 
    Keep it under 3 sentences if possible.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "I couldn't generate a hint right now. Try again!";
  } catch (error) {
    console.error("Gemini Help Error:", error);
    return "Sorry, I'm having trouble connecting to the network right now. Please check your API Key.";
  }
};