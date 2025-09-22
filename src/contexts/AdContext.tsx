import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdState {
  // Session unlocks
  unlockedL2: boolean;
  unlockedL3: boolean;
  
  // Interstitial tracking for Level 3
  completedDaresSinceInterstitial: number;
  interstitialsShownThisSession: number;
  
  // Consent
  hasConsent: boolean;
  
  // Configuration
  L3_INTERSTITIAL_EVERY: number;
  L3_INTERSTITIAL_MAX: number;
}

interface AdContextType {
  adState: AdState;
  unlockLevel: (level: 2 | 3) => void;
  incrementCompletedDares: () => void;
  resetInterstitialCounter: () => void;
  incrementInterstitialCount: () => void;
  setConsent: (consent: boolean) => void;
  shouldShowInterstitial: () => boolean;
  logEvent: (event: string, data?: Record<string, any>) => void;
}

const AdContext = createContext<AdContextType | undefined>(undefined);

export const useAds = () => {
  const context = useContext(AdContext);
  if (!context) {
    throw new Error('useAds must be used within an AdProvider');
  }
  return context;
};

export const AdProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [adState, setAdState] = useState<AdState>({
    unlockedL2: false,
    unlockedL3: false,
    completedDaresSinceInterstitial: 0,
    interstitialsShownThisSession: 0,
    hasConsent: false,
    L3_INTERSTITIAL_EVERY: 2,
    L3_INTERSTITIAL_MAX: 3
  });

  // Check for EU users and show consent (simplified GDPR check)
  useEffect(() => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const euTimezones = ['Europe/', 'Atlantic/Azores', 'Atlantic/Madeira'];
    const isEU = euTimezones.some(tz => timezone.startsWith(tz));
    
    if (isEU && !localStorage.getItem('ads_consent')) {
      // In a real implementation, show proper GDPR consent banner
      const consent = confirm('We use ads to support this app. Do you consent to personalized advertising?');
      localStorage.setItem('ads_consent', consent.toString());
      setAdState(prev => ({ ...prev, hasConsent: consent }));
    } else {
      setAdState(prev => ({ ...prev, hasConsent: true }));
    }
  }, []);

  const unlockLevel = (level: 2 | 3) => {
    console.log('unlockLevel called', { level, currentState: adState });
    setAdState(prev => {
      const newState = {
        ...prev,
        [level === 2 ? 'unlockedL2' : 'unlockedL3']: true
      };
      console.log('AdState updated', newState);
      return newState;
    });
    logEvent(`unlock_L${level}_rewarded`);
  };

  const incrementCompletedDares = () => {
    setAdState(prev => ({
      ...prev,
      completedDaresSinceInterstitial: prev.completedDaresSinceInterstitial + 1
    }));
  };

  const resetInterstitialCounter = () => {
    setAdState(prev => ({
      ...prev,
      completedDaresSinceInterstitial: 0
    }));
  };

  const incrementInterstitialCount = () => {
    setAdState(prev => ({
      ...prev,
      interstitialsShownThisSession: prev.interstitialsShownThisSession + 1
    }));
    logEvent('ad_interstitial_impression');
  };

  const setConsent = (consent: boolean) => {
    setAdState(prev => ({ ...prev, hasConsent: consent }));
    localStorage.setItem('ads_consent', consent.toString());
  };

  const shouldShowInterstitial = () => {
    return adState.completedDaresSinceInterstitial >= adState.L3_INTERSTITIAL_EVERY &&
           adState.interstitialsShownThisSession < adState.L3_INTERSTITIAL_MAX;
  };

  const logEvent = (event: string, data?: Record<string, any>) => {
    console.log(`[Ad Analytics] ${event}`, data);
    // In production, send to /api/telemetry or analytics service
  };

  return (
    <AdContext.Provider value={{
      adState,
      unlockLevel,
      incrementCompletedDares,
      resetInterstitialCounter,
      incrementInterstitialCount,
      setConsent,
      shouldShowInterstitial,
      logEvent
    }}>
      {children}
    </AdContext.Provider>
  );
};