
import { useState } from 'react';
import { ArrowLeft, Users, Heart, Sparkles, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HookUpProps {
  language: 'pt' | 'es';
  onBack: () => void;
}

const HookUp = ({ language, onBack }: HookUpProps) => {
  const [playerType, setPlayerType] = useState<string | null>(null);
  const [selectedVibe, setSelectedVibe] = useState<string | null>(null);

  const translations = {
    pt: {
      title: 'Pronto para o Hook Up?',
      subtitle: 'Você tomou a decisão emocionante de explorar a não-monogamia ética. Vamos ajudá-lo a encontrar o caminho para sua próxima experiência emocionante!',
      step1: 'Passo 1: Quem está jogando?',
      step2: 'Passo 2: Qual é a vibe hoje?',
      playerTypes: {
        single: '🔥 Aventureiro Solteiro',
        couple: '💞 Casal Se Abrindo',
        group: '🌟 Grupo Procurando Mais'
      },
      vibes: {
        casual: 'Sexo Casual / Aventura de Uma Noite',
        threesome: 'Exploração de Ménage',
        group: 'Aventura de Sexo em Grupo',
        swinging: 'Swing / Festas do Lifestyle',
        cuckolding: 'Fantasia de Cuckolding / Hotwife',
        poly: 'Namoro Poliamor'
      },
      chatButton: 'Precisa de mais dicas? Chat com AI',
      back: 'Voltar'
    },
    es: {
      title: '¿Listo para el Hook Up?',
      subtitle: 'Has tomado la emocionante decisión de explorar la no-monogamia ética. ¡Ayudémoste a encontrar el camino hacia tu próxima experiencia emocionante!',
      step1: 'Paso 1: ¿Quién está jugando?',
      step2: 'Paso 2: ¿Cuál es tu vibe hoy?',
      playerTypes: {
        single: '🔥 Aventurero Soltero',
        couple: '💞 Pareja Abriéndose',
        group: '🌟 Grupo Buscando Más'
      },
      vibes: {
        casual: 'Sexo Casual / Aventura de Una Noche',
        threesome: 'Exploración de Trío',
        group: 'Aventura de Sexo Grupal',
        swinging: 'Swinging / Fiestas del Lifestyle',
        cuckolding: 'Fantasía de Cuckolding / Hotwife',
        poly: 'Citas Poliamorosas'
      },
      chatButton: '¿Necesitas más consejos? Chat con AI',
      back: 'Volver'
    }
  };

  const t = translations[language];

  const getGuidance = () => {
    if (!playerType || !selectedVibe) return null;

    const guidanceData = {
      pt: {
        single: {
          casual: {
            title: 'Dicas para Quebrar o Gelo:',
            content: 'Aproxime-se com confiança, mas casualmente. Elogie autenticamente—mencione algo específico que você realmente notou.',
            example: '"Oi, você tem uma energia incrível—não consegui resistir em vir até aqui. Posso me juntar a você?"'
          }
        },
        couple: {
          threesome: {
            title: 'Iniciadores de Conversa:',
            content: 'Notamos você do outro lado da sala e adoramos sua vibe. Interessado em conversar mais?',
            example: 'Sempre discutam limites claros antes. Use nossa lista rápida para ficarem alinhados.'
          }
        },
        group: {
          swinging: {
            title: 'Dicas para Eventos:',
            content: 'Cheguem juntos, socializem separadamente, reconectem-se regularmente para check-in emocional.',
            example: '"Apresentem-se abertamente: \'Estamos aqui procurando vibes divertidas esta noite—podemos nos juntar à conversa?\'"'
          }
        }
      },
      es: {
        single: {
          casual: {
            title: 'Consejos para Romper el Hielo:',
            content: 'Acércate con confianza pero casualmente. Halaga auténticamente—menciona algo específico que realmente notes.',
            example: '"Hola, tienes una energía increíble—no pude resistirme a venir. ¿Te importa si me uno?"'
          }
        },
        couple: {
          threesome: {
            title: 'Iniciadores de Conversación:',
            content: 'Te notamos desde el otro lado de la sala y nos encanta tu vibe. ¿Interesado en charlar más?',
            example: 'Siempre discutan límites claros de antemano. Usen nuestra lista rápida para mantenerse alineados.'
          }
        },
        group: {
          swinging: {
            title: 'Consejos para Eventos:',
            content: 'Lleguen juntos, socialicen por separado, reconéctense regularmente para check-in emocional.',
            example: 'Preséntense abiertamente: "Estamos aquí buscando vibes divertidos esta noche—¿podemos unirnos a su conversación?"'
          }
        }
      }
    };

    return guidanceData[language]?.[playerType]?.[selectedVibe];
  };

  const guidance = getGuidance();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-pink-50">
      <div className="container mx-auto px-4 py-8 max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            {t.back}
          </Button>
        </div>

        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl font-playfair font-bold bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent mb-4">
            {t.title}
          </h1>
          <p className="text-gray-600 text-sm leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Step 1: Player Type */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">{t.step1}</h3>
          <div className="space-y-3">
            {Object.entries(t.playerTypes).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setPlayerType(key)}
                className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                  playerType === key
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-200 bg-white hover:border-red-300'
                }`}
              >
                <span className="font-medium text-gray-800">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Vibe Selection */}
        {playerType && (
          <div className="mb-8 animate-fade-in">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{t.step2}</h3>
            <div className="space-y-3">
              {Object.entries(t.vibes).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setSelectedVibe(key)}
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                    selectedVibe === key
                      ? 'border-rose-500 bg-rose-50'
                      : 'border-gray-200 bg-white hover:border-rose-300'
                  }`}
                >
                  <span className="font-medium text-gray-800">{label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Guidance */}
        {guidance && (
          <div className="bg-white rounded-xl p-6 shadow-lg border border-rose-200 animate-scale-in">
            <h4 className="font-semibold text-gray-800 mb-3">{guidance.title}</h4>
            <p className="text-gray-700 mb-4 leading-relaxed">{guidance.content}</p>
            <div className="bg-rose-50 p-4 rounded-lg border border-rose-200 mb-4">
              <p className="text-sm text-gray-700 italic">
                <span className="font-medium text-rose-600">Exemplo:</span> {guidance.example}
              </p>
            </div>
            <Button className="w-full btn-romantic flex items-center justify-center space-x-2">
              <MessageCircle className="w-4 h-4" />
              <span>{t.chatButton}</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HookUp;
