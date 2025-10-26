import React from "react";

/**
 * BannerAd — versione neutralizzata per policy AdSense.
 * Non carica lo script adsbygoogle, non effettua push, non rende markup.
 * Risolve la violazione "Google-served ads on screens without publisher-content".
 *
 * Per riattivarlo in futuro (es. su una pagina editoriale dedicata),
 * sostituisci questo file con una versione che inietti lo script
 * SOLO all’interno del componente e SOLO su una route consentita.
 */
export default function BannerAd() {
  return null;
}
