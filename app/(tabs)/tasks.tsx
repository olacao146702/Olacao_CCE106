import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import TaskCard from '../../components/TaskCard';
import {
    defaultTasks,
    Task,
    TASKS_STORAGE_KEY,
} from '../../data/tasks';

export default function TasksScreen() {
  const router = useRouter();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<'All' | 'Pending' | 'Completed'>(
    'All'
  );

  const loadTasks = async () => {
    try {
      const savedTasks = await AsyncStorage.getItem(TASKS_STORAGE_KEY);

      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      } else {
        setTasks(defaultTasks);

        await AsyncStorage.setItem(
          TASKS_STORAGE_KEY,
          JSON.stringify(defaultTasks)
        );
      }
    } catch (error) {
      console.log('Error loading tasks:', error);
      setTasks(defaultTasks);
    }
  };

  // Reload whenever the Tasks tab becomes active
  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [])
  );

  const filteredTasks =
    filter === 'All'
      ? tasks
      : tasks.filter((task) => task.status === filter);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Tasks</Text>
      <Text style={styles.subtitle}>
        Manage your school activities
      </Text>

      {/* FILTERS */}
      <View style={styles.filterContainer}>
        {(['All', 'Pending', 'Completed'] as const).map((item) => (
          <Pressable
            key={item}
            onPress={() => setFilter(item)}
            style={[
              styles.filterButton,
              filter === item && styles.activeFilter,
            ]}
          >
            <Text
              style={[
                styles.filterText,
                filter === item && styles.activeFilterText,
              ]}
            >
              {item}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* TASK LIST */}
      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No tasks found.
          </Text>
        }
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            onPress={() =>
              router.push({
                pathname: '/task/[id]',
                params: {
                  id: item.id,
                },
              })
            }
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1e293b',
    marginTop: 10,
  },

  subtitle: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
    marginBottom: 18,
  },

  filterContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 18,
  },

  filterButton: {
    flex: 1,
    paddingVertical: 11,
    borderRadius: 10,
    backgroundColor: '#e2e8f0',
    alignItems: 'center',
  },

  activeFilter: {
    backgroundColor: '#dc2626',
  },

  filterText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#475569',
  },

  activeFilterText: {
    color: '#ffffff',
  },

  list: {
    paddingBottom: 30,
  },

  emptyText: {
    textAlign: 'center',
    color: '#64748b',
    marginTop: 40,
    fontSize: 15,
  },
});