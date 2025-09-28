import React, { useEffect, useRef, useState } from "react";

const ENABLED = String(import.meta.env.VITE_ADS_ENABLED) === "true";
const VAST_URL = import.meta.env.VITE_ADS_REWARDED_VAST_URL || "";

type Props = {
  open: boolean;
  onClose: () => void;
  onReward: () => void; // chiamato quando l'utente guadagna l'accesso a L2/L3
};

export default function RewardedAdModal({ open, onClose, onReward }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const adContainerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;
    if (!ENABLED) { onReward(); return; } // se ads off, sblocca subito
    if (!VAST_URL) {
      // Fallback: “simula” rewarded per 5s (solo per flusso)
      setLoading(true);
      const t = setTimeout(() => { setLoading(false); onReward(); }, 5000);
      return () => clearTimeout(t);
    }
    // IMA SDK
    try {
      setLoading(true);
      const win = window as any;
      const adContainer = adContainerRef.current!;
      const contentVideo = videoRef.current!;
      const adDisplayContainer = new win.google.ima.AdDisplayContainer(adContainer, contentVideo);
      adDisplayContainer.initialize();

      const adsLoader = new win.google.ima.AdsLoader(adDisplayContainer);
      adsLoader.getSettings().setVpaidMode && adsLoader.getSettings().setVpaidMode(2); // optional

      const onAdsManagerLoaded = (e: any) => {
        const adsManager = e.getAdsManager(contentVideo);
        adsManager.addEventListener(win.google.ima.AdEvent.Type.LOADED, () => {
          // Se l’ad è “rewarded”, IMA segnalerà completamento
        });
        adsManager.addEventListener(win.google.ima.AdEvent.Type.COMPLETE, () => {
          setLoading(false);
          onReward();
          onClose();
        });
        adsManager.addEventListener(win.google.ima.AdErrorEvent.Type.AD_ERROR, (err: any) => {
          console.warn("[Rewarded] IMA error", err?.getError?.());
          setError("Ad error");
          setLoading(false);
          // in caso di errore, per UX sblocchiamo comunque
          onReward();
          onClose();
        });
        try {
          adsManager.init(640, 360, win.google.ima.ViewMode.NORMAL);
          adsManager.start();
        } catch (err) {
          console.warn("[Rewarded] start error", err);
          setError("Start error");
          setLoading(false);
          onReward();
          onClose();
        }
      };

      adsLoader.addEventListener((win.google.ima.AdsManagerLoadedEvent as any).Type.ADS_MANAGER_LOADED, onAdsManagerLoaded, false);
      adsLoader.addEventListener(win.google.ima.AdErrorEvent.Type.AD_ERROR, (err: any) => {
        console.warn("[Rewarded] loader error", err?.getError?.());
        setError("Loader error");
        setLoading(false);
        onReward();
        onClose();
      }, false);

      const adsRequest = new win.google.ima.AdsRequest();
      adsRequest.adTagUrl = VAST_URL;
      adsRequest.linearAdSlotWidth = 640;
      adsRequest.linearAdSlotHeight = 360;
      adsLoader.requestAds(adsRequest);
    } catch (e) {
      console.warn("[Rewarded] IMA init error", e);
      setError("Init error");
      setLoading(false);
      onReward();
      onClose();
    }
  }, [open, onClose, onReward]);

  if (!open) return null;

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 60
    }}>
      <div style={{ width: 680, maxWidth: "95%", background: "#111", color: "#fff", borderRadius: 12, padding: 12 }}>
        <h3 style={{ margin: 0, fontSize: 18 }}>Watch ad to unlock</h3>
        <div ref={adContainerRef}
             style={{ width: "100%", aspectRatio: "16/9", background: "#000", marginTop: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {/* container per IMA */}
          <video ref={videoRef} style={{ display: "none" }} />
          {!VAST_URL && loading && <p style={{ color: "#bbb" }}>Simulating rewarded… 5s</p>}
          {error && <p style={{ color: "#f66" }}>Ad error: {error}</p>}
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 8 }}>
          <button onClick={onClose} style={{ padding: "6px 12px" }}>Close</button>
        </div>
      </div>
    </div>
  );
}
