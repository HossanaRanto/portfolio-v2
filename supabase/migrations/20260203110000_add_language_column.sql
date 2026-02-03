-- Add language column to projects table
ALTER TABLE projects 
ADD COLUMN language TEXT NOT NULL DEFAULT 'en';

-- Add language column to experiences table
ALTER TABLE experiences
ADD COLUMN language TEXT NOT NULL DEFAULT 'en';
