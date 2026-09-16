import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import {
    defaultTasks,
    Task,
    TASKS_STORAGE_KEY,
} from '../../data/tasks';

export default function TaskDetailsScreen() {
  const router = useRouter();

  const { id } = useLocalSearchParams<{ id: string }>();

  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadTask();
  }, [id]);

  const loadTask = async () => {
    try {
      const savedTasks = await AsyncStorage.getItem(
        TASKS_STORAGE_KEY
      );

      let taskList: Task[];

      if (savedTasks) {
        taskList = JSON.parse(savedTasks) as Task[];
      } else {
        taskList = defaultTasks;

        await AsyncStorage.setItem(
          TASKS_STORAGE_KEY,
          JSON.stringify(defaultTasks)
        );
      }

      const foundTask = taskList.find(
        (item) => item.id === id
      );

      setTask(foundTask ?? null);
    } catch (error) {
      console.log('Error loading task:', error);
      setTask(null);
    } finally {
      setLoading(false);
    }
  };

  const toggleTaskStatus = async () => {
    if (!task) return;

    try {
      setSaving(true);

      const savedTasks = await AsyncStorage.getItem(
        TASKS_STORAGE_KEY
      );

      const taskList: Task[] = savedTasks
        ? (JSON.parse(savedTasks) as Task[])
        : defaultTasks;

      // Explicitly tell TypeScript this is a Task[]
      const updatedTasks: Task[] = taskList.map(
        (item): Task => {
          if (item.id === task.id) {
            const newStatus: 'Pending' | 'Completed' =
              item.status === 'Completed'
                ? 'Pending'
                : 'Completed';

            return {
              ...item,
              status: newStatus,
            };
          }

          return item;
        }
      );

      await AsyncStorage.setItem(
        TASKS_STORAGE_KEY,
        JSON.stringify(updatedTasks)
      );

      const updatedTask = updatedTasks.find(
        (item) => item.id === task.id
      );

      setTask(updatedTask ?? null);
    } catch (error) {
      console.log('Error updating task:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator
          size="large"
          color="#dc2626"
        />

        <Text style={styles.loadingText}>
          Loading task...
        </Text>
      </View>
    );
  }

  // INVALID TASK
  if (!task) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorTitle}>
          Task Not Found
        </Text>

        <Text style={styles.errorText}>
          The task you are looking for does not exist.
        </Text>

        <Pressable
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>
            Go Back
          </Text>
        </Pressable>
      </View>
    );
  }

  const isCompleted = task.status === 'Completed';

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* STATUS */}
        <View
          style={[
            styles.statusBadge,
            isCompleted
              ? styles.completedBadge
              : styles.pendingBadge,
          ]}
        >
          <Text
            style={[
              styles.statusText,
              isCompleted
                ? styles.completedText
                : styles.pendingText,
            ]}
          >
            {task.status}
          </Text>
        </View>

        {/* TITLE */}
        <Text style={styles.title}>
          {task.title}
        </Text>

        {/* SUBJECT */}
        <Text style={styles.subject}>
          {task.subject}
        </Text>

        {/* DUE DATE */}
        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>
            Due Date
          </Text>

          <Text style={styles.infoValue}>
            {task.dueDate}
          </Text>
        </View>

        {/* COMPLETE BUTTON */}
        <Pressable
          onPress={toggleTaskStatus}
          disabled={saving}
          style={({ pressed }) => [
            styles.completeButton,
            isCompleted && styles.undoButton,
            pressed && styles.buttonPressed,
            saving && styles.buttonDisabled,
          ]}
        >
          <Text style={styles.completeButtonText}>
            {saving
              ? 'Saving...'
              : isCompleted
              ? 'Mark as Pending'
              : 'Mark as Completed'}
          </Text>
        </Pressable>

        {/* BACK */}
        <Pressable
          onPress={() => router.back()}
          style={styles.backLink}
        >
          <Text style={styles.backLinkText}>
            ← Back to Tasks
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 20,
    justifyContent: 'center',
  },

  center: {
    flex: 1,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
  },

  loadingText: {
    marginTop: 12,
    color: '#64748b',
    fontSize: 15,
  },

  card: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 22,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 16,
  },

  pendingBadge: {
    backgroundColor: '#fee2e2',
  },

  completedBadge: {
    backgroundColor: '#dcfce7',
  },

  statusText: {
    fontSize: 12,
    fontWeight: '800',
  },

  pendingText: {
    color: '#dc2626',
  },

  completedText: {
    color: '#15803d',
  },

  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1e293b',
    marginBottom: 8,
  },

  subject: {
    fontSize: 15,
    color: '#64748b',
    marginBottom: 22,
  },

  infoBox: {
    backgroundColor: '#eff6ff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#1d4ed8',
  },

  infoLabel: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 4,
    fontWeight: '600',
  },

  infoValue: {
    fontSize: 16,
    color: '#1e293b',
    fontWeight: '700',
  },

  completeButton: {
    backgroundColor: '#dc2626',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },

  undoButton: {
    backgroundColor: '#1d4ed8',
  },

  buttonPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },

  buttonDisabled: {
    opacity: 0.5,
  },

  completeButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800',
  },

  backLink: {
    alignItems: 'center',
    marginTop: 20,
    padding: 10,
  },

  backLinkText: {
    color: '#1d4ed8',
    fontSize: 15,
    fontWeight: '700',
  },

  errorTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#dc2626',
    marginBottom: 8,
  },

  errorText: {
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 20,
  },

  backButton: {
    backgroundColor: '#1d4ed8',
    paddingHorizontal: 25,
    paddingVertical: 13,
    borderRadius: 10,
  },

  backButtonText: {
    color: '#ffffff',
    fontWeight: '700',
  },
});