-- Insert initial merch items
INSERT INTO public.merch_items (title, description, image_url) VALUES
('Vintage Cassette Collection', 'Limited edition retro cassette tapes with exclusive TANIYN tracks', '/abstract-pink-geometric-pattern.png'),
('Retro Tech Gear', 'Classic audio equipment and vintage electronics for the modern audiophile', '/vintage-historical-photo-bw.png'),
('Nature Sounds Series', 'Ambient recordings from forests and natural environments', '/fox-deer-forest.png'),
('Digital Studio Pack', 'Professional audio software and digital tools for music production', '/modern-gaming-setup.png'),
('Cosmic Frequencies', 'Space-inspired ambient music and interstellar soundscapes', '/earth-from-space.png')
ON CONFLICT DO NOTHING;

-- Insert initial concert data
INSERT INTO public.concerts (title, venue, date_time, description) VALUES
('TANIYN Live: Retro Futures', 'The Underground, Berlin', '2024-03-15 20:00:00+00', 'An immersive audiovisual experience combining retro-futuristic sounds with cutting-edge technology. Join us for an evening of experimental electronic music.'),
('Ambient Nights', 'Warehouse 23, London', '2024-03-22 19:30:00+00', 'A intimate acoustic session featuring ambient compositions and live sound manipulation. Limited seating for an exclusive audience experience.'),
('Digital Dreamscape', 'Metro Arts Center, Tokyo', '2024-04-05 21:00:00+00', 'A collaborative performance with visual artists, creating a multi-sensory journey through digital landscapes and synthetic emotions.')
ON CONFLICT DO NOTHING;
