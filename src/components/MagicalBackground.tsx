import React from 'react';

interface MagicalBackgroundProps {
  showSnow?: boolean;
}

const MagicalBackground: React.FC<MagicalBackgroundProps> = ({ showSnow = false }) => {
  // Only show snow during December (Christmas season)
  const isChristmasSeason = new Date().getMonth() === 11;
  const shouldShowSnow = showSnow && isChristmasSeason;
  
  const snowflakes = shouldShowSnow ? Array.from({ length: 8 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 10}s`,
    duration: `${Math.random() * 8 + 12}s`,
    size: Math.random() * 6 + 8,
  })) : [];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Clean light background */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Subtle warm gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-transparent to-primary/5" />
      
      {/* Very subtle paper texture */}
      <div className="absolute inset-0 texture-paper opacity-30" />
      
      {/* Christmas snowflakes - only during holidays, very sparse */}
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute text-primary/15 animate-snowfall"
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
    </div>
  );
};

export default MagicalBackground;