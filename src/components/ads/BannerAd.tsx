import { useEffect, useRef } from "react";

const ZONE_ID = import.meta.env.VITE_ADS_BANNER_ZONE_ID || "";
const ADS_ENABLED = import.meta.env.VITE_ADS_ENABLED === "true";

export default function BannerAd() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ADS_ENABLED || !ZONE_ID || !ref.current) return;

    // ExoClick display banner: inserisce l'elemento <ins> che il loro script trasforma in annuncio
    const ins = document.createElement("ins");
    ins.className = "eas6a97888e2";
    ins.setAttribute("data-zoneid", ZONE_ID);
    ref.current.appendChild(ins);

    // Carica lo script ExoClick una sola volta nella pagina
    const SCRIPT_ID = "exoclick-adserver";
    if (!document.getElementById(SCRIPT_ID)) {
      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.async = true;
      script.src = "//a.magsrv.com/adserver.js";
      document.head.appendChild(script);
    }
  }, []);

  if (!ADS_ENABLED || !ZONE_ID) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 flex justify-center items-center bg-white/90 backdrop-blur-sm border-t border-purple-100"
      style={{ minHeight: 60 }}
      aria-label="Advertisement"
    >
      <div ref={ref} />
    </div>
  );
}
