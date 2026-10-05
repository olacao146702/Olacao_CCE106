import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { API_BASE_URL } from '@/constants/api';
import type { User } from '@/context/AuthContext';
import { useAuth } from '@/hooks/useAuth';

type Profile = User & {
  course?: string | null;
  year?: string | null;
  section?: string | null;
};

export default function ProfileScreen() {
  const { user, token, logout } = useAuth();

  const [profile, setProfile] = useState<Profile | null>(
    user ? (user as Profile) : null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadProfile = useCallback(async () => {
    if (!token) {
      setError('You are not authenticated.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/profile`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        await logout();
        return;
      }

      if (!response.ok) {
        throw new Error(
          `Unable to load profile. Server returned ${response.status}.`
        );
      }

      const data = await response.json();

      const profileData: Profile =
        data?.user ??
        data?.profile ??
        data;

      setProfile(profileData);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to load profile.'
      );
    } finally {
      setLoading(false);
    }
  }, [token, logout]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>MY PROFILE</Text>

      {loading ? (
        <View style={styles.state}>
          <ActivityIndicator color="#245bb2" />
          <Text style={styles.text}>
            Loading profile…
          </Text>
        </View>
      ) : error ? (
        <View style={styles.state}>
          <Text
            style={styles.error}
            accessibilityLiveRegion="polite"
          >
            {error}
          </Text>

          <Pressable
            accessibilityRole="button"
            onPress={loadProfile}
          >
            <Text style={styles.link}>
              Try Again
            </Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.card}>
          <Text style={styles.text}>
            Name: {profile?.name || '—'}
          </Text>

          <Text style={styles.text}>
            Email: {profile?.email || '—'}
          </Text>

          <Text style={styles.text}>
            Role: {profile?.role || '—'}
          </Text>

          <Text style={styles.text}>
            Course: {profile?.course || '—'}
          </Text>

          <Text style={styles.text}>
            Year: {profile?.year || '—'}
          </Text>

          <Text style={styles.text}>
            Section: {profile?.section || '—'}
          </Text>

          {!profile && (
            <Text style={styles.note}>
              No profile loaded yet.
            </Text>
          )}
        </View>
      )}

      <Text style={styles.text}>
        Session Status:{' '}
        {token ? 'Authenticated' : 'Not Available'}
      </Text>

      <Pressable
        accessibilityRole="button"
        style={styles.button}
        onPress={logout}
      >
        <Text style={styles.buttonText}>
          LOGOUT
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    gap: 20,
    backgroundColor: '#f2f5fa',
  },
  title: {
    color: '#17324d',
    fontSize: 24,
    fontWeight: '700',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    gap: 16,
    borderRadius: 12,
  },
  state: {
    padding: 24,
    gap: 12,
    alignItems: 'center',
  },
  text: {
    color: '#536579',
    fontSize: 16,
  },
  note: {
    color: '#536579',
    fontSize: 12,
  },
  error: {
    color: '#b42318',
    textAlign: 'center',
  },
  link: {
    color: '#245bb2',
    padding: 12,
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#245bb2',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
});