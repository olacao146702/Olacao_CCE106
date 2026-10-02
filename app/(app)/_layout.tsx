import { useAuth } from '@/hooks/useAuth';
import { Tabs, useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function AppLayout() {
  const { token, authLoading } = useAuth();
  const router = useRouter();

  // TODO EXAM: Check authentication and session restoration before showing the tabs.
  // TODO EXAM: Redirect unauthenticated users to /sign-in.

  useEffect(() => {
    if (!authLoading && !token) {
      router.replace('/sign-in');
    }
  }, [authLoading, token, router]);

  if (authLoading || !token) {
    return null;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#245bb2',
        headerTintColor: '#17324d',
        tabBarIconStyle: { display: 'none' },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="students" options={{ title: 'Students' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}