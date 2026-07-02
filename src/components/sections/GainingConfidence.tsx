
import { useState } from 'react';
import { ArrowLeft, MessageCircle, Book, Users, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface GainingConfidenceProps {
  language: 'pt' | 'es' | 'en';
  onBack: () => void;
}

const GainingConfidence = ({ language, onBack }: GainingConfidenceProps) => {
  const [userQuestion, setUserQuestion] = useState('');
  const [conversation, setConversation] = useState<Array<{role: 'user' | 'assistant', content: string}>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const translations = {
    pt: {
      title: 'Ganhando Confiança',
      subtitle: 'Educação sobre não-monogamia ética',
      placeholder: 'Faça sua pergunta sobre não-monogamia ética...',
      askButton: 'Perguntar ao AI',
      topics: {
        basics: 'Básicos da Não-Monogamia',
        jealousy: 'Lidando com Ciúmes',
        communication: 'Comunicação Efetiva',
        boundaries: 'Estabelecendo Limites'
      },
      examples: [
        'Como começar uma conversa sobre não-monogamia com meu parceiro?',
        'É normal sentir ciúmes mesmo escolhendo a não-monogamia?',
        'Quais são os diferentes tipos de relacionamentos não-monógamos?',
        'Como estabelecer regras e limites saudáveis?'
      ]
    },
    es: {
      title: 'Ganando Confianza',
      subtitle: 'Educación sobre no-monogamia ética',
      placeholder: 'Haz tu pregunta sobre no-monogamia ética...',
      askButton: 'Preguntar al AI',
      topics: {
        basics: 'Básicos de la No-Monogamia',
        jealousy: 'Manejando los Celos',
        communication: 'Comunicación Efectiva',
        boundaries: 'Estableciendo Límites'
      },
      examples: [
        '¿Cómo empezar una conversación sobre no-monogamia con mi pareja?',
        '¿Es normal sentir celos aun eligiendo la no-monogamia?',
        '¿Cuáles son los diferentes tipos de relaciones no-monógamas?',
        '¿Cómo establecer reglas y límites saludables?'
      ]
    },
    en: {
      title: 'Gaining Confidence',
      subtitle: 'Education about ethical non-monogamy',
      placeholder: 'Ask your question about ethical non-monogamy...',
      askButton: 'Ask AI',
      topics: {
        basics: 'Non-Monogamy Basics',
        jealousy: 'Managing Jealousy',
        communication: 'Effective Communication',
        boundaries: 'Setting Boundaries'
      },
      examples: [
        'How to start a conversation about non-monogamy with my partner?',
        'Is it normal to feel jealous even when choosing non-monogamy?',
        'What are the different types of non-monogamous relationships?',
        'How to establish healthy rules and boundaries?'
      ]
    }
  };

  const t = translations[language];

  const handleAskAI = async () => {
    if (!userQuestion.trim()) return;

    setIsLoading(true);
    const newConversation = [...conversation, { role: 'user' as const, content: userQuestion }];
    
    // Simulate AI response (in a real app, this would call OpenAI API)
    setTimeout(() => {
      const response = language === 'pt' 
        ? `Baseado em "Sex at Dawn" e "The Ethical Slut", essa é uma excelente pergunta. A não-monogamia ética requer comunicação aberta e honesta. Por exemplo, muitos casais começam estabelecendo "regras de check-in" regulares onde discutem sentimentos e experiências. Uma história de sucesso comum é de casais que descobriram que explorar conexões com outras pessoas na verdade fortaleceu seu relacionamento principal através de maior comunicação e autoconhecimento.`
        : `Basado en "Sex at Dawn" y "The Ethical Slut", esa es una excelente pregunta. La no-monogamia ética requiere comunicación abierta y honesta. Por ejemplo, muchas parejas comienzan estableciendo "reglas de check-in" regulares donde discuten sentimientos y experiencias. Una historia de éxito común es de parejas que descubrieron que explorar conexiones con otras personas en realidad fortaleció su relación principal a través de mayor comunicación y autoconocimiento.`;
      
      setConversation([...newConversation, { role: 'assistant', content: response }]);
      setUserQuestion('');
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-night">
      <div className="container mx-auto px-4 py-8 max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="flex items-center text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
          </Button>
          <div className="text-center">
            <h2 className="font-playfair font-semibold text-lg text-foreground">
              {t.title}
            </h2>
          </div>
          <div className="w-16"></div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Quick Topics */}
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(t.topics).map(([key, topic]) => (
              <button
                key={key}
                onClick={() => setUserQuestion(t.examples[Object.keys(t.topics).indexOf(key)])}
                className="p-4 warm-card rounded-2xl shadow-sm border border-border hover:shadow-md transition-all duration-300 text-left"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <Book className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">{topic as string}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Conversation */}
          {conversation.length > 0 && (
            <div className="space-y-4 max-h-64 overflow-y-auto">
              {conversation.map((message, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl ${
                    message.role === 'user'
                      ? 'bg-primary/15 ml-4'
                      : 'bg-card mr-4 shadow-sm border border-border'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.role === 'assistant' && (
                      <MessageCircle className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    )}
                    <p className="text-sm text-foreground/90 leading-relaxed">
                      {message.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Input Section */}
          <div className="space-y-4">
            <Textarea
              placeholder={t.placeholder}
              value={userQuestion}
              onChange={(e) => setUserQuestion(e.target.value)}
              className="min-h-[100px] resize-none"
            />
            <Button
              onClick={handleAskAI}
              disabled={isLoading || !userQuestion.trim()}
              className="w-full btn-romantic"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Pensando...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Lightbulb className="w-4 h-4" />
                  <span>{t.askButton}</span>
                </div>
              )}
            </Button>
          </div>

          {/* Example Questions */}
          <div className="bg-card/70 backdrop-blur-sm rounded-xl p-4 border border-border">
            <p className="text-xs text-muted-foreground mb-3 font-medium">
              {language === 'pt' ? 'Perguntas exemplo:' : language === 'es' ? 'Preguntas ejemplo:' : 'Example questions:'}
            </p>
            <div className="space-y-2">
              {t.examples.map((example, index) => (
                <button
                  key={index}
                  onClick={() => setUserQuestion(example)}
                  className="block text-xs text-muted-foreground hover:text-accent transition-colors text-left w-full p-2 hover:bg-primary/10 rounded"
                >
                  • {example}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GainingConfidence;
