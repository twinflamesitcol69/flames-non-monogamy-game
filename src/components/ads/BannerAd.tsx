import React, { useEffect, useRef } from "react";

// ENV con fallback sicuri
const AD_CLIENT = import.meta.env.VITE_ADSENSE_CLIENT || "ca-pub-7997489223643022";
const AD_SLOT   = import.meta.env.VITE_ADSENSE_SLOT   || "1030982111";

// Flag ?adtest=1 per forzare test creative
const forceByTest = new URLSearchParams(window.location.search).has("adtest");

// Il banner è attivo se VITE_ADS_ENABLED === "true" (prod) oppure se ?adtest=1
const ADS_FLAG = String(import.meta.env.VITE_ADS_ENABLED) === "true";
const ENABLED = ADS_FLAG || forceByTest;

/**
 * Banner AdSense inline, policy-safe (NO fixed/sticky).
 * Mostralo UNA SOLA VOLTA in una pagina raggiungibile (es. Index).
 */
export default function BannerAd() {
  const pushedRef = useRef(false);

  useEffect(() => {
    if (!ENABLED || pushedRef.current) return;
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushedRef.current = true;
      // console.log("[BannerAd] adsbygoogle push ok");
    } catch (e) {
      // console.warn("[BannerAd] adsbygoogle push error:", e);
    }
  }, []);

  if (!ENABLED) return null;

  return (
    <div
      // ✅ inline nel flusso pagina: niente position: fixed/sticky
      style={{
        margin: "16px auto",
        maxWidth: 970,
        minHeight: 120, // spazio minimo per creative display
      }}
    >
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={AD_SLOT}
        data-ad-format="auto"
        data-full-width-responsive="true"
        {...(forceByTest ? ({ "data-adtest": "on" } as any) : {})}
      />
    </div>
  );
}
