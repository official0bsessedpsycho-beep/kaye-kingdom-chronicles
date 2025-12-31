import React from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Heart, Lock } from 'lucide-react';

interface HeroSectionProps {
  onEnterClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onEnterClick }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4">
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Christmas Banner */}
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-christmas-red/20 border border-christmas-red/30 text-christmas-snow animate-fade-in">
          <span className="text-lg">🎄</span>
          <span className="font-elegant text-sm tracking-wide">Maligayang Pasko!</span>
          <span className="text-lg">✨</span>
        </div>
        
        {/* Main Title */}
        <h1 className="font-magical text-5xl md:text-7xl lg:text-8xl tracking-wider mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <span className="text-gradient-gold">Kaye</span>
          <span className="text-foreground/80">'s</span>
        </h1>
        
        <h2 className="font-magical text-3xl md:text-4xl lg:text-5xl text-foreground/90 tracking-wide mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          Enchanted Life
        </h2>
        
        {/* Decorative Line */}
        <div className="flex items-center justify-center gap-4 mb-8 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-gold/50" />
          <Sparkles className="w-6 h-6 text-gold animate-float" />
          <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent to-gold/50" />
        </div>
        
        {/* Subtitle */}
        <p className="font-elegant text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-4 italic animate-fade-in" style={{ animationDelay: '0.5s' }}>
          "A magical journey through life, love, and everything in between"
        </p>
        
        {/* Taurus & May Born Badge */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12 animate-fade-in" style={{ animationDelay: '0.7s' }}>
          <span className="px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-sm font-clean text-primary-foreground/80">
            ♉ Taurus
          </span>
          <span className="px-3 py-1 rounded-full bg-gold/20 border border-gold/30 text-sm font-clean text-gold">
            May Baby 🌸
          </span>
          <span className="px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-sm font-clean text-primary-foreground/80">
            🇵🇭 Filipina
          </span>
        </div>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '1s' }}>
          <Button 
            variant="magical" 
            size="xl" 
            onClick={onEnterClick}
            className="group"
          >
            <Lock className="w-5 h-5 transition-transform group-hover:scale-110" />
            Enter the Portal
          </Button>
          
          <Button 
            variant="enchanted" 
            size="xl"
            onClick={onEnterClick}
          >
            <Heart className="w-5 h-5" />
            For Family & Friends
          </Button>
        </div>
        
        {/* Private Notice */}
        <p className="mt-8 text-sm text-muted-foreground font-clean animate-fade-in" style={{ animationDelay: '1s' }}>
          🔒 This is a private space. Access by invitation only.
        </p>
      </div>
      
      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 text-4xl animate-float opacity-30" style={{ animationDelay: '0.2s' }}>🦋</div>
      <div className="absolute top-40 right-20 text-3xl animate-float opacity-30" style={{ animationDelay: '0.5s' }}>✨</div>
      <div className="absolute bottom-40 left-20 text-3xl animate-float opacity-30" style={{ animationDelay: '0.7s' }}>🌙</div>
      <div className="absolute bottom-20 right-10 text-4xl animate-float opacity-30">🌿</div>
    </section>
  );
};

export default HeroSection;
