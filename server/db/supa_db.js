import { createClient } from "@supabase/supabase-js";

const supaBase = () =>
  createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

export { supaBase };
