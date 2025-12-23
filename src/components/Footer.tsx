import React from 'react';
import { Heart, Sparkles } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative py-12 px-4 border-t border-border/30">
      <div className="max-w-4xl mx-auto text-center">
        {/* Decorative top */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/30" />
          <Sparkles className="w-5 h-5 text-gold animate-twinkle" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/30" />
        </div>
        
        {/* Main text */}
        <p className="font-magical text-lg text-foreground/80 mb-2">
          kaye.life
        </p>
        
        <p className="font-elegant text-muted-foreground mb-4">
          A magical space created with love
        </p>
        
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground font-clean">
          <span>Made with</span>
          <Heart className="w-4 h-4 text-christmas-red fill-christmas-red animate-pulse" />
          <span>for Kaye</span>
        </div>
        
        {/* Copyright */}
        <p className="mt-6 text-xs text-muted-foreground/60 font-clean">
          © {currentYear} Kaye's Enchanted Life. All moments cherished.
        </p>
        
        {/* Filipino greeting based on season */}
        <p className="mt-4 text-sm text-gold/70 font-elegant italic">
          🎄 Maligayang Pasko at Manigong Bagong Taon! 🎄
        </p>
      </div>
    </footer>
  );
};

export default Footer;
