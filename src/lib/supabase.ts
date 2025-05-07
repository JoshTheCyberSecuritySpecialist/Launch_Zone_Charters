import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const tourPrices = {
  'rocket-premium': 150,
  'rocket-private': 600,
  'rocket-standby': 85,
  'bio-premium': 69,
  'bio-private': 300,
  'bio-standby': 40,
} as const;

export type TourType = keyof typeof tourPrices;

export interface BookingFormData {
  full_name: string;
  email: string;
  phone?: string;
  tour_type: TourType;
  participants: number;
  special_requests?: string;
  selected_date: Date;
  price: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  author: string;
  featured_image: string;
  tags: string[];
  published_at: string;
  created_at: string;
}