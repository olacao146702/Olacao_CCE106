import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import StudentCard, { Student } from '@/components/StudentCard';
import { API_BASE_URL } from '@/constants/api';
import { useAuth } from '@/hooks/useAuth';

export default function StudentsScreen() {
  const { token, logout } = useAuth();

  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadStudents = useCallback(async () => {
    if (!token) {
      setStudents([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError('');

      const response = await fetch(`${API_BASE_URL}/students`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        await logout();
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || 'Failed to load students.');
      }

      const studentList = Array.isArray(data)
        ? data
        : data?.students ?? data?.data ?? [];

      setStudents(studentList);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong while loading students.'
      );
    } finally {
      setLoading(false);
    }
  }, [token, logout]);

  useEffect(() => {
    loadStudents();
  }, [loadStudents]);

  const filteredStudents = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) {
      return students;
    }

    return students.filter((student) =>
      `${student.name ?? ''} ${student.email ?? ''} ${
        student.course ?? ''
      }`
        .toLowerCase()
        .includes(keyword)
    );
  }, [students, search]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.message}>Loading students...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>

        <Pressable style={styles.retryButton} onPress={loadStudents}>
          <Text style={styles.retryText}>Retry</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Students</Text>

      <Text style={styles.subtitle}>
        Browse and search student records.
      </Text>

      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search students..."
        placeholderTextColor="#8795a8"
        style={styles.search}
      />

      {filteredStudents.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>
            {students.length === 0
              ? 'No students available.'
              : 'No matching students.'}
          </Text>

          <Text style={styles.emptyText}>
            Try another search term.
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredStudents}
          keyExtractor={(item, index) =>
            item.id !== undefined
              ? String(item.id)
              : String(index)
          }
          renderItem={({ item }) => (
            <StudentCard student={item} />
          )}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f5fa',
    padding: 20,
  },

  title: {
    color: '#17324d',
    fontSize: 28,
    fontWeight: '700',
  },

  subtitle: {
    color: '#536579',
    fontSize: 15,
    marginTop: 4,
    marginBottom: 16,
  },

  search: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: '#17324d',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#dce3ec',
  },

  list: {
    paddingBottom: 20,
  },

  center: {
    flex: 1,
    backgroundColor: '#f2f5fa',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },

  message: {
    color: '#536579',
    marginTop: 12,
  },

  error: {
    color: '#b42318',
    textAlign: 'center',
    marginBottom: 16,
  },

  retryButton: {
    backgroundColor: '#245bb2',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },

  retryText: {
    color: '#ffffff',
    fontWeight: '600',
  },

  empty: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
  },

  emptyTitle: {
    color: '#17324d',
    fontSize: 17,
    fontWeight: '600',
  },

  emptyText: {
    color: '#536579',
    marginTop: 6,
  },
});