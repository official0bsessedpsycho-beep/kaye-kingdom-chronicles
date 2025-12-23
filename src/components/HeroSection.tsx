import React from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Heart, Compass, User } from 'lucide-react';

interface HeroSectionProps {
  onEnterClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onEnterClick }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 pt-20">
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Christmas Banner */}
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-christmas-red/20 border border-christmas-red/30 text-christmas-snow animate-fade-in">
          <span className="text-lg">🎄</span>
          <span className="font-elegant text-sm tracking-wide">Maligayang Pasko!</span>
          <span className="text-lg">✨</span>
        </div>
        
        {/* Welcome Text */}
        <p className="font-elegant text-lg md:text-xl text-muted-foreground mb-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          Welcome to
        </p>
        
        {/* Main Title */}
        <h1 className="font-magical text-5xl md:text-7xl lg:text-8xl tracking-wider mb-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <span className="text-gradient-gold">Kaye's World</span>
        </h1>
        
        {/* Filipino tagline */}
        <p className="font-elegant text-xl md:text-2xl text-gold/80 italic mb-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          "Mahal Kita, Kaibigan & Pamilya"
        </p>
        
        {/* Decorative Line */}
        <div className="flex items-center justify-center gap-4 mb-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-gold/50" />
          <Sparkles className="w-6 h-6 text-gold animate-float" />
          <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent to-gold/50" />
        </div>
        
        {/* Subtitle */}
        <p className="font-elegant text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          A Magical Journey Through Kaye's Life
        </p>

        {/* Photo placeholder with Taurus symbol */}
        <div className="flex justify-center mb-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="relative">
            {/* Photo frame */}
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-gold/50 bg-background/30 backdrop-blur-sm flex items-center justify-center overflow-hidden group hover:border-gold transition-colors duration-300">
              <User className="w-16 h-16 md:w-20 md:h-20 text-muted-foreground/50 group-hover:scale-110 transition-transform" />
            </div>
            {/* Taurus badge */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-background/90 border-2 border-gold/50 shadow-lg">
              <span className="font-magical text-lg text-gold">♉ Taurus</span>
            </div>
            {/* Decorative glow */}
            <div className="absolute inset-0 rounded-full bg-gold/10 blur-xl -z-10" />
          </div>
        </div>
        
        {/* Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10 animate-fade-in" style={{ animationDelay: '0.7s' }}>
          <span className="px-3 py-1 rounded-full bg-gold/20 border border-gold/30 text-sm font-clean text-gold">
            May Baby 🌸
          </span>
          <span className="px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-sm font-clean text-primary-foreground/80">
            🇵🇭 Filipina
          </span>
        </div>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <Button 
            variant="magical" 
            size="xl" 
            onClick={onEnterClick}
            className="group"
          >
            <span className="mr-2">🔐</span>
            Log In
          </Button>
          
          <Button 
            variant="enchanted" 
            size="xl"
            onClick={onEnterClick}
          >
            <Compass className="w-5 h-5 mr-2" />
            Join the Adventure
          </Button>
        </div>
        
        {/* Private Notice */}
        <p className="mt-8 text-sm text-muted-foreground font-clean animate-fade-in flex items-center justify-center gap-2" style={{ animationDelay: '0.9s' }}>
          <Heart className="w-4 h-4 text-rose-400" />
          For Family & Friends Only
          <Heart className="w-4 h-4 text-rose-400" />
        </p>
      </div>
      
      {/* Floating decorative elements */}
      <div className="absolute top-24 left-10 text-4xl animate-float opacity-30" style={{ animationDelay: '0.2s' }}>🦋</div>
      <div className="absolute top-44 right-20 text-3xl animate-float opacity-30" style={{ animationDelay: '0.5s' }}>✨</div>
      <div className="absolute bottom-40 left-20 text-3xl animate-float opacity-30" style={{ animationDelay: '0.7s' }}>🌙</div>
      <div className="absolute bottom-20 right-10 text-4xl animate-float opacity-30">🌿</div>
    </section>
  );
};

export default HeroSection;
