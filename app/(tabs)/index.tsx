import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import StatCard from '../../components/StatCard';

import {
  defaultTasks,
  Task,
  TASKS_STORAGE_KEY,
} from '../../data/tasks';

export default function Dashboard() {
  const router = useRouter();

  const [tasks, setTasks] = useState<Task[]>([]);

  const loadTasks = async () => {
    try {
      const savedTasks = await AsyncStorage.getItem(
        TASKS_STORAGE_KEY
      );

      if (savedTasks) {
        setTasks(JSON.parse(savedTasks) as Task[]);
      } else {
        setTasks(defaultTasks);

        await AsyncStorage.setItem(
          TASKS_STORAGE_KEY,
          JSON.stringify(defaultTasks)
        );
      }
    } catch (error) {
      console.log('Error loading dashboard tasks:', error);
      setTasks(defaultTasks);
    }
  };

  // Reload dashboard whenever the screen becomes active
  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [])
  );

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === 'Completed'
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status === 'Pending'
  ).length;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <Text style={styles.appTitle}>StudyFlow</Text>

        <Text style={styles.subtitle}>
          Student Task Planner
        </Text>
      </View>

      <View style={styles.welcomeCard}>
        <Text style={styles.welcomeSmall}>
          Welcome back,
        </Text>

        <Text style={styles.studentName}>
          Student!
        </Text>

        <Text style={styles.welcomeMessage}>
          Stay organized and keep your schoolwork moving.
        </Text>
      </View>

      <Text style={styles.sectionTitle}>
        Your Progress
      </Text>

      <View style={styles.statsRow}>
        <StatCard
          label="Total Tasks"
          value={totalTasks}
        />

        <StatCard
          label="Completed"
          value={completedTasks}
        />

        <StatCard
          label="Pending"
          value={pendingTasks}
        />
      </View>

      <Text style={styles.sectionTitle}>
        Quick Actions
      </Text>

      <Pressable
        onPress={() => router.push('/(tabs)/tasks')}
        style={({ pressed }) => [
          styles.actionButton,
          pressed && styles.buttonPressed,
        ]}
      >
        <Text style={styles.actionButtonText}>
          View My Tasks
        </Text>
      </Pressable>

      <Link href="/(tabs)/profile" asChild>
        <Pressable
          style={({ pressed }) => [
            styles.secondaryButton,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.secondaryButtonText}>
            Edit Profile
          </Text>
        </Pressable>
      </Link>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>
          Keep Going
        </Text>

        <Text style={styles.infoText}>
          Complete your pending tasks to stay on track with
          your studies.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  header: {
    marginBottom: 20,
  },

  appTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#dc2626',
  },

  subtitle: {
    marginTop: 2,
    fontSize: 14,
    color: '#475569',
    fontWeight: '600',
  },

  welcomeCard: {
    backgroundColor: '#1d4ed8',
    borderRadius: 18,
    padding: 22,
    marginBottom: 24,
  },

  welcomeSmall: {
    color: '#dbeafe',
    fontSize: 14,
  },

  studentName: {
    color: '#ffffff',
    fontSize: 27,
    fontWeight: '800',
    marginTop: 3,
  },

  welcomeMessage: {
    color: '#dbeafe',
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 10,
  },

  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -5,
    marginBottom: 24,
  },

  actionButton: {
    backgroundColor: '#dc2626',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 10,
  },

  secondaryButton: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },

  buttonPressed: {
    opacity: 0.65,
    transform: [{ scale: 0.98 }],
  },

  actionButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800',
  },

  secondaryButtonText: {
    color: '#1d4ed8',
    fontSize: 15,
    fontWeight: '800',
  },

  infoBox: {
    backgroundColor: '#eff6ff',
    borderRadius: 14,
    padding: 16,
    marginTop: 24,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },

  infoTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1e3a8a',
  },

  infoText: {
    marginTop: 5,
    color: '#475569',
    lineHeight: 20,
    fontSize: 13,
  },
});