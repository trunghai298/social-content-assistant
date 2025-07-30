'use client';

import { CaptionLanguage } from '@/app/types';

interface LanguageSelectorProps {
  selectedLanguage: CaptionLanguage;
  onSelectLanguage: (language: CaptionLanguage) => void;
}

export default function LanguageSelector({ selectedLanguage, onSelectLanguage }: LanguageSelectorProps) {
  const languages: { id: CaptionLanguage; name: string; code: string; flag: string }[] = [
    { 
      id: 'english', 
      name: 'ENGLISH', 
      code: 'EN',
      flag: '🇺🇸'
    },
    { 
      id: 'vietnamese', 
      name: 'TIẾNG VIỆT', 
      code: 'VI',
      flag: '🇻🇳'
    },
  ];

  return (
    <div className="flex items-center gap-2">
      <p className="text-xs text-gray-500">[LANG]</p>
      <div className="flex gap-2">
        {languages.map((language) => (
          <button
            key={language.id}
            onClick={() => onSelectLanguage(language.id)}
            className={`
              relative px-3 py-1.5 border transition-all duration-200 rounded flex items-center gap-1.5
              ${selectedLanguage === language.id
                ? 'border-[var(--neon-blue)] bg-blue-900/20 shadow-[var(--glow-blue)]'
                : 'border-gray-700 hover:border-gray-500 bg-black/30'
              }
            `}
          >
            <span className="text-xs">{language.flag}</span>
            <span className={`text-xs font-bold ${
              selectedLanguage === language.id ? 'neon-text-blue' : 'text-gray-400'
            }`} style={{ fontFamily: 'var(--font-pixel)' }}>
              {language.code}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}