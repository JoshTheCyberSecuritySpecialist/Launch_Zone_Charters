/*
  # Set up Storage for image uploads

  1. Storage Configuration
    - Create public bucket for blog images
    - Enable public access for authenticated users
    - Set up RLS policies for secure access

  2. Security
    - Enable RLS on storage.buckets
    - Add policies for authenticated users to:
      - Read public images
      - Upload images (authenticated only)
      - Delete own images
*/

-- Create a new public bucket for blog images
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true);

-- Enable RLS
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Allow public access to images
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'blog-images');

-- Allow authenticated users to upload images
CREATE POLICY "Authenticated users can upload images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'blog-images'
  AND owner = auth.uid()
);

-- Allow users to update their own images
CREATE POLICY "Users can update own images"
ON storage.objects FOR UPDATE
TO authenticated
USING (owner = auth.uid())
WITH CHECK (bucket_id = 'blog-images');

-- Allow users to delete their own images
CREATE POLICY "Users can delete own images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'blog-images' AND owner = auth.uid());