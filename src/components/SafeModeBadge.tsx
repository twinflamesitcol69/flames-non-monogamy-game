import { useAds } from '@/contexts/AdContext';

export const SafeModeBadge = () => {
  const { isAdsEnabled } = useAds();
  
  if (isAdsEnabled()) {
    return null;
  }
  
  return (
    <div className="bg-yellow-100 border border-yellow-300 px-3 py-1 rounded-full text-xs font-semibold text-yellow-800 animate-pulse">
      SAFE MODE (ADS OFF)
    </div>
  );
};