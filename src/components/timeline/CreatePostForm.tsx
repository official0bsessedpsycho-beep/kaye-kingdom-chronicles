import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { PostAudience } from '@/hooks/usePosts';
import { Send, Users, Heart, Star, Globe, Sparkles } from 'lucide-react';

interface CreatePostFormProps {
  onSubmit: (content: string, audience: PostAudience) => Promise<void>;
  isSubmitting?: boolean;
}

const audienceOptions: { value: PostAudience; label: string; tagalog: string; icon: React.ReactNode }[] = [
  { value: 'everyone', label: 'Everyone', tagalog: 'Lahat', icon: <Globe className="w-4 h-4" /> },
  { value: 'friends', label: 'Friends', tagalog: 'Mga Kaibigan', icon: <Users className="w-4 h-4" /> },
  { value: 'inner_circle', label: 'Inner Circle', tagalog: 'Malapit na Kaibigan', icon: <Star className="w-4 h-4" /> },
  { value: 'family', label: 'Family Only', tagalog: 'Pamilya Lamang', icon: <Heart className="w-4 h-4" /> },
];

const CreatePostForm: React.FC<CreatePostFormProps> = ({ onSubmit, isSubmitting }) => {
  const { profile } = useAuth();
  const [content, setContent] = useState('');
  const [audience, setAudience] = useState<PostAudience>('everyone');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    await onSubmit(content.trim(), audience);
    setContent('');
  };

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
      <CardContent className="p-4 md:p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-start gap-3">
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-primary/20 border border-gold/30 flex items-center justify-center flex-shrink-0">
              {profile?.avatar_url ? (
                <img 
                  src={profile.avatar_url} 
                  alt={profile.display_name} 
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <Sparkles className="w-5 h-5 text-gold" />
              )}
            </div>

            {/* Text Input */}
            <div className="flex-1">
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Ano ang nasa isip mo? (What's on your mind?)"
                className="min-h-[80px] resize-none bg-input/50 border-border/50 focus:border-gold/50 font-elegant text-base placeholder:text-muted-foreground/60"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-2 border-t border-border/30">
            <Select value={audience} onValueChange={(v) => setAudience(v as PostAudience)}>
              <SelectTrigger className="w-[180px] bg-input/50 border-border/50 font-clean text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                {audienceOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value} className="font-clean">
                    <div className="flex items-center gap-2">
                      {option.icon}
                      <span>{option.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button 
              type="submit" 
              disabled={!content.trim() || isSubmitting}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-clean"
            >
              {isSubmitting ? (
                <Sparkles className="w-4 h-4 animate-pulse" />
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Post
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreatePostForm;
