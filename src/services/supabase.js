import { createClient } from '@supabase/supabase-js';
// Substitua com seus dados do site do Supabase
export const supabase = createClient('https://qszbjazmskbharhkjgig.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFzemJqYXptc2tiaGFyaGtqZ2lnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM3ODg2MjYsImV4cCI6MjA4OTM2NDYyNn0.ZLyvqY1bWVxIwtFAAmwVOfGgAdkAYx6_18sW9EfJ5kw');