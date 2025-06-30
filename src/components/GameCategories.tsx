
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
      gradient: 'from-blue-400 to-purple-500',
      bgGradient: 'from-blue-50 to-purple-50'
    },
    {
      id: 'romantic',
      title: 'Romance',
      description: 'Sweet moments and loving connections',
      icon: Heart,
      gradient: 'from-rose-400 to-pink-500',
      bgGradient: 'from-rose-50 to-pink-50'
    },
    {
      id: 'playful',
      title: 'Playful Fun',
      description: 'Light-hearted games and silly challenges',
      icon: Star,
      gradient: 'from-yellow-400 to-orange-500',
      bgGradient: 'from-yellow-50 to-orange-50'
    },
    {
      id: 'intimate',
      title: 'Intimate',
      description: 'Deeper connection for established couples',
      icon: Flame,
      gradient: 'from-red-400 to-rose-500',
      bgGradient: 'from-red-50 to-rose-50'
    },
    {
      id: 'adventure',
      title: 'Adventure',
      description: 'Exciting challenges to try together',
      icon: Zap,
      gradient: 'from-purple-400 to-indigo-500',
      bgGradient: 'from-purple-50 to-indigo-50'
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
      <h2 className="text-xl font-playfair font-semibold text-center text-gray-800 mb-6">
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
                  <h3 className="font-semibold text-gray-800 text-lg mb-1 group-hover:text-gray-900 transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {category.description}
                  </p>
                </div>
                <div className="text-gray-400 group-hover:text-gray-600 transition-colors">
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
