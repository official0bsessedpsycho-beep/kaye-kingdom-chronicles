import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import MagicalBackground from '@/components/MagicalBackground';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import LifeChapters from '@/components/LifeChapters';
import FacebookConnect from '@/components/FacebookConnect';
import FestiveCelebrations from '@/components/FestiveCelebrations';
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
        <title>Kaye's Enchanted Life | A Magical Journey</title>
        <meta name="description" content="Welcome to Kaye's private enchanted world - a magical space for life updates, memories, and cherished moments with family and friends." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="relative min-h-screen bg-background overflow-hidden selection:bg-gold/30 selection:text-white">
        {/* Magical animated background */}
        <MagicalBackground showSnow={true} />

        {/* Main content */}
        <main className="relative z-10 flex flex-col min-h-screen">
          <Header />

          <section id="about" className="relative scroll-mt-24">
            <HeroSection onEnterClick={() => setIsAuthModalOpen(true)} />
          </section>

          <section className="relative z-20 -mt-20 md:-mt-32 pb-20">
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-background/90 z-0 pointer-events-none" />
            <LifeChapters />
          </section>

          <FacebookConnect />

          <FestiveCelebrations />

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
