import React from 'react';
import { Button } from '@/components/ui/button';
import { ImageIcon, Share2, Sparkles } from 'lucide-react';

const FacebookImport: React.FC = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Decorative icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#1877F2]/20 border border-[#1877F2]/30 mb-6">
            <ImageIcon className="w-8 h-8 text-[#1877F2]" />
          </div>

          {/* Main heading */}
          <h2 className="font-magical text-3xl md:text-4xl text-foreground mb-4">
            Import Your Memories
          </h2>
          <p className="font-elegant text-xl text-[#1877F2] italic mb-2">
            from Facebook
          </p>

          {/* Filipino translation */}
          <p className="font-elegant text-muted-foreground mb-8">
            "I-share ang iyong mga alaala mula sa Facebook"
          </p>

          {/* Description */}
          <p className="font-clean text-muted-foreground mb-8 max-w-md mx-auto">
            Connect your Facebook account to import photos, memories, and special moments 
            to your enchanted timeline.
          </p>

          {/* CTA Button */}
          <Button 
            className="bg-[#1877F2] hover:bg-[#166FE5] text-white font-clean px-8 py-6 text-lg rounded-full group transition-all duration-300 hover:shadow-lg hover:shadow-[#1877F2]/30"
            onClick={() => {
              // Placeholder - will implement actual Facebook integration later
              console.log('Facebook connect clicked');
            }}
          >
            <Share2 className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
            Connect & Share
          </Button>

          {/* Decorative sparkles */}
          <div className="flex justify-center gap-8 mt-8 opacity-50">
            <Sparkles className="w-4 h-4 text-gold animate-pulse" />
            <Sparkles className="w-4 h-4 text-gold animate-pulse" style={{ animationDelay: '0.3s' }} />
            <Sparkles className="w-4 h-4 text-gold animate-pulse" style={{ animationDelay: '0.6s' }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FacebookImport;
