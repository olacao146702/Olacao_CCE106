import React from 'react';
import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';

type Task = {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  status: 'Pending' | 'Completed';
};

type TaskCardProps = {
  task: Task;
  onPress: () => void;
};

export default function TaskCard({
  task,
  onPress,
}: TaskCardProps) {
  const completed = task.status === 'Completed';

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.topRow}>
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {task.title}
          </Text>

          <Text style={styles.subject}>
            {task.subject}
          </Text>
        </View>

        <View
          style={[
            styles.status,
            completed
              ? styles.completedStatus
              : styles.pendingStatus,
          ]}
        >
          <Text
            style={[
              styles.statusText,
              completed
                ? styles.completedText
                : styles.pendingText,
            ]}
          >
            {task.status}
          </Text>
        </View>
      </View>

      <View style={styles.bottomRow}>
        <Text style={styles.dueLabel}>Due</Text>
        <Text style={styles.dueDate}>{task.dueDate}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#dc2626',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 2,
  },

  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  titleContainer: {
    flex: 1,
    marginRight: 10,
  },

  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0f172a',
  },

  subject: {
    marginTop: 5,
    fontSize: 13,
    color: '#64748b',
  },

  status: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  pendingStatus: {
    backgroundColor: '#fee2e2',
  },

  completedStatus: {
    backgroundColor: '#dbeafe',
  },

  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },

  pendingText: {
    color: '#b91c1c',
  },

  completedText: {
    color: '#1d4ed8',
  },

  bottomRow: {
    flexDirection: 'row',
    marginTop: 14,
    alignItems: 'center',
  },

  dueLabel: {
    fontSize: 12,
    color: '#64748b',
    marginRight: 6,
  },

  dueDate: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
  },
});