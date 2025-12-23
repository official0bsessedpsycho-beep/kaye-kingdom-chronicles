import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import MagicalBackground from '@/components/MagicalBackground';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import LifeChapters from '@/components/LifeChapters';
import FacebookImport from '@/components/FacebookImport';
import FilipinoFestivals from '@/components/FilipinoFestivals';
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

  const handleLoginClick = () => setIsAuthModalOpen(true);

  return (
    <>
      <Helmet>
        <title>Kaye's World | A Magical Journey</title>
        <meta name="description" content="Welcome to Kaye's private enchanted world - a magical space for life updates, memories, and cherished moments with family and friends." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <div className="relative min-h-screen bg-background overflow-hidden">
        {/* Subtle background */}
        <MagicalBackground showSnow={true} />
        
        {/* Navigation */}
        <Navbar onLoginClick={handleLoginClick} />
        
        {/* Main content */}
        <main className="relative z-10">
          <HeroSection onEnterClick={handleLoginClick} />
          <LifeChapters />
          <FacebookImport />
          <FilipinoFestivals />
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
