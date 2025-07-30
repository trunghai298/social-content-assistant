import { NextRequest, NextResponse } from 'next/server';
import { generateContentWithGemini } from '@/app/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, platform, captionLength = 'medium', captionLanguage = 'english' } = body;

    if (!prompt || !platform) {
      return NextResponse.json(
        { error: 'Missing prompt or platform' },
        { status: 400 }
      );
    }

    const generatedContent = await generateContentWithGemini({
      platform,
      userPrompt: prompt,
      contentType: 'short-form-video',
      captionLength,
      captionLanguage
    });

    // Ensure the sounds have the required id field
    const contentWithIds = {
      ...generatedContent,
      sounds: generatedContent.sounds.map((sound: { name?: string; artist?: string; trending?: boolean }, index: number) => ({
        id: `gemini-${Date.now()}-${index}`,
        ...sound
      }))
    };

    return NextResponse.json(contentWithIds);
  } catch (error) {
    console.error('Error in generate API:', error);
    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    );
  }
}