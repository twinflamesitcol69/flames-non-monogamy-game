
import { useState } from 'react';
import { Brain, Target, Crown, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BannerAd } from '@/components/ads/BannerAd';
import { SafeModeBadge } from '@/components/SafeModeBadge';
import GainingConfidence from './sections/GainingConfidence';
import HookUp from './sections/HookUp';
import KingdomOfPleasure from './sections/KingdomOfPleasure';

interface MainSectionsProps {
  language: 'pt' | 'es' | 'en';
  onBack: () => void;
}

const MainSections = ({ language, onBack }: MainSectionsProps) => {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const translations = {
    pt: {
      title: 'Explore Sua Jornada',
      subtitle: 'Escolha sua área de interesse',
      confidence: {
        title: 'Ganhando Confiança',
        description: 'Educação e autoconfiança sobre não-monogamia ética'
      },
      hookup: {
        title: 'Hook Up',
        description: 'Técnicas práticas para conexões reais'
      },
      kingdom: {
        title: 'Reino do Prazer',
        description: 'Jogos eróticos interativos e personalizados'
      },
      back: 'Voltar'
    },
    es: {
      title: 'Explora Tu Jornada',
      subtitle: 'Elige tu área de interés',
      confidence: {
        title: 'Ganando Confianza',
        description: 'Educación y autoconfianza sobre no-monogamia ética'
      },
      hookup: {
        title: 'Hook Up',
        description: 'Técnicas prácticas para conexiones reales'
      },
      kingdom: {
        title: 'Reino del Placer',
        description: 'Juegos eróticos interactivos y personalizados'
      },
      back: 'Volver'
    },
    en: {
      title: 'Explore Your Journey',
      subtitle: 'Choose your area of interest',
      confidence: {
        title: 'Gaining Confidence',
        description: 'Education and self-confidence about ethical non-monogamy'
      },
      hookup: {
        title: 'Hook Up',
        description: 'Practical techniques for real connections'
      },
      kingdom: {
        title: 'Kingdom of Pleasure',
        description: 'Interactive and personalized erotic games'
      },
      back: 'Back'
    }
  };

  const t = translations[language] || translations.en;

  if (selectedSection === 'confidence') {
    return <GainingConfidence language={language} onBack={() => setSelectedSection(null)} />;
  }

  if (selectedSection === 'hookup') {
    return <HookUp language={language} onBack={() => setSelectedSection(null)} />;
  }

  if (selectedSection === 'kingdom') {
    return <KingdomOfPleasure language={language} onBack={() => setSelectedSection(null)} />;
  }

  const sections = [
    {
      id: 'kingdom',
      title: t.kingdom.title,
      description: t.kingdom.description,
      icon: Crown,
      gradient: 'from-orange-500 to-rose-600',
      bgGradient: 'from-orange-500/10 to-rose-600/10',
      featured: true // Mark as featured
    },
    {
      id: 'confidence', 
      title: t.confidence.title,
      description: t.confidence.description,
      icon: Brain,
      gradient: 'from-amber-400 to-orange-600',
      bgGradient: 'from-amber-500/10 to-orange-600/10',
      featured: false
    }
    // Hook Up section hidden from published build
  ];

  return (
    <div className="min-h-screen bg-night">
      <div className="container mx-auto px-4 py-8 max-w-md pb-20 md:pb-28">{/* Increased padding to account for banner */}
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="flex items-center text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            {t.back}
          </Button>
          <SafeModeBadge />
        </div>

        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl font-playfair font-bold headline-flame mb-2">
            {t.title}
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-4">
          {sections.map((section, index) => {
            const Icon = section.icon;
            const isFeatured = section.featured;
            return (
              <button
                key={section.id}
                onClick={() => setSelectedSection(section.id)}
                className={`game-card text-left transition-all duration-300 group animate-fade-in w-full ${
                  isFeatured 
                    ? 'p-8 bg-gradient-to-br from-orange-500/20 via-rose-500/15 to-red-700/15 hover:shadow-2xl border-2 border-primary/50 relative overflow-hidden' 
                    : 'p-6 bg-gradient-to-br ' + section.bgGradient + ' hover:shadow-xl border border-border'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {isFeatured && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-rose-600 text-white text-xs px-3 py-1 rounded-full font-semibold animate-pulse">
                    ⭐ FEATURED
                  </div>
                )}
                <div className="flex items-start space-x-4">
                  <div className={`${isFeatured ? 'p-4' : 'p-3'} rounded-full bg-gradient-to-r ${section.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`${isFeatured ? 'w-8 h-8' : 'w-6 h-6'} text-white`} />
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold text-foreground mb-1 group-hover:text-accent transition-colors ${
                      isFeatured ? 'text-xl' : 'text-lg'
                    }`}>
                      {section.title}
                    </h3>
                    <p className={`text-muted-foreground leading-relaxed ${isFeatured ? 'text-base' : 'text-sm'}`}>
                      {section.description}
                    </p>
                  </div>
                  <div className="text-muted-foreground group-hover:text-muted-foreground transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
      <BannerAd language={language} />
    </div>
  );
};

export default MainSections;
