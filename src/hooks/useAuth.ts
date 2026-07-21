import { useEffect, useState } from "react";

import { supabase } from "../lib/supabase";

export function useAuth() {
  const [user, setUser] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getSession() {
      const { data } = await supabase.auth.getSession();

      setUser(data.session?.user ?? null);

      setLoading(false);
    }

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      },
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  async function signInGuest() {
    const { data, error } = await supabase.auth.signInAnonymously();

    if (error) {
      console.error(error);

      return;
    }

    setUser(data.user);
  }

  async function signOut() {
    await supabase.auth.signOut();

    setUser(null);
  }

  return {
    user,

    loading,

    signInGuest,

    signOut,
  };
}
