
import { GoogleGenAI, Type, Modality } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getTutorResponse = async (
  history: {role: 'user'|'model', parts: {text: string}[]}[], 
  prompt: string,
  lessonContext?: string
) => {
  try {
    const chat = ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history,
        { role: 'user', parts: [{ text: `${lessonContext ? `[Context: ${lessonContext}] ` : ''}${prompt}` }] }
      ],
      config: {
        systemInstruction: "You are Enara AI, a sophisticated tutor for university and high school students in the MENA region. Your tone is professional, clear, and encouraging. Never be childish. Focus on deep understanding and step-by-step reasoning. Use mathematical notation where appropriate. If asked to 'Summarize', provide 3-5 bullet points.",
        temperature: 0.7,
      },
    });
    const result = await chat;
    return result.text;
  } catch (error) {
    console.error("AI Response error:", error);
    return "I'm sorry, I'm experiencing a temporary connection issue. How can I help you otherwise?";
  }
};

export const generateSpeech = async (text: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: `Read this lesson explanation clearly: ${text}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
      return base64Audio;
    }
  } catch (error) {
    console.error("TTS Error:", error);
  }
  return null;
};

export const generateAssessment = async (params: any) => {
  const schema = {
    type: Type.OBJECT,
    properties: {
      questions: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            type: { type: Type.STRING, enum: ["multiple-choice", "true-false", "short-answer"] },
            question: { type: Type.STRING },
            options: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Required for multiple-choice and true-false. For true-false, use ['True', 'False']." },
            correctAnswer: { type: Type.STRING, description: "For multiple-choice and true-false, this is the index of the correct option as a string (e.g., '0'). For short-answer, this is the correct text answer." },
            explanation: { type: Type.STRING }
          },
          required: ["type", "question", "correctAnswer", "explanation"]
        }
      },
      suggestedInstructions: {
        type: Type.STRING,
        description: "A brief set of instructions for the student starting this assessment."
      }
    },
    required: ["questions", "suggestedInstructions"]
  };

  const personalizationContext = params.personalization ? `
    Personalize this assessment for a student based on:
    - Past mistakes: ${JSON.stringify(params.personalization.mistakes)}
    - Recent AI Tutor interactions: ${JSON.stringify(params.personalization.chatLogs)}
    Focus on areas where the student struggled or asked questions.
  ` : '';

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate a ${params.difficulty} difficulty assessment on ${params.topic} with ${params.numQuestions} questions. 
    Learning objectives: ${params.objectives}
    Include a mix of question types: multiple-choice, true-false, and short-answer.
    ${personalizationContext}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: schema
    }
  });

  return JSON.parse(response.text || '{"questions": []}');
};

export const getAssessmentRecommendations = async (data: { mistakes: any[], chatLogs: string[] }) => {
  const schema = {
    type: Type.OBJECT,
    properties: {
      suggestedTopic: { type: Type.STRING },
      suggestedDifficulty: { type: Type.STRING, enum: ["Easy", "Medium", "Hard"] },
      suggestedQuestionTypes: { type: Type.ARRAY, items: { type: Type.STRING } },
      reasoning: { type: Type.STRING },
      focusAreas: { type: Type.ARRAY, items: { type: Type.STRING } }
    },
    required: ["suggestedTopic", "suggestedDifficulty", "suggestedQuestionTypes", "reasoning", "focusAreas"]
  };

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Based on the following student/batch data, recommend the best topic, difficulty, and question types for their next assessment.
    
    Past Mistakes: ${JSON.stringify(data.mistakes)}
    Tutor Chat Logs: ${JSON.stringify(data.chatLogs)}
    
    Provide a clear reasoning for your recommendation.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: schema
    }
  });

  return JSON.parse(response.text || '{}');
};
