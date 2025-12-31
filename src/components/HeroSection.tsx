import React from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Heart, LogIn } from 'lucide-react';

interface HeroSectionProps {
  onEnterClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onEnterClick }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 pt-20">
      {/* Decorative candles on sides */}
      <div className="absolute left-4 md:left-8 top-1/4 text-3xl md:text-4xl animate-float opacity-60">🕯️</div>
      <div className="absolute right-4 md:right-8 top-1/3 text-3xl md:text-4xl animate-float opacity-60" style={{ animationDelay: '1s' }}>🕯️</div>
      <div className="absolute left-6 md:left-12 bottom-1/4 text-2xl md:text-3xl animate-float opacity-50" style={{ animationDelay: '2s' }}>🕯️</div>
      <div className="absolute right-6 md:right-12 bottom-1/3 text-2xl md:text-3xl animate-float opacity-50" style={{ animationDelay: '0.5s' }}>🕯️</div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Welcome Text */}
        <p className="font-elegant text-xl md:text-2xl text-muted-foreground mb-4 animate-fade-in">
          Welcome to
        </p>
        
        {/* Main Title */}
        <h1 className="font-magical text-5xl md:text-7xl lg:text-8xl tracking-wider mb-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <span className="text-gradient-gold">Kaye</span>
          <span className="text-foreground/80">'s World</span>
        </h1>
        
        {/* Decorative Stars */}
        <div className="flex items-center justify-center gap-2 mb-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <span className="text-gold">✦</span>
          <span className="text-gold/70">✦</span>
          <span className="text-gold">✦</span>
        </div>
        
        {/* Filipino Tagline */}
        <p className="font-magical text-xl md:text-2xl text-gold/90 mb-2 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          Mahal Kita, Kaibigan & Pamilya
        </p>
        
        {/* Decorative Line */}
        <div className="flex items-center justify-center gap-4 mb-6 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-gold/50" />
          <Sparkles className="w-5 h-5 text-gold animate-float" />
          <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent to-gold/50" />
        </div>
        
        {/* Subtitle */}
        <p className="font-elegant text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          A Magical Journey Through Kaye's Life
        </p>
        
        {/* Taurus & May Born Badge */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10 animate-fade-in" style={{ animationDelay: '0.7s' }}>
          <span className="px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-sm font-clean text-primary-foreground/90">
            ♉ Taurus
          </span>
          <span className="px-4 py-1.5 rounded-full bg-gold/20 border border-gold/40 text-sm font-clean text-gold">
            May Baby 🌸
          </span>
          <span className="px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-sm font-clean text-primary-foreground/90 flex items-center gap-1">
            🇵🇭 Filipina
          </span>
        </div>
        
        {/* CTA Buttons - Style matching reference */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.9s' }}>
          <Button 
            variant="outline" 
            size="lg" 
            onClick={onEnterClick}
            className="group bg-transparent border-2 border-gold/60 text-gold hover:bg-gold/10 hover:border-gold px-8 py-6 font-magical tracking-wide"
          >
            <LogIn className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
            Log In
          </Button>
          
          <Button 
            size="lg"
            onClick={onEnterClick}
            className="group bg-gradient-to-r from-primary to-emerald-dark hover:from-emerald-dark hover:to-primary text-foreground border border-gold/30 px-8 py-6 font-magical tracking-wide shadow-magical"
          >
            <Heart className="w-5 h-5 mr-2" />
            Join the Adventure
          </Button>
        </div>
        
        {/* Private Notice */}
        <div className="mt-8 flex items-center justify-center gap-2 animate-fade-in" style={{ animationDelay: '1s' }}>
          <span className="text-lg">🔒</span>
          <p className="text-sm text-muted-foreground font-elegant italic">
            Invite-only for Family & Friends
          </p>
        </div>
      </div>
      
      {/* Floating sparkle decorations */}
      <div className="absolute top-24 left-1/4 text-xl text-gold animate-twinkle opacity-60">✨</div>
      <div className="absolute top-32 right-1/4 text-lg text-gold animate-twinkle opacity-50" style={{ animationDelay: '0.5s' }}>✨</div>
      <div className="absolute bottom-40 left-1/3 text-xl text-gold animate-twinkle opacity-60" style={{ animationDelay: '1s' }}>✨</div>
      <div className="absolute bottom-32 right-1/3 text-lg text-gold animate-twinkle opacity-50" style={{ animationDelay: '1.5s' }}>✨</div>
      <div className="absolute top-1/2 left-8 text-2xl animate-float opacity-40">🦋</div>
      <div className="absolute bottom-1/4 right-8 text-2xl animate-float opacity-40" style={{ animationDelay: '2s' }}>🌿</div>
    </section>
  );
};

export default HeroSection;
