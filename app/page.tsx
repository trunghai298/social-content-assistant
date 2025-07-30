"use client";

import { useState } from "react";
import PlatformSelector from "@/app/components/PlatformSelector";
import PromptInput from "@/app/components/PromptInput";
import ContentOutput from "@/app/components/ContentOutput";
import ContentHistory from "@/app/components/ContentHistory";
import PreviewPanel from "@/app/components/PreviewPanel";
import {
  Platform,
  VideoContent,
  GeneratedContent,
  CaptionLength,
  CaptionLanguage,
} from "@/app/types";
import InstallPWA from "@/app/components/InstallPWA";
import ServiceWorkerRegistration from "@/app/components/ServiceWorkerRegistration";

export default function Home() {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(
    null
  );
  const [generatedContent, setGeneratedContent] =
    useState<GeneratedContent | null>(null);
  const [contentHistory, setContentHistory] = useState<VideoContent[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");

  const handleGenerate = async (
    prompt: string,
    captionLength: CaptionLength,
    captionLanguage: CaptionLanguage
  ) => {
    if (!selectedPlatform) return;

    setIsGenerating(true);
    setCurrentPrompt(prompt);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          platform: selectedPlatform,
          captionLength,
          captionLanguage,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate content");
      }

      const content = await response.json();
      setGeneratedContent(content);

      const newHistoryItem: VideoContent = {
        id: Date.now().toString(),
        platform: selectedPlatform,
        prompt,
        caption: content.captions[0],
        hashtags: content.hashtags,
        sounds: content.sounds,
        createdAt: new Date(),
      };

      setContentHistory((prev) => [newHistoryItem, ...prev].slice(0, 10));
    } catch (error) {
      console.error("Error generating content:", error);
      // Fallback to mock data if API fails
      const mockContent: GeneratedContent = {
        captions: ["Failed to generate content. Please try again."],
        hashtags: ["#error", "#tryagain"],
        sounds: [],
      };
      setGeneratedContent(mockContent);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSelectHistory = (content: VideoContent) => {
    setSelectedPlatform(content.platform);
    setCurrentPrompt(content.prompt);
    setGeneratedContent({
      captions: [content.caption],
      hashtags: content.hashtags,
      sounds: content.sounds,
    });
  };

  return (
    <>
      <ServiceWorkerRegistration />
      <InstallPWA />
      <div className="min-h-screen relative scanline crt-effect">
        <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 max-w-7xl relative z-10">
        <header className="text-center mb-6 sm:mb-12">
          <div className="inline-block">
            <h1 className="text-2xl sm:text-3xl md:text-5xl mb-2 sm:mb-4 neon-text-pink">
              SOCIAL CONTENT
            </h1>
            <div className="text-lg sm:text-xl md:text-3xl neon-text-blue mb-3 sm:mb-6">
              <span>▸</span> ASSISTANT <span>◂</span>
            </div>
          </div>
          <p className="text-sm sm:text-base md:text-xl neon-text-green px-4">
            [AI-POWERED CONTENT CREATION V.1.0]
          </p>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 sm:gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="xl:col-span-9 space-y-4 sm:space-y-6 lg:space-y-8">
            <section className="retro-card border-[var(--neon-blue)] border-opacity-50">
              <h2 className="text-sm mb-6 neon-text-blue flex items-center">
                <span className="mr-2">►</span> SELECT_PLATFORM.EXE
              </h2>
              <PlatformSelector
                selectedPlatform={selectedPlatform}
                onSelectPlatform={setSelectedPlatform}
              />
            </section>

            <section className="retro-card border-[var(--vhs-purple)] border-opacity-50">
              <h2 className="text-xs sm:text-sm mb-3 sm:mb-6 neon-text-purple flex items-center">
                <span className="mr-2">►</span> INPUT_PROMPT.BAT
              </h2>
              {selectedPlatform ? (
                <PromptInput
                  onGenerate={handleGenerate}
                  isLoading={isGenerating}
                />
              ) : (
                <div className="text-center py-12 pixel-border">
                  <p className="text-[var(--neon-pink)]">
                    [ERROR: NO PLATFORM SELECTED]
                  </p>
                  <p className="text-[var(--neon-blue)] mt-4">
                    PLEASE SELECT A PLATFORM TO CONTINUE...
                  </p>
                </div>
              )}
            </section>

            {(generatedContent || isGenerating) && (
              <section className="retro-card border-[var(--neon-green)] border-opacity-50">
                <h2 className="text-sm mb-6 neon-text-green flex items-center">
                  <span className="mr-2">►</span> OUTPUT_CONTENT.DAT
                </h2>
                {isGenerating ? (
                  <div className="py-12 text-center">
                    <div className="inline-block">
                      <div className="text-2xl neon-text-green animate-pulse mb-4">
                        <span className="inline-block animate-spin">◴</span>
                      </div>
                      <p className="text-[var(--neon-green)]">
                        [GENERATING AI CONTENT...]
                      </p>
                      <p className="text-gray-600 text-sm mt-2">
                        ACCESSING GEMINI AI SYSTEMS
                      </p>
                    </div>
                  </div>
                ) : (
                  generatedContent && (
                    <ContentOutput content={generatedContent} />
                  )
                )}
              </section>
            )}
          </div>

          {/* Right Panel - Preview and History */}
          <div className="xl:col-span-3 space-y-4 sm:space-y-6 lg:space-y-8">
            <PreviewPanel
              platform={selectedPlatform}
              content={generatedContent}
              prompt={currentPrompt}
            />

            <ContentHistory
              history={contentHistory}
              onSelectHistory={handleSelectHistory}
            />
          </div>
        </div>

        <footer className="text-center mt-8 sm:mt-12 lg:mt-16 text-xs sm:text-sm">
          <p className="neon-text-purple overflow-hidden">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</p>
          <p className="mt-2 sm:mt-4 text-[var(--neon-blue)]">
            RETROTECH INDUSTRIES © 1998
          </p>
        </footer>
        </div>
      </div>
    </>
  );
}
