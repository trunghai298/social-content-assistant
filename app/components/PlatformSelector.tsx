'use client';

import { Platform } from '@/app/types';

interface PlatformSelectorProps {
  selectedPlatform: Platform | null;
  onSelectPlatform: (platform: Platform) => void;
}

const platforms = [
  { id: 'tiktok' as Platform, name: 'TIKTOK', icon: '▶', iconClass: 'text-2xl sm:text-3xl', color: 'neon-pink' },
  { id: 'instagram' as Platform, name: 'INSTAGRAM', icon: '◐', iconClass: 'text-2xl sm:text-3xl', color: 'neon-purple' },
  { id: 'facebook' as Platform, name: 'FACEBOOK', icon: 'ⓕ', iconClass: 'text-2xl sm:text-3xl', color: 'neon-blue' },
  { id: 'shopee' as Platform, name: 'SHOPEE', icon: '◈', iconClass: 'text-2xl sm:text-3xl', color: 'neon-green' },
];

export default function PlatformSelector({ selectedPlatform, onSelectPlatform }: PlatformSelectorProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
      {platforms.map((platform) => (
        <button
          key={platform.id}
          onClick={() => onSelectPlatform(platform.id)}
          className={`
            retro-button relative overflow-hidden min-h-[80px] sm:min-h-[100px] md:min-h-[120px]
            !px-2 sm:!px-3 !py-3 sm:!py-4
            ${selectedPlatform === platform.id 
              ? `neon-text-${platform.color} border-current` 
              : 'text-gray-500 hover:text-gray-300 border-gray-500'
            }
          `}
        >
          <div className="flex flex-col items-center justify-center space-y-1 sm:space-y-2 md:space-y-3 relative z-10">
            <span className={platform.iconClass}>{platform.icon}</span>
            <span className="text-[10px] sm:text-xs tracking-wider font-bold">{platform.name}</span>
          </div>
          {selectedPlatform === platform.id && (
            <>
              <div className="absolute top-1 right-1 sm:top-2 sm:right-2">
                <span className="text-[8px] sm:text-[10px] md:text-xs blink">[ON]</span>
              </div>
              <div 
                className="absolute inset-0 bg-current opacity-10"
              />
            </>
          )}
        </button>
      ))}
    </div>
  );
}