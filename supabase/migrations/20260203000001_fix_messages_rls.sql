-- Fix RLS policies for messages to ensure public inserts work
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Drop potentially conflicting or malformed policies
DROP POLICY IF EXISTS "Anyone can insert messages" ON public.messages;
DROP POLICY IF EXISTS "Public messages are viewable by everyone" ON public.messages; -- Just in case
DROP POLICY IF EXISTS "Authenticated users can view messages" ON public.messages;
DROP POLICY IF EXISTS "Authenticated users can update messages" ON public.messages;
DROP POLICY IF EXISTS "Authenticated users can delete messages" ON public.messages;

-- Re-create the policies clearly

-- 1. INSERT: Allow absolutely everyone (anon + authenticated) to insert
CREATE POLICY "Enable insert for all users" 
ON public.messages FOR INSERT 
TO public 
WITH CHECK (true);

-- 2. SELECT: Only authenticated users (Admin)
CREATE POLICY "Enable read for authenticated users only" 
ON public.messages FOR SELECT 
TO authenticated 
USING (true);

-- 3. UPDATE: Only authenticated users (Admin)
CREATE POLICY "Enable update for authenticated users only" 
ON public.messages FOR UPDATE 
TO authenticated 
USING (true);

-- 4. DELETE: Only authenticated users (Admin)
CREATE POLICY "Enable delete for authenticated users only" 
ON public.messages FOR DELETE 
TO authenticated 
USING (true);
