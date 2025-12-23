import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Crown, Globe } from 'lucide-react';

interface NavbarProps {
  onLoginClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLoginClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState<'EN' | 'PH'>('EN');

  const navLinks = [
    { label: 'About Kaye', href: '#about' },
    { label: 'Chapters', href: '#chapters' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Family & Friends', href: '#family' },
  ];

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'EN' ? 'PH' : 'EN');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-gold/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Crown className="w-8 h-8 text-gold" />
              <div className="absolute inset-0 animate-pulse-glow opacity-50">
                <Crown className="w-8 h-8 text-gold blur-sm" />
              </div>
            </div>
            <span className="font-magical text-2xl text-gradient-gold tracking-wider">
              kaye.life
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-elegant text-foreground/80 hover:text-gold transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Right side actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-gold/30 hover:border-gold/60 transition-colors text-sm font-clean"
            >
              <Globe className="w-4 h-4 text-gold" />
              <span className="text-foreground/80">{language === 'EN' ? '🇵🇭' : '🇺🇸'}</span>
              <span className="text-foreground/60">{language}</span>
            </button>

            {/* Login Button */}
            <Button variant="magical" size="sm" onClick={onLoginClick}>
              Log In
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground/80 hover:text-gold transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gold/20 animate-fade-in">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-elegant text-foreground/80 hover:text-gold transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex items-center gap-4 pt-4 border-t border-gold/20">
                <button
                  onClick={toggleLanguage}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-gold/30"
                >
                  <Globe className="w-4 h-4 text-gold" />
                  <span>{language === 'EN' ? '🇵🇭' : '🇺🇸'} {language}</span>
                </button>
                <Button variant="magical" size="sm" onClick={onLoginClick}>
                  Log In
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
