import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative py-10 px-4 border-t border-border/30 bg-secondary/20">
      <div className="max-w-3xl mx-auto text-center">
        {/* Main text */}
        <p className="font-magical text-lg text-foreground mb-2">
          kaye.life
        </p>
        
        <p className="font-elegant text-muted-foreground mb-4">
          My little corner of the internet 💚
        </p>
        
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground font-clean">
          <span>Made with</span>
          <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
          <span>for Kaye</span>
        </div>
        
        {/* Copyright */}
        <p className="mt-5 text-xs text-muted-foreground/60 font-clean">
          © {currentYear} kaye.life • Private & Invite-only
        </p>
        
        {/* Seasonal greeting */}
        <p className="mt-3 text-sm text-primary/70 font-elegant">
          🎄 Merry Christmas! Maligayang Pasko! 🎄
        </p>
      </div>
    </footer>
  );
};

export default Footer;