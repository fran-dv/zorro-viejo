import type {
  AuthActionResponse,
  AuthProvider,
  CheckResponse,
} from "@refinedev/core";

import { supabase } from "@/api";
import { Paths } from "@/routing";

export const AuthErrorsNames = {
  InvalidCredentials: "invalid credentials",
  NetworkError: "network error",
} as const;

export const authProvider: AuthProvider = {
  login: async ({ email, password }): Promise<AuthActionResponse> => {
    if (!navigator.onLine) {
      return {
        success: false,
        error: {
          message: "No internet conection",
          name: AuthErrorsNames.NetworkError,
        },
      };
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error.status === 400) {
        return {
          success: false,
          error: {
            message: "Invalid email or password",
            name: AuthErrorsNames.InvalidCredentials,
          },
        };
      }
      return {
        success: false,
        error,
      };
    }

    if (data?.user) {
      return {
        success: true,
        redirectTo: Paths.AdminDashboard,
      };
    }

    return {
      success: false,
      error: {
        message: "Login Failed",
        name: "Invalid email or password",
      },
    };
  },
  logout: async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return {
        success: false,
        error,
      };
    }

    return {
      success: true,
      redirectTo: Paths.AdminLogin,
    };
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
  check: async (): Promise<CheckResponse> => {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (session) {
      return {
        authenticated: true,
        logout: false,
        redirectTo: Paths.AdminDashboard,
      };
    }

    if (error || !session) {
      return {
        authenticated: false,
        logout: true,
        redirectTo: Paths.AdminLogin,
      };
    }

    return {
      authenticated: true,
      logout: false,
      redirectTo: Paths.AdminDashboard,
    };
  },
  getIdentity: async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return null;
    }
    return { ...user, name: user.email };
  },
};
