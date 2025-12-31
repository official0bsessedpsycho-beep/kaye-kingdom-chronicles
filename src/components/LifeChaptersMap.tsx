import React from 'react';
import { GraduationCap, Heart, Plane, Users } from 'lucide-react';

const chapters = [
  {
    id: 'academics',
    icon: GraduationCap,
    title: 'Academics',
    tagalog: 'Pag-aaral',
    position: 'top-[15%] left-[10%]',
  },
  {
    id: 'love',
    icon: Heart,
    title: 'Love Life',
    tagalog: 'Pag-ibig',
    position: 'top-[35%] left-[35%]',
  },
  {
    id: 'travel',
    icon: Plane,
    title: 'Travel Adventures',
    tagalog: 'Paglalakbay',
    position: 'top-[25%] right-[15%]',
  },
  {
    id: 'family',
    icon: Users,
    title: 'Family & Friends',
    tagalog: 'Pamilya at Kaibigan',
    position: 'bottom-[20%] left-[25%]',
  },
];

const LifeChaptersMap: React.FC = () => {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Decorative candles on sides */}
      <div className="absolute left-4 top-1/4 text-3xl animate-float opacity-60">🕯️</div>
      <div className="absolute right-4 top-1/3 text-3xl animate-float opacity-60" style={{ animationDelay: '1s' }}>🕯️</div>
      <div className="absolute left-8 bottom-1/4 text-2xl animate-float opacity-50" style={{ animationDelay: '2s' }}>🕯️</div>
      <div className="absolute right-8 bottom-1/3 text-2xl animate-float opacity-50" style={{ animationDelay: '0.5s' }}>🕯️</div>

      <div className="max-w-5xl mx-auto">
        {/* Section Header - Ribbon Style */}
        <div className="text-center mb-12 relative">
          <div className="inline-block relative">
            {/* Ribbon Background */}
            <div className="absolute inset-0 -inset-x-8 bg-gradient-to-r from-transparent via-parchment/90 to-transparent transform -skew-y-1" />
            <div className="relative px-12 py-4">
              <h2 className="font-magical text-3xl md:text-4xl text-emerald-dark tracking-wider">
                Life Chapters
              </h2>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 mt-4">
            <span className="text-gold">━━━✦</span>
            <p className="font-elegant text-lg text-muted-foreground italic">
              Explore Kaye's Storybook
            </p>
            <span className="text-gold">✦━━━</span>
          </div>
        </div>

        {/* Treasure Map Container */}
        <div className="relative mx-auto">
          {/* Ornate Border Frame */}
          <div className="absolute -inset-3 md:-inset-4 border-4 border-gold/60 rounded-lg pointer-events-none" />
          <div className="absolute -inset-1 md:-inset-2 border-2 border-gold/40 rounded-lg pointer-events-none" />
          
          {/* Corner Decorations */}
          <div className="absolute -top-6 -left-6 text-gold text-2xl md:text-3xl">❧</div>
          <div className="absolute -top-6 -right-6 text-gold text-2xl md:text-3xl transform scale-x-[-1]">❧</div>
          <div className="absolute -bottom-6 -left-6 text-gold text-2xl md:text-3xl transform rotate-180">❧</div>
          <div className="absolute -bottom-6 -right-6 text-gold text-2xl md:text-3xl transform rotate-180 scale-x-[-1]">❧</div>

          {/* Map Background */}
          <div className="relative bg-gradient-to-br from-parchment via-parchment/95 to-parchment/90 rounded-lg overflow-hidden min-h-[400px] md:min-h-[500px]">
            {/* Vintage Paper Texture Overlay */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_hsl(145_30%_60%_/_0.3)_0%,_transparent_50%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,_hsl(145_40%_50%_/_0.2)_0%,_transparent_40%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,_hsl(200_50%_70%_/_0.2)_0%,_transparent_30%)]" />
            </div>

            {/* Dotted Path Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path 
                d="M 15 25 Q 30 35 40 45 T 70 35 T 85 50" 
                fill="none" 
                stroke="hsl(42, 60%, 45%)" 
                strokeWidth="0.5"
                strokeDasharray="2 2"
              />
              <path 
                d="M 40 45 Q 35 60 30 75" 
                fill="none" 
                stroke="hsl(42, 60%, 45%)" 
                strokeWidth="0.5"
                strokeDasharray="2 2"
              />
            </svg>

            {/* Chapter Items */}
            <div className="relative p-8 md:p-12 grid grid-cols-2 gap-6 md:gap-8">
              {chapters.map((chapter, index) => (
                <div
                  key={chapter.id}
                  className="group relative animate-fade-in cursor-pointer"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="flex flex-col items-center text-center transform transition-all duration-300 hover:scale-110">
                    {/* Icon Container */}
                    <div className="relative mb-3">
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-emerald-dark to-primary flex items-center justify-center shadow-lg group-hover:shadow-gold transition-shadow duration-300">
                        <chapter.icon className="w-8 h-8 md:w-10 md:h-10 text-gold" />
                      </div>
                      {/* Glow Effect */}
                      <div className="absolute inset-0 rounded-full bg-gold/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    
                    {/* Banner/Ribbon Label */}
                    <div className="relative">
                      <div className="bg-gradient-to-r from-parchment/80 via-parchment to-parchment/80 px-4 py-2 rounded shadow-md border border-gold/30">
                        <h3 className="font-magical text-sm md:text-base text-emerald-dark whitespace-nowrap">
                          {chapter.title}
                        </h3>
                        <p className="font-elegant text-xs text-primary/70 italic">
                          {chapter.tagalog}
                        </p>
                      </div>
                      {/* Banner tails */}
                      <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-2 h-4 bg-parchment/60 transform -skew-y-12" />
                      <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-2 h-4 bg-parchment/60 transform skew-y-12" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Taurus Symbol */}
            <div className="absolute bottom-4 right-4 text-2xl md:text-3xl text-emerald-dark/40">
              ♉
            </div>

            {/* Sparkle Decorations */}
            <div className="absolute top-6 right-1/4 text-gold animate-twinkle">✨</div>
            <div className="absolute bottom-1/4 left-1/4 text-gold animate-twinkle" style={{ animationDelay: '0.5s' }}>✨</div>
            <div className="absolute top-1/3 left-1/3 text-gold/60 animate-twinkle" style={{ animationDelay: '1s' }}>⭐</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LifeChaptersMap;
