import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { logger } from '@/lib/logger';
import { toast } from '@/hooks/use-toast';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

export function useFileUpload() {
  const { user } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const validateFile = useCallback((file: File): string | null => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return 'Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.';
    }
    if (file.size > MAX_FILE_SIZE) {
      return 'File too large. Maximum size is 5MB.';
    }
    return null;
  }, []);

  const uploadFile = useCallback(async (file: File): Promise<string | null> => {
    if (!user) {
      toast({
        title: 'Error',
        description: 'You must be logged in to upload files.',
        variant: 'destructive',
      });
      return null;
    }

    const validationError = validateFile(file);
    if (validationError) {
      toast({
        title: 'Invalid File',
        description: validationError,
        variant: 'destructive',
      });
      return null;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Generate unique filename
      const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
      const fileName = `${user.id}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      // Simulate progress (Supabase doesn't provide upload progress natively)
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90));
      }, 100);

      const { error: uploadError } = await supabase.storage
        .from('post-media')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
        });

      clearInterval(progressInterval);

      if (uploadError) {
        logger.error('File upload failed', { error: uploadError.message });
        toast({
          title: 'Upload Failed',
          description: 'Failed to upload file. Please try again.',
          variant: 'destructive',
        });
        return null;
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('post-media')
        .getPublicUrl(fileName);

      setUploadProgress(100);
      
      logger.info('File uploaded successfully', { fileName });
      
      return urlData.publicUrl;
    } catch (err) {
      logger.error('Unexpected upload error', { error: String(err) });
      toast({
        title: 'Upload Error',
        description: 'An unexpected error occurred during upload.',
        variant: 'destructive',
      });
      return null;
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  }, [user, validateFile]);

  const uploadMultipleFiles = useCallback(async (files: File[]): Promise<string[]> => {
    const urls: string[] = [];
    
    for (const file of files) {
      const url = await uploadFile(file);
      if (url) {
        urls.push(url);
      }
    }
    
    return urls;
  }, [uploadFile]);

  const deleteFile = useCallback(async (fileUrl: string): Promise<boolean> => {
    if (!user) return false;

    try {
      // Extract file path from URL
      const urlParts = fileUrl.split('/post-media/');
      if (urlParts.length !== 2) {
        logger.error('Invalid file URL format');
        return false;
      }

      const filePath = urlParts[1];

      const { error } = await supabase.storage
        .from('post-media')
        .remove([filePath]);

      if (error) {
        logger.error('File deletion failed', { error: error.message });
        return false;
      }

      logger.info('File deleted successfully', { filePath });
      return true;
    } catch (err) {
      logger.error('Unexpected deletion error', { error: String(err) });
      return false;
    }
  }, [user]);

  return {
    uploadFile,
    uploadMultipleFiles,
    deleteFile,
    isUploading,
    uploadProgress,
    validateFile,
  };
}