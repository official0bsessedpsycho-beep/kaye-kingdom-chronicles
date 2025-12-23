import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Heart, Globe } from 'lucide-react';

interface NavbarProps {
  onLoginClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLoginClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState<'EN' | 'PH'>('EN');

  const navLinks = [
    { label: 'About Me', href: '#about' },
    { label: 'My Life', href: '#chapters' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'My People', href: '#family' },
  ];

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'EN' ? 'PH' : 'EN');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-primary fill-primary/30" />
            <span className="font-magical text-xl text-foreground tracking-wide">
              kaye.life
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-clean text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary/50 rounded-full transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Right side actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border hover:border-primary/30 hover:bg-primary/5 transition-all text-sm font-clean"
            >
              <Globe className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">{language === 'EN' ? '🇵🇭' : '🇺🇸'}</span>
              <span className="text-muted-foreground text-xs">{language}</span>
            </button>

            {/* Login Button */}
            <Button variant="default" size="sm" onClick={onLoginClick} className="rounded-full font-clean">
              Log In
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-fade-in">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-clean text-muted-foreground hover:text-foreground transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                <button
                  onClick={toggleLanguage}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border text-sm"
                >
                  <Globe className="w-4 h-4 text-muted-foreground" />
                  <span>{language === 'EN' ? '🇵🇭' : '🇺🇸'} {language}</span>
                </button>
                <Button variant="default" size="sm" onClick={onLoginClick} className="rounded-full">
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