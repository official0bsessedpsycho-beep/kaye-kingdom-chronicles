import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export type PostAudience = 'family' | 'inner_circle' | 'friends' | 'everyone';

export interface Post {
  id: string;
  author_id: string;
  content: string | null;
  audience: PostAudience;
  created_at: string;
  updated_at: string;
  author?: {
    display_name: string;
    avatar_url: string | null;
    relationship: string;
  };
  media?: Array<{
    id: string;
    url: string;
    media_type: string;
  }>;
  reactions_count: number;
  comments_count: number;
  user_has_reacted: boolean;
}

export interface Comment {
  id: string;
  post_id: string;
  author_id: string;
  content: string;
  created_at: string;
  author?: {
    display_name: string;
    avatar_url: string | null;
  };
}

export const usePosts = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPosts = useCallback(async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      
      // Fetch posts
      const { data: postsData, error: postsError } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (postsError) throw postsError;

      // Fetch author profiles, media, reactions, and comments for each post
      const enrichedPosts = await Promise.all(
        (postsData || []).map(async (post) => {
          // Get author profile
          const { data: authorData } = await supabase
            .from('profiles')
            .select('display_name, avatar_url, relationship')
            .eq('user_id', post.author_id)
            .maybeSingle();

          // Get media
          const { data: mediaData } = await supabase
            .from('post_media')
            .select('id, url, media_type')
            .eq('post_id', post.id);

          // Get reactions count
          const { count: reactionsCount } = await supabase
            .from('reactions')
            .select('*', { count: 'exact', head: true })
            .eq('post_id', post.id);

          // Check if user has reacted
          const { data: userReaction } = await supabase
            .from('reactions')
            .select('id')
            .eq('post_id', post.id)
            .eq('user_id', user.id)
            .maybeSingle();

          // Get comments count
          const { count: commentsCount } = await supabase
            .from('comments')
            .select('*', { count: 'exact', head: true })
            .eq('post_id', post.id);

          return {
            ...post,
            author: authorData || undefined,
            media: mediaData || [],
            reactions_count: reactionsCount || 0,
            comments_count: commentsCount || 0,
            user_has_reacted: !!userReaction,
          } as Post;
        })
      );

      setPosts(enrichedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast.error('Failed to load posts');
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const createPost = async (content: string, audience: PostAudience, mediaUrls: string[] = []) => {
    if (!user) return null;

    try {
      // Create the post
      const { data: post, error: postError } = await supabase
        .from('posts')
        .insert({
          author_id: user.id,
          content,
          audience,
        })
        .select()
        .single();

      if (postError) throw postError;

      // Add media if any
      if (mediaUrls.length > 0) {
        const mediaInserts = mediaUrls.map((url) => ({
          post_id: post.id,
          url,
          media_type: 'image',
        }));

        const { error: mediaError } = await supabase
          .from('post_media')
          .insert(mediaInserts);

        if (mediaError) {
          console.error('Error adding media:', mediaError);
        }
      }

      toast.success('Post created!');
      await fetchPosts();
      return post;
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('Failed to create post');
      return null;
    }
  };

  const deletePost = async (postId: string) => {
    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', postId);

      if (error) throw error;

      toast.success('Post deleted');
      await fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error('Failed to delete post');
    }
  };

  const toggleReaction = async (postId: string) => {
    if (!user) return;

    try {
      // Check if user already reacted
      const { data: existing } = await supabase
        .from('reactions')
        .select('id')
        .eq('post_id', postId)
        .eq('user_id', user.id)
        .maybeSingle();

      if (existing) {
        // Remove reaction
        await supabase
          .from('reactions')
          .delete()
          .eq('id', existing.id);
      } else {
        // Add reaction
        await supabase
          .from('reactions')
          .insert({
            post_id: postId,
            user_id: user.id,
            reaction_type: 'heart',
          });
      }

      await fetchPosts();
    } catch (error) {
      console.error('Error toggling reaction:', error);
      toast.error('Failed to update reaction');
    }
  };

  const fetchComments = async (postId: string): Promise<Comment[]> => {
    try {
      const { data: commentsData, error } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', postId)
        .order('created_at', { ascending: true });

      if (error) throw error;

      // Enrich with author info
      const enrichedComments = await Promise.all(
        (commentsData || []).map(async (comment) => {
          const { data: authorData } = await supabase
            .from('profiles')
            .select('display_name, avatar_url')
            .eq('user_id', comment.author_id)
            .maybeSingle();

          return {
            ...comment,
            author: authorData || undefined,
          } as Comment;
        })
      );

      return enrichedComments;
    } catch (error) {
      console.error('Error fetching comments:', error);
      return [];
    }
  };

  const addComment = async (postId: string, content: string) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('comments')
        .insert({
          post_id: postId,
          author_id: user.id,
          content,
        })
        .select()
        .single();

      if (error) throw error;

      await fetchPosts();
      return data;
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error('Failed to add comment');
      return null;
    }
  };

  const deleteComment = async (commentId: string) => {
    try {
      const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', commentId);

      if (error) throw error;

      await fetchPosts();
    } catch (error) {
      console.error('Error deleting comment:', error);
      toast.error('Failed to delete comment');
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // Set up realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel('posts-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'posts',
        },
        () => {
          fetchPosts();
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'comments',
        },
        () => {
          fetchPosts();
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'reactions',
        },
        () => {
          fetchPosts();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchPosts]);

  return {
    posts,
    isLoading,
    createPost,
    deletePost,
    toggleReaction,
    fetchComments,
    addComment,
    deleteComment,
    refreshPosts: fetchPosts,
  };
};
