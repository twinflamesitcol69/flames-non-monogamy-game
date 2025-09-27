/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ADS_ENABLED?: string
  readonly VITE_DEBUG?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}