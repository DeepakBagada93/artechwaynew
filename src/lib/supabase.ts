import { createBrowserClient } from '@supabase/ssr'

// This file is intended for client-side Supabase access.
// Do not use it on the server, as it may not have access to the necessary
// environment variables.

// Ensure that the environment variables are defined before using them.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and Anon Key must be defined in your environment variables.');
}

export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);
