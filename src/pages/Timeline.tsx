import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { usePosts, PostAudience } from '@/hooks/usePosts';
import MagicalBackground from '@/components/MagicalBackground';
import CreatePostForm from '@/components/timeline/CreatePostForm';
import PostCard from '@/components/timeline/PostCard';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft,
  Sparkles,
  RefreshCw
} from 'lucide-react';

const Timeline: React.FC = () => {
  const { user, profile, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const {
    posts,
    isLoading: postsLoading,
    createPost,
    deletePost,
    toggleReaction,
    fetchComments,
    addComment,
    deleteComment,
    refreshPosts,
  } = usePosts();

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/');
    }
  }, [user, authLoading, navigate]);

  const handleCreatePost = async (content: string, audience: PostAudience) => {
    setIsSubmitting(true);
    await createPost(content, audience);
    setIsSubmitting(false);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Sparkles className="w-12 h-12 text-gold animate-pulse mx-auto mb-4" />
          <p className="font-magical text-xl text-foreground">Loading your magical timeline...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Timeline | Kaye's Enchanted Life</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="relative min-h-screen bg-background">
        <MagicalBackground showSnow={true} />

        <div className="relative z-10 min-h-screen">
          {/* Header */}
          <header className="sticky top-0 z-20 border-b border-border/30 backdrop-blur-md bg-background/80">
            <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Link to="/dashboard">
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <ArrowLeft className="w-5 h-5" />
                  </Button>
                </Link>
                <div>
                  <h1 className="font-magical text-lg text-gradient-gold">Timeline</h1>
                  <p className="font-elegant text-xs text-muted-foreground italic">Mga Balita sa Buhay</p>
                </div>
              </div>

              <Button 
                variant="ghost" 
                size="icon" 
                onClick={refreshPosts}
                className="h-9 w-9"
              >
                <RefreshCw className={`w-5 h-5 ${postsLoading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </header>

          {/* Main Content */}
          <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
            {/* Create Post Form */}
            <CreatePostForm 
              onSubmit={handleCreatePost} 
              isSubmitting={isSubmitting}
            />

            {/* Posts Feed */}
            {postsLoading && posts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Sparkles className="w-10 h-10 text-gold animate-pulse mb-4" />
                <p className="font-elegant text-muted-foreground">Loading magical moments...</p>
              </div>
            ) : posts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/20 border border-gold/30 flex items-center justify-center mb-4">
                  <Sparkles className="w-8 h-8 text-gold" />
                </div>
                <h3 className="font-magical text-lg text-foreground mb-2">No posts yet</h3>
                <p className="font-elegant text-muted-foreground max-w-xs">
                  Be the first to share a magical moment! Start by creating a post above.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {posts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onDelete={deletePost}
                    onToggleReaction={toggleReaction}
                    onFetchComments={fetchComments}
                    onAddComment={addComment}
                    onDeleteComment={deleteComment}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
};

export default Timeline;
