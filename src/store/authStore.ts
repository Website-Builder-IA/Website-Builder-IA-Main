import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  username: string;
  isFirstLogin: boolean;
  name: string;
  plan: 'basic' | 'intermediate' | 'pro';
  promptsRemaining: number;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  usePrompt: () => void;
}

const VALID_USERS = {
  admin: {
    password: 'admin123',
    isFirstLogin: true,
    name: 'Administrador',
    plan: 'basic',
    promptsRemaining: 60
  },
  john: {
    password: 'john123',
    isFirstLogin: false,
    name: 'John Doe',
    plan: 'intermediate',
    promptsRemaining: 120
  }
} as const;

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: (username: string, password: string) => {
        const user = VALID_USERS[username as keyof typeof VALID_USERS];
        if (user && password === user.password) {
          set({
            isAuthenticated: true,
            user: {
              username,
              isFirstLogin: user.isFirstLogin,
              name: user.name,
              plan: user.plan,
              promptsRemaining: user.promptsRemaining
            }
          });
          return true;
        }
        return false;
      },
      logout: () => set({ isAuthenticated: false, user: null }),
      usePrompt: () => set((state) => ({
        user: state.user ? {
          ...state.user,
          promptsRemaining: state.user.promptsRemaining - 1
        } : null
      }))
    }),
    {
      name: 'auth-storage'
    }
  )
);