"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { supabaseClient } from "@/lib/supabase/client";

type User = {
  id: string;
  email: string;
} | null;

type AuthContextType = {
  user: User;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for active session on mount
    const checkSession = async () => {
      try {
        const { data, error } = await supabaseClient.auth.getSession();

        if (error) {
          console.error("Error checking session:", error);
          setUser(null);
        } else if (data && data.session) {
          const { data: userData } = await supabaseClient.auth.getUser();
          setUser(
            userData.user
              ? {
                  id: userData.user.id,
                  email: userData.user.email || "",
                }
              : null
          );
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Session check error:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Set up auth state change listener
    const { data: authListener } = supabaseClient.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session) {
          setUser({
            id: session.user?.id || "unknown",
            email: session.user?.email || "",
          });
        } else if (event === "SIGNED_OUT") {
          setUser(null);
          router.push("/");
        }
      }
    );

    return () => {
      // Clean up the subscription
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, [router]);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
      });

      return { error: error ? new Error(error.message) : null };
    } catch (error) {
      console.error("Sign in error:", error);
      return {
        error: error instanceof Error ? error : new Error("Failed to sign in"),
      };
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      console.log("Attempting to sign up with:", email);

      // Add additional options for signup
      const { data, error } = await supabaseClient.auth.signUp({
        email,
        password,
        options: {
          // You can uncomment this if you want to automatically confirm users in development
          // emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            // Add any additional user metadata here
            full_name: email.split("@")[0], // Just as an example
          },
        },
      });

      console.log("Signup response:", {
        user: data?.user ? { id: data.user.id, email: data.user.email } : null,
        error: error ? { message: error.message } : null,
      });

      if (data?.user) {
        console.log("User created successfully:", data.user.id);
        console.log("Check your email for confirmation link");
      }

      return { error: error ? new Error(error.message) : null };
    } catch (error) {
      console.error("Sign up error:", error);
      return {
        error: error instanceof Error ? error : new Error("Failed to sign up"),
      };
    }
  };

  const signOut = async () => {
    try {
      await supabaseClient.auth.signOut();
      setUser(null);
      router.push("/");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
