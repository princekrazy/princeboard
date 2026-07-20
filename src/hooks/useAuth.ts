import { supabase } from "../lib/supabase";

export async function createGuest() {
  const { data, error } = await supabase.auth.signInAnonymously();

  if (error) throw error;

  return data.user;
}
