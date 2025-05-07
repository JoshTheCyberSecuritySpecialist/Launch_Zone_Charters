import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';

interface ImageUploadProps {
  onUploadComplete: (url: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUploadComplete }) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be less than 5MB');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload to Supabase
    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const { data, error } = await supabase.storage
        .from('blog-images')
        .upload(fileName, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('blog-images')
        .getPublicUrl(fileName);

      onUploadComplete(publicUrl);
      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const clearPreview = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full">
      <div className="relative border-2 border-dashed border-steel-gray/50 rounded-lg p-6">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept="image/*"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={uploading}
        />
        
        {preview ? (
          <div className="relative">
            <img
              src={preview}
              alt="Upload preview"
              className="w-full h-48 object-cover rounded-lg"
            />
            <button
              onClick={clearPreview}
              className="absolute top-2 right-2 p-1 bg-error/90 text-white rounded-full hover:bg-error transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-6">
            {uploading ? (
              <>
                <Loader2 className="h-10 w-10 text-rocket-red animate-spin" />
                <p className="mt-2 text-sm text-gray-400">Uploading image...</p>
              </>
            ) : (
              <>
                <div className="bg-rocket-red/10 p-3 rounded-full mb-4">
                  <Upload className="h-6 w-6 text-rocket-red" />
                </div>
                <p className="text-sm text-gray-300 text-center">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  PNG, JPG or GIF (max. 5MB)
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;