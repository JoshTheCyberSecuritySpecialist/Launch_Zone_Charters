/*
  # Add blog posts table

  1. New Tables
    - `blog_posts`
      - `id` (uuid, primary key)
      - `title` (text)
      - `slug` (text, unique)
      - `summary` (text)
      - `content` (text)
      - `author` (text)
      - `featured_image` (text)
      - `tags` (text array)
      - `published_at` (timestamptz)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `blog_posts` table
    - Add policy for public to read published posts
*/

CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  summary text NOT NULL,
  content text NOT NULL,
  author text NOT NULL,
  featured_image text NOT NULL,
  tags text[] DEFAULT '{}',
  published_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public to read published blog posts"
  ON blog_posts
  FOR SELECT
  TO public
  USING (published_at <= now());

-- Create index for faster slug lookups
CREATE INDEX IF NOT EXISTS blog_posts_slug_idx ON blog_posts (slug);

-- Create index for published_at for efficient sorting
CREATE INDEX IF NOT EXISTS blog_posts_published_at_idx ON blog_posts (published_at DESC);