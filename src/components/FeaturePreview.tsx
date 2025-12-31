import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  GraduationCap, 
  Heart, 
  Users, 
  Home, 
  Plane, 
  Camera,
  BookOpen,
  Star
} from 'lucide-react';

const features = [
  {
    icon: BookOpen,
    title: "Life Updates",
    tagalog: "Mga Balita sa Buhay",
    description: "Daily moments, thoughts, and adventures",
    gradient: "from-primary/20 to-emerald-dark/20",
  },
  {
    icon: GraduationCap,
    title: "Academic Journey",
    tagalog: "Paglalakbay sa Pag-aaral",
    description: "Educational milestones and achievements",
    gradient: "from-gold/20 to-accent/10",
  },
  {
    icon: Heart,
    title: "Love Story",
    tagalog: "Kwento ng Pag-ibig",
    description: "Our beautiful journey together",
    gradient: "from-christmas-red/20 to-primary/10",
  },
  {
    icon: Users,
    title: "Friends Circle",
    tagalog: "Mga Kaibigan",
    description: "Memories with amazing friends",
    gradient: "from-emerald-light/20 to-primary/20",
  },
  {
    icon: Home,
    title: "Family Moments",
    tagalog: "Sandali ng Pamilya",
    description: "Precious time with loved ones",
    gradient: "from-gold/20 to-parchment/10",
  },
  {
    icon: Plane,
    title: "Travel Diaries",
    tagalog: "Mga Diary ng Paglalakbay",
    description: "Adventures around the world",
    gradient: "from-primary/20 to-gold/10",
  },
  {
    icon: Camera,
    title: "Photo Gallery",
    tagalog: "Mga Larawan",
    description: "Beautiful captured memories",
    gradient: "from-emerald-light/20 to-emerald-dark/20",
  },
  {
    icon: Star,
    title: "Special Moments",
    tagalog: "Mga Espesyal na Sandali",
    description: "Birthdays, holidays, and celebrations",
    gradient: "from-gold/30 to-christmas-red/10",
  },
];

const FeaturePreview: React.FC = () => {
  return (
    <section className="relative py-24 px-4">
      {/* Decorative candles */}
      <div className="absolute left-4 top-1/4 text-2xl animate-float opacity-50">🕯️</div>
      <div className="absolute right-4 bottom-1/4 text-2xl animate-float opacity-50" style={{ animationDelay: '1.2s' }}>🕯️</div>

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gold/40" />
            <span className="text-gold">✦</span>
            <div className="h-px w-12 bg-gold/40" />
          </div>
          
          <h2 className="font-magical text-3xl md:text-4xl text-gradient-gold mb-3">
            Glimpse Into Kaye's World
          </h2>
          
          <p className="font-elegant text-lg text-muted-foreground italic">
            Isang sulyap sa mundo ni Kaye
          </p>
          
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-16 bg-gold/30" />
            <span className="text-gold text-sm">❧</span>
            <div className="h-px w-16 bg-gold/30" />
          </div>
        </div>
        
        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={feature.title}
              className={`group relative overflow-hidden border-border/50 bg-gradient-to-br ${feature.gradient} backdrop-blur-sm hover:border-gold/50 transition-all duration-500 hover:scale-105 hover:shadow-magical cursor-pointer animate-fade-in-up`}
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'both' }}
            >
              <CardContent className="p-6 text-center">
                <div className="mb-4 inline-flex items-center justify-center w-14 h-14 rounded-full bg-background/50 border border-gold/20 group-hover:border-gold/50 group-hover:glow-gold transition-all duration-300">
                  <feature.icon className="w-7 h-7 text-gold group-hover:scale-110 transition-transform" />
                </div>
                
                <h3 className="font-magical text-lg text-foreground mb-1 group-hover:text-gold transition-colors">
                  {feature.title}
                </h3>
                
                <p className="font-elegant text-sm text-primary italic mb-2">
                  {feature.tagalog}
                </p>
                
                <p className="font-clean text-xs text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
              
              {/* Hover glow effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-t from-gold/5 to-transparent" />
              </div>
            </Card>
          ))}
        </div>
        
        {/* Bottom decoration */}
        <div className="mt-16 text-center">
          <p className="font-elegant text-muted-foreground italic">
            "Every moment tells a story worth remembering"
          </p>
          <p className="font-elegant text-sm text-primary/60 mt-2">
            — Bawat sandali ay may kwentong dapat tandaan
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturePreview;
