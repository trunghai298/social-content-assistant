'use client';

import { Platform, GeneratedContent } from '@/app/types';

interface PreviewPanelProps {
  platform: Platform | null;
  content: GeneratedContent | null;
  prompt: string;
}

export default function PreviewPanel({ platform, content, prompt }: PreviewPanelProps) {
  if (!platform) return null;

  const renderTikTokPreview = () => (
    <div className="w-full max-w-[200px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-sm mx-auto">
      {/* Phone Frame */}
      <div className="relative bg-gray-900 rounded-[1.5rem] sm:rounded-[2rem] p-1.5 sm:p-2 shadow-2xl">
        <div className="relative bg-black rounded-[1rem] sm:rounded-[1.5rem] overflow-hidden" style={{ aspectRatio: '9/19.5' }}>
          {/* Status Bar */}
          <div className="absolute top-0 left-0 right-0 z-30 flex justify-between items-center px-3 py-1.5 text-white">
            <div className="flex items-center gap-0.5">
              <span className="text-[9px] font-medium">13:54</span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
              </svg>
            </div>
            <div className="flex items-center gap-1">
              <div className="flex gap-0.5">
                <div className="w-0.5 h-2 bg-white rounded-full"></div>
                <div className="w-0.5 h-2 bg-white rounded-full"></div>
                <div className="w-0.5 h-2 bg-white rounded-full"></div>
              </div>
              <span className="text-[9px] font-medium">5G</span>
              <div className="flex items-center gap-0.5">
                <span className="text-[9px]">43</span>
                <div className="w-4 h-2 border border-white rounded-sm">
                  <div className="w-3 h-full bg-white rounded-sm"></div>
                </div>
              </div>
            </div>
          </div>

          {/* TikTok Header */}
          <div className="absolute top-12 left-0 right-0 z-20 px-4">
            <div className="flex justify-center items-center gap-4 text-white/60 text-[10px]">
              <span className="text-white/80 relative">
                Following
              </span>
              <span className="text-white font-semibold border-b border-white pb-0.5">For You</span>
            </div>
          </div>

          {/* Video Background */}
          <div className="absolute inset-0 bg-gray-900">
            <img 
              src="data:image/svg+xml,%3Csvg width='400' height='800' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='bg' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23333;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23111;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='800' fill='url(%23bg)'/%3E%3C/svg%3E" 
              alt="Background" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80"></div>
          </div>

          {/* Caption Overlay */}
          {content && content.captions[0] && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-4/5">
              <div className="bg-white rounded-xl p-2 shadow-lg">
                <p className="text-black text-[11px] font-medium text-center leading-tight">
                  {content.captions[0].split('\n')[0]}
                </p>
              </div>
            </div>
          )}

          {/* Right Side Actions */}
          <div className="absolute right-2 bottom-20 flex flex-col gap-3 items-center z-20">
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 rounded-full border border-white overflow-hidden">
                <img 
                  src="data:image/svg+xml,%3Csvg width='24' height='24' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='avatar' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23ff0080;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%238b5cf6;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='24' height='24' fill='url(%23avatar)'/%3E%3C/svg%3E" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-3 h-3 -mt-1.5 bg-[#fe2c55] rounded-full flex items-center justify-center border-[0.5px] border-white">
                <span className="text-white text-[8px] font-medium">+</span>
              </div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 bg-gray-800/60 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="white">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </div>
              <span className="text-white text-[9px] font-normal mt-0.5">9,689</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 bg-gray-800/60 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10 1.19 0 2.34-.21 3.41-.6.3-.11.49-.4.49-.72 0-.43-.35-.78-.78-.78-.17 0-.33.06-.46.14-.83.32-1.74.49-2.66.49-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8c0 .92-.16 1.82-.49 2.66-.08.13-.14.29-.14.46 0 .43.35.78.78.78.32 0 .61-.19.72-.49.39-1.07.6-2.22.6-3.41 0-5.52-4.48-10-10-10zm-1 5v6l4.25 2.52.77-1.28-3.52-2.09V7z"/>
                </svg>
              </div>
              <span className="text-white text-[9px] font-normal mt-0.5">22</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 bg-gray-800/60 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="white">
                  <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
                </svg>
              </div>
              <span className="text-white text-[9px] font-normal mt-0.5">547</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 bg-gray-800/60 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <span className="text-white text-[9px] font-normal mt-0.5">80</span>
            </div>
          </div>

          {/* Bottom Content */}
          <div className="absolute bottom-12 left-0 right-0 px-3 z-20">
            <div className="mb-2">
              <p className="text-white font-semibold text-[10px] mb-0.5">@yourcontent</p>
              {content && (
                <>
                  <p className="text-white text-[10px] mb-0.5">
                    {prompt || 'Your video description...'}
                  </p>
                  {content.hashtags.length > 0 && (
                    <p className="text-white text-[10px]">
                      {content.hashtags.slice(0, 3).join(' ')}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="absolute bottom-0 left-0 right-0 h-10 bg-black flex justify-around items-center px-2 z-30">
            <div className="flex flex-col items-center">
              <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
              </svg>
              <span className="text-white text-[8px]">Home</span>
            </div>
            
            <div className="flex flex-col items-center">
              <svg className="w-3.5 h-3.5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd"/>
                <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"/>
              </svg>
              <span className="text-gray-400 text-[8px]">Shop</span>
            </div>
            
            <div className="relative">
              <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center">
                <span className="text-sm font-bold text-black">+</span>
              </div>
            </div>
            
            <div className="flex flex-col items-center">
              <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
              </svg>
              <span className="text-gray-400 text-[8px]">Inbox</span>
            </div>
            
            <div className="flex flex-col items-center">
              <svg className="w-3.5 h-3.5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
              </svg>
              <span className="text-gray-400 text-[8px]">Profile</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderInstagramPreview = () => (
    <div className="w-full max-w-[200px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-sm mx-auto">
      {/* Phone Frame */}
      <div className="relative bg-gray-900 rounded-[1.5rem] sm:rounded-[2rem] p-1.5 sm:p-2 shadow-2xl">
        <div className="relative bg-black rounded-[1rem] sm:rounded-[1.5rem] overflow-hidden" style={{ aspectRatio: '9/19.5' }}>
          {/* Status Bar */}
          <div className="absolute top-0 left-0 right-0 z-30 flex justify-between items-center px-3 py-1.5 text-white">
            <div className="flex items-center gap-0.5">
              <span className="text-[9px] font-medium">13:59</span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
              </svg>
            </div>
            <div className="flex items-center gap-1">
              <div className="flex gap-0.5">
                <div className="w-0.5 h-2 bg-white rounded-full"></div>
                <div className="w-0.5 h-2 bg-white rounded-full"></div>
                <div className="w-0.5 h-2 bg-white rounded-full"></div>
              </div>
              <span className="text-[9px] font-medium">5G</span>
              <div className="flex items-center gap-0.5">
                <span className="text-[9px]">47</span>
                <div className="w-4 h-2 border border-white rounded-sm">
                  <div className="w-3 h-full bg-white rounded-sm"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Instagram Reels Header */}
          <div className="absolute top-12 left-0 right-0 z-20 px-4 flex justify-between items-center">
            <div className="flex items-center gap-1">
              <span className="text-white text-sm font-semibold">Reels</span>
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>

          {/* Video Background */}
          <div className="absolute inset-0 bg-gray-900">
            <img 
              src="data:image/svg+xml,%3Csvg width='400' height='800' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='bg' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23222;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23000;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='800' fill='url(%23bg)'/%3E%3C/svg%3E" 
              alt="Background" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Main Caption Overlay */}
          {content && content.captions[0] && (
            <div className="absolute top-24 left-0 right-0 z-10 px-4">
              <p className="text-white text-xl font-bold leading-tight uppercase text-center">
                {content.captions[0].split('\n')[0]}
              </p>
            </div>
          )}

          {/* Right Side Actions */}
          <div className="absolute right-2 bottom-36 flex flex-col gap-3 items-center z-20">
            <div className="flex flex-col items-center gap-0.5">
              <div className="w-6 h-6 bg-white/10 backdrop-blur rounded-full flex items-center justify-center">
                <span className="text-xs">❤️</span>
              </div>
              <span className="text-white text-[9px] font-medium">80.2K</span>
            </div>
            
            <div className="flex flex-col items-center gap-0.5">
              <div className="w-6 h-6 bg-white/10 backdrop-blur rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-white text-[9px] font-medium">184</span>
            </div>
            
            <div className="flex flex-col items-center gap-0.5">
              <div className="w-6 h-6 bg-white/10 backdrop-blur rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.032 4.026a9.001 9.001 0 010-5.368m-9.032 5.368A9.002 9.002 0 015.645 14m3.04 0a9.004 9.004 0 000-4m3.04 4a9.003 9.003 0 00-3.04-4m9.032 4.026A8.961 8.961 0 0115 18c-2.796 0-5.487-.46-8-1.308m9.032-4.026A8.961 8.961 0 0115 6c-2.796 0-5.487.46-8 1.308" />
                </svg>
              </div>
              <span className="text-white text-[9px] font-medium">47.9K</span>
            </div>
          </div>

          {/* Bottom User Info */}
          <div className="absolute bottom-20 left-0 right-0 px-3 z-20">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full overflow-hidden border border-white">
                  <div className="w-full h-full bg-gradient-to-br from-yellow-400 via-red-500 to-purple-600"></div>
                </div>
                <div>
                  <p className="text-white font-semibold text-[10px]">gymfirest</p>
                  <p className="text-white/70 text-[9px] flex items-center gap-0.5">
                    <span className="text-[8px]">🎵</span> RAGEX, Sarvanss • Miss ...
                  </p>
                </div>
              </div>
              <button className="px-3 py-1 bg-transparent border border-white rounded text-white text-[9px] font-medium">
                Follow
              </button>
            </div>
            <p className="text-white text-[10px]">
              {content && content.captions[0] ? 
                prompt || 'Science based ...' : 
                'Science based ...'
              }
            </p>
          </div>

          {/* Sound Bar */}
          {content && content.sounds[0] && (
            <div className="absolute bottom-14 left-3 right-3 z-20">
              <div className="bg-white/10 backdrop-blur rounded-full px-3 py-1.5 flex items-center gap-1">
                <span className="text-xs">🎵</span>
                <p className="text-white text-[9px] truncate">
                  {content.sounds[0].name} &nbsp;•&nbsp; {content.sounds[0].artist}
                </p>
              </div>
            </div>
          )}

          {/* Bottom Navigation */}
          <div className="absolute bottom-0 left-0 right-0 h-10 bg-black flex justify-around items-center px-2 z-30">
            <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
            </svg>
            
            <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            
            <div className="relative">
              <div className="w-6 h-6 bg-transparent border border-gray-400 rounded-md flex items-center justify-center">
                <span className="text-sm text-gray-400">+</span>
              </div>
            </div>
            
            <svg className="w-3.5 h-3.5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
            </svg>
            
            <svg className="w-3.5 h-3.5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPreview = () => {
    switch (platform) {
      case 'tiktok':
        return renderTikTokPreview();
      case 'instagram':
      case 'facebook':
        return renderInstagramPreview();
      default:
        return (
          <div className="text-center py-12">
            <p className="text-gray-500">Preview not available for this platform</p>
          </div>
        );
    }
  };

  return (
    <div className="retro-card border-gray-700 p-3 sm:p-4 md:p-6">
      <h3 className="text-xs sm:text-sm font-bold mb-3 sm:mb-4 md:mb-6 text-gray-400 flex items-center">
        <span className="mr-2">◆</span> PREVIEW.MON
      </h3>
      <div className="flex items-center justify-center">
        {renderPreview()}
      </div>
    </div>
  );
}