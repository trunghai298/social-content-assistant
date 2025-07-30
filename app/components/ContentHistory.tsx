'use client';

import { VideoContent } from '@/app/types';

interface ContentHistoryProps {
  history: VideoContent[];
  onSelectHistory: (content: VideoContent) => void;
}

const platformColors = {
  tiktok: 'var(--neon-pink)',
  instagram: 'var(--vhs-purple)',
  facebook: 'var(--neon-blue)',
  shopee: 'var(--neon-green)',
};

export default function ContentHistory({ history, onSelectHistory }: ContentHistoryProps) {
  if (history.length === 0) {
    return (
      <div className="retro-card border-gray-700">
        <h3 className="text-xs sm:text-sm font-bold mb-3 sm:mb-4 text-gray-500 flex items-center">
          <span className="mr-2">◆</span> HISTORY.LOG
        </h3>
        <p className="text-center text-gray-600 py-6 sm:py-8 text-xs sm:text-sm">
          [NO RECORDS FOUND]
        </p>
      </div>
    );
  }

  return (
    <div className="retro-card border-gray-700">
      <h3 className="text-xs sm:text-sm font-bold mb-3 sm:mb-4 text-gray-400 flex items-center">
        <span className="mr-2">◆</span> HISTORY.LOG
      </h3>
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {history.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelectHistory(item)}
            className="w-full text-left p-3 sm:p-4 bg-black/30 border border-gray-700 hover:border-gray-500 transition-colors group rounded"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span 
                    className="text-xs px-2 py-0.5 border"
                    style={{ 
                      borderColor: platformColors[item.platform],
                      color: platformColors[item.platform]
                    }}
                  >
                    {item.platform.toUpperCase()}
                  </span>
                  <span className="text-xs text-gray-600">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-xs text-gray-400 line-clamp-2">
                  {item.prompt}
                </p>
              </div>
              <span className="text-gray-600 group-hover:text-gray-400 ml-2">▸</span>
            </div>
          </button>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-gray-700">
        <p className="text-xs text-gray-600 text-center">
          [SHOWING {history.length}/10 ENTRIES]
        </p>
      </div>
    </div>
  );
}