import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import MagicalBackground from '@/components/MagicalBackground';
import HeroSection from '@/components/HeroSection';
import LifeChaptersMap from '@/components/LifeChaptersMap';
import FestiveCelebrations from '@/components/FestiveCelebrations';
import FeaturePreview from '@/components/FeaturePreview';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';
import { useAuth } from '@/contexts/AuthContext';

const Index: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (!isLoading && user) {
      navigate('/dashboard');
    }
  }, [user, isLoading, navigate]);

  return (
    <>
      <Helmet>
        <title>Kaye's World | A Magical Journey Through Life</title>
        <meta name="description" content="Welcome to Kaye's private enchanted world - a magical space for life updates, memories, and cherished moments with family and friends. Mahal Kita, Kaibigan & Pamilya." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <div className="relative min-h-screen bg-background overflow-hidden">
        {/* Magical animated background */}
        <MagicalBackground showSnow={true} />
        
        {/* Main content */}
        <main className="relative z-10">
          <HeroSection onEnterClick={() => setIsAuthModalOpen(true)} />
          <LifeChaptersMap />
          <FestiveCelebrations />
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
