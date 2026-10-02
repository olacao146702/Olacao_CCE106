import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { AuthProvider } from '@/context/AuthContext';
import { useAuth } from '@/hooks/useAuth';

function RouteGuard() {
  const { token, authLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  const firstSegment = segments[0];

  const isSignIn = firstSegment === 'sign-in';
  const isProtectedApp = firstSegment === '(app)';
  const isProtectedStudent = firstSegment === 'student';

  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!token && (isProtectedApp || isProtectedStudent)) {
      router.replace('/sign-in');
      return;
    }

    if (token && isSignIn) {
      router.replace('/(app)');
    }
  }, [
    token,
    authLoading,
    isSignIn,
    isProtectedApp,
    isProtectedStudent,
    router,
  ]);

  // TODO EXAM: Check authentication state and wait for session restoration.
  // TODO EXAM: Protect (app) AND student/[id]; redirect unauthenticated users to /sign-in.

  if (authLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f2f5fa',
        }}
      >
        <ActivityIndicator size="large" color="#245bb2" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerTintColor: '#17324d' }}>
      <Stack.Screen name="sign-in" options={{ title: 'Sign In' }} />
      <Stack.Screen name="(app)" options={{ headerShown: false }} />
      <Stack.Screen name="student/[id]" options={{ title: 'Student Details' }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RouteGuard />
    </AuthProvider>
  );
}