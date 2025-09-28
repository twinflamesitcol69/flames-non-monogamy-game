import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WelcomeScreen from '@/components/WelcomeScreen';
import LanguageSelection from '@/components/LanguageSelection';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'language'>('welcome');
  const navigate = useNavigate();

  const handleStartFromWelcome = () => {
    setCurrentScreen('language');
  };

  const handleLanguageSelect = (language: 'pt' | 'es' | 'en') => {
    navigate(`/play?lang=${language}`);
  };

  if (currentScreen === 'welcome') {
    return <WelcomeScreen onStart={handleStartFromWelcome} />;
  }

  if (currentScreen === 'language') {
    return <LanguageSelection onSelectLanguage={handleLanguageSelect} />;
  }

  return <WelcomeScreen onStart={handleStartFromWelcome} />;
};

export default Index;
