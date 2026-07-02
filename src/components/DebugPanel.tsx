import { useState } from 'react';
import { useAds } from '@/contexts/AdContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X, Bug } from 'lucide-react';

interface DebugPanelProps {
  currentStep?: string;
  currentLevel?: number;
  selectedPlayers?: any[];
  placeholderResolution?: Record<string, any>;
  language: 'pt' | 'es' | 'en';
}

export const DebugPanel = ({ 
  currentStep = 'N/A', 
  currentLevel = 1, 
  selectedPlayers = [], 
  placeholderResolution = {},
  language 
}: DebugPanelProps) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const { adState, isAdsEnabled } = useAds();
  const isDebugMode = new URLSearchParams(window.location.search).get('debug') === '1';

  if (!isDebugMode) return null;

  const debugInfo = {
    'Current Step': currentStep,
    'Current Level': `L${currentLevel}`,
    'Player Count': selectedPlayers.length,
    'Ads Enabled': isAdsEnabled() ? 'Yes' : 'No',
    'Ad Consent': adState.hasConsent ? 'Given' : 'Not Given',
    'L2 Unlocked': adState.unlockedL2 ? 'Yes' : 'No',
    'L3 Unlocked': adState.unlockedL3 ? 'Yes' : 'No',
    'Interstitial Count': adState.interstitialsShownThisSession,
    'Completed Dares': adState.completedDaresSinceInterstitial,
    'Language': language.toUpperCase()
  };

  if (isMinimized) {
    return (
      <Button
        onClick={() => setIsMinimized(false)}
        className="fixed top-4 right-4 z-[999] bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg"
        size="sm"
      >
        <Bug className="w-4 h-4" />
      </Button>
    );
  }

  return (
    <Card className="fixed top-4 right-4 z-[999] w-80 max-h-96 overflow-y-auto bg-white/95 backdrop-blur-sm border-red-200 shadow-xl">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm flex items-center gap-2">
            <Bug className="w-4 h-4 text-red-500" />
            Debug Panel
          </CardTitle>
          <Button
            onClick={() => setIsMinimized(true)}
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
          >
            <X className="w-3 h-3" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          {Object.entries(debugInfo).map(([key, value]) => (
            <div key={key} className="flex justify-between items-center text-xs">
              <span className="text-muted-foreground">{key}:</span>
              <Badge variant="outline" className="text-xs">
                {String(value)}
              </Badge>
            </div>
          ))}
          
          {selectedPlayers.length > 0 && (
            <div className="mt-3 pt-3 border-t">
              <div className="text-xs text-muted-foreground mb-2">Selected Players:</div>
              {selectedPlayers.map((player, index) => (
                <div key={index} className="text-xs bg-gray-50 p-2 rounded mb-1">
                  <div><strong>{player.name}</strong></div>
                  <div className="text-muted-foreground">
                    {player.gender} • {player.orientation}
                  </div>
                </div>
              ))}
            </div>
          )}

          {Object.keys(placeholderResolution).length > 0 && (
            <div className="mt-3 pt-3 border-t">
              <div className="text-xs text-muted-foreground mb-2">Placeholder Resolution:</div>
              {Object.entries(placeholderResolution).map(([placeholder, player]: [string, any]) => (
                <div key={placeholder} className="text-xs bg-blue-50 p-2 rounded mb-1">
                  <strong>{placeholder}</strong> → {player?.name || 'N/A'}
                </div>
              ))}
            </div>
          )}

          {isAdsEnabled() && (
            <div className="mt-3 pt-3 border-t">
              <div className="text-xs text-muted-foreground mb-2">AdSense Status:</div>
              <div className="text-xs">
                {typeof window !== 'undefined' && window.adsbygoogle ? 
                  '✅ AdSense loaded' : 
                  '❌ AdSense not loaded'
                }
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};