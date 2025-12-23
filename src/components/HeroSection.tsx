import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Lock, User, Clock } from 'lucide-react';

interface HeroSectionProps {
  onEnterClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onEnterClick }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 pt-20">
      <div className="relative z-10 text-center max-w-3xl mx-auto">
        {/* Active Status Banner */}
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-primary/10 border border-primary/20 text-foreground animate-fade-in">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          <span className="font-clean text-sm">Active today</span>
          <span className="text-muted-foreground">•</span>
          <Clock className="w-3 h-3 text-muted-foreground" />
          <span className="font-clean text-sm text-muted-foreground">Posted recently</span>
        </div>
        
        {/* Main Title */}
        <h1 className="font-magical text-5xl md:text-7xl lg:text-8xl tracking-wide mb-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <span className="text-foreground">Hi, I'm </span>
          <span className="text-primary">Kaye</span>
          <span className="ml-2">💚</span>
        </h1>
        
        {/* Subtitle */}
        <p className="font-elegant text-xl md:text-2xl text-muted-foreground mb-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Welcome to my little corner of the internet
        </p>

        {/* Taurus & May Baby badges */}
        <p className="font-elegant text-lg text-primary/80 mb-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          ♉ Taurus • May Baby 🌸 • 🇵🇭 Filipina
        </p>
        
        {/* Personal description */}
        <p className="font-clean text-base text-muted-foreground max-w-xl mx-auto mb-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          This is where I share my life with the people I love — family, friends, and the ones who really know me.
        </p>

        {/* Currently doing status */}
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-xl bg-card border border-border text-sm animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <span className="text-muted-foreground">Currently:</span>
          <span className="font-medium text-foreground">enjoying the holiday season 🎄</span>
        </div>

        {/* Photo placeholder */}
        <div className="flex justify-center mb-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="relative">
            <div className="w-32 h-32 md:w-36 md:h-36 rounded-full border-4 border-primary/30 bg-card flex items-center justify-center overflow-hidden group hover:border-primary/50 transition-all duration-300 shadow-soft">
              <User className="w-14 h-14 md:w-16 md:h-16 text-muted-foreground/40 group-hover:scale-105 transition-transform" />
            </div>
            {/* Online indicator */}
            <div className="absolute bottom-2 right-2 w-5 h-5 bg-primary rounded-full border-3 border-card shadow-sm" />
          </div>
        </div>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.7s' }}>
          <Button 
            variant="default" 
            size="lg" 
            onClick={onEnterClick}
            className="rounded-full px-8 font-clean shadow-soft hover:shadow-lift transition-all"
          >
            <Lock className="w-4 h-4 mr-2" />
            Log in
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            onClick={onEnterClick}
            className="rounded-full px-8 font-clean border-primary/30 hover:bg-primary/5 transition-all"
          >
            Join (invite-only)
          </Button>
        </div>
        
        {/* Private Notice */}
        <p className="mt-6 text-sm text-muted-foreground font-clean animate-fade-in flex items-center justify-center gap-2" style={{ animationDelay: '0.8s' }}>
          <Heart className="w-4 h-4 text-rose-400" />
          Private space for family & friends only
          <Heart className="w-4 h-4 text-rose-400" />
        </p>
      </div>
    </section>
  );
};

export default HeroSection;