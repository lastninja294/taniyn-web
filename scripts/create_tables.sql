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


-- Create social_links table
CREATE TABLE IF NOT EXISTS public.social_links (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  subtitle VARCHAR(200),
  url TEXT NOT NULL,
  icon_name VARCHAR(50) NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create click_stats table for tracking clicks
CREATE TABLE IF NOT EXISTS public.click_stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  social_link_id UUID REFERENCES social_links(id) ON DELETE CASCADE,
  clicked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_agent TEXT,
  ip_address INET
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_social_links_display_order ON social_links(display_order);
CREATE INDEX IF NOT EXISTS idx_social_links_active ON social_links(is_active);
CREATE INDEX IF NOT EXISTS idx_click_stats_social_link_id ON click_stats(social_link_id);
CREATE INDEX IF NOT EXISTS idx_click_stats_clicked_at ON click_stats(clicked_at);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for social_links
CREATE TRIGGER update_social_links_updated_at 
    BEFORE UPDATE ON social_links 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();



-- Enable RLS
ALTER TABLE public.merch_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.concerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.click_stats ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "merch_select_policy" ON public.merch_items FOR SELECT USING (true);
CREATE POLICY "concerts_select_policy" ON public.concerts FOR SELECT USING (true);
CREATE POLICY "social_links_select_policy" ON public.social_links FOR SELECT USING (true);
CREATE POLICY "click_stats_select_policy" ON public.click_stats FOR SELECT USING (true);


-- Allow public read access for active links
CREATE POLICY "Public can view active social links" ON public.social_links
    FOR SELECT USING (is_active = true);


-- Policies for click_stats table
-- Allow public insert for click tracking
CREATE POLICY "Public can insert click stats" ON public.click_stats
    FOR INSERT WITH CHECK (true);




-- Authenticated full access
CREATE POLICY "merch_all_policy" ON public.merch_items FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "concerts_all_policy" ON public.concerts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "social_links_all_policy" ON public.social_links FOR ALL USING (auth.role() = 'authenticated');
