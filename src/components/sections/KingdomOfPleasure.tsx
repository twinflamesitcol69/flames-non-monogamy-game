
import { useState } from 'react';
import { ArrowLeft, Users, Play, MessageCircle, Trophy, Star, Sparkles, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface KingdomOfPleasureProps {
  language: 'pt' | 'es';
  onBack: () => void;
}

interface Player {
  name: string;
  gender: string;
  orientation: string;
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
}

const KingdomOfPleasure = ({ language, onBack }: KingdomOfPleasureProps) => {
  const [step, setStep] = useState<'welcome' | 'setup' | 'playing' | 'celebration' | 'award' | 'feedback' | 'complete'>('welcome');
  const [numPlayers, setNumPlayers] = useState<number>(2);
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentActivity, setCurrentActivity] = useState<number>(0);
  const [completedActions, setCompletedActions] = useState<number>(0);
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [feedback, setFeedback] = useState({
    rating: 0,
    favorite: '',
    suggestions: '',
    email: ''
  });

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
          queer: 'Queer'
        },
        startGame: 'Começar o Jogo'
      },
      game: {
        title: 'Reino do Prazer',
        nextActivity: 'Próxima Atividade',
        askAI: 'Pedir cenário personalizado ao AI',
        enjoying: 'Vocês estão curtindo? Prontos para ir mais longe?',
        endGame: 'Finalizar Jogo',
        actionsCompleted: 'Ações completadas: {count}'
      },
      celebration: {
        title: '🎉 Parabéns! 🎉',
        message: 'Vocês completaram uma jornada incrível de prazer e descoberta!',
        subtitle: 'Que momento mágico vocês criaram juntos...',
        continue: 'Continuar'
      },
      award: {
        title: '🏆 Conquista Desbloqueada! 🏆',
        subtitle: 'Vocês ganharam uma medalha especial:',
        saveShare: 'Salvar & Compartilhar',
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
        message: 'Sua opinião nos ajuda a criar experiências ainda melhores.',
        newGame: 'Novo Jogo',
        exit: 'Sair'
      },
      badges: {
        pioneer: {
          name: 'Pioneiro do Prazer',
          description: 'Explorou novos territórios com coragem e paixão'
        },
        boundless: {
          name: 'Amante Sem Limites',
          description: 'Transcendeu barreiras e abraçou a liberdade'
        },
        flame: {
          name: 'Chama Ética',
          description: 'Combinou prazer com respeito e consentimento'
        },
        explorer: {
          name: 'Explorador Íntimo',
          description: 'Descobriu novos caminhos de conexão'
        },
        harmony: {
          name: 'Harmonia Sensual',
          description: 'Criou perfeito equilíbrio entre desejo e cuidado'
        }
      },
      activities: [
        '{player1}, sussurre sua fantasia mais íntima sobre outra pessoa no ouvido de {player2}.',
        '{player1}, remova lentamente uma peça de roupa de {player2} sem usar as mãos.',
        '{player2}, vendar os olhos de {player1} e use algo comestível para provocá-lo gentilmente.',
        'Representem um cenário onde {player1} descreve exatamente como adoraria assistir {player2} com outro parceiro.',
        '{player2}, tome o controle e guie as mãos de {player1} exatamente onde você quer, descrevendo a sensação vividamente.',
        'Descrevam abertamente um novo limite que gostariam de testar hoje. Discutam juntos se ambos se sentem confortáveis para explorar agora.'
      ]
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
          queer: 'Queer'
        },
        startGame: 'Comenzar el Juego'
      },
      game: {
        title: 'Reino del Placer',
        nextActivity: 'Siguiente Actividad',
        askAI: 'Pedir escenario personalizado al AI',
        enjoying: '¿Lo están disfrutando? ¿Listos para ir más lejos?',
        endGame: 'Finalizar Juego',
        actionsCompleted: 'Acciones completadas: {count}'
      },
      celebration: {
        title: '🎉 ¡Felicidades! 🎉',
        message: '¡Han completado un viaje increíble de placer y descubrimiento!',
        subtitle: 'Qué momento mágico han creado juntos...',
        continue: 'Continuar'
      },
      award: {
        title: '🏆 ¡Logro Desbloqueado! 🏆',
        subtitle: 'Han ganado una medalla especial:',
        saveShare: 'Guardar y Compartir',
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
        message: 'Tu opinión nos ayuda a crear experiencias aún mejores.',
        newGame: 'Nuevo Juego',
        exit: 'Salir'
      },
      badges: {
        pioneer: {
          name: 'Pionero del Placer',
          description: 'Exploró nuevos territorios con valor y pasión'
        },
        boundless: {
          name: 'Amante Sin Límites',
          description: 'Trascendió barreras y abrazó la libertad'
        },
        flame: {
          name: 'Llama Ética',
          description: 'Combinó placer con respeto y consentimiento'
        },
        explorer: {
          name: 'Explorador Íntimo',
          description: 'Descubrió nuevos caminos de conexión'
        },
        harmony: {
          name: 'Armonía Sensual',
          description: 'Creó perfecto equilibrio entre deseo y cuidado'
        }
      },
      activities: [
        '{player1}, susurra tu fantasía más íntima sobre otra persona al oído de {player2}.',
        '{player1}, quita lentamente una prenda de {player2} sin usar las manos.',
        '{player2}, venda los ojos de {player1} y usa algo comestible para provocarlo suavemente.',
        'Actúen un escenario donde {player1} describe exactamente cómo le encantaría ver a {player2} con otra pareja.',
        '{player2}, toma el control y guía las manos de {player1} exactamente donde quieres, describiendo la sensación vívidamente.',
        'Describan abiertamente un nuevo límite que les gustaría probar hoy. Discutan juntos si ambos se sienten cómodos explorándolo ahora.'
      ]
    }
  };

  const t = translations[language];

  const badges: Badge[] = [
    { id: 'pioneer', name: t.badges.pioneer.name, description: t.badges.pioneer.description, icon: Sparkles },
    { id: 'boundless', name: t.badges.boundless.name, description: t.badges.boundless.description, icon: Star },
    { id: 'flame', name: t.badges.flame.name, description: t.badges.flame.description, icon: Trophy },
    { id: 'explorer', name: t.badges.explorer.name, description: t.badges.explorer.description, icon: Play },
    { id: 'harmony', name: t.badges.harmony.name, description: t.badges.harmony.description, icon: Gift }
  ];

  const setupPlayers = () => {
    const newPlayers = Array.from({ length: numPlayers }, () => ({
      name: '',
      gender: '',
      orientation: ''
    }));
    setPlayers(newPlayers);
    setStep('setup');
  };

  const updatePlayer = (index: number, field: keyof Player, value: string) => {
    const updatedPlayers = [...players];
    updatedPlayers[index] = { ...updatedPlayers[index], [field]: value };
    setPlayers(updatedPlayers);
  };

  const startGame = () => {
    if (players.every(p => p.name && p.gender && p.orientation)) {
      setStep('playing');
    }
  };

  const getCurrentActivity = () => {
    const activity = t.activities[currentActivity];
    const playerNames = players.map(p => p.name);
    
    return activity
      .replace('{player1}', playerNames[0] || 'Jogador 1')
      .replace('{player2}', playerNames[1] || 'Jogador 2');
  };

  const nextActivity = () => {
    setCurrentActivity((prev) => (prev + 1) % t.activities.length);
    setCompletedActions(prev => prev + 1);
  };

  const endGame = () => {
    setStep('celebration');
    // Select random badge
    const randomBadge = badges[Math.floor(Math.random() * badges.length)];
    setSelectedBadge(randomBadge);
  };

  const submitFeedback = () => {
    console.log('Feedback submitted:', feedback);
    setStep('complete');
  };

  const startNewGame = () => {
    setStep('welcome');
    setCurrentActivity(0);
    setCompletedActions(0);
    setSelectedBadge(null);
    setFeedback({ rating: 0, favorite: '', suggestions: '', email: '' });
  };

  if (step === 'welcome') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
        <div className="container mx-auto px-4 py-8 max-w-md">
          <div className="flex items-center justify-between mb-8">
            <Button
              variant="ghost"
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
            </Button>
          </div>

          <div className="text-center mb-8 animate-fade-in">
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
                {[2, 3, 4].map(num => (
                  <button
                    key={num}
                    onClick={() => setNumPlayers(num)}
                    className={`w-12 h-12 rounded-full border-2 transition-all duration-300 ${
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
        <div className="container mx-auto px-4 py-8 max-w-md">
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

          <div className="space-y-6">
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
                        <SelectItem key={key} value={key}>{label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select onValueChange={(value) => updatePlayer(index, 'orientation', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder={t.setup.orientation} />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(t.setup.orientations).map(([key, label]) => (
                        <SelectItem key={key} value={key}>{label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ))}

            <Button
              onClick={startGame}
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

  if (step === 'playing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
        <div className="container mx-auto px-4 py-8 max-w-md">
          <div className="flex items-center justify-between mb-8">
            <Button
              variant="ghost"
              onClick={() => setStep('setup')}
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
            </Button>
            <h2 className="font-playfair font-semibold text-lg text-gray-800">
              {t.game.title}
            </h2>
            <div className="w-16"></div>
          </div>

          <div className="space-y-6">
            {/* Progress indicator */}
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-3 border border-purple-200">
              <p className="text-sm text-gray-600 text-center">
                {t.game.actionsCompleted.replace('{count}', completedActions.toString())}
              </p>
            </div>

            {/* Current Activity */}
            <div className="bg-white rounded-xl p-8 shadow-xl border border-purple-200 animate-scale-in">
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mb-4">
                  <Play className="w-8 h-8 text-white" />
                </div>
              </div>
              <p className="text-lg leading-relaxed text-gray-800 text-center font-medium mb-6">
                {getCurrentActivity()}
              </p>
              <div className="flex space-x-3 mb-4">
                <Button onClick={nextActivity} className="flex-1 btn-romantic">
                  {t.game.nextActivity}
                </Button>
                <Button variant="outline" className="flex items-center space-x-2">
                  <MessageCircle className="w-4 h-4" />
                  <span className="hidden sm:inline">{t.game.askAI}</span>
                </Button>
              </div>
              
              {/* End Game Button - appears after 5 actions */}
              {completedActions >= 5 && (
                <Button 
                  onClick={endGame}
                  variant="outline"
                  className="w-full mt-4 border-rose-300 hover:bg-rose-50 text-rose-700"
                >
                  {t.game.endGame}
                </Button>
              )}
            </div>

            {/* Feedback */}
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-purple-200">
              <p className="text-sm text-gray-600 text-center">
                💫 {t.game.enjoying}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'celebration') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 flex items-center justify-center">
        <div className="container mx-auto px-4 py-8 max-w-md text-center">
          <div className="animate-scale-in">
            <div className="text-8xl mb-6 animate-float">🎆</div>
            <h1 className="text-4xl font-playfair font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              {t.celebration.title}
            </h1>
            <p className="text-xl text-gray-700 mb-4 font-medium">
              {t.celebration.message}
            </p>
            <p className="text-gray-600 mb-8 italic">
              {t.celebration.subtitle}
            </p>
            <Button 
              onClick={() => setStep('award')} 
              className="btn-romantic text-lg px-8 py-4 h-auto"
            >
              {t.celebration.continue}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'award' && selectedBadge) {
    const BadgeIcon = selectedBadge.icon;
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 flex items-center justify-center">
        <div className="container mx-auto px-4 py-8 max-w-md text-center">
          <div className="animate-scale-in">
            <h1 className="text-3xl font-playfair font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              {t.award.title}
            </h1>
            <p className="text-gray-600 mb-8">
              {t.award.subtitle}
            </p>
            
            <div className="bg-white rounded-xl p-8 shadow-xl border border-purple-200 mb-8">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mb-4 animate-float">
                <BadgeIcon className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {selectedBadge.name}
              </h2>
              <p className="text-gray-600 italic">
                {selectedBadge.description}
              </p>
            </div>

            <div className="flex space-x-4">
              <Button variant="outline" className="flex-1">
                {t.award.saveShare}
              </Button>
              <Button 
                onClick={() => setStep('feedback')} 
                className="flex-1 btn-romantic"
              >
                {t.award.continue}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'feedback') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
        <div className="container mx-auto px-4 py-8 max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-playfair font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              {t.feedback.title}
            </h1>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-purple-200 space-y-6">
            {/* Rating */}
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

            {/* Favorite part */}
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

            {/* Suggestions */}
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

            {/* Email */}
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

  if (step === 'complete') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 flex items-center justify-center">
        <div className="container mx-auto px-4 py-8 max-w-md text-center">
          <div className="animate-scale-in">
            <div className="text-6xl mb-6">💖</div>
            <h1 className="text-3xl font-playfair font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              {t.complete.title}
            </h1>
            <p className="text-gray-600 mb-8">
              {t.complete.message}
            </p>
            
            <div className="flex space-x-4">
              <Button 
                onClick={startNewGame}
                className="flex-1 btn-romantic"
              >
                {t.complete.newGame}
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
      </div>
    );
  }

  // Fallback
  return null;
};

export default KingdomOfPleasure;
