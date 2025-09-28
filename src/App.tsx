import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdProvider } from "@/contexts/AdContext";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BannerAd from "./components/ads/BannerAd"

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ErrorBoundary>
      <AdProvider>
        <TooltipProvider>
          {/* TUTTO il contenuto dell'app sta dentro questo wrapper con padding basso */}
          <div className="min-h-screen pb-16">
            <Toaster />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </div>

          {/* Banner fisso in basso, montato DOPO il contenuto */}
          <BannerAd />
        </TooltipProvider>
      </AdProvider>
    </ErrorBoundary>
  </QueryClientProvider>
);

export default App;

