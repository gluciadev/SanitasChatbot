import { create } from 'zustand';

export interface AuthState {
  email: string;
  username: string;
  setEmail: (email: string) => void;
  setUsername: (username: string) => void;
  setCredentials: (email: string, username: string) => void;
  clearCredentials: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  email: '',
  username: '',
  setEmail: (email: string) => set({ email }),
  setUsername: (username: string) => set({ username }),
  setCredentials: (email: string, username: string) => set({ email, username }),
  clearCredentials: () => set({ email: '', username: '' }),
}));
