
import { useState } from 'react';
import { ArrowLeft, RotateCcw, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { gameData } from '@/data/gameData';

interface GameCardProps {
  category: string;
  onBack: () => void;
}

const GameCard = ({ category, onBack }: GameCardProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  
  const categoryData = gameData[category] || gameData.conversation;
  const currentCard = categoryData.questions[currentIndex];

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % categoryData.questions.length);
    setShowAnswer(false);
  };

  const previousCard = () => {
    setCurrentIndex((prev) => (prev - 1 + categoryData.questions.length) % categoryData.questions.length);
    setShowAnswer(false);
  };

  return (
    <div className="min-h-screen bg-night p-4">
      <div className="container mx-auto max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="flex items-center text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>
          <div className="text-center">
            <h2 className="font-playfair font-semibold text-lg text-foreground">
              {categoryData.title}
            </h2>
            <p className="text-xs text-muted-foreground">
              {currentIndex + 1} of {categoryData.questions.length}
            </p>
          </div>
          <Button
            variant="ghost"
            onClick={() => setCurrentIndex(Math.floor(Math.random() * categoryData.questions.length))}
            className="text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="w-5 h-5" />
          </Button>
        </div>

        {/* Card */}
        <div className="game-card p-8 mb-8 min-h-[400px] flex flex-col justify-center animate-scale-in">
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto ember-icon rounded-full flex items-center justify-center mb-4">
              <Heart className="w-8 h-8 text-white" fill="currentColor" />
            </div>
            <div className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
              {currentCard.type}
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <p className="text-lg leading-relaxed text-foreground text-center font-medium">
              {currentCard.text}
            </p>
          </div>

          {currentCard.hint && (
            <div className="mt-6 p-4 bg-rose-50 rounded-lg border border-border">
              <p className="text-sm text-muted-foreground text-center">
                <span className="font-medium text-primary">Hint:</span> {currentCard.hint}
              </p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={previousCard}
            className="px-6 py-3 rounded-full"
          >
            Previous
          </Button>
          
          <div className="flex space-x-2">
            {[...Array(Math.min(5, categoryData.questions.length))].map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === currentIndex % 5 ? 'bg-rose-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <Button
            onClick={nextCard}
            className="btn-romantic px-6 py-3"
          >
            Next
          </Button>
        </div>

        {/* Tips */}
        <div className="mt-8 p-4 bg-card/70 backdrop-blur-sm rounded-xl border border-border">
          <p className="text-xs text-muted-foreground text-center">
            💡 Take your time with each question. The goal is connection, not speed!
          </p>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
