import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate, useSearchParams } from "react-router-dom";
import { AdProvider } from "@/contexts/AdContext";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BannerAd from "./components/ads/BannerAd";
import KingdomOfPleasure from "./components/sections/KingdomOfPleasure";

const queryClient = new QueryClient();

function GameRoute() {
  const navigate = useNavigate();
  const [sp] = useSearchParams();
  const langParam = sp.get("lang");
  const lang = (langParam === "en" || langParam === "es" || langParam === "pt") ? (langParam as "en"|"es"|"pt") : "en";
  return <KingdomOfPleasure language={lang} onBack={() => navigate(-1)} />;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ErrorBoundary>
      <AdProvider>
        <TooltipProvider>
          <div className="min-h-screen pb-16">
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/play" element={<GameRoute />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
            <BannerAd />
          </div>
        </TooltipProvider>
      </AdProvider>
    </ErrorBoundary>
  </QueryClientProvider>
);

export default App;
