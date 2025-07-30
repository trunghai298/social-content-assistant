'use client';

import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
  interface Navigator {
    standalone?: boolean;
  }
}

export default function InstallPWA() {
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [platform, setPlatform] = useState<'ios' | 'android' | 'desktop' | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    // Detect platform
    const userAgent = navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(userAgent);
    const isAndroid = /android/.test(userAgent);
    
    if (isIOS) {
      setPlatform('ios');
      // Check if it's Safari and not already installed
      const isSafari = /safari/.test(userAgent) && !/chrome/.test(userAgent);
      if (isSafari && !window.navigator.standalone) {
        setShowInstallPrompt(true);
      }
    } else if (isAndroid) {
      setPlatform('android');
    } else {
      setPlatform('desktop');
    }

    // Listen for beforeinstallprompt event (Android/Desktop Chrome)
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Check if app was installed
    window.addEventListener('appinstalled', () => {
      setShowInstallPrompt(false);
      setIsInstalled(true);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (platform === 'ios') {
      // iOS doesn't support prompt, show instructions
      return;
    }

    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        setShowInstallPrompt(false);
      }
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    // Store dismissal in localStorage to not show again for some time
    localStorage.setItem('pwa-prompt-dismissed', Date.now().toString());
  };

  // Check if prompt was recently dismissed
  useEffect(() => {
    const dismissedTime = localStorage.getItem('pwa-prompt-dismissed');
    if (dismissedTime) {
      const daysSinceDismissed = (Date.now() - parseInt(dismissedTime)) / (1000 * 60 * 60 * 24);
      if (daysSinceDismissed < 7) {
        setShowInstallPrompt(false);
      }
    }
  }, []);

  if (!showInstallPrompt || isInstalled) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-3 sm:p-4 bg-black/95 border-t-2 border-[var(--neon-pink)]">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-start justify-between gap-2 sm:gap-4">
          <div className="flex-1">
            <h3 className="text-xs sm:text-sm font-bold neon-text-pink mb-1 sm:mb-2" style={{ fontFamily: 'var(--font-pixel)' }}>
              [INSTALL_APP.EXE]
            </h3>
            
            {platform === 'ios' ? (
              <div className="space-y-2">
                <p className="text-[11px] sm:text-xs text-gray-300" style={{ fontFamily: 'var(--font-vt323)' }}>
                  Install this app on your iPhone:
                </p>
                <ol className="text-[10px] sm:text-xs text-gray-400 space-y-0.5 sm:space-y-1" style={{ fontFamily: 'var(--font-vt323)' }}>
                  <li>1. Tap the share button <span className="text-[var(--neon-blue)]">⎋</span></li>
                  <li>2. Scroll down and tap <span className="text-[var(--neon-green)]">&quot;Add to Home Screen&quot;</span></li>
                  <li>3. Tap <span className="text-[var(--neon-pink)]">&quot;Add&quot;</span></li>
                </ol>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-[11px] sm:text-xs text-gray-300" style={{ fontFamily: 'var(--font-vt323)' }}>
                  Install Social Content Assistant for quick access and offline support!
                </p>
                <button
                  onClick={handleInstallClick}
                  className="retro-button !px-3 sm:!px-4 !py-1.5 sm:!py-2 !text-[10px] sm:!text-xs border-[var(--neon-green)] text-[var(--neon-green)] hover:shadow-[var(--glow-green)]"
                >
                  <span className="flex items-center gap-1 sm:gap-2">
                    <span>▼</span>
                    <span>INSTALL_NOW.BAT</span>
                  </span>
                </button>
              </div>
            )}
          </div>
          
          <button
            onClick={handleDismiss}
            className="text-gray-500 hover:text-[var(--neon-pink)] transition-colors p-0.5 sm:p-1"
            aria-label="Dismiss install prompt"
          >
            <span className="text-base sm:text-lg md:text-xl">✕</span>
          </button>
        </div>
      </div>
    </div>
  );
}