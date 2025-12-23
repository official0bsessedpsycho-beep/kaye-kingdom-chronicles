import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const festivals = [
  {
    emoji: '🎄',
    title: 'Pasko',
    subtitle: 'Christmas',
    description: 'The longest Christmas celebration in the world — starting in September!',
    tagalog: 'My favorite time of the year 💚',
    bgColor: 'bg-gradient-to-br from-red-50 to-green-50',
    borderColor: 'border-red-200 hover:border-red-300',
    accentColor: 'text-red-500',
  },
  {
    emoji: '💐',
    title: 'Flores de Mayo',
    subtitle: 'May Flower Festival',
    description: 'A beautiful celebration with flowers honoring the Virgin Mary.',
    tagalog: 'Born in this month! 🌸',
    bgColor: 'bg-gradient-to-br from-pink-50 to-rose-50',
    borderColor: 'border-pink-200 hover:border-pink-300',
    accentColor: 'text-pink-500',
  },
  {
    emoji: '🎉',
    title: 'Sinulog',
    subtitle: 'Cebu Festival',
    description: 'A colorful dance festival celebrating Santo Niño de Cebu.',
    tagalog: 'Pit Señor! 🙏',
    bgColor: 'bg-gradient-to-br from-amber-50 to-orange-50',
    borderColor: 'border-amber-200 hover:border-amber-300',
    accentColor: 'text-amber-500',
  },
];

const FilipinoFestivals: React.FC = () => {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-transparent via-secondary/30 to-transparent">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-xl">🇵🇭</span>
            <span className="font-clean text-xs text-muted-foreground uppercase tracking-wider">
              Pinoy traditions
            </span>
            <span className="text-xl">🇵🇭</span>
          </div>
          <h2 className="font-magical text-3xl md:text-4xl text-foreground mb-2">
            Holidays I love 🎄
          </h2>
          <p className="font-elegant text-lg text-muted-foreground">
            My favorite Filipino celebrations
          </p>
        </div>

        {/* Festival Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {festivals.map((festival, index) => (
            <Card
              key={festival.title}
              className={`
                group overflow-hidden
                ${festival.bgColor}
                border-2 ${festival.borderColor}
                transition-all duration-300
                hover:scale-[1.02] hover:shadow-lift
                animate-fade-in
              `}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <CardContent className="p-6 text-center">
                {/* Emoji */}
                <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {festival.emoji}
                </div>

                {/* Title */}
                <h3 className={`font-magical text-xl ${festival.accentColor} mb-1`}>
                  {festival.title}
                </h3>
                <p className="font-elegant text-sm text-muted-foreground mb-3">
                  {festival.subtitle}
                </p>

                {/* Description */}
                <p className="font-clean text-sm text-muted-foreground mb-4">
                  {festival.description}
                </p>

                {/* Personal touch */}
                <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/60 border border-border/50">
                  <span className="font-elegant text-sm text-foreground">
                    {festival.tagalog}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FilipinoFestivals;