import React from 'react';
import { Crown, Sparkles, Scroll, Feather } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#05110a] border-t border-[#c5a059]/30 pt-16 pb-8 overflow-hidden">
      {/* Background Texture Overlay */}
      <div className="absolute inset-0 bg-texture-paper opacity-5 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 text-center md:text-left">

          {/* Left Column: Archives */}
          <div className="space-y-6">
            <h3 className="font-magical text-[#c5a059] text-xl flex items-center justify-center md:justify-start gap-2">
              <Scroll className="w-5 h-5" />
              Enchanted Archives
            </h3>
            <ul className="space-y-3 font-elegant text-[#e8dcb8]/80">
              {['The Journey Begins', 'Life Chapters', 'Gallery of Memories', 'Family Tree'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-[#ffd700] transition-colors flex items-center justify-center md:justify-start gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Center Column: Crest */}
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="relative w-24 h-24 flex items-center justify-center rounded-full border-2 border-[#c5a059]/40 bg-[#0a1f12]/50 shadow-[0_0_30px_rgba(197,160,89,0.1)]">
              <Crown className="w-12 h-12 text-[#ffd700] drop-shadow-md" strokeWidth={1} />
              <div className="absolute inset-0 border border-[#c5a059]/20 rounded-full scale-110" />
            </div>
            <div className="text-center">
              <h2 className="font-magical text-3xl text-gradient-gold tracking-widest mb-1">KAYE.LIFE</h2>
              <p className="font-clean text-xs text-[#c5a059]/60 tracking-[0.3em] uppercase">Est. {currentYear}</p>
            </div>
          </div>

          {/* Right Column: Owl Post */}
          <div className="space-y-6">
            <h3 className="font-magical text-[#c5a059] text-xl flex items-center justify-center md:justify-end gap-2">
              Owl Post
              <Feather className="w-5 h-5" />
            </h3>
            <p className="font-elegant text-[#e8dcb8]/70 text-sm md:text-right leading-relaxed">
              Send your magical wishes and memories to be stored in the eternal pensieve.
            </p>
            <div className="flex justify-center md:justify-end gap-4">
              {/* Social placeholders styled as magical runes/icons could go here */}
              <div className="w-10 h-10 rounded-full border border-[#c5a059]/30 flex items-center justify-center hover:bg-[#c5a059]/10 transition-colors cursor-pointer text-[#e8dcb8]">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#c5a059]/30 to-transparent mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-clean tracking-wider text-[#c5a059]/50">
          <p>© {currentYear} Kaye's Enchanted Life. All moments cherished.</p>

          <p className="flex items-center gap-2">
            Managed by the <span className="text-[#c5a059] font-bold">Department of Magical Memories</span>
          </p>
        </div>

        <div className="mt-8 text-center">
          <p className="font-elegant italic text-[#c5a059]/80 text-sm">
            "Maligayang Pasko at Manigong Bagong Taon!"
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
