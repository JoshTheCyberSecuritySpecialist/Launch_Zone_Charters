/*
  # Create bookings table

  1. New Tables
    - `bookings`
      - `id` (uuid, primary key)
      - `full_name` (text)
      - `email` (text)
      - `phone` (text, optional)
      - `tour_type` (text)
      - `participants` (integer)
      - `special_requests` (text, optional)
      - `selected_date` (date)
      - `price` (numeric)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `bookings` table
    - Add policy for public users to insert bookings
*/

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  tour_type text NOT NULL,
  participants integer NOT NULL,
  special_requests text,
  selected_date date NOT NULL,
  price numeric NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'bookings' 
    AND policyname = 'Allow public to insert bookings'
  ) THEN
    CREATE POLICY "Allow public to insert bookings"
      ON bookings
      FOR INSERT
      TO public
      WITH CHECK (true);
  END IF;
END $$;