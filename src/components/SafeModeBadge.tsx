import { useAds } from '@/contexts/AdContext';

export const SafeModeBadge = () => {
  const { isAdsEnabled } = useAds();
  
  if (isAdsEnabled()) {
    return null;
  }
  
  return (
    <div className="bg-orange-100 border border-orange-300 px-3 py-1 rounded-full text-xs font-semibold text-orange-800">
      🛡️ SAFE MODE (ADS OFF)
    </div>
  );
};