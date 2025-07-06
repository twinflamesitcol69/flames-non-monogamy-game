import { Heart, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
interface WelcomeScreenProps {
  onStart: () => void;
}
const WelcomeScreen = ({
  onStart
}: WelcomeScreenProps) => {
  return <div className="min-h-screen bg-gradient-to-br from-rose-100 via-purple-100 to-pink-100 flex items-center justify-center p-4">
      <div className="text-center max-w-md animate-scale-in">
        {/* Logo */}
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-rose-400 to-purple-500 rounded-full flex items-center justify-center mb-4 animate-float">
            <Heart className="w-10 h-10 text-white" fill="currentColor" />
          </div>
          <h1 className="text-4xl font-playfair font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent mb-2">Flames</h1>
          <p className="text-gray-600 text-lg">A practical guidance for non-monogamy lifestyle</p>
        </div>

        {/* Features */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-center text-gray-700">
            <Sparkles className="w-5 h-5 text-rose-500 mr-3" />
            <span>Deepen your emotional connection</span>
          </div>
          <div className="flex items-center justify-center text-gray-700">
            <Heart className="w-5 h-5 text-purple-500 mr-3" />
            <span>Explore intimacy together</span>
          </div>
          <div className="flex items-center justify-center text-gray-700">
            <Sparkles className="w-5 h-5 text-pink-500 mr-3" />
            <span>Create unforgettable moments</span>
          </div>
        </div>

        {/* Age Disclaimer */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 mb-8 border border-rose-200">
          <p className="text-sm text-gray-700 mb-2 font-medium">⚠️ Adult Content</p>
          <p className="text-xs text-gray-600 leading-relaxed">
            This app contains mature themes and is intended for adults aged 18+ only. 
            Play responsibly and with mutual consent.
          </p>
        </div>

        {/* Start Button */}
        <Button onClick={onStart} className="btn-romantic text-lg px-8 py-4 h-auto">Start Playing</Button>

        <p className="text-xs text-gray-500 mt-4">Perfect for explorers, curious minds and everyone who knows there's more, once you enter the rabbit hole... we wait you there!</p>
      </div>
    </div>;
};
export default WelcomeScreen;