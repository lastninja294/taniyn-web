-- Create merch_items table for storing merchandise
CREATE TABLE IF NOT EXISTS public.merch_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.merch_items ENABLE ROW LEVEL SECURITY;

-- Create policies for admin access (we'll use a simple approach where any authenticated user can manage merch)
-- In production, you'd want more granular admin role-based access
CREATE POLICY "Allow authenticated users to view merch" ON public.merch_items
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to insert merch" ON public.merch_items
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update merch" ON public.merch_items
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete merch" ON public.merch_items
  FOR DELETE USING (auth.role() = 'authenticated');

-- Allow anonymous users to view merch (for the public website)
CREATE POLICY "Allow anonymous users to view merch" ON public.merch_items
  FOR SELECT USING (true);
