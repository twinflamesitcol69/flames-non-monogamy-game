import { useState, useEffect } from 'react';
import { ArrowLeft, Users, Play, Crown, AlertTriangle, Trophy, Star, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Player, GameLevel, GameStep, PlayerSelection } from '@/types/kingdom';
import { activities } from '@/data/kingdomActivities';
import { badges } from '@/data/kingdomBadges';
import { selectPlayersForActivity, formatActivityText, requiresConsent } from '@/utils/playerSelection';
import { useAds } from '@/contexts/AdContext';
import BannerAd from '@/components/ads/BannerAd';
import RewardedAdModal from '@/components/ads/RewardedAdModal';
import { InterstitialAd } from '@/components/ads/InterstitialAd';
import { DebugPanel } from '@/components/DebugPanel';
import { SafeModeBadge } from '@/components/SafeModeBadge';
import ConsentModal from '@/components/ConsentModal';

interface KingdomOfPleasureProps {
  language: 'pt' | 'es' | 'en';
  onBack: () => void;
}

const KingdomOfPleasure = ({ language, onBack }: KingdomOfPleasureProps) => {
  const [step, setStep] = useState<GameStep>('welcome');
  const [numPlayers, setNumPlayers] = useState<number>(2);
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentLevel, setCurrentLevel] = useState<GameLevel>(1);
  const [currentActivityIndex, setCurrentActivityIndex] = useState<number>(0);
  const [completedActivities, setCompletedActivities] = useState<number>(0);
  const [availableActivities, setAvailableActivities] = useState<typeof activities>([]);
  const [currentPlayerSelection, setCurrentPlayerSelection] = useState<PlayerSelection>({});
  const [selectedBadge, setSelectedBadge] = useState<typeof badges[0] | null>(null);
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [pendingPlayers, setPendingPlayers] = useState<[Player, Player] | null>(null);
  const [showRewardedModal, setShowRewardedModal] = useState(false);
  const [targetLevel, setTargetLevel] = useState<2 | 3>(2);
  const [showInterstitial, setShowInterstitial] = useState(false);
  const [feedback, setFeedback] = useState({
    rating: 0,
    favorite: '',
    suggestions: '',
    email: ''
  });
  const [rewardOpen, setRewardOpen] = useState(false);
  const [unlocked, setUnlocked] = useState<boolean>(() => localStorage.getItem("l2_unlocked") === "1");

  const requestUnlock = () => {
    if (!unlocked) setRewardOpen(true);
  };

  const handleReward = () => {
    setUnlocked(true);
    localStorage.setItem("l2_unlocked", "1");
  };

  const { adState, incrementCompletedDares, shouldShowInterstitial, logEvent, isAdsEnabled, unlockLevel } = useAds();

  // Load activities for current level and player count
  useEffect(() => {
    const levelActivities = activities.filter(activity => 
      activity.level === currentLevel && 
      activity.minPlayers <= numPlayers && 
      activity.maxPlayers >= numPlayers
    );
    setAvailableActivities(levelActivities);
    setCurrentActivityIndex(0);
    setCompletedActivities(0);
  }, [currentLevel, numPlayers]);

  // Select players for current activity
  useEffect(() => {
    if (availableActivities.length > 0 && players.length > 0) {
      const currentActivity = availableActivities[currentActivityIndex];
      const selection = selectPlayersForActivity(players, currentActivity);
      setCurrentPlayerSelection(selection);
    }
  }, [availableActivities, currentActivityIndex, players]);

  const translations = {
    pt: {
      title: 'Bem-vindo ao Seu Reino do Prazer',
      subtitle: 'Prepare-se para se entregar a uma noite de aventuras eróticas sob medida. Que o prazer comece!',
      setup: {
        title: 'Configuração do Jogo',
        numPlayers: 'Número de Jogadores:',
        playerName: 'Nome do Jogador',
        gender: 'Gênero',
        orientation: 'Orientação Sexual',
        genders: {
          male: 'Masculino',
          female: 'Feminino',
          nonbinary: 'Não-binário'
        },
        orientations: {
          heterosexual: 'Heterossexual',
          homosexual: 'Homossexual',
          bisexual: 'Bissexual',
          queer: 'Queer',
          heteroflexible: 'Heterofexível'
        },
        startGame: 'Começar o Jogo'
      },
      levelSelect: {
        title: 'Escolha Sua Intensidade',
        level1: {
          name: 'Aquecimento Sensual',
          description: 'Toque suave, conversas íntimas e construção de intimidade'
        },
        level2: {
          name: 'Desafios Brincalhões', 
          description: 'Jogos mais físicos explorando fantasias não-monogâmicas'
        },
        level3: {
          name: 'Exploração de Limites',
          description: 'Intensidade máxima: explorando corajosamente seus limites'
        },
        warning: '⚠️ Lembrete de Segurança e Consentimento',
        warningText: 'O Nível 3 envolve atividades sexuais explícitas. Certifique-se de que todos os jogadores consentiram claramente e estabeleceram limites. Sempre respeitem o "não" e comuniquem-se abertamente.',
        continue: 'Continuar'
      },
      game: {
        done: 'Feito ✅',
        skip: 'Pular ↩️',
        nextLevel: 'Quer jogar o próximo nível?',
        yes: 'Sim',
        no: 'Não',
        endGame: 'Finalizar Jogo'
      },
      celebration: {
        title: '🎉 Parabéns! 🎉',
        message: 'Vocês completaram uma jornada incrível!',
        continue: 'Continuar'
      },
      award: {
        title: '🏆 Conquista Desbloqueada! 🏆',
        continue: 'Continuar'
      },
      feedback: {
        title: 'Como foi a experiência?',
        rating: 'Avalie a sessão (1-5 estrelas)',
        favorite: 'Qual foi a parte favorita?',
        suggestions: 'Sugestões de melhoria',
        email: 'Email para atualizações (opcional)',
        submit: 'Enviar Feedback'
      },
      complete: {
        title: 'Obrigado pelo Feedback!',
        playAgain: 'Jogar Novamente',
        exit: 'Sair'
      }
    },
    es: {
      title: 'Bienvenido a Tu Reino del Placer',
      subtitle: '¡Prepárate para entregarte a una noche de aventuras eróticas a medida. Que comience el placer!',
      setup: {
        title: 'Configuración del Juego',
        numPlayers: 'Número de Jugadores:',
        playerName: 'Nombre del Jugador',
        gender: 'Género',
        orientation: 'Orientación Sexual',
        genders: {
          male: 'Masculino',
          female: 'Femenino',
          nonbinary: 'No-binario'
        },
        orientations: {
          heterosexual: 'Heterosexual',
          homosexual: 'Homosexual', 
          bisexual: 'Bisexual',
          queer: 'Queer',
          heteroflexible: 'Heteroflexível'
        },
        startGame: 'Comenzar el Juego'
      },
      levelSelect: {
        title: 'Elige Tu Intensidad',
        level1: {
          name: 'Calentamiento Sensual',
          description: 'Toque suave, conversaciones íntimas y construcción de intimidad'
        },
        level2: {
          name: 'Desafíos Juguetones',
          description: 'Juegos más físicos explorando fantasías no-monógamas'
        },
        level3: {
          name: 'Exploración de Límites',
          description: 'Intensidad máxima: explorando valientemente tus límites'
        },
        warning: '⚠️ Recordatorio de Seguridad y Consentimiento',
        warningText: 'El Nivel 3 involucra actividades sexuales explícitas. Asegúrense de que todos los jugadores hayan consentido claramente y establecido límites. Siempre respeten el "no" y comuníquense abiertamente.',
        continue: 'Continuar'
      },
      game: {
        done: 'Hecho ✅',
        skip: 'Omitir ↩️',
        nextLevel: '¿Quieren jugar el siguiente nivel?',
        yes: 'Sí',
        no: 'No',
        endGame: 'Finalizar Juego'
      },
      celebration: {
        title: '🎉 ¡Felicidades! 🎉',
        message: '¡Han completado un viaje increíble!',
        continue: 'Continuar'
      },
      award: {
        title: '🏆 ¡Logro Desbloqueado! 🏆',
        continue: 'Continuar'
      },
      feedback: {
        title: '¿Cómo fue la experiencia?',
        rating: 'Califica la sesión (1-5 estrellas)',
        favorite: '¿Cuál fue tu parte favorita?',
        suggestions: 'Sugerencias de mejora',
        email: 'Email para actualizaciones (opcional)',
        submit: 'Enviar Comentario'
      },
      complete: {
        title: '¡Gracias por tu Comentario!',
        playAgain: 'Jugar de Nuevo',
        exit: 'Salir'
      }
    },
    en: {
      title: 'Welcome to Your Kingdom of Pleasure',
      subtitle: 'Prepare to surrender to a night of tailored erotic adventures. Let the pleasure begin!',
      setup: {
        title: 'Game Setup',
        numPlayers: 'Number of Players:',
        playerName: 'Player Name',
        gender: 'Gender',
        orientation: 'Sexual Orientation',
        genders: {
          male: 'Male',
          female: 'Female',
          nonbinary: 'Non-binary'
        },
        orientations: {
          heterosexual: 'Heterosexual',
          homosexual: 'Homosexual',
          bisexual: 'Bisexual',
          queer: 'Queer',
          heteroflexible: 'Heteroflexible'
        },
        startGame: 'Start Game'
      },
      levelSelect: {
        title: 'Choose Your Intensity',
        level1: {
          name: 'Sensual Warm-up',
          description: 'Gentle touch, intimate conversations and building intimacy'
        },
        level2: {
          name: 'Playful Challenges',
          description: 'More physical games exploring non-monogamous fantasies'
        },
        level3: {
          name: 'Limits Exploration',
          description: 'Maximum intensity: courageously exploring your boundaries'
        },
        warning: '⚠️ Safety and Consent Reminder',
        warningText: 'Level 3 involves explicit sexual activities. Make sure all players have clearly consented and established boundaries. Always respect "no" and communicate openly.',
        continue: 'Continue'
      },
      game: {
        done: 'Done ✅',
        skip: 'Skip ↩️',
        nextLevel: 'Want to play the next level?',
        yes: 'Yes',
        no: 'No',
        endGame: 'End Game'
      },
      celebration: {
        title: '🎉 Congratulations! 🎉',
        message: 'You have completed an incredible journey!',
        continue: 'Continue'
      },
      award: {
        title: '🏆 Achievement Unlocked! 🏆',
        continue: 'Continue'
      },
      feedback: {
        title: 'How was the experience?',
        rating: 'Rate the session (1-5 stars)',
        favorite: 'What was your favorite part?',
        suggestions: 'Suggestions for improvement',
        email: 'Email for updates (optional)',
        submit: 'Submit Feedback'
      },
      complete: {
        title: 'Thank you for your feedback!',
        playAgain: 'Play Again',
        exit: 'Exit'
      }
    }
  };

  const t = translations[language];

  const setupPlayers = () => {
    const newPlayers = Array.from({ length: numPlayers }, () => ({
      name: '',
      gender: 'male' as const,
      orientation: 'heterosexual' as const
    }));
    setPlayers(newPlayers);
    setStep('setup');
  };

  const nextActivity = () => {
    if (availableActivities.length === 0) return;
    
    const activity = availableActivities[currentActivityIndex];
    
    // Check if consent is needed for heteroflexible matches
    if (players.length === 2) {
      const [player1, player2] = players;
      if (requiresConsent(player1, player2)) {
        setPendingPlayers([player1, player2]);
        setShowConsentModal(true);
        return;
      }
    }
    
    const selection = selectPlayersForActivity(players, activity);
    setCurrentPlayerSelection(selection);
    setCompletedActivities(prev => prev + 1);
    
    if (currentActivityIndex < availableActivities.length - 1) {
      setCurrentActivityIndex(prev => prev + 1);
    } else {
      completeLevel();
    }
  };

  const completeLevel = () => {
    if (currentLevel === 3) {
      const randomBadge = badges[Math.floor(Math.random() * badges.length)];
      setSelectedBadge(randomBadge);
      setStep('game-complete');
    } else {
      setStep('level-complete');
    }
  };

  const updatePlayer = (index: number, field: keyof Player, value: string) => {
    const updatedPlayers = [...players];
    updatedPlayers[index] = { ...updatedPlayers[index], [field]: value };
    setPlayers(updatedPlayers);
  };

  const handleConsentConfirm = () => {
    setShowConsentModal(false);
    if (availableActivities.length > 0) {
      const activity = availableActivities[currentActivityIndex];
      const selection = selectPlayersForActivity(players, activity);
      setCurrentPlayerSelection(selection);
      setCompletedActivities(prev => prev + 1);
      
      if (currentActivityIndex < availableActivities.length - 1) {
        setCurrentActivityIndex(prev => prev + 1);
      } else {
        completeLevel();
      }
    }
    setPendingPlayers(null);
  };

  const handleConsentReject = () => {
    setShowConsentModal(false);
    setTimeout(() => {
      if (availableActivities.length > 0) {
        const activity = availableActivities[currentActivityIndex];
        const selection = selectPlayersForActivity(players, activity);
        setCurrentPlayerSelection(selection);
        setCompletedActivities(prev => prev + 1);
        
        if (currentActivityIndex < availableActivities.length - 1) {
          setCurrentActivityIndex(prev => prev + 1);
        } else {
          completeLevel();
        }
      }
    }, 100);
    setPendingPlayers(null);
  };

  const startLevelSelection = () => {
    if (players.every(p => p.name && p.gender && p.orientation)) {
      setStep('level-select');
    }
  };

  const selectLevel = (level: GameLevel) => {
    console.log('selectLevel called', { level, unlockedL2: adState.unlockedL2, unlockedL3: adState.unlockedL3, adsEnabled: isAdsEnabled() });
    
    // If ads are disabled, allow free access to all levels
    if (!isAdsEnabled()) {
      console.log('Ads disabled, allowing free access to level', level);
      setCurrentLevel(level);
      setStep('playing');
      return;
    }
    
    // Check if level requires rewarded ad unlock
    if (level === 2 && !adState.unlockedL2) {
      console.log('Showing rewarded modal for L2');
      setTargetLevel(2);
      setShowRewardedModal(true);
      logEvent('attempt_enter_L2');
      return;
    }
    
    if (level === 3 && !adState.unlockedL3) {
      console.log('Showing rewarded modal for L3');
      setTargetLevel(3);
      setShowRewardedModal(true);
      logEvent('attempt_enter_L3');
      return;
    }
    
    console.log('Level already unlocked, proceeding to game');
    setCurrentLevel(level);
    setStep('playing');
  };

  const handleActivityComplete = () => {
    const newCompleted = completedActivities + 1;
    setCompletedActivities(newCompleted);
    
    // Increment completed dares for interstitial tracking (Level 3 only)
    if (currentLevel === 3) {
      incrementCompletedDares();
      
      // Check if should show interstitial ad
      if (shouldShowInterstitial()) {
        setShowInterstitial(true);
        return; // Don't proceed until interstitial is closed
      }
    }
    
    // Move to next activity
    const nextIndex = (currentActivityIndex + 1) % availableActivities.length;
    setCurrentActivityIndex(nextIndex);

    // Check if level is complete
    if (newCompleted >= 3) {
      if (currentLevel === 3) {
        // End game
        const randomBadge = badges[Math.floor(Math.random() * badges.length)];
        setSelectedBadge(randomBadge);
        setStep('game-complete');
      } else {
        // Level complete
        setStep('level-complete');
      }
    }
  };

  const handleInterstitialClose = () => {
    setShowInterstitial(false);
    
    // Continue with normal flow after interstitial
    const nextIndex = (currentActivityIndex + 1) % availableActivities.length;
    setCurrentActivityIndex(nextIndex);

    const newCompleted = completedActivities + 1;
    if (newCompleted >= 3) {
      if (currentLevel === 3) {
        const randomBadge = badges[Math.floor(Math.random() * badges.length)];
        setSelectedBadge(randomBadge);
        setStep('game-complete');
      } else {
        setStep('level-complete');
      }
    }
  };

  const handleRewardedSuccess = () => {
  console.log('handleRewardedSuccess called', { targetLevel });
  unlockLevel(targetLevel);                 // ⬅️ aggiorna il contesto (L2/L3 sbloccati)
  setShowRewardedModal(false);              // ⬅️ chiudi overlay per evitare “doppi click”
  setCurrentLevel(targetLevel);
  setStep('playing');
};

  const skipActivity = () => {
    const nextIndex = (currentActivityIndex + 1) % availableActivities.length;
    setCurrentActivityIndex(nextIndex);
  };

  const nextLevel = () => {
    if (currentLevel < 3) {
      setCurrentLevel((prev) => (prev + 1) as GameLevel);
      setStep('level-select');
    }
  };

  const continueCurrentLevel = () => {
    setStep('playing');
  };

  const submitFeedback = () => {
    console.log('Feedback submitted:', feedback);
    setStep('feedback');
  };

  const restartGame = () => {
    setStep('welcome');
    setCurrentLevel(1);
    setCompletedActivities(0);
    setCurrentActivityIndex(0);
    setSelectedBadge(null);
    setFeedback({ rating: 0, favorite: '', suggestions: '', email: '' });
  };

  if (step === 'welcome') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
        <div className="container mx-auto px-4 py-8 max-w-md pb-20 md:pb-28">{/* Account for banner */}
          <div className="flex items-center justify-between mb-8">
            <Button
              variant="ghost"
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
            </Button>
            <SafeModeBadge />
          </div>

          <div className="text-center mb-8 animate-fade-in">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mb-6 animate-float">
              <Crown className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-playfair font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              {t.title}
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed mb-8">
              {t.subtitle}
            </p>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-purple-200 mb-8">
              <div className="flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-purple-500 mr-2" />
                <span className="font-medium text-gray-800">{t.setup.numPlayers}</span>
              </div>
              <div className="flex justify-center space-x-4 mb-6">
                {[2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                  <button
                    key={num}
                    onClick={() => setNumPlayers(num)}
                    className={`w-10 h-10 rounded-full border-2 transition-all duration-300 text-sm ${
                      numPlayers === num
                        ? 'border-purple-500 bg-purple-50 text-purple-700'
                        : 'border-gray-300 text-gray-600 hover:border-purple-300'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
              <Button onClick={setupPlayers} className="w-full btn-romantic">
                {t.setup.startGame}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'setup') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
        <div className="container mx-auto px-4 py-8 max-w-md pb-20 md:pb-28">{/* Account for banner */}
          <div className="flex items-center justify-between mb-8">
            <Button
              variant="ghost"
              onClick={() => setStep('welcome')}
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
            </Button>
            <h2 className="font-playfair font-semibold text-lg text-gray-800">
              {t.setup.title}
            </h2>
            <div className="w-16"></div>
          </div>

          <div className="space-y-4">
            {players.map((player, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-purple-200">
                <h3 className="font-semibold text-gray-800 mb-4">
                  {t.setup.playerName} {index + 1}
                </h3>
                <div className="space-y-4">
                  <Input
                    placeholder={t.setup.playerName}
                    value={player.name}
                    onChange={(e) => updatePlayer(index, 'name', e.target.value)}
                  />
                  <Select onValueChange={(value) => updatePlayer(index, 'gender', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder={t.setup.gender} />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(t.setup.genders).map(([key, label]) => (
                        <SelectItem key={key} value={key}>{label as string}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select onValueChange={(value) => updatePlayer(index, 'orientation', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder={t.setup.orientation} />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(t.setup.orientations).map(([key, label]) => (
                        <SelectItem key={key} value={key}>{label as string}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ))}

            <Button
              onClick={startLevelSelection}
              disabled={!players.every(p => p.name && p.gender && p.orientation)}
              className="w-full btn-romantic flex items-center justify-center space-x-2"
            >
              <Play className="w-4 h-4" />
              <span>{t.setup.startGame}</span>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'level-select') {
    const levels = [
      {
        id: 1 as GameLevel,
        name: t.levelSelect.level1.name,
        description: t.levelSelect.level1.description,
        gradient: 'from-green-400 to-blue-500',
        bgGradient: 'from-green-50 to-blue-50'
      },
      {
        id: 2 as GameLevel,
        name: t.levelSelect.level2.name,
        description: t.levelSelect.level2.description,
        gradient: 'from-orange-400 to-red-500',
        bgGradient: 'from-orange-50 to-red-50'
      },
      {
        id: 3 as GameLevel,
        name: t.levelSelect.level3.name,
        description: t.levelSelect.level3.description,
        gradient: 'from-red-400 to-purple-500',
        bgGradient: 'from-red-50 to-purple-50'
      }
    ];

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
        <div className="container mx-auto px-4 py-8 max-w-md pb-20 md:pb-28">{/* Account for banner */}
          <div className="flex items-center justify-between mb-8">
            <Button
              variant="ghost"
              onClick={() => setStep('setup')}
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
            </Button>
            <h2 className="font-playfair font-semibold text-lg text-gray-800">
              {t.levelSelect.title}
            </h2>
            <SafeModeBadge />
          </div>

          <div className="space-y-4 mb-8">
            {levels.map((level, index) => (
              <button
                key={level.id}
                onClick={() => selectLevel(level.id)}
                className={`game-card p-6 text-left bg-gradient-to-br ${level.bgGradient} hover:shadow-xl transition-all duration-300 group animate-fade-in w-full`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-full bg-gradient-to-r ${level.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-white text-xl font-bold">{level.id}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 text-lg mb-1 group-hover:text-gray-900 transition-colors">
                      {level.name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {level.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {currentLevel === 3 && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-red-800 mb-2">{t.levelSelect.warning}</h4>
                  <p className="text-red-700 text-sm leading-relaxed">
                    {t.levelSelect.warningText}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (step === 'playing') {
    const currentActivity = availableActivities[currentActivityIndex];
    const formattedText = currentActivity ? formatActivityText(currentActivity.id, currentPlayerSelection, language) : '';

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
        <div className="container mx-auto px-4 py-8 max-w-md pb-20 md:pb-28">{/* Account for banner */}
          <div className="flex items-center justify-between mb-8">
            <Button
              variant="ghost"
              onClick={() => setStep('level-select')}
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
            </Button>
            <div className="text-center">
              <h2 className="font-playfair font-semibold text-lg text-gray-800">
                {language === 'es' ? 'Nivel' : language === 'en' ? 'Level' : 'Nível'} {currentLevel}
              </h2>
              <p className="text-xs text-gray-500">
                {completedActivities} {language === 'es' ? 'completadas' : language === 'en' ? 'completed' : 'completadas'}
              </p>
            </div>
            <div className="w-16"></div>
          </div>

          {currentActivity && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-8 shadow-xl border border-purple-200 animate-scale-in">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mb-4">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                </div>
                <p className="text-lg leading-relaxed text-gray-800 text-center font-medium mb-6">
                  {formattedText}
                </p>
                <div className="flex space-x-3">
                  <Button onClick={handleActivityComplete} className="flex-1 btn-romantic">
                    {t.game.done}
                  </Button>
                  <Button onClick={skipActivity} variant="outline" className="flex-1">
                    {t.game.skip}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (step === 'level-complete') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 flex items-center justify-center">
        <div className="container mx-auto px-4 py-8 max-w-md text-center">
          <div className="animate-scale-in">
            <div className="text-6xl mb-6 animate-float">🎉</div>
            <h1 className="text-3xl font-playfair font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              {t.celebration.title}
            </h1>
            <p className="text-xl text-gray-700 mb-8 font-medium">
              {t.celebration.message}
            </p>
            
            <div className="bg-white rounded-xl p-6 shadow-lg border border-purple-200 mb-8">
              <p className="text-lg text-gray-800 mb-4">
                {t.game.nextLevel}
              </p>
              <div className="flex space-x-4">
                <Button onClick={nextLevel} className="flex-1 btn-romantic">
                  {t.game.yes}
                </Button>
                <Button onClick={continueCurrentLevel} variant="outline" className="flex-1">
                  {t.game.no}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'game-complete' && selectedBadge) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 flex items-center justify-center">
        <div className="container mx-auto px-4 py-8 max-w-md text-center">
          <div className="animate-scale-in">
            <h1 className="text-3xl font-playfair font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-8">
              {t.award.title}
            </h1>
            
            <div className="bg-white rounded-xl p-8 shadow-xl border border-purple-200 mb-8">
              <div className="text-6xl mb-4 animate-float">
                {selectedBadge.icon}
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {selectedBadge.name}
              </h2>
              <p className="text-gray-600 italic">
                {selectedBadge.description}
              </p>
            </div>

            <Button 
              onClick={() => setStep('feedback')} 
              className="btn-romantic text-lg px-8 py-4 h-auto"
            >
              {t.award.continue}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'feedback') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
        <div className="container mx-auto px-4 py-8 max-w-md pb-20 md:pb-28">{/* Account for banner */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-playfair font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              {t.feedback.title}
            </h1>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-purple-200 space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-3">
                {t.feedback.rating}
              </label>
              <div className="flex justify-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setFeedback(prev => ({ ...prev, rating: star }))}
                    className={`w-10 h-10 rounded-full transition-colors ${
                      star <= feedback.rating
                        ? 'text-yellow-500'
                        : 'text-gray-300 hover:text-yellow-400'
                    }`}
                  >
                    <Star className="w-8 h-8" fill={star <= feedback.rating ? 'currentColor' : 'none'} />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                {t.feedback.favorite}
              </label>
              <Textarea
                value={feedback.favorite}
                onChange={(e) => setFeedback(prev => ({ ...prev, favorite: e.target.value }))}
                placeholder="..."
                rows={3}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                {t.feedback.suggestions}
              </label>
              <Textarea
                value={feedback.suggestions}
                onChange={(e) => setFeedback(prev => ({ ...prev, suggestions: e.target.value }))}
                placeholder="..."
                rows={3}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                {t.feedback.email}
              </label>
              <Input
                type="email"
                value={feedback.email}
                onChange={(e) => setFeedback(prev => ({ ...prev, email: e.target.value }))}
                placeholder="exemplo@email.com"
              />
            </div>

            <Button 
              onClick={submitFeedback}
              className="w-full btn-romantic"
              disabled={feedback.rating === 0}
            >
              {t.feedback.submit}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Complete screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 flex items-center justify-center">
      <div className="container mx-auto px-4 py-8 max-w-md text-center">
        <div className="animate-scale-in">
          <div className="text-6xl mb-6">💖</div>
          <h1 className="text-3xl font-playfair font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            {t.complete.title}
          </h1>
          
          <div className="flex space-x-4">
            <Button 
              onClick={restartGame}
              className="flex-1 btn-romantic"
            >
              {t.complete.playAgain}
            </Button>
            <Button 
              onClick={onBack}
              variant="outline"
              className="flex-1"
            >
              {t.complete.exit}
            </Button>
          </div>
        </div>
      </div>

      <ConsentModal
        isOpen={showConsentModal}
        onConfirm={handleConsentConfirm}
        onReject={handleConsentReject}
        language={language}
      />
      
      <RewardedAdModal
        open={showRewardedModal}
        onClose={() => setShowRewardedModal(false)}
        onReward={handleRewardedSuccess}
      />
      
      <InterstitialAd
        isOpen={showInterstitial}
        onClose={handleInterstitialClose}
        language={language}
      />
      
      <DebugPanel
        currentStep={step}
        currentLevel={currentLevel}
        selectedPlayers={players}
        placeholderResolution={currentPlayerSelection}
        language={language}
      />
      
      <BannerAd />
    </div>
  );
};

export default KingdomOfPleasure;
