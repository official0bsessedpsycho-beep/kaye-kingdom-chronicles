import React, { useState, useEffect } from 'react';
import { Menu, ChevronDown, Sparkles, Crown } from 'lucide-react';
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
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out border-b border-white/5",
      isScrolled
        ? "bg-[#0a1f12]/95 backdrop-blur-md py-2 border-[#c5a059]/30 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
        : "bg-gradient-to-b from-[#05110a]/90 to-transparent py-6 border-transparent"
    )}>
      {/* Top decorative line for premium feel */}
      <div className={cn(
        "absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#c5a059]/50 to-transparent transition-opacity duration-500",
        isScrolled ? "opacity-100" : "opacity-0"
      )} />

      <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-4">
          <div className="relative group cursor-pointer">
            {/* Glowing effect behind the crown */}
            <div className="absolute inset-0 bg-gold/40 blur-lg rounded-full opacity-50 group-hover:opacity-80 transition-opacity duration-500" />

            <div className="relative w-12 h-12 flex items-center justify-center bg-gradient-to-br from-[#0f2e1b] to-[#05110a] rounded-full border border-[#c5a059] shadow-[0_0_15px_rgba(197,160,89,0.3)] group-hover:shadow-[0_0_25px_rgba(197,160,89,0.5)] transition-all duration-300">
              <Crown className="w-6 h-6 text-[#ffd700] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] filter transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-magical text-2xl lg:text-3xl text-[#e8dcb8] tracking-wide leading-none drop-shadow-md group-hover:text-white transition-colors">
              kaye<span className="text-[#c5a059]">.life</span>
            </span>
            <div className="h-[1px] w-full bg-gradient-to-r from-[#c5a059]/0 via-[#c5a059]/50 to-[#c5a059]/0 mt-1" />
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-12">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="font-elegant text-[17px] text-[#e8dcb8] hover:text-[#c5a059] transition-all duration-300 relative group tracking-wider"
            >
              {link.name}
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-[#c5a059] transition-all duration-300 group-hover:w-full opacity-60" />
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <Sparkles className="w-2 h-2 text-[#c5a059]" />
              </div>
            </a>
          ))}
        </nav>

        {/* Right Section: Language & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <button className="hidden sm:flex items-center gap-2 px-4 py-[6px] rounded-full bg-[#0f2e1b]/50 border border-[#c5a059]/30 hover:border-[#c5a059]/70 hover:bg-[#0f2e1b]/80 transition-all duration-300 group">
            <span className="text-base filter drop-shadow">🇵🇭</span>
            <span className="text-[#c5a059]/30">|</span>
            <span className="font-magical text-sm text-[#e8dcb8] group-hover:text-white transition-colors">EN</span>
            <ChevronDown className="w-3 h-3 text-[#c5a059]/70 group-hover:text-[#c5a059]" />
          </button>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-[#c5a059] hover:bg-[#c5a059]/10 hover:text-[#e8dcb8]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "md:hidden absolute top-full left-0 right-0 bg-[#0a1f12]/98 backdrop-blur-xl border-b border-[#c5a059]/20 shadow-2xl transition-all duration-300 overflow-hidden",
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
            <span className="px-2 py-1 rounded border border-[#c5a059]/30 bg-[#0f2e1b]">EN</span>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
