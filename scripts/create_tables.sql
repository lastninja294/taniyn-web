-- Creating a simplified, reliable database setup script
-- Create merch_items table
CREATE TABLE IF NOT EXISTS public.merch_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create concerts table
CREATE TABLE IF NOT EXISTS public.concerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  venue TEXT NOT NULL,
  date_time TIMESTAMP WITH TIME ZONE NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.merch_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.concerts ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "merch_select_policy" ON public.merch_items FOR SELECT USING (true);
CREATE POLICY "concerts_select_policy" ON public.concerts FOR SELECT USING (true);

-- Authenticated full access
CREATE POLICY "merch_all_policy" ON public.merch_items FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "concerts_all_policy" ON public.concerts FOR ALL USING (auth.role() = 'authenticated');
