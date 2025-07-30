import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// Get the generative model
export const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash-lite",
});

export interface GeminiPrompt {
  platform: string;
  userPrompt: string;
  contentType: "short-form-video";
  captionLength: "short" | "medium" | "long";
  captionLanguage: "english" | "vietnamese";
}

export async function generateContentWithGemini(prompt: GeminiPrompt) {
  const lengthGuidelines = {
    short: "50-100 characters - Very concise, punchy, and to the point. Focus on hooks and impact.",
    medium: "100-200 characters - Balanced length with room for context and personality.",
    long: "200-300 characters - Detailed captions with storytelling, context, and engagement."
  };

  const languageInstructions = prompt.captionLanguage === 'vietnamese' 
    ? 'Generate ALL content in Vietnamese language. Captions, hashtags should be in Vietnamese. Sound names and artists can remain in their original language.'
    : 'Generate ALL content in English language.';

  const systemPrompt = `You are a social media content expert specializing in short-form video content for ${prompt.platform}. 
  Generate engaging content based on the user's input. 
  
  IMPORTANT: Caption length should be ${prompt.captionLength.toUpperCase()}: ${lengthGuidelines[prompt.captionLength]}
  LANGUAGE: ${languageInstructions}
  
  Return the response in the following JSON format:
  {
    "captions": ["caption1", "caption2", "caption3"],
    "hashtags": ["#hashtag1", "#hashtag2", "#hashtag3", "#hashtag4", "#hashtag5", "#hashtag6", "#hashtag7", "#hashtag8", "#hashtag9", "#hashtag10"],
    "sounds": [
      {"name": "Song Name", "artist": "Artist Name", "trending": true},
      {"name": "Song Name 2", "artist": "Artist Name 2", "trending": true},
      {"name": "Song Name 3", "artist": "Artist Name 3", "trending": false}
    ]
  }
  
  Platform-specific guidelines:
  - TikTok: Focus on trends, challenges, and viral content. Keep captions concise and hook-heavy. Include trending sounds.
  - Instagram Reels: Balance between aesthetic and engaging content. Include relevant hashtags and popular audio.
  - Facebook Reels: More conversational tone, focus on relatability and shareability.
  - Shopee Video: Focus on product showcases, deals, and shopping-related content.
  
  Requirements:
  - Generate 3 different caption variations
  - Include 10 relevant hashtags (mix of broad and niche)
  - Suggest 3 trending or relevant sounds/music
  - Captions should be engaging, platform-appropriate, and include a call-to-action
  - For ${prompt.platform}, optimize for the algorithm and audience preferences`;

  const fullPrompt = `${systemPrompt}\n\nUser's content idea: ${prompt.userPrompt}`;

  try {
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    // Parse the JSON response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsedContent = JSON.parse(jsonMatch[0]);
      return parsedContent;
    }

    throw new Error("Invalid response format from Gemini");
  } catch (error) {
    console.error("Error generating content with Gemini:", error);
    throw error;
  }
}
