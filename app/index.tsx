import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

import { login } from '../services/auth';
import { getToken, saveToken } from '../utils/storage';

export default function LoginScreen() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [checkingSession, setCheckingSession] = useState(true);

  // Restore existing session when the app starts
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const token = await getToken();

        if (token) {
          router.replace('/profile');
          return;
        }
      } catch (error) {
        console.log('Session restoration error:', error);
      } finally {
        setCheckingSession(false);
      }
    };

    restoreSession();
  }, []);

  const handleLogin = async () => {
    setError('');

    // Validation
    if (!username.trim() || !password.trim()) {
      setError('Please enter your username and password.');
      return;
    }

    try {
      setLoading(true);

      const data = await login(
        username.trim(),
        password
      );

      // Save token securely
      await saveToken(data.accessToken);

      // Go to protected profile
      router.replace('/profile');
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  // Show a loading screen while checking for an existing session
  if (checkingSession) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.sessionLoading}>
          <ActivityIndicator
            size="large"
            color="#2563EB"
          />

          <Text style={styles.loadingText}>
            Checking your session...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={
          Platform.OS === 'ios'
            ? 'padding'
            : undefined
        }
      >
        <View style={styles.container}>

          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoText}>
                SP
              </Text>
            </View>

            <Text style={styles.title}>
              Student Portal
            </Text>

            <Text style={styles.subtitle}>
              Sign in to access your student profile
            </Text>
          </View>

          {/* Login Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>
              Welcome Back
            </Text>

            <Text style={styles.label}>
              Username
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Enter your username"
              placeholderTextColor="#9CA3AF"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              autoCorrect={false}
            />

            <Text style={styles.label}>
              Password
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="#9CA3AF"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
            />

            {/* Error Message */}
            {error !== '' && (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>
                  {error}
                </Text>
              </View>
            )}

            {/* Login Button */}
            <Pressable
              style={[
                styles.loginButton,
                loading &&
                  styles.loginButtonDisabled,
              ]}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator
                    color="#FFFFFF"
                  />

                  <Text style={styles.buttonText}>
                    Signing in...
                  </Text>
                </View>
              ) : (
                <Text style={styles.buttonText}>
                  SIGN IN
                </Text>
              )}
            </Pressable>
          </View>

          {/* Demo Account */}
          <View style={styles.demoBox}>
            <Text style={styles.demoTitle}>
              Demo Account
            </Text>

            <Text style={styles.demoText}>
              Username: emilys
            </Text>

            <Text style={styles.demoText}>
              Password: emilyspass
            </Text>
          </View>

          <Text style={styles.footer}>
            Authenticated Student Portal
          </Text>

        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F6FA',
  },

  keyboardView: {
    flex: 1,
  },

  container: {
    flex: 1,
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 30,
  },

  header: {
    alignItems: 'center',
    marginBottom: 28,
  },

  logoCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },

  logoText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
  },

  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#172033',
  },

  subtitle: {
    marginTop: 7,
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 22,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#172033',
    marginBottom: 20,
  },

  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 7,
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 15,
    color: '#111827',
    marginBottom: 16,
    backgroundColor: '#FAFAFA',
  },

  errorBox: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },

  errorText: {
    color: '#B91C1C',
    fontSize: 13,
    lineHeight: 19,
  },

  loginButton: {
    height: 50,
    borderRadius: 10,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
  },

  loginButtonDisabled: {
    opacity: 0.7,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },

  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  demoBox: {
    marginTop: 18,
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#EAF2FF',
  },

  demoTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E40AF',
    marginBottom: 5,
  },

  demoText: {
    fontSize: 12,
    color: '#374151',
    marginTop: 2,
  },

  footer: {
    textAlign: 'center',
    marginTop: 24,
    fontSize: 12,
    color: '#9CA3AF',
  },

  sessionLoading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },

  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#6B7280',
  },
});