import React, { useEffect, useRef } from "react";

const AD_CLIENT = import.meta.env.VITE_ADSENSE_CLIENT || "ca-pub-7997489223643022";
const AD_SLOT   = import.meta.env.VITE_ADSENSE_SLOT   || "1030982111";
// Abilita banner solo se il valore è ESATTAMENTE "true"
const ADS_ENABLED = String(import.meta.env.VITE_ADS_ENABLED) === "true";

export default function BannerAd() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isTest = new URLSearchParams(window.location.search).has("adtest");

  useEffect(() => {
    if (!ADS_ENABLED) return;
    try {
      (window as any).adsbygoogle = (window as any).adsbygoogle || [];
      (window as any).adsbygoogle.push({});
    } catch (e) {
      console.warn("adsbygoogle push error:", e);
    }
  }, []);

  if (!ADS_ENABLED) return null;

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        height: 56, // se alzi questa misura, poi aumentiamo il padding in App.tsx
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
        {...(isTest ? { "data-adtest": "on" } : {})}
      />
    </div>
  );
}
