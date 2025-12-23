import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { logger } from '@/lib/logger';
import { DisplayNameSchema, InviteCodeSchema } from '@/lib/validation';
import { z } from 'zod';

interface Profile {
  id: string;
  user_id: string;
  display_name: string;
  relationship: 'family' | 'friend' | 'inner_circle' | 'pending';
  avatar_url: string | null;
  approved: boolean;
  created_at: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  isLoading: boolean;
  signUp: (email: string, password: string, displayName: string, inviteCode: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (error) {
        logger.error('Failed to fetch user profile', error);
        return;
      }

      setProfile(data);
    } catch (err) {
      logger.error('Failed to fetch user profile', err);
    }
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id);
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Defer profile fetch
          setTimeout(() => {
            fetchProfile(session.user.id);
          }, 0);
        } else {
          setProfile(null);
        }
        
        setIsLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchProfile(session.user.id);
      }
      
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (
    email: string, 
    password: string, 
    displayName: string, 
    inviteCode: string
  ): Promise<{ error: Error | null }> => {
    try {
      // Validate display name
      try {
        DisplayNameSchema.parse(displayName);
      } catch (error) {
        if (error instanceof z.ZodError) {
          return { error: new Error(error.errors[0].message) };
        }
      }

      // Validate and normalize invite code
      let normalizedCode: string;
      try {
        normalizedCode = InviteCodeSchema.parse(inviteCode);
      } catch (error) {
        if (error instanceof z.ZodError) {
          return { error: new Error(error.errors[0].message) };
        }
        return { error: new Error('Invalid invite code format') };
      }

      // Validate invite code first
      const { data: codeData, error: codeError } = await supabase
        .from('invite_codes')
        .select('*')
        .eq('code', normalizedCode)
        .eq('is_active', true)
        .maybeSingle();

      if (codeError || !codeData) {
        return { error: new Error('Invalid invite code. Please check your code and try again.') };
      }

      if (codeData.uses_count >= codeData.max_uses) {
        return { error: new Error('This invite code has reached its maximum uses.') };
      }

      if (codeData.expires_at && new Date(codeData.expires_at) < new Date()) {
        return { error: new Error('This invite code has expired.') };
      }

      // Sign up the user
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            display_name: displayName,
          }
        }
      });

      if (error) {
        return { error };
      }

      if (data.user) {
        // Use the secure RPC function to approve the user with invite code
        const { error: approvalError } = await supabase
          .rpc('approve_user_with_invite', {
            p_user_id: data.user.id,
            p_display_name: displayName,
            p_relationship: codeData.relationship
          });

        if (approvalError) {
          logger.error('Failed to approve user profile', approvalError);
        }

        // Increment the invite code usage (this might fail due to RLS, but that's ok)
        await supabase
          .from('invite_codes')
          .update({ uses_count: codeData.uses_count + 1 })
          .eq('id', codeData.id);
      }

      return { error: null };
    } catch (err) {
      return { error: err as Error };
    }
  };

  const signIn = async (email: string, password: string): Promise<{ error: Error | null }> => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { error };
      }

      return { error: null };
    } catch (err) {
      return { error: err as Error };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setProfile(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      profile,
      isLoading,
      signUp,
      signIn,
      signOut,
      refreshProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
