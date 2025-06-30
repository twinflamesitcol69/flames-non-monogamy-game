
import { useState } from 'react';
import WelcomeScreen from '@/components/WelcomeScreen';
import LanguageSelection from '@/components/LanguageSelection';
import MainSections from '@/components/MainSections';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'language' | 'main'>('welcome');
  const [selectedLanguage, setSelectedLanguage] = useState<'pt' | 'es' | null>(null);

  const handleStartFromWelcome = () => {
    setCurrentScreen('language');
  };

  const handleLanguageSelect = (language: 'pt' | 'es') => {
    setSelectedLanguage(language);
    setCurrentScreen('main');
  };

  const handleBackToLanguage = () => {
    setCurrentScreen('language');
    setSelectedLanguage(null);
  };

  if (currentScreen === 'welcome') {
    return <WelcomeScreen onStart={handleStartFromWelcome} />;
  }

  if (currentScreen === 'language') {
    return <LanguageSelection onSelectLanguage={handleLanguageSelect} />;
  }

  if (currentScreen === 'main' && selectedLanguage) {
    return <MainSections language={selectedLanguage} onBack={handleBackToLanguage} />;
  }

  // Fallback
  return <WelcomeScreen onStart={handleStartFromWelcome} />;
};

export default Index;
