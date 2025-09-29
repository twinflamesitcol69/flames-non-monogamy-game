import { useEffect } from "react";

declare global {
  interface Window { adsbygoogle: any[] | undefined }
}

export default function AdSlot() {
  useEffect(() => {
    try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch {}
  }, []);

  // Mostra solo in produzione
  if (import.meta.env.DEV) return null;

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block", minHeight: 120 }}
      data-ad-client="ca-pub-7997489223643022"
      data-ad-slot="1030982111"     // il tuo SLOT
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
