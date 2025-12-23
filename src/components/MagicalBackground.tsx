import React from 'react';

interface MagicalBackgroundProps {
  showSnow?: boolean;
  showCandles?: boolean;
}

const MagicalBackground: React.FC<MagicalBackgroundProps> = ({ showSnow = true }) => {
  // Generate snowflakes for Christmas (reduced amount, only during holidays)
  const snowflakes = showSnow ? Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 10}s`,
    duration: `${Math.random() * 6 + 10}s`,
    size: Math.random() * 8 + 6,
  })) : [];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Soft gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/20 to-background" />
      
      {/* Subtle warm overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/3 via-transparent to-primary/5" />
      
      {/* Light paper texture */}
      <div className="absolute inset-0 texture-paper" />
      
      {/* Christmas snowflakes - gentle and sparse */}
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute text-primary/20 animate-snowfall snowflake"
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
      
      {/* Soft ambient glow - very subtle */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
    </div>
  );
};

export default MagicalBackground;