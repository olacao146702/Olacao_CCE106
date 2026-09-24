import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import {
    getCurrentUser,
    loginUser,
} from '../src/services/authService';

import {
    deleteToken,
    getToken,
    saveToken,
} from '../src/storage/tokenStorage';

export default function SecureProfileScreen() {
  const [username, setUsername] = useState('emilys');
  const [password, setPassword] = useState('emilyspass');

  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    restoreSession();
  }, []);

  async function restoreSession() {
    try {
      const token = await getToken();

      if (!token) {
        return;
      }

      const user = await getCurrentUser(token);

      setProfile(user);
    } catch {
      await deleteToken();
      setProfile(null);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin() {
    setError('');
    setLoading(true);

    try {
      const data = await loginUser(username, password);

      await saveToken(data.accessToken);

      const user = await getCurrentUser(data.accessToken);

      setProfile(user);
    } catch {
      setError(
        'Login failed. Check your username and password.'
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    await deleteToken();

    setProfile(null);
    setError('');
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" />

        <Text style={styles.loadingText}>
          Loading...
        </Text>
      </SafeAreaView>
    );
  }

  if (!profile) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>
            Secure Profile
          </Text>

          <Text style={styles.subtitle}>
            Sign in to access your profile
          </Text>

          <Text style={styles.label}>
            Username
          </Text>

          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="Enter username"
            autoCapitalize="none"
          />

          <Text style={styles.label}>
            Password
          </Text>

          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter password"
            secureTextEntry
          />

          {error ? (
            <Text style={styles.error}>
              {error}
            </Text>
          ) : null}

          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Signing in...' : 'Login'}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>
          My Profile
        </Text>

        {profile.image ? (
          <Image
            source={{ uri: profile.image }}
            style={styles.profileImage}
          />
        ) : null}

        <Text style={styles.name}>
          {profile.firstName} {profile.lastName}
        </Text>

        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>
            Username
          </Text>

          <Text style={styles.infoValue}>
            {profile.username}
          </Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>
            Email
          </Text>

          <Text style={styles.infoValue}>
            {profile.email}
          </Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>
            User ID
          </Text>

          <Text style={styles.infoValue}>
            {profile.id}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.buttonText}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f8',
    padding: 20,
    justifyContent: 'center',
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f6f8',
  },

  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },

  card: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 24,
    elevation: 3,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },

  subtitle: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 25,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    marginTop: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: '#d0d5da',
    borderRadius: 10,
    padding: 13,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },

  button: {
    backgroundColor: '#2563eb',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },

  logoutButton: {
    backgroundColor: '#dc2626',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },

  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  error: {
    color: '#dc2626',
    marginTop: 12,
    textAlign: 'center',
  },

  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginVertical: 20,
  },

  name: {
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },

  infoBox: {
    backgroundColor: '#f3f4f6',
    borderRadius: 10,
    padding: 13,
    marginBottom: 10,
  },

  infoLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 3,
  },

  infoValue: {
    fontSize: 16,
    fontWeight: '500',
  },
});