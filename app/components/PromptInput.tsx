'use client';

import { useState } from 'react';
import { CaptionLength, CaptionLanguage } from '@/app/types';
import CaptionLengthSelector from './CaptionLengthSelector';
import LanguageSelector from './LanguageSelector';

interface PromptInputProps {
  onGenerate: (prompt: string, captionLength: CaptionLength, captionLanguage: CaptionLanguage) => void;
  isLoading?: boolean;
}

export default function PromptInput({ onGenerate, isLoading = false }: PromptInputProps) {
  const [prompt, setPrompt] = useState('');
  const [captionLength, setCaptionLength] = useState<CaptionLength>('medium');
  const [captionLanguage, setCaptionLanguage] = useState<CaptionLanguage>('english');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onGenerate(prompt, captionLength, captionLanguage);
    }
  };

  const placeholders = [
    "C:\\> Enter video description...",
    "C:\\> Describe your content...",
    "C:\\> Input video details...",
    "C:\\> Type your prompt here...",
  ];

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <CaptionLengthSelector 
            selectedLength={captionLength}
            onSelectLength={setCaptionLength}
          />
          <LanguageSelector
            selectedLanguage={captionLanguage}
            onSelectLanguage={setCaptionLanguage}
          />
        </div>
        <div className="relative">
          <div className="absolute left-4 top-4 text-[var(--neon-green)] pointer-events-none">
            <span className="blink">▸</span>
          </div>
          <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={placeholders[0]}
          className="w-full pl-12 pr-4 py-4 min-h-[140px] bg-black/50 border-2 border-[var(--neon-green)] text-gray-100 placeholder-gray-600 resize-none focus:border-[var(--neon-blue)] focus:shadow-[var(--glow-blue)] transition-all duration-200 text-lg leading-relaxed rounded"
          disabled={isLoading}
          style={{ fontFamily: 'var(--font-vt323)' }}
        />
        <button
          type="submit"
          disabled={!prompt.trim() || isLoading}
          className={`
            mt-4 w-full retro-button
            ${prompt.trim() && !isLoading
              ? 'neon-text-pink border-current hover:shadow-[var(--glow-pink)]'
              : 'text-gray-600 border-gray-600 cursor-not-allowed'
            }
          `}
        >
          {isLoading ? (
            <span className="flex items-center justify-center space-x-2">
              <span className="inline-block animate-spin">◴</span>
              <span>PROCESSING...</span>
            </span>
          ) : (
            <span className="flex items-center justify-center space-x-2">
              <span>▸</span>
              <span>GENERATE_CONTENT.EXE</span>
              <span>◂</span>
            </span>
          )}
        </button>
        </div>
      </div>
      <p className="mt-4 text-xs text-gray-500">
        [SYSTEM] Input video description for AI processing | Length: {captionLength.toUpperCase()} | Lang: {captionLanguage === 'vietnamese' ? 'VI' : 'EN'}
      </p>
    </form>
  );
}