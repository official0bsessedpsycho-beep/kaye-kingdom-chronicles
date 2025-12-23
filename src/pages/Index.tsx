import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import MagicalBackground from '@/components/MagicalBackground';
import HeroSection from '@/components/HeroSection';
import FeaturePreview from '@/components/FeaturePreview';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';

const Index: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <>
      <Helmet>
        <title>Kaye's Enchanted Life | A Magical Journey</title>
        <meta name="description" content="Welcome to Kaye's private enchanted world - a magical space for life updates, memories, and cherished moments with family and friends." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <div className="relative min-h-screen bg-background overflow-hidden">
        {/* Magical animated background */}
        <MagicalBackground showSnow={true} />
        
        {/* Main content */}
        <main className="relative z-10">
          <HeroSection onEnterClick={() => setIsAuthModalOpen(true)} />
          <FeaturePreview />
          <Footer />
        </main>
        
        {/* Auth Modal */}
        <AuthModal 
          isOpen={isAuthModalOpen} 
          onClose={() => setIsAuthModalOpen(false)} 
        />
      </div>
    </>
  );
};

export default Index;
