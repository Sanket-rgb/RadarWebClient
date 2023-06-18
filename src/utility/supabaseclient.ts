import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_ENDPOINT,
  import.meta.env.VITE_SUPABASE_PUB_KEY
);

export default supabase;