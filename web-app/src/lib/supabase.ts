// src/lib/supabase.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY as string

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error('Missing Supabase env variables VITE_SUPABASE_URL or VITE_SUPABASE_KEY')
}

export const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY)