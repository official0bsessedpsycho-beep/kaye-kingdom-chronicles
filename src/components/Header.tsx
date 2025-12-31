import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Sparkles, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About Kaye', href: '#about' },
    { name: 'Chapters', href: '#chapters' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Family & Friends', href: '#family' },
  ];

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out",
      isScrolled
        ? "bg-glass-emerald border-b border-[#c5a059]/30 shadow-lg py-3"
        : "bg-gradient-to-b from-[#05110a]/90 to-transparent py-6 border-transparent"
    )}>
      {/* Top decorative line for premium feel - subtle gold gradient */}
      <div className={cn(
        "absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#c5a059]/60 to-transparent transition-opacity duration-500",
        isScrolled ? "opacity-100" : "opacity-0"
      )} />

      <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between">

        {/* Logo Section */}
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className={cn(
            "relative flex items-center justify-center rounded-full transition-all duration-500 border border-[#c5a059]",
            isScrolled ? "w-10 h-10 bg-[#0a1f12]/80" : "w-12 h-12 bg-gradient-to-br from-[#0f2e1b] to-[#05110a] shadow-[0_0_15px_rgba(197,160,89,0.3)]"
          )}>
            <Crown className={cn(
              "text-[#ffd700] transition-all duration-500",
              isScrolled ? "w-5 h-5" : "w-6 h-6"
            )} strokeWidth={1.5} />
          </div>

          <div className="flex flex-col">
            <span className={cn(
              "font-magical text-[#e8dcb8] tracking-wide leading-none transition-all duration-500",
              isScrolled ? "text-xl" : "text-2xl lg:text-3xl"
            )}>
              kaye<span className="text-[#c5a059]">.life</span>
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative group py-2"
            >
              <span className="relative z-10 font-elegant text-[16px] text-[#e8dcb8] group-hover:text-[#ffd700] transition-colors duration-300 tracking-wider">
                {link.name}
              </span>

              {/* Premium Underline Effect */}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#c5a059] transition-all duration-300 group-hover:w-full" />

              {/* Sparkle on hover */}
              <Sparkles className="absolute -top-1 -right-2 w-2 h-2 text-[#ffd700] opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-300" />
            </a>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          <button className={cn(
            "hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 group",
            isScrolled ? "bg-[#0f2e1b]/30 border-[#c5a059]/20" : "bg-[#0f2e1b]/50 border-[#c5a059]/40"
          )}>
            <img src="https://flagcdn.com/w40/ph.png" alt="PH" className="w-5 h-auto rounded-[2px] shadow-sm" />
            <span className="text-[#c5a059]/40 text-xs">|</span>
            <img src="https://flagcdn.com/w40/us.png" alt="US" className="w-5 h-auto rounded-[2px] shadow-sm" />
            <span className="font-magical text-xs text-[#e8dcb8] group-hover:text-[#ffd700] ml-1">EN</span>
            <ChevronDown className="w-3 h-3 text-[#c5a059]/70 group-hover:text-[#c5a059]" />
          </button>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-[#c5a059] hover:bg-[#c5a059]/10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>
      {/* Mobile Menu */}
      <div className={cn(
        "md:hidden absolute top-full left-0 right-0 bg-[#0a1f12]/95 backdrop-blur-xl border-b border-[#c5a059]/30 shadow-2xl transition-all duration-300 overflow-hidden",
        isMobileMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
      )}>
        <nav className="flex flex-col p-6 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="font-magical text-lg text-[#e8dcb8] hover:text-[#c5a059] hover:pl-2 transition-all duration-300 border-l-2 border-transparent hover:border-[#c5a059]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <div className="h-px bg-[#c5a059]/20 my-4" />
          <div className="flex items-center gap-3 text-[#e8dcb8]">
            <span>Language:</span>
            <div className="flex items-center gap-2 px-3 py-1 rounded border border-[#c5a059]/30 bg-[#0f2e1b]">
              <img src="https://flagcdn.com/w40/ph.png" alt="PH" className="w-5 h-auto rounded-[2px]" />
              <span className="text-[#c5a059]/30">|</span>
              <img src="https://flagcdn.com/w40/us.png" alt="US" className="w-5 h-auto rounded-[2px]" />
              <span className="font-magical text-sm ml-1 text-[#e8dcb8]">EN</span>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
