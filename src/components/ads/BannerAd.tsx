import React, { useEffect, useRef } from "react";

const AD_CLIENT = import.meta.env.VITE_ADSENSE_CLIENT || "ca-pub-7997489223643022";
const AD_SLOT   = import.meta.env.VITE_ADSENSE_SLOT   || "1030982111";

// Flag da URL per test: ?adtest=1
const forceByTest = new URLSearchParams(window.location.search).has("adtest");

// ON solo se l'env è esattamente "true", ma in test lo forziamo
const ADS_FLAG = String(import.meta.env.VITE_ADS_ENABLED) === "true";
const ENABLED = ADS_FLAG || forceByTest;

export function BannerAd() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ENABLED) {
      console.log("[BannerAd] disabled (VITE_ADS_ENABLED != 'true')");
      return;
    }
    try {
      (window as any).adsbygoogle = (window as any).adsbygoogle || [];
      (window as any).adsbygoogle.push({});
      console.log("[BannerAd] adsbygoogle push ok");
    } catch (e) {
      console.warn("[BannerAd] adsbygoogle push error:", e);
    }
  }, []);

  if (!ENABLED) return null;

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        height: 56,              // se alzi questa misura, aumenta il pb in App.tsx
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
        // in sessioni di test va bene forzare il creative di test
        {...(forceByTest ? { "data-adtest": "on" } as any : {})}
      />
    </div>
  );
}

export default BannerAd;
