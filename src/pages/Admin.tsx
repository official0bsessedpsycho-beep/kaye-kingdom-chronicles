import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from '@/contexts/AuthContext';
import { useAdmin } from '@/hooks/useAdmin';
import MagicalBackground from '@/components/MagicalBackground';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ArrowLeft,
  Users,
  FileText,
  MessageCircle,
  Heart,
  TrendingUp,
  UserPlus,
  Shield,
  Sparkles,
  Clock,
} from 'lucide-react';

const Admin: React.FC = () => {
  const { user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const {
    isAdmin,
    isLoading: adminLoading,
    stats,
    recentActivity,
    pendingUsers,
    approveUser,
    refreshAdminData,
  } = useAdmin();

  const [selectedRelationship, setSelectedRelationship] = React.useState<Record<string, string>>({});

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!adminLoading && !isAdmin && user) {
      navigate('/dashboard');
    }
  }, [isAdmin, adminLoading, user, navigate]);

  const handleApprove = async (userId: string) => {
    const relationship = selectedRelationship[userId] as 'family' | 'inner_circle' | 'friend';
    if (!relationship) return;
    await approveUser(userId, relationship);
  };

  if (authLoading || adminLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-12 h-12 text-gold animate-pulse mx-auto mb-4" />
          <p className="font-magical text-xl text-foreground">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | Kaye's Enchanted Life</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="relative min-h-screen bg-background">
        <MagicalBackground showSnow={false} />

        <div className="relative z-10 min-h-screen">
          {/* Header */}
          <header className="sticky top-0 z-20 border-b border-border/30 backdrop-blur-md bg-background/80">
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Link to="/dashboard">
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <ArrowLeft className="w-5 h-5" />
                  </Button>
                </Link>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-gold" />
                  <h1 className="font-magical text-lg text-gradient-gold">Admin Dashboard</h1>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={refreshAdminData}>
                Refresh
              </Button>
            </div>
          </header>

          {/* Main Content */}
          <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="bg-card/50 backdrop-blur-sm border-border/30">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/20 rounded-lg">
                      <Users className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{stats?.total_users || 0}</p>
                      <p className="text-xs text-muted-foreground">Total Users</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/30">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-500/20 rounded-lg">
                      <UserPlus className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{stats?.approved_users || 0}</p>
                      <p className="text-xs text-muted-foreground">Approved</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/30">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <FileText className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{stats?.total_posts || 0}</p>
                      <p className="text-xs text-muted-foreground">Posts</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/30">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-rose-500/20 rounded-lg">
                      <Heart className="w-5 h-5 text-rose-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{stats?.total_reactions || 0}</p>
                      <p className="text-xs text-muted-foreground">Reactions</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Weekly Stats */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/30">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base font-magical">
                  <TrendingUp className="w-4 h-4 text-gold" />
                  This Week
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-8">
                  <div>
                    <p className="text-3xl font-bold text-green-400">{stats?.signups_last_week || 0}</p>
                    <p className="text-sm text-muted-foreground">New signups</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-blue-400">{stats?.posts_last_week || 0}</p>
                    <p className="text-sm text-muted-foreground">New posts</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-amber-400">{stats?.total_comments || 0}</p>
                    <p className="text-sm text-muted-foreground">Total comments</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Pending Users */}
              <Card className="bg-card/50 backdrop-blur-sm border-border/30">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base font-magical">
                    <Clock className="w-4 h-4 text-amber-400" />
                    Pending Approvals
                    {pendingUsers.length > 0 && (
                      <Badge variant="destructive" className="ml-2">
                        {pendingUsers.length}
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {pendingUsers.length === 0 ? (
                    <div className="text-center py-8">
                      <Sparkles className="w-8 h-8 text-muted-foreground/50 mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">No pending approvals</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {pendingUsers.map((pendingUser) => (
                        <div
                          key={pendingUser.id}
                          className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-border/20"
                        >
                          <div>
                            <p className="font-medium text-foreground">{pendingUser.display_name}</p>
                            <p className="text-xs text-muted-foreground">
                              Requested: {formatDistanceToNow(new Date(pendingUser.created_at), { addSuffix: true })}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Select
                              value={selectedRelationship[pendingUser.user_id] || ''}
                              onValueChange={(value) => 
                                setSelectedRelationship(prev => ({ ...prev, [pendingUser.user_id]: value }))
                              }
                            >
                              <SelectTrigger className="w-32 h-8 text-xs">
                                <SelectValue placeholder="Role" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="family">Family</SelectItem>
                                <SelectItem value="inner_circle">Inner Circle</SelectItem>
                                <SelectItem value="friend">Friend</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button
                              size="sm"
                              className="h-8"
                              disabled={!selectedRelationship[pendingUser.user_id]}
                              onClick={() => handleApprove(pendingUser.user_id)}
                            >
                              Approve
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="bg-card/50 backdrop-blur-sm border-border/30">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base font-magical">
                    <MessageCircle className="w-4 h-4 text-blue-400" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {recentActivity.length === 0 ? (
                    <div className="text-center py-8">
                      <MessageCircle className="w-8 h-8 text-muted-foreground/50 mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">No recent activity</p>
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-[300px] overflow-y-auto">
                      {recentActivity.slice(0, 10).map((activity) => (
                        <div
                          key={activity.id}
                          className="flex items-start gap-3 p-2 hover:bg-background/30 rounded-lg transition-colors"
                        >
                          <div className="w-2 h-2 rounded-full bg-gold mt-2" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-foreground truncate">
                              {activity.action.replace(/_/g, ' ')}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Admin;