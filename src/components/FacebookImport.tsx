import React from 'react';
import { Button } from '@/components/ui/button';
import { ImageIcon, Share2 } from 'lucide-react';

const FacebookImport: React.FC = () => {
  return (
    <section className="relative py-16 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#1877F2]/10 border border-[#1877F2]/20 mb-5">
            <ImageIcon className="w-7 h-7 text-[#1877F2]" />
          </div>

          {/* Heading */}
          <h2 className="font-magical text-2xl md:text-3xl text-foreground mb-2">
            Bring in your photos
          </h2>

          {/* Subtitle */}
          <p className="font-elegant text-muted-foreground mb-6">
            Connect Facebook to import memories here
          </p>

          {/* Description */}
          <p className="font-clean text-sm text-muted-foreground mb-6 max-w-md mx-auto">
            Sync your favorite photos and keep everything in one cozy spot.
          </p>

          {/* CTA Button */}
          <Button 
            className="bg-[#1877F2] hover:bg-[#166FE5] text-white font-clean px-6 py-5 rounded-full group transition-all duration-200 hover:shadow-lg"
            onClick={() => {
              console.log('Facebook connect clicked');
            }}
          >
            <Share2 className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
            Connect Facebook
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FacebookImport;