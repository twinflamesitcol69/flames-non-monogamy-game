
import { useState } from 'react';
import { ArrowLeft, Users, Play, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface KingdomOfPleasureProps {
  language: 'pt' | 'es';
  onBack: () => void;
}

interface Player {
  name: string;
  gender: string;
  orientation: string;
}

const KingdomOfPleasure = ({ language, onBack }: KingdomOfPleasureProps) => {
  const [step, setStep] = useState<'welcome' | 'setup' | 'playing'>('welcome');
  const [numPlayers, setNumPlayers] = useState<number>(2);
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentActivity, setCurrentActivity] = useState<number>(0);

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
        enjoying: 'Vocês estão curtindo? Prontos para ir mais longe?'
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
        enjoying: '¿Lo están disfrutando? ¿Listos para ir más lejos?'
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
            <div className="flex space-x-3">
              <Button onClick={nextActivity} className="flex-1 btn-romantic">
                {t.game.nextActivity}
              </Button>
              <Button variant="outline" className="flex items-center space-x-2">
                <MessageCircle className="w-4 h-4" />
                <span className="hidden sm:inline">{t.game.askAI}</span>
              </Button>
            </div>
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
};

export default KingdomOfPleasure;
