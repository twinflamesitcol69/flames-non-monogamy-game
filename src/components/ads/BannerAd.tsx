import { useEffect, useRef } from "react";

const ZONE_ID = import.meta.env.VITE_ADS_BANNER_ZONE_ID || "";
const ADS_ENABLED = import.meta.env.VITE_ADS_ENABLED === "true";

export default function BannerAd() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ADS_ENABLED || !ZONE_ID || !ref.current) return;

    // ExoClick display banner (new ad-provider format)
    const ins = document.createElement("ins");
    ins.className = "eas6a97888e10";
    ins.setAttribute("data-zoneid", ZONE_ID);
    ref.current.appendChild(ins);

    const SCRIPT_ID = "exoclick-ad-provider";
    if (!document.getElementById(SCRIPT_ID)) {
      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.async = true;
      script.type = "application/javascript";
      script.src = "https://a.magsrv.com/ad-provider.js";
      document.head.appendChild(script);
    }

    // Trigger ad serving after ins element is in DOM
    (window as any).AdProvider = (window as any).AdProvider || [];
    (window as any).AdProvider.push({ serve: {} });
  }, []);

  if (!ADS_ENABLED || !ZONE_ID) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 flex justify-center items-center bg-card/90 backdrop-blur-sm border-t border-border"
      style={{ minHeight: 60 }}
      aria-label="Advertisement"
    >
      <div ref={ref} />
    </div>
  );
}
