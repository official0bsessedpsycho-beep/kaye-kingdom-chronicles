import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Comment } from '@/hooks/usePosts';
import { useAuth } from '@/contexts/AuthContext';
import { formatDistanceToNow } from 'date-fns';
import { Send, Trash2, Sparkles } from 'lucide-react';

interface CommentSectionProps {
  comments: Comment[];
  isLoading: boolean;
  onAddComment: (content: string) => Promise<void>;
  onDeleteComment: (commentId: string) => Promise<void>;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  comments,
  isLoading,
  onAddComment,
  onDeleteComment,
}) => {
  const { user, profile } = useAuth();
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || isSubmitting) return;

    setIsSubmitting(true);
    await onAddComment(newComment.trim());
    setNewComment('');
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-3">
      {/* Comment Input */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-primary/20 border border-gold/30 flex items-center justify-center flex-shrink-0">
          {profile?.avatar_url ? (
            <img 
              src={profile.avatar_url} 
              alt={profile.display_name} 
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <Sparkles className="w-4 h-4 text-gold" />
          )}
        </div>
        <Input
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 bg-input/50 border-border/50 text-sm font-clean"
        />
        <Button 
          type="submit" 
          size="icon"
          disabled={!newComment.trim() || isSubmitting}
          className="bg-primary hover:bg-primary/90"
        >
          <Send className="w-4 h-4" />
        </Button>
      </form>

      {/* Comments List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-4">
          <Sparkles className="w-5 h-5 text-gold animate-pulse" />
        </div>
      ) : comments.length === 0 ? (
        <p className="text-center text-sm text-muted-foreground font-clean py-2">
          No comments yet. Be the first to comment!
        </p>
      ) : (
        <div className="space-y-3 max-h-60 overflow-y-auto">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-start gap-2 group">
              <div className="w-8 h-8 rounded-full bg-primary/20 border border-gold/30 flex items-center justify-center flex-shrink-0">
                {comment.author?.avatar_url ? (
                  <img 
                    src={comment.author.avatar_url} 
                    alt={comment.author.display_name} 
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <Sparkles className="w-4 h-4 text-gold" />
                )}
              </div>
              
              <div className="flex-1 bg-input/30 rounded-lg px-3 py-2">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-magical text-xs text-foreground">
                    {comment.author?.display_name || 'Unknown'}
                  </p>
                  <span className="text-[10px] text-muted-foreground font-clean">
                    {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                  </span>
                </div>
                <p className="font-elegant text-sm text-foreground mt-1">
                  {comment.content}
                </p>
              </div>

              {user?.id === comment.author_id && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDeleteComment(comment.id)}
                  className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentSection;
