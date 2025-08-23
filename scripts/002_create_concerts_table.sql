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

-- Enable RLS
ALTER TABLE public.concerts ENABLE ROW LEVEL SECURITY;

-- Create policies for admin access
CREATE POLICY "Allow authenticated users to view concerts" ON public.concerts
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to insert concerts" ON public.concerts
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update concerts" ON public.concerts
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete concerts" ON public.concerts
  FOR DELETE USING (auth.role() = 'authenticated');

-- Allow anonymous users to view concerts (for the public website)
CREATE POLICY "Allow anonymous users to view concerts" ON public.concerts
  FOR SELECT USING (true);
