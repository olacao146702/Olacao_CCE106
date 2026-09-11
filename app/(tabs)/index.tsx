import React, { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

type Activity = {
  id: number;
  text: string;
};

function MetricCard({
  label,
  value,
  subtitle,
}: {
  label: string;
  value: string;
  subtitle: string;
}) {
  return (
    <View style={styles.metricCard}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricSubtitle}>{subtitle}</Text>
    </View>
  );
}

function ActivityItem({ text }: { text: string }) {
  return (
    <View style={styles.activityItem}>
      <View style={styles.activityDot} />
      <Text style={styles.activityText}>{text}</Text>
    </View>
  );
}

export default function DashboardScreen() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Clean up trash near the sidewalk',
      completed: false,
    },
    {
      id: 2,
      title: 'Report damaged streetlight',
      completed: false,
    },
    {
      id: 3,
      title: 'Clear fallen branches from the road',
      completed: true,
    },
  ]);

  const [taskInput, setTaskInput] = useState('');
  const [showAddTask, setShowAddTask] = useState(false);
  const [showAllActivity, setShowAllActivity] = useState(false);
  const [activePanel, setActivePanel] = useState<
    'none' | 'profile' | 'settings'
  >('none');

  const [activities, setActivities] = useState<Activity[]>([
    {
      id: 1,
      text: 'Cleaned up fallen branches from the road',
    },
    {
      id: 2,
      text: 'Reported a damaged streetlight',
    },
    {
      id: 3,
      text: 'Added a new cleanup task',
    },
  ]);

  const addActivity = (text: string) => {
    setActivities((current) => [
      {
        id: Date.now(),
        text,
      },
      ...current,
    ]);
  };

  const handleAddTask = () => {
    const title = taskInput.trim();

    if (!title) {
      return;
    }

    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false,
    };

    setTasks((current) => [...current, newTask]);

    addActivity(`Reported "${title}"`);

    setTaskInput('');
    setShowAddTask(false);
  };

  const handleDeleteTask = (id: number) => {
    const task = tasks.find((item) => item.id === id);

    setTasks((current) => current.filter((item) => item.id !== id));

    if (task) {
      addActivity(`Removed "${task.title}"`);
    }
  };

  const handleToggleTask = (id: number) => {
    setTasks((current) =>
      current.map((task) => {
        if (task.id !== id) {
          return task;
        }

        const newCompletedState = !task.completed;

        if (newCompletedState) {
          addActivity(`Cleaned up "${task.title}"`);
        } else {
          addActivity(`Reopened "${task.title}"`);
        }

        return {
          ...task,
          completed: newCompletedState,
        };
      })
    );
  };

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks = tasks.filter(
    (task) => !task.completed
  ).length;

  const progress =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

  const visibleActivities = showAllActivity
    ? activities
    : activities.slice(0, 3);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.appName}>Spotless</Text>
          <Text style={styles.headerTitle}>Clean Up the Mess</Text>
        </View>

        <Pressable
          style={styles.profileButton}
          onPress={() =>
            setActivePanel(
              activePanel === 'profile' ? 'none' : 'profile'
            )
          }
        >
          <Text style={styles.profileButtonText}>P</Text>
        </Pressable>
      </View>

      {/* WELCOME */}
      <View style={styles.welcomeCard}>
        <Text style={styles.welcomeSmall}>FRIENDLY NEIGHBORHOOD</Text>

        <Text style={styles.welcomeTitle}>
          Keep the neighborhood in order.
        </Text>

        <Text style={styles.welcomeText}>
          Report problems, clean up messes, and keep track of
          everything that needs attention.
        </Text>

        <Pressable
          style={styles.primaryButton}
          onPress={() => setShowAddTask(true)}
        >
          <Text style={styles.primaryButtonText}>
            + REPORT A MESS
          </Text>
        </Pressable>
      </View>

      {/* METRICS */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Neighborhood Status</Text>
      </View>

      <View style={styles.metricsRow}>
        <MetricCard
          label="MESS TO CLEAN"
          value={pendingTasks.toString()}
          subtitle="Needs attention"
        />

        <MetricCard
          label="CLEANED UP"
          value={completedTasks.toString()}
          subtitle="Problems handled"
        />

        <MetricCard
          label="PROGRESS"
          value={`${progress}%`}
          subtitle="Neighborhood status"
        />
      </View>

      {/* REPORT A MESS */}
      {showAddTask && (
        <View style={styles.formCard}>
          <Text style={styles.formTitle}>Report a Mess</Text>

          <Text style={styles.formDescription}>
            Add something that needs to be cleaned, fixed, or
            reported.
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Example: Trash blocking the sidewalk"
            placeholderTextColor="#888"
            value={taskInput}
            onChangeText={setTaskInput}
          />

          <View style={styles.formButtons}>
            <Pressable
              style={styles.cancelButton}
              onPress={() => {
                setTaskInput('');
                setShowAddTask(false);
              }}
            >
              <Text style={styles.cancelButtonText}>CANCEL</Text>
            </Pressable>

            <Pressable
              style={styles.saveButton}
              onPress={handleAddTask}
            >
              <Text style={styles.saveButtonText}>REPORT</Text>
            </Pressable>
          </View>
        </View>
      )}

      {/* TASKS */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Things to Handle</Text>

        <Text style={styles.taskCount}>
          {pendingTasks} pending
        </Text>
      </View>

      <View style={styles.taskCard}>
        {tasks.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>All clear!</Text>
            <Text style={styles.emptyText}>
              No problems are currently waiting for attention.
            </Text>
          </View>
        ) : (
          tasks.map((task) => (
            <View key={task.id} style={styles.taskItem}>
              <Pressable
                style={[
                  styles.checkbox,
                  task.completed && styles.checkboxCompleted,
                ]}
                onPress={() => handleToggleTask(task.id)}
              >
                {task.completed && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </Pressable>

              <Pressable
                style={styles.taskContent}
                onPress={() => handleToggleTask(task.id)}
              >
                <Text
                  style={[
                    styles.taskTitle,
                    task.completed && styles.taskCompleted,
                  ]}
                >
                  {task.title}
                </Text>

                <Text style={styles.taskStatus}>
                  {task.completed ? 'CLEANED UP' : 'NEEDS ATTENTION'}
                </Text>
              </Pressable>

              <Pressable
                style={styles.deleteButton}
                onPress={() => handleDeleteTask(task.id)}
              >
                <Text style={styles.deleteButtonText}>×</Text>
              </Pressable>
            </View>
          ))
        )}
      </View>

      {/* RECENT ACTIVITY */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>

        {activities.length > 3 && (
          <Pressable
            onPress={() => setShowAllActivity(!showAllActivity)}
          >
            <Text style={styles.viewAll}>
              {showAllActivity ? 'SHOW LESS' : 'VIEW ALL'}
            </Text>
          </Pressable>
        )}
      </View>

      <View style={styles.activityCard}>
        {visibleActivities.length === 0 ? (
          <Text style={styles.emptyActivity}>
            No activity yet.
          </Text>
        ) : (
          visibleActivities.map((activity) => (
            <ActivityItem
              key={activity.id}
              text={activity.text}
            />
          ))
        )}
      </View>

      {/* QUICK ACTIONS */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
      </View>

      <View style={styles.quickActions}>
        <Pressable
          style={styles.actionButton}
          onPress={() => setShowAddTask(true)}
        >
          <Text style={styles.actionIcon}>+</Text>
          <Text style={styles.actionTitle}>Report a Mess</Text>
          <Text style={styles.actionText}>
            Add something that needs attention
          </Text>
        </Pressable>

        <Pressable
          style={styles.actionButton}
          onPress={() =>
            setActivePanel(
              activePanel === 'settings' ? 'none' : 'settings'
            )
          }
        >
          <Text style={styles.actionIcon}>⚙</Text>
          <Text style={styles.actionTitle}>Settings</Text>
          <Text style={styles.actionText}>
            Manage your dashboard
          </Text>
        </Pressable>
      </View>

      {/* PROFILE PANEL */}
      {activePanel === 'profile' && (
        <View style={styles.panelCard}>
          <Text style={styles.panelTitle}>Profile</Text>

          <View style={styles.profileCircle}>
            <Text style={styles.profileLargeText}>P</Text>
          </View>

          <Text style={styles.profileName}>Neighborhood Helper</Text>

          <Text style={styles.profileDescription}>
            Ready to help keep the neighborhood clean,
            safe, and organized.
          </Text>

          <Pressable
            style={styles.closeButton}
            onPress={() => setActivePanel('none')}
          >
            <Text style={styles.closeButtonText}>CLOSE</Text>
          </Pressable>
        </View>
      )}

      {/* SETTINGS PANEL */}
      {activePanel === 'settings' && (
        <View style={styles.panelCard}>
          <Text style={styles.panelTitle}>Settings</Text>

          <View style={styles.settingRow}>
            <View>
              <Text style={styles.settingTitle}>
                Dashboard Theme
              </Text>

              <Text style={styles.settingText}>
                Red, blue, and white neighborhood theme
              </Text>
            </View>

            <View style={styles.settingBadge}>
              <Text style={styles.settingBadgeText}>ACTIVE</Text>
            </View>
          </View>

          <View style={styles.settingRow}>
            <View>
              <Text style={styles.settingTitle}>
                Task Tracking
              </Text>

              <Text style={styles.settingText}>
                Track reported and completed problems
              </Text>
            </View>

            <View style={styles.settingBadge}>
              <Text style={styles.settingBadgeText}>ON</Text>
            </View>
          </View>

          <Pressable
            style={styles.closeButton}
            onPress={() => setActivePanel('none')}
          >
            <Text style={styles.closeButtonText}>CLOSE</Text>
          </Pressable>
        </View>
      )}

      {/* FOOTER */}
      <View style={styles.footer}>
        <Text style={styles.footerTitle}>Spotless</Text>

        <Text style={styles.footerText}>
          Helping keep the neighborhood clean, organized,
          and ready for action.
        </Text>

        <Text style={styles.footerCopyright}>
          CLEAN • REPORT • HELP
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F5F7',
  },

  content: {
    padding: 20,
    paddingBottom: 40,
    maxWidth: 1100,
    width: '100%',
    alignSelf: 'center',
  },

  /* HEADER */

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },

  appName: {
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 2,
    color: '#B91C2C',
    textTransform: 'uppercase',
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#14213D',
    marginTop: 3,
  },

  profileButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#174A8B',
    justifyContent: 'center',
    alignItems: 'center',
  },

  profileButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
  },

  /* WELCOME */

  welcomeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 24,
    marginBottom: 28,
    borderWidth: 1,
    borderColor: '#E4E6EA',
  },

  welcomeSmall: {
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1.5,
    color: '#B91C2C',
    marginBottom: 8,
  },

  welcomeTitle: {
    fontSize: 25,
    fontWeight: '900',
    color: '#14213D',
    marginBottom: 10,
  },

  welcomeText: {
    fontSize: 15,
    lineHeight: 23,
    color: '#616875',
    maxWidth: 650,
    marginBottom: 20,
  },

  primaryButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#B91C2C',
    paddingHorizontal: 20,
    paddingVertical: 13,
    borderRadius: 10,
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 13,
    letterSpacing: 0.5,
  },

  /* SECTION */

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 4,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: '900',
    color: '#14213D',
  },

  taskCount: {
    fontSize: 13,
    fontWeight: '700',
    color: '#777E89',
  },

  viewAll: {
    color: '#B91C2C',
    fontSize: 12,
    fontWeight: '900',
  },

  /* METRICS */

  metricsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 28,
  },

  metricCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E4E6EA',
    minHeight: 125,
  },

  metricLabel: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
    color: '#777E89',
    marginBottom: 8,
  },

  metricValue: {
    fontSize: 30,
    fontWeight: '900',
    color: '#174A8B',
    marginBottom: 4,
  },

  metricSubtitle: {
    fontSize: 12,
    color: '#777E89',
  },

  /* FORM */

  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E4E6EA',
  },

  formTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#14213D',
    marginBottom: 5,
  },

  formDescription: {
    fontSize: 13,
    color: '#777E89',
    marginBottom: 15,
  },

  input: {
    backgroundColor: '#F4F5F7',
    borderWidth: 1,
    borderColor: '#D9DCE1',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 14,
    color: '#14213D',
    marginBottom: 14,
  },

  formButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },

  cancelButton: {
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#D9DCE1',
  },

  cancelButtonText: {
    color: '#555B66',
    fontWeight: '800',
    fontSize: 12,
  },

  saveButton: {
    backgroundColor: '#174A8B',
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 9,
  },

  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 12,
  },

  /* TASKS */

  taskCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#E4E6EA',
    marginBottom: 28,
    overflow: 'hidden',
  },

  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ECEDEF',
  },

  checkbox: {
    width: 25,
    height: 25,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: '#174A8B',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  checkboxCompleted: {
    backgroundColor: '#174A8B',
  },

  checkmark: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },

  taskContent: {
    flex: 1,
  },

  taskTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#14213D',
    marginBottom: 5,
  },

  taskCompleted: {
    textDecorationLine: 'line-through',
    color: '#9297A0',
  },

  taskStatus: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.8,
    color: '#B91C2C',
  },

  deleteButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#F4F5F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },

  deleteButtonText: {
    fontSize: 23,
    color: '#777E89',
    lineHeight: 24,
  },

  emptyState: {
    padding: 30,
    alignItems: 'center',
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#174A8B',
    marginBottom: 5,
  },

  emptyText: {
    textAlign: 'center',
    fontSize: 13,
    color: '#777E89',
  },

  /* ACTIVITY */

  activityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#E4E6EA',
    paddingHorizontal: 18,
    marginBottom: 28,
  },

  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ECEDEF',
  },

  activityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#B91C2C',
    marginRight: 12,
  },

  activityText: {
    flex: 1,
    fontSize: 13,
    color: '#555B66',
  },

  emptyActivity: {
    paddingVertical: 20,
    textAlign: 'center',
    color: '#777E89',
    fontSize: 13,
  },

  /* QUICK ACTIONS */

  quickActions: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 28,
  },

  actionButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#E4E6EA',
    padding: 18,
  },

  actionIcon: {
    fontSize: 24,
    fontWeight: '900',
    color: '#B91C2C',
    marginBottom: 8,
  },

  actionTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: '#14213D',
    marginBottom: 5,
  },

  actionText: {
    fontSize: 12,
    color: '#777E89',
    lineHeight: 18,
  },

  /* PANELS */

  panelCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#E4E6EA',
    padding: 22,
    marginBottom: 28,
  },

  panelTitle: {
    fontSize: 21,
    fontWeight: '900',
    color: '#14213D',
    marginBottom: 18,
  },

  profileCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#174A8B',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },

  profileLargeText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '900',
  },

  profileName: {
    fontSize: 18,
    fontWeight: '900',
    color: '#14213D',
    marginBottom: 5,
  },

  profileDescription: {
    color: '#777E89',
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 18,
  },

  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#ECEDEF',
  },

  settingTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#14213D',
    marginBottom: 3,
  },

  settingText: {
    fontSize: 12,
    color: '#777E89',
    maxWidth: 500,
  },

  settingBadge: {
    backgroundColor: '#EAF0F8',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 7,
  },

  settingBadgeText: {
    color: '#174A8B',
    fontSize: 10,
    fontWeight: '900',
  },

  closeButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#F4F5F7',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 18,
  },

  closeButtonText: {
    color: '#555B66',
    fontSize: 11,
    fontWeight: '900',
  },

  /* FOOTER */

  footer: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },

  footerTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: '#14213D',
    marginBottom: 5,
  },

  footerText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#777E89',
    maxWidth: 500,
    lineHeight: 18,
  },

  footerCopyright: {
    marginTop: 12,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.5,
    color: '#B91C2C',
  },
});