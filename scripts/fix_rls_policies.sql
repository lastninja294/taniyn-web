-- Disable RLS temporarily or create policies that allow all operations
-- Since we're not using Supabase auth, we need to either disable RLS or create permissive policies

-- Option 1: Disable RLS (simpler for admin-only access)
ALTER TABLE merch_items DISABLE ROW LEVEL SECURITY;
ALTER TABLE concerts DISABLE ROW LEVEL SECURITY;

-- Option 2: If you prefer to keep RLS enabled, create permissive policies
-- DROP POLICY IF EXISTS "Allow read access to merch_items" ON merch_items;
-- DROP POLICY IF EXISTS "Allow full access to merch_items for authenticated users" ON merch_items;
-- DROP POLICY IF EXISTS "Allow read access to concerts" ON concerts;
-- DROP POLICY IF EXISTS "Allow full access to concerts for authenticated users" ON concerts;

-- CREATE POLICY "Allow all operations on merch_items" ON merch_items FOR ALL USING (true) WITH CHECK (true);
-- CREATE POLICY "Allow all operations on concerts" ON concerts FOR ALL USING (true) WITH CHECK (true);
