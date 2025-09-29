import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import WelcomeScreen from "@/components/WelcomeScreen";
import LanguageSelection from "@/components/LanguageSelection";
import BannerAd from "@/components/ads/BannerAd";

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<"welcome" | "language">("welcome");
  const navigate = useNavigate();

  const handleStartFromWelcome = () => {
    setCurrentScreen("language");
  };

  const handleLanguageSelect = (language: "pt" | "es" | "en") => {
    navigate(`/play?lang=${language}`);
  };

  // Scegli il contenuto principale della pagina
  const mainContent =
    currentScreen === "welcome" ? (
      <WelcomeScreen onStart={handleStartFromWelcome} />
    ) : currentScreen === "language" ? (
      <LanguageSelection onSelectLanguage={handleLanguageSelect} />
    ) : (
      <WelcomeScreen onStart={handleStartFromWelcome} />
    );

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      {mainContent}

      {/* Banner AdSense inline, policy-safe */}
      <div className="mt-6">
        <BannerAd />
      </div>
    </div>
  );
};

export default Index;
