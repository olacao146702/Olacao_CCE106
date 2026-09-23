import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import {
    ActivityIndicator,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { getProfile } from '../services/auth';
import { UserProfile } from '../types/auth';
import { getToken, removeToken } from '../utils/storage';

export default function ProfileScreen() {
  const router = useRouter();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError('');

      // Get saved token from SecureStore
      const token = await getToken();

      if (!token) {
        router.replace('/');
        return;
      }

      // Protected API request
      const data = await getProfile(token);

      setProfile(data);
    } catch (err) {
      if (
        err instanceof Error &&
        err.message === 'SESSION_EXPIRED'
      ) {
        await removeToken();

        setError('Your session has expired. Please log in again.');

        setTimeout(() => {
          router.replace('/');
        }, 1500);

        return;
      }

      setError(
        err instanceof Error
          ? err.message
          : 'Unable to load your profile.'
      );
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadProfile();
    }, [])
  );

  const handleLogout = async () => {
    await removeToken();
    setProfile(null);
    router.replace('/');
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#2563EB" />

        <Text style={styles.loadingText}>
          Loading your profile...
        </Text>
      </SafeAreaView>
    );
  }

  if (error && !profile) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <View style={styles.errorCard}>
          <Text style={styles.errorTitle}>
            Unable to Load Profile
          </Text>

          <Text style={styles.errorText}>
            {error}
          </Text>

          <Pressable
            style={styles.retryButton}
            onPress={loadProfile}
          >
            <Text style={styles.retryText}>TRY AGAIN</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.smallTitle}>
              STUDENT PORTAL
            </Text>

            <Text style={styles.pageTitle}>
              My Profile
            </Text>
          </View>

          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {profile?.firstName?.charAt(0)}
              {profile?.lastName?.charAt(0)}
            </Text>
          </View>
        </View>

        {/* Welcome */}
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeLabel}>
            Welcome back,
          </Text>

          <Text style={styles.welcomeName}>
            {profile?.firstName} {profile?.lastName}
          </Text>

          <Text style={styles.welcomeText}>
            Your authenticated student profile is now protected.
          </Text>
        </View>

        {/* Profile Information */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Profile Information
          </Text>

          <ProfileRow
            label="First Name"
            value={profile?.firstName}
          />

          <ProfileRow
            label="Last Name"
            value={profile?.lastName}
          />

          <ProfileRow
            label="Username"
            value={profile?.username}
          />

          <ProfileRow
            label="Email"
            value={profile?.email}
          />

          <ProfileRow
            label="Role"
            value={profile?.role || 'Student'}
            last
          />
        </View>

        {/* Authentication Status */}
        <View style={styles.statusCard}>
          <View style={styles.statusDot} />

          <View style={styles.statusContent}>
            <Text style={styles.statusTitle}>
              Authenticated Session
            </Text>

            <Text style={styles.statusText}>
              Your session token is securely stored on this device.
            </Text>
          </View>
        </View>

        {/* Logout */}
        <Pressable
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutText}>
            LOG OUT
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

function ProfileRow({
  label,
  value,
  last = false,
}: {
  label: string;
  value?: string;
  last?: boolean;
}) {
  return (
    <View
      style={[
        styles.profileRow,
        !last && styles.profileRowBorder,
      ]}
    >
      <Text style={styles.rowLabel}>
        {label}
      </Text>

      <Text style={styles.rowValue}>
        {value || 'Not available'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F6FA',
  },

  scrollContent: {
    width: '100%',
    maxWidth: 700,
    alignSelf: 'center',
    padding: 24,
    paddingBottom: 40,
  },

  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F6FA',
    padding: 24,
  },

  loadingText: {
    marginTop: 12,
    color: '#6B7280',
    fontSize: 14,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },

  smallTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2563EB',
    letterSpacing: 1,
  },

  pageTitle: {
    marginTop: 4,
    fontSize: 28,
    fontWeight: '800',
    color: '#172033',
  },

  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },

  welcomeCard: {
    backgroundColor: '#2563EB',
    borderRadius: 18,
    padding: 22,
    marginBottom: 18,
  },

  welcomeLabel: {
    color: '#DBEAFE',
    fontSize: 13,
  },

  welcomeName: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: '800',
    marginTop: 4,
  },

  welcomeText: {
    color: '#DBEAFE',
    fontSize: 13,
    lineHeight: 19,
    marginTop: 10,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 18,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#172033',
    marginBottom: 4,
  },

  profileRow: {
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
  },

  profileRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#EEF0F3',
  },

  rowLabel: {
    color: '#6B7280',
    fontSize: 13,
  },

  rowValue: {
    color: '#172033',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'right',
    flexShrink: 1,
  },

  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
    borderRadius: 14,
    padding: 16,
    marginBottom: 18,
  },

  statusDot: {
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: '#10B981',
    marginRight: 12,
  },

  statusContent: {
    flex: 1,
  },

  statusTitle: {
    color: '#065F46',
    fontSize: 14,
    fontWeight: '700',
  },

  statusText: {
    color: '#047857',
    fontSize: 12,
    marginTop: 3,
    lineHeight: 17,
  },

  logoutButton: {
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DC2626',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoutText: {
    color: '#DC2626',
    fontSize: 14,
    fontWeight: '700',
  },

  errorCard: {
    width: '100%',
    maxWidth: 450,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 22,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },

  errorTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#172033',
  },

  errorText: {
    color: '#6B7280',
    textAlign: 'center',
    fontSize: 13,
    lineHeight: 19,
    marginTop: 8,
  },

  retryButton: {
    marginTop: 18,
    backgroundColor: '#2563EB',
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 9,
  },

  retryText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
});