import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Lock, Mail, User, Key, Sparkles, Heart, Users, Home } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { z } from 'zod';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const emailSchema = z.string().email('Please enter a valid email address');
const passwordSchema = z.string().min(6, 'Password must be at least 6 characters');
const nameSchema = z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long');
const inviteCodeSchema = z.string().min(1, 'Invite code is required');

const relationshipOptions = [
  { value: 'family', label: 'Family', tagalog: 'Pamilya', icon: Home },
  { value: 'friend', label: 'Friend', tagalog: 'Kaibigan', icon: Users },
  { value: 'inner_circle', label: 'Inner Circle', tagalog: 'Malapit na Kaibigan', icon: Heart },
];

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { signIn, signUp } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRelationship, setSelectedRelationship] = useState('');
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Signup form state
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      emailSchema.parse(loginEmail);
      passwordSchema.parse(loginPassword);
    } catch (err) {
      if (err instanceof z.ZodError) {
        toast.error(err.errors[0].message);
        return;
      }
    }
    
    setIsLoading(true);
    
    const { error } = await signIn(loginEmail, loginPassword);
    
    if (error) {
      if (error.message.includes('Invalid login credentials')) {
        toast.error('Invalid email or password. Please try again.');
      } else {
        toast.error(error.message);
      }
    } else {
      toast.success('Maligayang pagbabalik! Welcome back!');
      onClose();
    }
    
    setIsLoading(false);
  };
  
  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      nameSchema.parse(signupName);
      emailSchema.parse(signupEmail);
      passwordSchema.parse(signupPassword);
      inviteCodeSchema.parse(inviteCode);
    } catch (err) {
      if (err instanceof z.ZodError) {
        toast.error(err.errors[0].message);
        return;
      }
    }
    
    setIsLoading(true);
    
    const { error } = await signUp(signupEmail, signupPassword, signupName, inviteCode);
    
    if (error) {
      if (error.message.includes('User already registered')) {
        toast.error('An account with this email already exists. Please login instead.');
      } else {
        toast.error(error.message);
      }
    } else {
      toast.success('Maligayang pagdating sa mundo ni Kaye! Welcome to Kaye\'s world!');
      onClose();
    }
    
    setIsLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card border-border/50 backdrop-blur-xl">
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-emerald-dark flex items-center justify-center glow-emerald">
              <Sparkles className="w-8 h-8 text-gold" />
            </div>
          </div>
          <DialogTitle className="font-magical text-2xl text-center text-gradient-gold">
            Enter Kaye's World
          </DialogTitle>
          <p className="font-elegant text-sm text-muted-foreground italic">
            Maligayang pagdating! Welcome!
          </p>
        </DialogHeader>
        
        <Tabs defaultValue="login" className="mt-4">
          <TabsList className="grid w-full grid-cols-2 bg-muted/50">
            <TabsTrigger value="login" className="font-magical data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Login
            </TabsTrigger>
            <TabsTrigger value="signup" className="font-magical data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Request Access
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="mt-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email" className="font-clean text-sm">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="your@email.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="pl-10 bg-input border-border focus:border-gold"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="login-password" className="font-clean text-sm">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="pl-10 bg-input border-border focus:border-gold"
                    required
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                variant="magical" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Entering...' : 'Enter Portal'}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="signup" className="mt-6">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-name" className="font-clean text-sm">Your Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder="Juan Dela Cruz"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    className="pl-10 bg-input border-border focus:border-gold"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signup-email" className="font-clean text-sm">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="your@email.com"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    className="pl-10 bg-input border-border focus:border-gold"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="font-clean text-sm">Your Relationship (for reference)</Label>
                <div className="grid grid-cols-3 gap-2">
                  {relationshipOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setSelectedRelationship(option.value)}
                      className={`p-3 rounded-lg border transition-all duration-300 flex flex-col items-center gap-1 ${
                        selectedRelationship === option.value
                          ? 'border-gold bg-gold/10 text-gold'
                          : 'border-border hover:border-primary/50 text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <option.icon className="w-5 h-5" />
                      <span className="text-xs font-clean">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="invite-code" className="font-clean text-sm">Invite Code</Label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="invite-code"
                    type="text"
                    placeholder="KAYE-FAMILY-2024"
                    value={inviteCode}
                    onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                    className="pl-10 bg-input border-border focus:border-gold uppercase"
                    required
                  />
                </div>
                <p className="text-xs text-muted-foreground font-clean">
                  Ask Kaye or a family member for an invite code
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signup-password" className="font-clean text-sm">Create Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="••••••••"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    className="pl-10 bg-input border-border focus:border-gold"
                    required
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                variant="gold" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Requesting...' : 'Request Access'}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
        
        <p className="mt-4 text-center text-xs text-muted-foreground font-clean">
          🔒 This is a private family space. Unauthorized access is not permitted.
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
