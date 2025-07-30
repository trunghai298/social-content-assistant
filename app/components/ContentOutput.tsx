'use client';

import { useState } from 'react';
import { GeneratedContent } from '@/app/types';

interface ContentOutputProps {
  content: GeneratedContent;
}

export default function ContentOutput({ content }: ContentOutputProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedType, setCopiedType] = useState<string>('');

  const copyToClipboard = (text: string, index: number, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setCopiedType(type);
    setTimeout(() => {
      setCopiedIndex(null);
      setCopiedType('');
    }, 2000);
  };

  return (
    <div className="space-y-8">
      {/* Captions Section */}
      <div className="retro-card border-[var(--neon-pink)] p-3 sm:p-4 md:p-6">
        <h3 className="text-sm sm:text-base md:text-lg font-bold mb-3 sm:mb-4 md:mb-6 neon-text-pink flex items-center">
          <span className="mr-2 sm:mr-3 text-lg sm:text-xl md:text-2xl">◆</span> CAPTIONS.TXT
        </h3>
        <div className="space-y-4">
          {content.captions.map((caption, index) => (
            <div key={index} className="relative group">
              <div className="bg-black/50 border-2 border-gray-700 p-3 sm:p-4 md:p-6 hover:border-[var(--neon-pink)] transition-all duration-300 rounded">
                <pre className="whitespace-pre-wrap text-sm sm:text-lg md:text-xl text-gray-100 leading-relaxed" style={{ fontFamily: 'var(--font-vt323)' }}>
                  {caption}
                </pre>
              </div>
              <button
                onClick={() => copyToClipboard(caption, index, 'caption')}
                className="absolute top-2 right-2 sm:top-3 sm:right-3 retro-button !px-2 sm:!px-3 !py-1 !text-[10px] sm:!text-xs border-gray-600 hover:border-[var(--neon-green)] hover:text-[var(--neon-green)] bg-black/80"
              >
                {copiedIndex === index && copiedType === 'caption' ? '[COPIED]' : '[COPY]'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Hashtags Section */}
      <div className="retro-card border-[var(--neon-blue)] p-3 sm:p-4 md:p-6">
        <h3 className="text-sm sm:text-base md:text-lg font-bold mb-3 sm:mb-4 md:mb-6 neon-text-blue flex items-center">
          <span className="mr-2 sm:mr-3 text-lg sm:text-xl md:text-2xl">◆</span> HASHTAGS.DAT
        </h3>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {content.hashtags.map((hashtag, index) => (
            <button
              key={index}
              onClick={() => copyToClipboard(hashtag, index, 'hashtag')}
              className={`
                px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 border-2 text-xs sm:text-base md:text-lg font-medium
                ${copiedIndex === index && copiedType === 'hashtag'
                  ? 'border-[var(--neon-green)] text-[var(--neon-green)] bg-green-900/20'
                  : 'border-[var(--neon-blue)] text-[var(--neon-blue)] hover:shadow-[var(--glow-blue)] bg-blue-900/10 hover:bg-blue-900/20'
                }
                transition-all duration-200 rounded
              `}
              style={{ fontFamily: 'var(--font-vt323)' }}
            >
              {hashtag}
            </button>
          ))}
        </div>
        <button
          onClick={() => copyToClipboard(content.hashtags.join(' '), -1, 'all-hashtags')}
          className="mt-6 text-sm font-bold neon-text-purple hover:neon-text-pink transition-colors"
          style={{ fontFamily: 'var(--font-pixel)' }}
        >
          {copiedIndex === -1 && copiedType === 'all-hashtags' ? '◆ ALL COPIED!' : '▸ COPY ALL HASHTAGS'}
        </button>
      </div>

      {/* Sounds Section */}
      <div className="retro-card border-[var(--neon-green)] p-3 sm:p-4 md:p-6">
        <h3 className="text-sm sm:text-base md:text-lg font-bold mb-3 sm:mb-4 md:mb-6 neon-text-green flex items-center">
          <span className="mr-2 sm:mr-3 text-lg sm:text-xl md:text-2xl">◆</span> SOUNDS.WAV
        </h3>
        <div className="space-y-4">
          {content.sounds.map((sound) => (
            <div key={sound.id} className="flex items-center justify-between p-2 sm:p-3 md:p-4 bg-black/30 border-2 border-gray-700 hover:border-[var(--neon-green)] transition-all duration-300 rounded">
              <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 border-2 border-[var(--vhs-purple)] flex items-center justify-center bg-purple-900/20 rounded">
                  <span className="text-[var(--vhs-purple)] text-sm sm:text-lg md:text-xl">♪</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm sm:text-base md:text-lg text-gray-100 font-medium line-clamp-1">{sound.name}</p>
                  <p className="text-xs sm:text-sm md:text-base text-gray-400 line-clamp-1">{sound.artist}</p>
                </div>
              </div>
              {sound.trending && (
                <span className="px-2 sm:px-3 py-0.5 sm:py-1 border sm:border-2 border-[var(--neon-pink)] text-[var(--neon-pink)] text-[8px] sm:text-[10px] md:text-xs font-bold blink rounded">
                  [HOT]
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}