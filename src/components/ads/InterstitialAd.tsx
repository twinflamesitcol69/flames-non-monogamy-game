import React, { useEffect, useRef, useState } from "react";
import { useAds } from "@/contexts/AdContext";

export type InterstitialAdProps = {
  isOpen: boolean;
  onClose: () => void;         // chiamata al termine o in errore
  language: "pt" | "es" | "en";
};

declare global {
  interface Window { google?: any; }
}

const VAST = import.meta.env.VITE_ADS_INTERSTITIAL_VAST_URL || "";
const isTest = new URLSearchParams(window.location.search).has("adtest");

export function InterstitialAd({ isOpen, onClose, language }: InterstitialAdProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { logEvent } = useAds();

  const adsManagerRef = useRef<any>(null);
  const adsLoaderRef  = useRef<any>(null);
  const displayRef    = useRef<any>(null);

  useEffect(() => {
    if (!isOpen) {
      try { adsManagerRef.current?.destroy?.(); } catch {}
      adsManagerRef.current = null;
      setStarted(false);
      setLoading(false);
    }
  }, [isOpen]);

  const t = {
    en: { title: "Advertisement", start: "Play Ad" },
    es: { title: "Publicidad",    start: "Reproducir anuncio" },
    pt: { title: "Publicidade",    start: "Reproduzir anúncio" },
  }[language];

  const start = () => {
    if (!isOpen || started) return;
    setStarted(true);
    setLoading(true);

    const g = window.google?.ima;
    if (!g) { setLoading(false); onClose(); return; }

    try {
      displayRef.current = new g.AdDisplayContainer(containerRef.current, videoRef.current);
      displayRef.current.initialize?.();
      adsLoaderRef.current = new g.AdsLoader(displayRef.current);

      adsLoaderRef.current.addEventListener(
        g.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
        (ev: any) => {
          try {
            const m = ev.getAdsManager(videoRef.current);
            adsManagerRef.current = m;

            m.addEventListener(g.AdEvent.Type.COMPLETE, () => {
              try { m.destroy(); } catch {}
              setLoading(false);
              onClose();
            });

            m.addEventListener(g.AdErrorEvent.Type.AD_ERROR, (e:any) => {
              console.warn("Interstitial error", e);
              try { m.destroy(); } catch {}
              setLoading(false);
              onClose();
            });

            const w = containerRef.current?.clientWidth || 360;
            const h = Math.round(w * 9 / 16);
            m.init(w, h, g.ViewMode.NORMAL);
            m.start();
          } catch (err) {
            console.warn("Interstitial start error", err);
            setLoading(false);
            onClose();
          }
        }
      );

      adsLoaderRef.current.addEventListener(g.AdErrorEvent.Type.AD_ERROR, (e:any) => {
        console.warn("Interstitial loader error", e);
        setLoading(false);
        onClose();
      });

      const req = new g.AdsRequest();
      let tag = VAST;
      if (isTest && tag) tag += (tag.includes("?") ? "&" : "?") + "adtest=on";
      req.adTagUrl = tag || "about:blank";
      const w = containerRef.current?.clientWidth || 360;
      req.linearAdSlotWidth = w;
      req.linearAdSlotHeight = Math.round(w * 9 / 16);
      req.nonLinearAdSlotWidth = w;
      req.nonLinearAdSlotHeight = 60;

      adsLoaderRef.current.requestAds(req);
      logEvent("interstitial_requested");
    } catch (e) {
      console.warn("Interstitial request error", e);
      setLoading(false);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[55] bg-black/60 flex items-center justify-center p-4" onClick={onClose}>
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-4 relative" onClick={(e)=>e.stopPropagation()}>
        <h3 className="text-lg font-semibold mb-3 text-center">{t.title}</h3>
        <div ref={containerRef} className="w-full rounded overflow-hidden bg-black relative">
          <video ref={videoRef} className="w-full h-auto" playsInline webkit-playsinline="true" />
          {!started && (
            <div className="absolute inset-0 flex items-center justify-center">
              <button onClick={start} className="px-4 py-2 rounded bg-gray-900 text-white font-medium">
                {t.start}
              </button>
            </div>
          )}
        </div>
        <div className="mt-3 text-center text-sm text-gray-500">{loading ? "Loading..." : ""}</div>
      </div>
    </div>
  );
}

// esportiamo sia named che default per compatibilità con gli import esistenti
export default InterstitialAd;
