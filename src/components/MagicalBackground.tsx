import React from 'react';
import heroBackground from '@/assets/hero-enchanted-forest.jpg';

interface MagicalBackgroundProps {
  showSnow?: boolean;
  showCandles?: boolean;
}

const MagicalBackground: React.FC<MagicalBackgroundProps> = ({ showSnow = true, showCandles = true }) => {
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

  // Generate floating candles (Harry Potter style)
  const candles = showCandles ? Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 90 + 5}%`,
    top: `${Math.random() * 60 + 10}%`,
    delay: `${Math.random() * 4}s`,
    duration: `${Math.random() * 3 + 4}s`,
    scale: Math.random() * 0.4 + 0.6,
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
      
      {/* Floating Candles */}
      {candles.map((candle) => (
        <div
          key={candle.id}
          className="absolute animate-float pointer-events-none"
          style={{
            left: candle.left,
            top: candle.top,
            animationDelay: candle.delay,
            animationDuration: candle.duration,
            transform: `scale(${candle.scale})`,
          }}
        >
          {/* Candle body */}
          <div className="relative flex flex-col items-center">
            {/* Flame */}
            <div className="relative mb-0.5">
              <div className="w-2 h-4 bg-gradient-to-t from-amber-500 via-yellow-400 to-yellow-200 rounded-full animate-pulse opacity-90" />
              <div className="absolute inset-0 w-2 h-4 bg-gradient-to-t from-amber-500 via-yellow-400 to-white rounded-full blur-sm animate-pulse" />
              {/* Flame glow */}
              <div className="absolute -inset-2 bg-amber-400/30 rounded-full blur-md" />
            </div>
            {/* Candle stick */}
            <div className="w-1.5 h-6 bg-gradient-to-b from-amber-100 to-amber-200 rounded-sm opacity-80" />
          </div>
        </div>
      ))}
      
      {/* Ambient glow spots */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-gold/5 rounded-full blur-3xl" />
    </div>
  );
};

export default MagicalBackground;
