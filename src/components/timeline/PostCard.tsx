import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Post, Comment } from '@/hooks/usePosts';
import { useAuth } from '@/contexts/AuthContext';
import { formatDistanceToNow } from 'date-fns';
import { 
  Heart, 
  MessageCircle, 
  Trash2, 
  MoreHorizontal,
  Users,
  Star,
  Globe,
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import CommentSection from './CommentSection';
import { cn } from '@/lib/utils';

interface PostCardProps {
  post: Post;
  onDelete: (postId: string) => Promise<void>;
  onToggleReaction: (postId: string) => Promise<void>;
  onFetchComments: (postId: string) => Promise<Comment[]>;
  onAddComment: (postId: string, content: string) => Promise<Comment | null>;
  onDeleteComment: (commentId: string) => Promise<void>;
}

const audienceIcons: Record<string, React.ReactNode> = {
  everyone: <Globe className="w-3 h-3" />,
  friends: <Users className="w-3 h-3" />,
  inner_circle: <Star className="w-3 h-3" />,
  family: <Heart className="w-3 h-3" />,
};

const audienceLabels: Record<string, string> = {
  everyone: 'Everyone',
  friends: 'Friends',
  inner_circle: 'Inner Circle',
  family: 'Family',
};

const PostCard: React.FC<PostCardProps> = ({
  post,
  onDelete,
  onToggleReaction,
  onFetchComments,
  onAddComment,
  onDeleteComment,
}) => {
  const { user } = useAuth();
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);

  const isAuthor = user?.id === post.author_id;
  const timeAgo = formatDistanceToNow(new Date(post.created_at), { addSuffix: true });

  const handleToggleComments = async () => {
    if (!showComments && comments.length === 0) {
      setIsLoadingComments(true);
      const fetchedComments = await onFetchComments(post.id);
      setComments(fetchedComments);
      setIsLoadingComments(false);
    }
    setShowComments(!showComments);
  };

  const handleAddComment = async (content: string) => {
    const newComment = await onAddComment(post.id, content);
    if (newComment) {
      // Refresh comments
      const fetchedComments = await onFetchComments(post.id);
      setComments(fetchedComments);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    await onDeleteComment(commentId);
    // Refresh comments
    const fetchedComments = await onFetchComments(post.id);
    setComments(fetchedComments);
  };

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden animate-fade-in hover:border-gold/30 transition-colors duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {/* Author Avatar */}
            <div className="w-10 h-10 rounded-full bg-primary/20 border border-gold/30 flex items-center justify-center">
              {post.author?.avatar_url ? (
                <img 
                  src={post.author.avatar_url} 
                  alt={post.author.display_name} 
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <Sparkles className="w-5 h-5 text-gold" />
              )}
            </div>

            {/* Author Info */}
            <div>
              <p className="font-magical text-sm text-foreground">
                {post.author?.display_name || 'Unknown'}
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground font-clean">
                <span>{timeAgo}</span>
                <span>•</span>
                <div className="flex items-center gap-1">
                  {audienceIcons[post.audience]}
                  <span>{audienceLabels[post.audience]}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions Menu */}
          {isAuthor && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-popover border-border">
                <DropdownMenuItem 
                  onClick={() => onDelete(post.id)}
                  className="text-destructive focus:text-destructive font-clean"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Post
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        {/* Post Content */}
        {post.content && (
          <p className="font-elegant text-base text-foreground whitespace-pre-wrap leading-relaxed">
            {post.content}
          </p>
        )}

        {/* Media Grid */}
        {post.media && post.media.length > 0 && (
          <div className={cn(
            "mt-3 gap-2",
            post.media.length === 1 ? "block" : "grid grid-cols-2"
          )}>
            {post.media.map((media) => (
              <div 
                key={media.id} 
                className="rounded-lg overflow-hidden bg-background/50"
              >
                <img 
                  src={media.url} 
                  alt="" 
                  className="w-full h-auto max-h-80 object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex-col pt-0">
        {/* Reaction Stats */}
        {(post.reactions_count > 0 || post.comments_count > 0) && (
          <div className="w-full flex items-center justify-between py-2 border-y border-border/30 text-xs text-muted-foreground font-clean">
            {post.reactions_count > 0 && (
              <div className="flex items-center gap-1">
                <Heart className="w-3 h-3 text-destructive fill-destructive" />
                <span>{post.reactions_count} {post.reactions_count === 1 ? 'like' : 'likes'}</span>
              </div>
            )}
            {post.comments_count > 0 && (
              <button 
                onClick={handleToggleComments}
                className="hover:underline"
              >
                {post.comments_count} {post.comments_count === 1 ? 'comment' : 'comments'}
              </button>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="w-full flex items-center gap-2 pt-2">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onToggleReaction(post.id)}
            className={cn(
              "flex-1 font-clean",
              post.user_has_reacted && "text-destructive"
            )}
          >
            <Heart className={cn(
              "w-4 h-4 mr-2",
              post.user_has_reacted && "fill-destructive"
            )} />
            {post.user_has_reacted ? 'Liked' : 'Like'}
          </Button>

          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleToggleComments}
            className="flex-1 font-clean"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Comment
            {showComments ? (
              <ChevronUp className="w-4 h-4 ml-1" />
            ) : (
              <ChevronDown className="w-4 h-4 ml-1" />
            )}
          </Button>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="w-full mt-3 pt-3 border-t border-border/30">
            <CommentSection
              comments={comments}
              isLoading={isLoadingComments}
              onAddComment={handleAddComment}
              onDeleteComment={handleDeleteComment}
            />
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default PostCard;
