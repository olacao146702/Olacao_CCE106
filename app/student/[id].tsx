import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  useLocalSearchParams,
  useRouter,
} from 'expo-router';

import { type Student } from '@/components/StudentCard';
import { API_BASE_URL } from '@/constants/api';
import { useAuth } from '@/hooks/useAuth';

type StudentDetails = Student & {
  year?: string | null;
  section?: string | null;
};

export default function StudentDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const { token, logout } = useAuth();

  const [student, setStudent] = useState<StudentDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadStudent = useCallback(async () => {
    setLoading(true);
    setError('');
    setStudent(null);

    const studentId = Array.isArray(id) ? id[0] : id;

    if (!studentId || !studentId.trim()) {
      setError('Invalid student ID.');
      setLoading(false);
      return;
    }

    if (!token) {
      setError('You are not authenticated.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/students/${encodeURIComponent(studentId)}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 401) {
        await logout();
        return;
      }

      if (response.status === 404) {
        setError('Student record not found.');
        return;
      }

      if (!response.ok) {
        throw new Error(
          `Unable to load student. Server returned ${response.status}.`
        );
      }

      const data = await response.json();

      const studentData: StudentDetails =
        data?.student ??
        data?.data ??
        data;

      if (!studentData || typeof studentData !== 'object') {
        throw new Error(
          'Invalid student data returned by the server.'
        );
      }

      setStudent(studentData);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to load student details.'
      );
    } finally {
      setLoading(false);
    }
  }, [id, token, logout]);

  useEffect(() => {
    loadStudent();
  }, [loadStudent]);

  const studentId = Array.isArray(id) ? id[0] : id;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Student Details</Text>

      {loading ? (
        <View style={styles.state}>
          <ActivityIndicator color="#245bb2" />
          <Text style={styles.text}>
            Loading student…
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
            style={styles.retryButton}
            onPress={loadStudent}
          >
            <Text style={styles.retryText}>
              Try Again
            </Text>
          </Pressable>
        </View>
      ) : !student ? (
        <Text style={styles.text}>
          No student record available.
        </Text>
      ) : (
        <View style={styles.card}>
          <Text style={styles.text}>
            ID: {studentId || 'Not available'}
          </Text>

          <Text style={styles.text}>
            Name: {student.name || '—'}
          </Text>

          <Text style={styles.text}>
            Email: {student.email || '—'}
          </Text>

          <Text style={styles.text}>
            Course: {student.course || '—'}
          </Text>

          <Text style={styles.text}>
            Year: {student.year || '—'}
          </Text>

          <Text style={styles.text}>
            Section: {student.section || '—'}
          </Text>
        </View>
      )}

      <Pressable
        accessibilityRole="button"
        style={styles.button}
        onPress={() => router.back()}
      >
        <Text style={styles.buttonText}>Back</Text>
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
    fontSize: 28,
    fontWeight: '700',
  },
  state: {
    gap: 12,
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    gap: 16,
    borderRadius: 12,
  },
  text: {
    color: '#536579',
    fontSize: 16,
  },
  error: {
    color: '#b42318',
    textAlign: 'center',
  },
  retryButton: {
    padding: 10,
  },
  retryText: {
    color: '#245bb2',
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