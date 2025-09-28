import React, { useEffect, useRef, useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onReward: () => void; // chiamata quando l'annuncio termina (sblocca L2/L3)
};

declare global {
  interface Window { google?: any; }
}

const VAST = import.meta.env.VITE_ADS_REWARDED_VAST_URL || "";
const isTest = new URLSearchParams(window.location.search).has("adtest");

export default function RewardedAdModal({ open, onClose, onReward }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);

  const adsManagerRef = useRef<any>(null);
  const adsLoaderRef  = useRef<any>(null);
  const displayRef    = useRef<any>(null);

  useEffect(() => {
    if (!open) {
      try { adsManagerRef.current?.destroy?.(); } catch {}
      adsManagerRef.current = null;
      setLoading(false);
      setStarted(false);
    }
  }, [open]);

  const start = () => {
    if (!open || started) return;
    setStarted(true);
    setLoading(true);

    const g = window.google?.ima;
    if (!g) {
      // IMA non è caricato? fallback: sblocca comunque per UX
      setLoading(false);
      onReward();
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
              onReward(); // ✅ sblocca
            });

            m.addEventListener(g.AdErrorEvent.Type.AD_ERROR, () => {
              try { m.destroy(); } catch {}
              setLoading(false);
              onReward(); // fallback: sblocca
            });

            const w = containerRef.current?.clientWidth || 360;
            const h = Math.round(w * 9 / 16);
            m.init(w, h, g.ViewMode.NORMAL);
            m.start();
          } catch {
            setLoading(false);
            onReward();
          }
        }
      );

      adsLoaderRef.current.addEventListener(g.AdErrorEvent.Type.AD_ERROR, () => {
        setLoading(false);
        onReward(); // fallback: sblocca
      });

      const req = new g.AdsRequest();
      let tag = VAST;
      if (isTest && tag) tag += (tag.includes("?") ? "&" : "?") + "adtest=on";
      req.adTagUrl = tag || "about:blank"; // se vuoto, evitiamo errori
      const w = containerRef.current?.clientWidth || 360;
      req.linearAdSlotWidth = w;
      req.linearAdSlotHeight = Math.round(w * 9 / 16);
      req.nonLinearAdSlotWidth = w;
      req.nonLinearAdSlotHeight = 60;

      adsLoaderRef.current.requestAds(req);
    } catch {
      setLoading(false);
      onReward();
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-black/60 flex items-center justify-center p-4" onClick={onClose}>
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-4 relative" onClick={(e)=>e.stopPropagation()}>
        <button aria-label="Close" onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">✕</button>
        <h3 className="text-lg font-semibold mb-3 text-center">Watch Ad to unlock</h3>
        <div ref={containerRef} className="w-full rounded overflow-hidden bg-black relative">
          <video ref={videoRef} className="w-full h-auto" playsInline webkit-playsinline="true" />
          {!started && (
            <div className="absolute inset-0 flex items-center justify-center">
              <button onClick={start} className="px-4 py-2 rounded bg-purple-600 text-white font-medium">Watch Ad</button>
            </div>
          )}
        </div>
        <div className="mt-3 text-center text-sm text-gray-500">
          {loading ? "Loading..." : "Your level will unlock after the ad."}
        </div>
      </div>
    </div>
  );
}
