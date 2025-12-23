import React from 'react';
import { BookOpen, Heart, Plane, Users, Sparkles } from 'lucide-react';

const chapters = [
  {
    icon: BookOpen,
    title: 'Academics',
    tagalog: 'Pag-aaral',
    description: 'Educational journey and achievements',
    color: 'from-blue-500/20 to-blue-600/20',
    borderColor: 'border-blue-500/30',
    iconColor: 'text-blue-400',
    position: { left: '10%', top: '20%' },
  },
  {
    icon: Heart,
    title: 'Love Life',
    tagalog: 'Buhay Pag-ibig',
    description: 'Romance and relationships',
    color: 'from-rose-500/20 to-rose-600/20',
    borderColor: 'border-rose-500/30',
    iconColor: 'text-rose-400',
    position: { left: '70%', top: '15%' },
  },
  {
    icon: Plane,
    title: 'Travel Adventures',
    tagalog: 'Mga Paglalakbay',
    description: 'Exploring the world',
    color: 'from-emerald-500/20 to-emerald-600/20',
    borderColor: 'border-emerald-500/30',
    iconColor: 'text-emerald-400',
    position: { left: '15%', top: '60%' },
  },
  {
    icon: Users,
    title: 'Family & Friends',
    tagalog: 'Pamilya at Kaibigan',
    description: 'Cherished connections',
    color: 'from-amber-500/20 to-amber-600/20',
    borderColor: 'border-amber-500/30',
    iconColor: 'text-amber-400',
    position: { left: '65%', top: '65%' },
  },
];

const LifeChapters: React.FC = () => {
  return (
    <section id="chapters" className="relative py-24 overflow-hidden">
      {/* Parchment texture background */}
      <div className="absolute inset-0 bg-parchment opacity-5" />
      
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-gold animate-pulse" />
            <span className="font-elegant text-gold/80 text-sm tracking-widest uppercase">
              Explore Her Story
            </span>
            <Sparkles className="w-5 h-5 text-gold animate-pulse" />
          </div>
          <h2 className="font-magical text-4xl md:text-5xl text-gradient-gold mb-4">
            Life Chapters
          </h2>
          <p className="font-elegant text-xl text-muted-foreground italic">
            "Mga Kabanata ng Buhay"
          </p>
        </div>

        {/* Storybook Map */}
        <div className="relative max-w-4xl mx-auto">
          {/* Golden connecting path - SVG */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 800 400"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--gold))" stopOpacity="0.6" />
                <stop offset="50%" stopColor="hsl(var(--gold))" stopOpacity="0.8" />
                <stop offset="100%" stopColor="hsl(var(--gold))" stopOpacity="0.6" />
              </linearGradient>
            </defs>
            <path
              d="M 100 100 Q 400 50 600 80 Q 700 150 550 250 Q 300 350 150 280 Q 50 200 100 100"
              fill="none"
              stroke="url(#pathGradient)"
              strokeWidth="3"
              strokeDasharray="10 5"
              className="animate-shimmer"
            />
          </svg>

          {/* Chapter Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            {chapters.map((chapter, index) => (
              <div
                key={chapter.title}
                className={`
                  group relative p-6 rounded-2xl
                  bg-gradient-to-br ${chapter.color}
                  border-2 ${chapter.borderColor}
                  backdrop-blur-sm
                  transform transition-all duration-500
                  hover:scale-105 hover:shadow-2xl hover:shadow-gold/10
                  animate-fade-in
                `}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Ribbon Banner */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-background/90 border border-gold/30 rounded-full">
                  <span className="font-elegant text-xs text-gold tracking-wider">
                    Chapter {index + 1}
                  </span>
                </div>

                {/* Icon */}
                <div className="flex justify-center mb-4 mt-2">
                  <div className={`p-4 rounded-full bg-background/50 ${chapter.iconColor}`}>
                    <chapter.icon className="w-8 h-8" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-magical text-2xl text-center text-foreground mb-1">
                  {chapter.title}
                </h3>
                <p className="font-elegant text-sm text-center text-gold/80 italic mb-3">
                  {chapter.tagalog}
                </p>
                <p className="font-clean text-sm text-center text-muted-foreground">
                  {chapter.description}
                </p>

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gold/5 blur-xl -z-10" />
              </div>
            ))}
          </div>

          {/* Center compass decoration */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-30 hidden md:block">
            <div className="w-24 h-24 rounded-full border-2 border-gold/50 flex items-center justify-center">
              <span className="font-magical text-3xl text-gold">✦</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LifeChapters;
