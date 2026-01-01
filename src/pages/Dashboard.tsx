import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useAdmin } from '@/hooks/useAdmin';
import MagicalBackground from '@/components/MagicalBackground';
import NotificationBell from '@/components/NotificationBell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  LogOut, 
  BookOpen, 
  GraduationCap, 
  Heart, 
  Users, 
  Home, 
  Plane, 
  Camera, 
  Star,
  Sparkles,
  Shield
} from 'lucide-react';
import { toast } from 'sonner';

const menuItems = [
  { icon: BookOpen, title: "Life Updates", tagalog: "Mga Balita sa Buhay", href: "/timeline" },
  { icon: GraduationCap, title: "Academic", tagalog: "Pag-aaral", href: "#" },
  { icon: Heart, title: "Love Story", tagalog: "Kwento ng Pag-ibig", href: "#" },
  { icon: Users, title: "Friends", tagalog: "Mga Kaibigan", href: "#" },
  { icon: Home, title: "Family", tagalog: "Pamilya", href: "#" },
  { icon: Plane, title: "Travel", tagalog: "Paglalakbay", href: "#" },
  { icon: Camera, title: "Gallery", tagalog: "Mga Larawan", href: "#" },
  { icon: Star, title: "Special Moments", tagalog: "Espesyal na Sandali", href: "#" },
];

const Dashboard: React.FC = () => {
  const { user, profile, isLoading, signOut } = useAuth();
  const { isAdmin } = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/');
    }
  }, [user, isLoading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    toast.success('Paalam! See you again soon!');
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Sparkles className="w-12 h-12 text-gold animate-pulse mx-auto mb-4" />
          <p className="font-magical text-xl text-foreground">Loading your magical world...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const getRelationshipLabel = (relationship: string | undefined) => {
    switch (relationship) {
      case 'family': return '👨‍👩‍👧 Family';
      case 'friend': return '🤝 Friend';
      case 'inner_circle': return '💫 Inner Circle';
      default: return '✨ Member';
    }
  };

  return (
    <>
      <Helmet>
        <title>Dashboard | Kaye's Enchanted Life</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="relative min-h-screen bg-background">
        <MagicalBackground showSnow={true} />

        <div className="relative z-10 min-h-screen">
          {/* Header */}
          <header className="border-b border-border/30 backdrop-blur-sm bg-background/50">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sparkles className="w-8 h-8 text-gold" />
                <div>
                  <h1 className="font-magical text-xl text-gradient-gold">Kaye's World</h1>
                  <p className="font-elegant text-xs text-muted-foreground italic">Maligayang Pasko!</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                  <p className="font-clean text-sm text-foreground">{profile?.display_name || user.email}</p>
                  <p className="font-clean text-xs text-gold">{getRelationshipLabel(profile?.relationship)}</p>
                </div>
                
                <NotificationBell />
                
                {isAdmin && (
                  <Link to="/admin">
                    <Button variant="ghost" size="icon" className="text-gold">
                      <Shield className="w-5 h-5" />
                    </Button>
                  </Link>
                )}
                
                <Button variant="ghost" size="icon" onClick={handleSignOut}>
                  <LogOut className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </header>

          {/* Welcome Section */}
          <section className="py-12 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-magical text-3xl md:text-4xl text-gradient-gold mb-4">
                Maligayang pagdating, {profile?.display_name?.split(' ')[0] || 'Friend'}!
              </h2>
              <p className="font-elegant text-lg text-muted-foreground italic">
                Welcome to Kaye's enchanted world. Explore her journey through life.
              </p>
            </div>
          </section>

          {/* Menu Grid */}
          <section className="pb-24 px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {menuItems.map((item, index) => {
                  const isLink = item.href !== '#';
                  const cardContent = (
                    <Card 
                      className="group relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:border-gold/50 transition-all duration-500 hover:scale-105 hover:shadow-magical cursor-pointer animate-fade-in h-full"
                      style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'both' }}
                    >
                      <CardHeader className="pb-2">
                        <div className="w-12 h-12 rounded-full bg-primary/20 border border-gold/20 flex items-center justify-center mx-auto group-hover:border-gold/50 group-hover:bg-primary/30 transition-all duration-300">
                          <item.icon className="w-6 h-6 text-gold group-hover:scale-110 transition-transform" />
                        </div>
                      </CardHeader>
                      <CardContent className="text-center pt-0">
                        <CardTitle className="font-magical text-base text-foreground group-hover:text-gold transition-colors mb-1">
                          {item.title}
                        </CardTitle>
                        <p className="font-elegant text-xs text-primary italic">
                          {item.tagalog}
                        </p>
                      </CardContent>
                    </Card>
                  );
                  
                  return isLink ? (
                    <Link key={item.title} to={item.href} className="block">
                      {cardContent}
                    </Link>
                  ) : (
                    <div key={item.title} className="block">
                      {cardContent}
                    </div>
                  );
                })}
              </div>

              {/* Coming Soon Notice */}
              <div className="mt-12 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20">
                  <Star className="w-4 h-4 text-gold" />
                  <span className="font-clean text-sm text-gold">More features coming soon!</span>
                </div>
                <p className="font-elegant text-sm text-muted-foreground mt-4 italic">
                  This magical space is still being crafted with love ✨
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
