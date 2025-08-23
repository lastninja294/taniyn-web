-- Creating separate seed data script for better reliability
-- Insert sample merch data
INSERT INTO public.merch_items (title, description, image_url) VALUES
('Art Collection', 'Exclusive TANIYN art pieces and prints', '/abstract-pink-geometric-pattern.png'),
('History Archive', 'Vintage TANIYN memorabilia and collectibles', '/vintage-historical-photo-bw.png'),
('Nature Series', 'Organic-inspired TANIYN merchandise', '/fox-deer-forest.png'),
('Tech Gear', 'Modern TANIYN electronic accessories', '/modern-gaming-setup.png'),
('Space Edition', 'Cosmic TANIYN limited edition items', '/earth-from-space.png')
ON CONFLICT DO NOTHING;

-- Insert sample concert data
INSERT INTO public.concerts (title, venue, date_time, description) VALUES
('TANIYN Live: Retro Future', 'Cyber Arena, Neo Tokyo', '2024-03-15 20:00:00+00', 'Experience TANIYN''s signature retro-futuristic sound in an immersive cyberpunk setting. This exclusive performance features new tracks from the upcoming album alongside classic hits, all enhanced with cutting-edge visual effects and holographic displays.'),
('Analog Dreams Tour', 'Vintage Hall, Berlin', '2024-04-22 19:30:00+00', 'A nostalgic journey through TANIYN''s analog-inspired compositions. This intimate venue provides the perfect acoustic environment for experiencing the warm, tape-saturated sounds that define the TANIYN aesthetic. Limited seating for an exclusive audience.'),
('Digital Synthesis Festival', 'Electronic Dome, Los Angeles', '2024-05-18 21:00:00+00', 'Join TANIYN at the premier electronic music festival, featuring a collaborative set with renowned synthesizer artists. This high-energy performance showcases the evolution of electronic music from vintage analog to modern digital synthesis.')
ON CONFLICT DO NOTHING;
