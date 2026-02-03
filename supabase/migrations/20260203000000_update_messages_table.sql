-- Drop the phone column from messages table as it is not used in the contact form
ALTER TABLE public.messages DROP COLUMN IF EXISTS phone;
