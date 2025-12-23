import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

const festivals = [
  {
    emoji: '🎄',
    title: 'Pasko',
    subtitle: 'Christmas',
    description: 'The longest Christmas celebration in the world, starting in September!',
    tagalog: 'Maligayang Pasko!',
    gradient: 'from-christmas-red/20 to-christmas-green/20',
    borderColor: 'border-christmas-red/40',
    glowColor: 'shadow-christmas-red/20',
  },
  {
    emoji: '💐',
    title: 'Flores de Mayo',
    subtitle: 'May Flower Festival',
    description: 'A month-long celebration honoring the Virgin Mary with beautiful flowers.',
    tagalog: 'Alay ng mga Bulaklak',
    gradient: 'from-rose-400/20 to-pink-300/20',
    borderColor: 'border-rose-400/40',
    glowColor: 'shadow-rose-400/20',
  },
  {
    emoji: '🎉',
    title: 'Sinulog',
    subtitle: 'Cebu Festival',
    description: 'A colorful dance festival celebrating the Santo Niño de Cebu.',
    tagalog: 'Pit Señor!',
    gradient: 'from-amber-400/20 to-orange-400/20',
    borderColor: 'border-amber-400/40',
    glowColor: 'shadow-amber-400/20',
  },
];

const FilipinoFestivals: React.FC = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/5 to-transparent" />
      
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="text-2xl">🇵🇭</span>
            <span className="font-elegant text-gold/80 text-sm tracking-widest uppercase">
              Philippine Culture
            </span>
            <span className="text-2xl">🇵🇭</span>
          </div>
          <h2 className="font-magical text-4xl md:text-5xl text-foreground mb-4">
            Festive Celebrations
          </h2>
          <p className="font-elegant text-xl text-gold italic">
            "Pasko na Naman!"
          </p>
          <p className="font-clean text-muted-foreground mt-2">
            Celebrating Filipino traditions and festivities
          </p>
        </div>

        {/* Festival Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {festivals.map((festival, index) => (
            <Card
              key={festival.title}
              className={`
                group relative overflow-hidden
                bg-gradient-to-br ${festival.gradient}
                border-2 ${festival.borderColor}
                backdrop-blur-sm
                transition-all duration-500
                hover:scale-105 hover:${festival.glowColor} hover:shadow-2xl
                animate-fade-in
              `}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Golden frame corners */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold/50 rounded-tl-lg" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gold/50 rounded-tr-lg" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gold/50 rounded-bl-lg" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gold/50 rounded-br-lg" />

              <CardContent className="p-8 text-center">
                {/* Emoji */}
                <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {festival.emoji}
                </div>

                {/* Title */}
                <h3 className="font-magical text-2xl text-foreground mb-1">
                  {festival.title}
                </h3>
                <p className="font-elegant text-sm text-gold/80 italic mb-4">
                  {festival.subtitle}
                </p>

                {/* Description */}
                <p className="font-clean text-sm text-muted-foreground mb-4">
                  {festival.description}
                </p>

                {/* Tagalog phrase */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/50 border border-gold/20">
                  <Sparkles className="w-3 h-3 text-gold" />
                  <span className="font-elegant text-sm text-gold">
                    {festival.tagalog}
                  </span>
                  <Sparkles className="w-3 h-3 text-gold" />
                </div>
              </CardContent>

              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gold/5 blur-xl -z-10" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FilipinoFestivals;
