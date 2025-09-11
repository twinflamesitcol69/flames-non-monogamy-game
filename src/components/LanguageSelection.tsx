import { Globe, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
interface LanguageSelectionProps {
  onSelectLanguage: (language: 'pt' | 'es' | 'en') => void;
}
const LanguageSelection = ({
  onSelectLanguage
}: LanguageSelectionProps) => {
  return <div className="min-h-screen bg-gradient-to-br from-rose-100 via-purple-100 to-pink-100 flex items-center justify-center p-4">
      <div className="text-center max-w-md animate-scale-in">
        {/* Logo */}
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-rose-400 to-purple-500 rounded-full flex items-center justify-center mb-4 animate-float">
            <Heart className="w-10 h-10 text-white" fill="currentColor" />
          </div>
          <h1 className="text-4xl font-playfair font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent mb-2">Flames</h1>
          <p className="text-gray-600 text-lg">Enhance your non-monogamous life</p>
        </div>

        {/* Language Selection */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-center text-gray-700 mb-6">
            <Globe className="w-6 h-6 text-rose-500 mr-3" />
            <span className="text-xl font-medium">Choose your language / Escolha seu idioma</span>
          </div>
          
          <div className="space-y-4">
            <Button onClick={() => onSelectLanguage('en')} className="w-full btn-romantic text-lg px-8 py-6 h-auto flex items-center justify-center space-x-3">
              <span className="text-2xl">🇺🇸</span>
              <span>English</span>
            </Button>
            
            <Button onClick={() => onSelectLanguage('es')} className="w-full btn-romantic text-lg px-8 py-6 h-auto flex items-center justify-center space-x-3">
              <span className="text-2xl">🇪🇸</span>
              <span>Español</span>
            </Button>
            
            <Button onClick={() => onSelectLanguage('pt')} className="w-full btn-romantic text-lg px-8 py-6 h-auto flex items-center justify-center space-x-3">
              <span className="text-2xl">🇧🇷</span>
              <span>Português</span>
            </Button>
          </div>
        </div>

        <p className="text-xs text-gray-500">
          For adults 18+ only / Solo para adultos mayores de 18 años
        </p>
      </div>
    </div>;
};
export default LanguageSelection;