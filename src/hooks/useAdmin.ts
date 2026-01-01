import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { logger } from '@/lib/logger';
import { toast } from '@/hooks/use-toast';

export interface AdminStats {
  total_users: number;
  approved_users: number;
  pending_users: number;
  total_posts: number;
  total_comments: number;
  total_reactions: number;
  posts_last_week: number;
  signups_last_week: number;
}

export interface ActivityLog {
  id: string;
  user_id: string | null;
  action: string;
  entity_type: string | null;
  entity_id: string | null;
  metadata: Record<string, unknown>;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
}

export interface PendingUser {
  id: string;
  user_id: string;
  display_name: string;
  relationship: string;
  created_at: string;
}

export function useAdmin() {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [recentActivity, setRecentActivity] = useState<ActivityLog[]>([]);
  const [pendingUsers, setPendingUsers] = useState<PendingUser[]>([]);

  // Check if current user is admin
  const checkAdminStatus = useCallback(async () => {
    if (!user) {
      setIsAdmin(false);
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.rpc('is_admin', { _user_id: user.id });

      if (error) {
        logger.error('Error checking admin status', { error: error.message });
        setIsAdmin(false);
      } else {
        setIsAdmin(!!data);
      }
    } catch (err) {
      logger.error('Unexpected error checking admin status', { error: String(err) });
      setIsAdmin(false);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Fetch admin dashboard data
  const fetchAdminData = useCallback(async () => {
    if (!user || !isAdmin) return;

    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) return;

      const response = await supabase.functions.invoke('admin-stats', {
        headers: {
          Authorization: `Bearer ${session.session.access_token}`,
        },
      });

      if (response.error) {
        logger.error('Error fetching admin data', { error: response.error.message });
        toast({
          title: 'Error',
          description: 'Failed to fetch admin dashboard data.',
          variant: 'destructive',
        });
        return;
      }

      const data = response.data;
      setStats(data.stats || null);
      setRecentActivity(data.recentActivity || []);
      setPendingUsers(data.pendingUsers || []);
    } catch (err) {
      logger.error('Unexpected error fetching admin data', { error: String(err) });
    }
  }, [user, isAdmin]);

  // Approve a pending user
  const approveUser = useCallback(async (
    userId: string, 
    relationship: 'family' | 'inner_circle' | 'friend'
  ): Promise<boolean> => {
    if (!user || !isAdmin) return false;

    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) return false;

      const response = await supabase.functions.invoke('approve-user', {
        body: { user_id: userId, relationship },
        headers: {
          Authorization: `Bearer ${session.session.access_token}`,
        },
      });

      if (response.error) {
        logger.error('Error approving user', { error: response.error.message });
        toast({
          title: 'Error',
          description: 'Failed to approve user.',
          variant: 'destructive',
        });
        return false;
      }

      // Remove from pending list
      setPendingUsers(prev => prev.filter(u => u.user_id !== userId));
      
      // Update stats
      if (stats) {
        setStats({
          ...stats,
          approved_users: stats.approved_users + 1,
          pending_users: stats.pending_users - 1,
        });
      }

      toast({
        title: 'User Approved',
        description: 'The user has been approved successfully.',
      });

      return true;
    } catch (err) {
      logger.error('Unexpected error approving user', { error: String(err) });
      return false;
    }
  }, [user, isAdmin, stats]);

  // Log activity
  const logActivity = useCallback(async (
    action: string,
    entityType?: string,
    entityId?: string,
    metadata?: Record<string, unknown>
  ) => {
    try {
      await supabase.functions.invoke('log-activity', {
        body: {
          action,
          entity_type: entityType,
          entity_id: entityId,
          metadata,
        },
      });
    } catch (err) {
      // Silently fail - logging shouldn't break the app
      logger.error('Failed to log activity', { error: String(err) });
    }
  }, []);

  useEffect(() => {
    checkAdminStatus();
  }, [checkAdminStatus]);

  useEffect(() => {
    if (isAdmin) {
      fetchAdminData();
    }
  }, [isAdmin, fetchAdminData]);

  return {
    isAdmin,
    isLoading,
    stats,
    recentActivity,
    pendingUsers,
    approveUser,
    logActivity,
    refreshAdminData: fetchAdminData,
  };
}