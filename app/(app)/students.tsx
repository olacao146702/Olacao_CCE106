import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import StudentCard, {
  type Student,
} from '@/components/StudentCard';

import { API_BASE_URL } from '@/constants/api';
import { useAuth } from '@/hooks/useAuth';

export default function StudentsScreen() {
  const { token, logout } = useAuth();

  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  const loadStudents = async () => {
    // TODO EXAM: 1. Set loading and clear previous errors.
    // TODO EXAM: 2. Call GET /students using fetch() and async/await.
    // TODO EXAM: 3. Include Authorization: Bearer TOKEN from useAuth() if required.
    // TODO EXAM: 4. Check response.ok and handle 401 Unauthorized.
    // TODO EXAM: 5. Parse JSON and save the student array to state.
    // TODO EXAM: 6. Handle errors and stop loading inside finally.

    if (!token) {
      setError('You are not authenticated.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/students`, {
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
          `Unable to load students. Server returned ${response.status}.`
        );
      }

      const data = await response.json();

      const studentList = Array.isArray(data)
        ? data
        : data?.students ?? data?.data ?? [];

      if (!Array.isArray(studentList)) {
        throw new Error('Invalid student data returned by the server.');
      }

      setStudents(studentList);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to load students.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // TODO EXAM: Call loadStudents() when the screen loads.
    loadStudents();
  }, [token]);

  // TODO EXAM: Use filter() to return students whose name matches the search text.
  const filteredStudents = students.filter((student) =>
    (student.name ?? '')
      .toLowerCase()
      .includes(search.trim().toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Students</Text>

      <TextInput
        style={styles.input}
        accessibilityLabel="Search students"
        placeholder="Search by name"
        value={search}
        onChangeText={setSearch}
      />

      {loading ? (
        <View style={styles.state}>
          <ActivityIndicator color="#245bb2" />
          <Text style={styles.text}>
            Loading students…
          </Text>
        </View>
      ) : error ? (
        <View
          style={styles.state}
          accessibilityLiveRegion="polite"
        >
          <Text style={styles.error}>{error}</Text>

          <Pressable
            accessibilityRole="button"
            onPress={loadStudents}
          >
            <Text style={styles.link}>Try Again</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={filteredStudents}
          keyExtractor={(item, index) =>
            String(item.id ?? index)
          }
          renderItem={({ item }) => (
            <StudentCard student={item} />
          )}
          ListEmptyComponent={
            <View style={styles.state}>
              <Text style={styles.text}>
                {search.trim()
                  ? 'No students match your search.'
                  : 'No students found.'}
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f2f5fa',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#17324d',
    marginBottom: 20,
  },
  input: {
    padding: 14,
    borderWidth: 1,
    borderColor: '#c6d2e1',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    color: '#17324d',
    marginBottom: 20,
  },
  state: {
    padding: 24,
    gap: 12,
    alignItems: 'center',
  },
  text: {
    color: '#536579',
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
});