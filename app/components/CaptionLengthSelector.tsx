'use client';

import { CaptionLength } from '@/app/types';

interface CaptionLengthSelectorProps {
  selectedLength: CaptionLength;
  onSelectLength: (length: CaptionLength) => void;
}

export default function CaptionLengthSelector({ selectedLength, onSelectLength }: CaptionLengthSelectorProps) {
  const lengths: { id: CaptionLength; name: string; description: string; chars: string }[] = [
    { 
      id: 'short', 
      name: 'SHORT', 
      description: 'Quick & Punchy',
      chars: '50-100 chars'
    },
    { 
      id: 'medium', 
      name: 'MEDIUM', 
      description: 'Balanced',
      chars: '100-200 chars'
    },
    { 
      id: 'long', 
      name: 'LONG', 
      description: 'Detailed',
      chars: '200-300 chars'
    },
  ];

  return (
    <div className="w-full">
      <p className="text-[10px] sm:text-xs text-gray-500 mb-2 sm:mb-3">[CAPTION_LENGTH.CFG]</p>
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {lengths.map((length) => (
          <button
            key={length.id}
            onClick={() => onSelectLength(length.id)}
            className={`
              relative p-2 sm:p-3 border-2 transition-all duration-200 rounded
              ${selectedLength === length.id
                ? 'border-[var(--neon-pink)] bg-pink-900/20 shadow-[var(--glow-pink)]'
                : 'border-gray-700 hover:border-gray-500 bg-black/30'
              }
            `}
          >
            <div className="text-center">
              <p className={`text-[11px] sm:text-sm font-bold mb-0.5 sm:mb-1 ${
                selectedLength === length.id ? 'neon-text-pink' : 'text-gray-400'
              }`} style={{ fontFamily: 'var(--font-pixel)' }}>
                {length.name}
              </p>
              <p className="text-[10px] sm:text-xs text-gray-500 hidden sm:block" style={{ fontFamily: 'var(--font-vt323)' }}>
                {length.description}
              </p>
              <p className="text-[9px] sm:text-[10px] text-gray-600 mt-0.5 sm:mt-1" style={{ fontFamily: 'var(--font-vt323)' }}>
                {length.chars}
              </p>
            </div>
            {selectedLength === length.id && (
              <div className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1">
                <span className="text-[var(--neon-pink)] text-[10px] sm:text-xs">◆</span>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}