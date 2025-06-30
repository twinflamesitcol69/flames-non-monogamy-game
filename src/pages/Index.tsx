
import { useState } from 'react';
import { Heart, Users, Sparkles, Play } from 'lucide-react';
import GameCategories from '@/components/GameCategories';
import GameCard from '@/components/GameCard';
import WelcomeScreen from '@/components/WelcomeScreen';

const Index = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  if (showWelcome) {
    return <WelcomeScreen onStart={() => setShowWelcome(false)} />;
  }

  if (selectedCategory) {
    return (
      <GameCard 
        category={selectedCategory} 
        onBack={() => setSelectedCategory(null)} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8 max-w-md">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <Heart className="w-8 h-8 text-rose-500 mr-2 animate-float" />
            <h1 className="text-3xl font-playfair font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
              Couples Connect
            </h1>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            Deepen your connection through intimate conversation and playful challenges
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="text-center bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-sm">
            <Users className="w-6 h-6 text-rose-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">2</div>
            <div className="text-xs text-gray-600">Players</div>
          </div>
          <div className="text-center bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-sm">
            <Sparkles className="w-6 h-6 text-purple-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">100+</div>
            <div className="text-xs text-gray-600">Questions</div>
          </div>
          <div className="text-center bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-sm">
            <Play className="w-6 h-6 text-pink-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">∞</div>
            <div className="text-xs text-gray-600">Fun</div>
          </div>
        </div>

        {/* Game Categories */}
        <GameCategories onSelectCategory={setSelectedCategory} />

        {/* Footer */}
        <div className="text-center mt-8 text-xs text-gray-500">
          Made with ❤️ for couples everywhere
        </div>
      </div>
    </div>
  );
};

export default Index;
