import * as SecureStore from 'expo-secure-store';
import { createContext, useEffect, useState, type ReactNode } from 'react';
import { Platform } from 'react-native';

import { API_BASE_URL } from '@/constants/api';

export type User = {
  id?: string | number;
  name?: string;
  email?: string;
  role?: string;
};

type AuthContextValue = {
  token: string | null;
  user: User | null;
  authLoading: boolean;
  login: (accessToken: string, userData: User) => Promise<void>;
  logout: () => Promise<void>;
  restoreSession: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

const TOKEN_KEY = 'student_service_portal_token';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const login = async (accessToken: string, userData: User) => {
    try {
      if (!accessToken) {
        throw new Error('No access token was provided.');
      }

      // SecureStore is used only on native platforms.
      // The password is never stored.
      if (Platform.OS !== 'web') {
        await SecureStore.setItemAsync(TOKEN_KEY, accessToken);
      }

      setToken(accessToken);
      setUser(userData);
    } catch (error) {
      console.error('Login storage error:', error);
      throw new Error('Unable to save the login session.');
    }
  };

  const logout = async () => {
    try {
      if (Platform.OS !== 'web') {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
      }
    } catch (error) {
      console.error('Logout storage error:', error);
    } finally {
      setToken(null);
      setUser(null);
    }
  };

  const restoreSession = async () => {
    setAuthLoading(true);

    try {
      // SecureStore does not provide native secure persistence on web.
      if (Platform.OS === 'web') {
        setToken(null);
        setUser(null);
        return;
      }

      const savedToken = await SecureStore.getItemAsync(TOKEN_KEY);

      if (!savedToken) {
        setToken(null);
        setUser(null);
        return;
      }

      // Validate the saved token with the protected profile endpoint.
      const response = await fetch(`${API_BASE_URL}/profile`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${savedToken}`,
          Accept: 'application/json',
        },
      });

      // Saved token is invalid or expired.
      if (response.status === 401) {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
        setToken(null);
        setUser(null);
        return;
      }

      if (!response.ok) {
        throw new Error(
          `Profile request failed with status ${response.status}.`
        );
      }

      const data = await response.json();

      // Your API returns:
      // { user: { id, name, email, role, ... } }
      const profileData: User =
        data?.user ??
        data?.profile ??
        data;

      setToken(savedToken);
      setUser(profileData);
    } catch (error) {
      console.error('Session restoration error:', error);

      setToken(null);
      setUser(null);

      if (Platform.OS !== 'web') {
        try {
          await SecureStore.deleteItemAsync(TOKEN_KEY);
        } catch (storageError) {
          console.error(
            'Unable to clear invalid session:',
            storageError
          );
        }
      }
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    restoreSession();
  }, []);

  // SecureStore is native-only.
  // TODO EXAM: Test persistence on Android/iOS.

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        authLoading,
        login,
        logout,
        restoreSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}