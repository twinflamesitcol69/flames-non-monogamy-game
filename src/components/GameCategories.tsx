
import { MessageCircle, Heart, Flame, Star, Users, Zap } from 'lucide-react';

interface GameCategoriesProps {
  onSelectCategory: (category: string) => void;
}

const GameCategories = ({ onSelectCategory }: GameCategoriesProps) => {
  const categories = [
    {
      id: 'conversation',
      title: 'Deep Talk',
      description: 'Meaningful questions to know each other better',
      icon: MessageCircle,
      gradient: 'from-amber-400 to-orange-600',
      bgGradient: 'from-amber-500/10 to-orange-600/10'
    },
    {
      id: 'romantic',
      title: 'Romance',
      description: 'Sweet moments and loving connections',
      icon: Heart,
      gradient: 'from-rose-500 to-pink-600',
      bgGradient: 'from-rose-500/10 to-pink-600/10'
    },
    {
      id: 'playful',
      title: 'Playful Fun',
      description: 'Light-hearted games and silly challenges',
      icon: Star,
      gradient: 'from-amber-400 to-orange-500',
      bgGradient: 'from-amber-500/10 to-orange-500/10'
    },
    {
      id: 'intimate',
      title: 'Intimate',
      description: 'Deeper connection for established couples',
      icon: Flame,
      gradient: 'from-red-600 to-rose-500',
      bgGradient: 'from-red-600/10 to-rose-500/10'
    },
    {
      id: 'adventure',
      title: 'Adventure',
      description: 'Exciting challenges to try together',
      icon: Zap,
      gradient: 'from-rose-600 to-red-800',
      bgGradient: 'from-rose-600/10 to-red-800/10'
    },
    {
      id: 'couple-goals',
      title: 'Couple Goals',
      description: 'Build your future dreams together',
      icon: Users,
      gradient: 'from-emerald-400 to-teal-500',
      bgGradient: 'from-emerald-50 to-teal-50'
    }
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-playfair font-semibold text-center text-foreground mb-6">
        Choose Your Adventure
      </h2>
      
      <div className="grid grid-cols-1 gap-4">
        {categories.map((category, index) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={`game-card p-6 text-left bg-gradient-to-br ${category.bgGradient} hover:shadow-xl transition-all duration-300 group animate-fade-in`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-full bg-gradient-to-r ${category.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground text-lg mb-1 group-hover:text-accent transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {category.description}
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
  );
};

export default GameCategories;
