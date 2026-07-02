import { useEffect, useRef, useState } from "react";
import { useAds } from "@/contexts/AdContext";

export type InterstitialAdProps = {
  isOpen: boolean;
  onClose: () => void;
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

  const t = {
    en: { title: "Advertisement", loading: "Loading ad...", start: "▶ Play Ad" },
    es: { title: "Publicidad",    loading: "Cargando...",   start: "▶ Reproducir" },
    pt: { title: "Publicidade",   loading: "Carregando...", start: "▶ Reproduzir" },
  }[language];

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      try { adsManagerRef.current?.destroy?.(); } catch {}
      adsManagerRef.current = null;
      setStarted(false);
      setLoading(false);
    }
  }, [isOpen]);

  // Auto-start the ad as soon as the modal opens
  useEffect(() => {
    if (!isOpen || started) return;
    const timer = setTimeout(start, 400); // small delay for DOM to render
    return () => clearTimeout(timer);
  }, [isOpen]);

  const start = () => {
    if (!isOpen || started) return;
    setStarted(true);
    setLoading(true);

    const g = window.google?.ima;
    if (!g || !VAST) {
      // No IMA SDK or no VAST URL configured — close immediately
      setLoading(false);
      onClose();
      return;
    }

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

            m.addEventListener(g.AdErrorEvent.Type.AD_ERROR, () => {
              try { m.destroy(); } catch {}
              setLoading(false);
              onClose();
            });

            const w = containerRef.current?.clientWidth || 360;
            const h = Math.round(w * 9 / 16);
            m.init(w, h, g.ViewMode.NORMAL);
            m.start();
            setLoading(false);
          } catch {
            setLoading(false);
            onClose();
          }
        }
      );

      adsLoaderRef.current.addEventListener(g.AdErrorEvent.Type.AD_ERROR, () => {
        setLoading(false);
        onClose();
      });

      const req = new g.AdsRequest();
      let tag = VAST;
      if (isTest) tag += (tag.includes("?") ? "&" : "?") + "adtest=on";
      req.adTagUrl = tag;
      const w = containerRef.current?.clientWidth || 360;
      req.linearAdSlotWidth = w;
      req.linearAdSlotHeight = Math.round(w * 9 / 16);
      req.nonLinearAdSlotWidth = w;
      req.nonLinearAdSlotHeight = 60;

      adsLoaderRef.current.requestAds(req);
      logEvent("interstitial_requested");
    } catch {
      setLoading(false);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[55] bg-black/80 flex items-center justify-center p-4">
      <div className="w-full max-w-md warm-card rounded-2xl shadow-xl p-4 relative">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-muted-foreground">{t.title}</h3>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-muted-foreground text-lg leading-none"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div ref={containerRef} className="w-full rounded overflow-hidden bg-gray-900 relative" style={{ minHeight: 200 }}>
          <video ref={videoRef} className="w-full h-auto" playsInline />

          {/* Loading spinner */}
          {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
              <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span className="text-white text-sm">{t.loading}</span>
            </div>
          )}

          {/* Fallback manual start button (shown if auto-start failed) */}
          {!started && !loading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={start}
                className="px-6 py-3 rounded-lg bg-primary hover:bg-primary/90 text-white font-semibold shadow-lg"
              >
                {t.start}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default InterstitialAd;
