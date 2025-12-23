import React from 'react';
import heroBackground from '@/assets/hero-enchanted-forest.jpg';

interface MagicalBackgroundProps {
  showSnow?: boolean;
}

const MagicalBackground: React.FC<MagicalBackgroundProps> = ({ showSnow = true }) => {
  // Generate random stars
  const stars = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 2 + 1,
    delay: `${Math.random() * 3}s`,
    duration: `${Math.random() * 2 + 2}s`,
  }));

  // Generate snowflakes for Christmas
  const snowflakes = showSnow ? Array.from({ length: 25 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 10}s`,
    duration: `${Math.random() * 5 + 8}s`,
    size: Math.random() * 10 + 5,
  })) : [];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Hero background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-background/40" />
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-background/90" />
      
      {/* Magical mist */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/10" />
      
      {/* Twinkling stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-gold animate-twinkle"
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: star.delay,
            animationDuration: star.duration,
          }}
        />
      ))}
      
      {/* Christmas snowflakes */}
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute text-christmas-snow/60 animate-snowfall snowflake"
          style={{
            left: flake.left,
            animationDelay: flake.delay,
            animationDuration: flake.duration,
            fontSize: `${flake.size}px`,
          }}
        >
          ❄
        </div>
      ))}
      
      {/* Ambient glow spots */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-gold/5 rounded-full blur-3xl" />
    </div>
  );
};

export default MagicalBackground;
