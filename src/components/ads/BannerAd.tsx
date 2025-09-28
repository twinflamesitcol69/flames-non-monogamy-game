import React, { useEffect, useRef } from "react";

const AD_CLIENT = import.meta.env.VITE_ADSENSE_CLIENT || "ca-pub-7997489223643022";
const AD_SLOT   = import.meta.env.VITE_ADSENSE_SLOT   || "1030982111";
const url = new URLSearchParams(window.location.search);
const forceByTest = url.has("adtest"); // forza ON se usi ?adtest=1
const ADS_FLAG = String(import.meta.env.VITE_ADS_ENABLED) === "true";
const ENABLED = ADS_FLAG || forceByTest; // <— chiave: attiva anche in test

export function BannerAd() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ENABLED) return;
    try {
      (window as any).adsbygoogle = (window as any).adsbygoogle || [];
      (window as any).adsbygoogle.push({});
      console.log("[BannerAd] adsbygoogle push ok");
    } catch (e) {
      console.warn("[BannerAd] adsbygoogle push error:", e);
    }
  }, []);

  if (!ENABLED) {
    if (forceByTest) console.log("[BannerAd] DISABLED by env, but test flag present (should not happen)");
    return null;
  }

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        height: 56,
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
        borderTop: "1px solid rgba(0,0,0,0.06)",
      }}
    >
      <ins
        className="adsbygoogle"
        style={{ display: "block", width: "100%", height: "100%" }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={AD_SLOT}
        data-ad-format="auto"
        data-full-width-responsive="true"
        data-adtest="on"  // in presenza di ?adtest=1 va bene tenerlo sempre ON
      />
    </div>
  );
}

export default BannerAd;
