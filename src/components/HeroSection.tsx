import React from 'react';
import { Button } from '@/components/ui/button';
import { Lock, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeroSectionProps {
  onEnterClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onEnterClick }) => {
  return (
    <section className="relative min-h-[95vh] flex items-center justify-center px-4 pt-24 overflow-hidden">
      {/* Background Ambience - Deep Forest */}
      <div className="absolute inset-0 z-0">
        {/* Reduced opacity to let the fixed MagicalBackground show through, but ensuring text is readable */}
        <div className="absolute inset-0 bg-[#06140b] opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06140b] via-transparent to-[#06140b]/60" />
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-emerald-900/20 blur-[150px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-gold/10 blur-[120px] rounded-full mix-blend-screen" />
      </div>

      <div className="container mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10 max-w-7xl">

        {/* Left Column: Text Content */}
        <div className="text-center lg:text-left space-y-10 animate-fade-in order-2 lg:order-1 pt-8 lg:pt-0">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 mb-2 animate-bounce-slow px-4 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
              <Sparkles className="w-3 h-3 text-gold animate-pulse" />
              <span className="font-elegant text-gold/90 tracking-[0.2em] text-xs font-semibold uppercase">Welcome to</span>
              <Sparkles className="w-3 h-3 text-gold animate-pulse" />
            </div>

            <h1 className="font-magical text-6xl md:text-7xl lg:text-8xl tracking-wide leading-[1.1] text-[#e8dcb8] text-shadow-magical drop-shadow-2xl">
              Kaye's <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#ffd700] via-[#c5a059] to-[#8a6e3e] drop-shadow-gold relative">
                WORLD
                <span className="absolute -inset-1 blur-xl bg-gold/20 -z-10 rounded-full"></span>
              </span>
            </h1>
          </div>

          <div className="space-y-6 relative pl-2 border-l-2 border-gold/20 ml-4 lg:ml-0">
            <h2 className="font-elegant text-2xl md:text-3xl text-white/95 italic tracking-wide leading-tight">
              "Mahal Kita, <span className="text-gold">Kaibigan</span> & <span className="text-gold">Pamilya</span>"
            </h2>
            <p className="font-clean text-lg text-white/70 max-w-lg mx-auto lg:mx-0 tracking-wide font-light">
              A private, magical journey through the chapters of Kaye's life.
            </p>
          </div>

          {/* CTA Buttons - Premium Styling */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 pt-4">
            <Button
              size="lg"
              className="min-w-[160px] h-14 bg-transparent hover:bg-emerald-950/50 text-[#e8dcb8] border border-[#c5a059] hover:border-[#ffd700] transition-all duration-300 font-magical tracking-widest text-sm shadow-[0_0_15px_rgba(197,160,89,0.1)] hover:shadow-[0_0_25px_rgba(197,160,89,0.3)] backdrop-blur-sm"
              onClick={onEnterClick}
            >
              LOG IN
            </Button>

            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#ffd700] to-[#c5a059] rounded-lg blur opacity-40 group-hover:opacity-75 transition duration-500" />
              <Button
                size="lg"
                className="relative min-w-[220px] h-14 bg-gradient-to-b from-[#c5a059] to-[#8a6e3e] hover:from-[#d4b06a] hover:to-[#9b7b46] text-[#0f2e1b] font-magical font-bold border-t border-[#ffd700]/50 shadow-xl tracking-widest text-sm transform transition-transform duration-200 hover:scale-[1.02]"
                onClick={onEnterClick}
              >
                JOIN THE ADVENTURE
              </Button>
            </div>
          </div>

          <p className="text-xs text-emerald-100/40 flex items-center justify-center lg:justify-start gap-2 pt-2 font-clean tracking-widest uppercase">
            <Lock className="w-3 h-3" />
            Invite-only for Family & Friends
          </p>
        </div>

        {/* Right Column: Hero Image - Premium glow and integration */}
        <div className="relative z-10 flex justify-center lg:justify-end animate-fade-in delay-200 order-1 lg:order-2">
          <div className="relative w-full max-w-[500px] lg:max-w-[600px] aspect-[4/5] lg:aspect-square flex items-end justify-center">

            {/* Magical Aura / Glow behind */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#ffd700]/10 blur-[80px] rounded-full animate-pulse-slow" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] h-[60%] bg-emerald-500/10 blur-[100px] rounded-full" />

            {/* Main Image with Color Grading and Blending */}
            <div className="relative w-full h-full z-10">
              <img
                src="/images/kaye-hero-new.png"
                alt="Kaye in magical forest"
                className="relative w-full h-full object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
                style={{
                  filter: "sepia(20%) contrast(110%) brightness(95%) saturate(90%)",
                  maskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, black 70%, transparent 100%)"
                }}
              />
            </div>

            {/* Sparkles Foreground Overlay */}
            <div className="absolute inset-0 pointer-events-none z-20">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-[#ffd700] rounded-full animate-twinkle shadow-[0_0_5px_#ffd700]"
                  style={{
                    top: `${20 + Math.random() * 60}%`,
                    left: `${10 + Math.random() * 80}%`,
                    animationDelay: `${Math.random() * 4}s`,
                    opacity: Math.random()
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
