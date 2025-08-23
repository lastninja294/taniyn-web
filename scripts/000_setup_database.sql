-- Creating a consolidated database setup script that should execute properly
-- Create merch_items table for storing merchandise
CREATE TABLE IF NOT EXISTS public.merch_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create concerts table for storing upcoming concerts
CREATE TABLE IF NOT EXISTS public.concerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  venue TEXT NOT NULL,
  date_time TIMESTAMP WITH TIME ZONE NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on both tables
ALTER TABLE public.merch_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.concerts ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to view data (for public website)
CREATE POLICY "Allow public read access to merch" ON public.merch_items
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access to concerts" ON public.concerts
  FOR SELECT USING (true);

-- Allow authenticated users full access (for admin)
CREATE POLICY "Allow authenticated full access to merch" ON public.merch_items
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated full access to concerts" ON public.concerts
  FOR ALL USING (auth.role() = 'authenticated');

-- Insert sample data for merch_items
INSERT INTO public.merch_items (title, description, image_url) VALUES
('Art Collection', 'Exclusive TANIYN art pieces and prints', '/abstract-pink-geometric-pattern.png'),
('History Archive', 'Vintage TANIYN memorabilia and collectibles', '/vintage-historical-photo-bw.png'),
('Nature Series', 'Organic-inspired TANIYN merchandise', '/fox-deer-forest.png'),
('Tech Gear', 'Modern TANIYN electronic accessories', '/modern-gaming-setup.png'),
('Space Edition', 'Cosmic TANIYN limited edition items', '/earth-from-space.png')
ON CONFLICT DO NOTHING;

-- Insert sample data for concerts
INSERT INTO public.concerts (title, venue, date_time, description) VALUES
('TANIYN Live: Retro Future', 'Cyber Arena, Neo Tokyo', '2024-03-15 20:00:00+00', 'Experience TANIYN''s signature retro-futuristic sound in an immersive cyberpunk setting. This exclusive performance features new tracks from the upcoming album alongside classic hits, all enhanced with cutting-edge visual effects and holographic displays.'),
('Analog Dreams Tour', 'Vintage Hall, Berlin', '2024-04-22 19:30:00+00', 'A nostalgic journey through TANIYN''s analog-inspired compositions. This intimate venue provides the perfect acoustic environment for experiencing the warm, tape-saturated sounds that define the TANIYN aesthetic. Limited seating for an exclusive audience.'),
('Digital Synthesis Festival', 'Electronic Dome, Los Angeles', '2024-05-18 21:00:00+00', 'Join TANIYN at the premier electronic music festival, featuring a collaborative set with renowned synthesizer artists. This high-energy performance showcases the evolution of electronic music from vintage analog to modern digital synthesis.')
ON CONFLICT DO NOTHING;
