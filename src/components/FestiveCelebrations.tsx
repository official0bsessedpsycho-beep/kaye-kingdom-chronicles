import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const celebrations = [
  {
    id: 'pasko',
    title: 'Pasko',
    english: 'Christmas',
    emoji: '🎄',
    gradient: 'from-christmas-red/20 via-christmas-green/20 to-christmas-red/20',
    borderColor: 'border-christmas-red/40',
  },
  {
    id: 'flores',
    title: 'Flores de Mayo',
    english: 'May Flowers',
    emoji: '🌸',
    gradient: 'from-pink-500/20 via-rose-300/20 to-pink-500/20',
    borderColor: 'border-pink-400/40',
  },
  {
    id: 'sinulog',
    title: 'Sinulog Festival',
    english: 'Cebu Festival',
    emoji: '🎭',
    gradient: 'from-gold/20 via-orange-400/20 to-gold/20',
    borderColor: 'border-gold/40',
  },
];

const FestiveCelebrations: React.FC = () => {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-dark/10 to-transparent pointer-events-none" />
      
      {/* Decorative candles */}
      <div className="absolute left-6 top-20 text-2xl animate-float opacity-50">🕯️</div>
      <div className="absolute right-6 top-32 text-2xl animate-float opacity-50" style={{ animationDelay: '1.5s' }}>🕯️</div>
      <div className="absolute left-12 bottom-20 text-xl animate-float opacity-40" style={{ animationDelay: '0.7s' }}>🕯️</div>
      <div className="absolute right-12 bottom-32 text-xl animate-float opacity-40" style={{ animationDelay: '2s' }}>🕯️</div>

      <div className="max-w-5xl mx-auto relative">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/50" />
            <span className="text-2xl">🎉</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/50" />
          </div>
          
          <h2 className="font-magical text-3xl md:text-4xl text-gradient-gold mb-2">
            Festive Celebrations
          </h2>
          
          <div className="flex items-center justify-center gap-2 mt-3">
            <span className="text-gold">✦</span>
            <p className="font-elegant text-lg text-muted-foreground italic">
              Pasko na Naman!
            </p>
            <span className="text-gold">✦</span>
          </div>
          
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-24 bg-gold/30" />
            <span className="text-gold text-sm">❧</span>
            <div className="h-px w-24 bg-gold/30" />
          </div>
        </div>

        {/* Celebration Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
          {celebrations.map((celebration, index) => (
            <Card
              key={celebration.id}
              className={`group relative overflow-hidden bg-gradient-to-br ${celebration.gradient} border-2 ${celebration.borderColor} backdrop-blur-sm hover:scale-105 transition-all duration-500 cursor-pointer animate-fade-in`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Ornate Corner Decorations */}
              <div className="absolute top-2 left-2 text-gold/60 text-sm">❧</div>
              <div className="absolute top-2 right-2 text-gold/60 text-sm transform scale-x-[-1]">❧</div>
              <div className="absolute bottom-2 left-2 text-gold/60 text-sm transform rotate-180">❧</div>
              <div className="absolute bottom-2 right-2 text-gold/60 text-sm transform rotate-180 scale-x-[-1]">❧</div>

              <CardContent className="p-6 text-center relative">
                {/* Emoji Icon */}
                <div className="text-5xl md:text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {celebration.emoji}
                </div>

                {/* Title */}
                <h3 className="font-magical text-xl md:text-2xl text-gradient-gold mb-1 tracking-wide">
                  {celebration.title}
                </h3>

                {/* English subtitle */}
                <p className="font-elegant text-sm text-muted-foreground italic">
                  {celebration.english}
                </p>

                {/* Sparkle on hover */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <span className="absolute -top-8 -left-8 text-gold animate-twinkle">✨</span>
                  <span className="absolute -top-6 right-0 text-gold animate-twinkle" style={{ animationDelay: '0.3s' }}>✨</span>
                  <span className="absolute bottom-0 -left-6 text-gold animate-twinkle" style={{ animationDelay: '0.6s' }}>✨</span>
                </div>
              </CardContent>

              {/* Bottom golden border accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Card>
          ))}
        </div>

        {/* Bottom decoration */}
        <div className="flex items-center justify-center gap-4 mt-12">
          <div className="h-px w-20 bg-gold/30" />
          <span className="text-gold">🌟</span>
          <div className="h-px w-20 bg-gold/30" />
        </div>
      </div>
    </section>
  );
};

export default FestiveCelebrations;
