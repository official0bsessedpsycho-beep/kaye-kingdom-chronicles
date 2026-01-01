import React, { useRef, useState } from 'react';
import { useFileUpload } from '@/hooks/useFileUpload';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ImagePlus, X, Loader2 } from 'lucide-react';

interface ImageUploadProps {
  onUpload: (urls: string[]) => void;
  maxFiles?: number;
  existingImages?: string[];
  onRemove?: (url: string) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onUpload,
  maxFiles = 4,
  existingImages = [],
  onRemove,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const { uploadMultipleFiles, isUploading, uploadProgress } = useFileUpload();

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Limit number of files
    const remainingSlots = maxFiles - existingImages.length;
    const filesToUpload = files.slice(0, remainingSlots);

    // Create preview URLs
    const previews = filesToUpload.map(file => URL.createObjectURL(file));
    setPreviewUrls(previews);

    // Upload files
    const uploadedUrls = await uploadMultipleFiles(filesToUpload);

    // Clean up preview URLs
    previews.forEach(url => URL.revokeObjectURL(url));
    setPreviewUrls([]);

    if (uploadedUrls.length > 0) {
      onUpload(uploadedUrls);
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const canAddMore = existingImages.length < maxFiles && !isUploading;

  return (
    <div className="space-y-3">
      {/* Existing images grid */}
      {existingImages.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {existingImages.map((url, index) => (
            <div
              key={url}
              className="relative aspect-square rounded-lg overflow-hidden border border-border group"
            >
              <img
                src={url}
                alt={`Upload ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {onRemove && (
                <button
                  type="button"
                  onClick={() => onRemove(url)}
                  className="absolute top-1 right-1 w-6 h-6 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4 text-foreground" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Preview images being uploaded */}
      {previewUrls.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {previewUrls.map((url, index) => (
            <div
              key={url}
              className="relative aspect-square rounded-lg overflow-hidden border border-border opacity-60"
            >
              <img
                src={url}
                alt={`Preview ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-background/50">
                <Loader2 className="w-6 h-6 animate-spin text-gold" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload progress */}
      {isUploading && (
        <div className="space-y-1">
          <Progress value={uploadProgress} className="h-2" />
          <p className="text-xs text-muted-foreground text-center">
            Uploading... {uploadProgress}%
          </p>
        </div>
      )}

      {/* Add button */}
      {canAddMore && (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/gif,image/webp"
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            className="gap-2"
          >
            <ImagePlus className="w-4 h-4" />
            Add Photos
            <span className="text-muted-foreground">
              ({existingImages.length}/{maxFiles})
            </span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;