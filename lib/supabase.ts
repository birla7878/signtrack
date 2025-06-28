// Simple mock for standalone app
export const supabase = {
  auth: {
    getUser: () =>
      Promise.resolve({
        data: { user: { id: "demo", email: "demo@signtrack.com" } },
        error: null,
      }),
    signInWithPassword: () => Promise.resolve({ data: {}, error: null }),
    signUp: () => Promise.resolve({ data: {}, error: null }),
    signOut: () => Promise.resolve({ error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
  },
}
