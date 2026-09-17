
import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

type Student = {
  id: number;
  name: string;
  status: 'Present' | 'Absent' | null;
};

const studentList: Student[] = [
  { id: 1, name: 'Iroy, Mike Airon', status: null },
  { id: 2, name: 'Gonzales, Dwayne Lee', status: null },
  { id: 3, name: 'Malintad, Edieson', status: null },
  { id: 4, name: 'Gamones, Lhindex Khim', status: null },
  { id: 5, name: 'Descartin, John Denver', status: null },
  { id: 6, name: 'Olacao, Jade', status: null },
];

export default function Lab08() {
  const [students, setStudents] = useState<Student[]>(studentList);

  useEffect(() => {
    console.log('Attendance list loaded.');
  }, []);

  const markAttendance = (
    id: number,
    status: 'Present' | 'Absent'
  ) => {
    setStudents((currentStudents) =>
      currentStudents.map((student) =>
        student.id === id
          ? { ...student, status }
          : student
      )
    );
  };

  const presentCount = students.filter(
    (student) => student.status === 'Present'
  ).length;

  const absentCount = students.filter(
    (student) => student.status === 'Absent'
  ).length;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Attendance</Text>
          <Text style={styles.subtitle}>
            Mark students present or absent
          </Text>
        </View>

        {/* Small Summary */}
        <View style={styles.summary}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryNumber}>{presentCount}</Text>
            <Text style={styles.summaryLabel}>Present</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.summaryItem}>
            <Text style={styles.summaryNumber}>{absentCount}</Text>
            <Text style={styles.summaryLabel}>Absent</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.summaryItem}>
            <Text style={styles.summaryNumber}>
              {students.length}
            </Text>
            <Text style={styles.summaryLabel}>Total</Text>
          </View>
        </View>

        {/* Student List */}
        <View style={styles.list}>
          {students.map((student) => (
            <View key={student.id} style={styles.studentRow}>
              {/* Status Icon */}
              <View
                style={[
                  styles.statusIcon,
                  student.status === 'Present' &&
                    styles.presentIcon,
                  student.status === 'Absent' &&
                    styles.absentIcon,
                ]}
              >
                <Text style={styles.statusText}>
                  {student.status === 'Present'
                    ? '✓'
                    : student.status === 'Absent'
                    ? '✕'
                    : ''}
                </Text>
              </View>

              {/* Student Name */}
              <Text
                style={styles.studentName}
                numberOfLines={2}
              >
                {student.name}
              </Text>

              {/* Buttons */}
              <View style={styles.buttons}>
                <TouchableOpacity
                  style={[
                    styles.smallButton,
                    styles.presentButton,
                    student.status === 'Present' &&
                      styles.selectedPresent,
                  ]}
                  onPress={() =>
                    markAttendance(student.id, 'Present')
                  }
                  activeOpacity={0.7}
                >
                  <Text style={styles.buttonText}>✓</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.smallButton,
                    styles.absentButton,
                    student.status === 'Absent' &&
                      styles.selectedAbsent,
                  ]}
                  onPress={() =>
                    markAttendance(student.id, 'Absent')
                  }
                  activeOpacity={0.7}
                >
                  <Text style={styles.buttonText}>✕</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fb',
  },

  scrollContent: {
    padding: 18,
    paddingBottom: 30,
  },

  header: {
    marginBottom: 16,
  },

  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1f2937',
  },

  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 3,
  },

  /* Compact Summary */
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingVertical: 10,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },

  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },

  summaryNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
  },

  summaryLabel: {
    fontSize: 11,
    color: '#6b7280',
    marginTop: 1,
  },

  divider: {
    width: 1,
    height: 28,
    backgroundColor: '#e5e7eb',
  },

  /* Student List */
  list: {
    gap: 8,
  },

  studentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },

  statusIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },

  presentIcon: {
    backgroundColor: '#dcfce7',
  },

  absentIcon: {
    backgroundColor: '#fee2e2',
  },

  statusText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#374151',
  },

  studentName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    paddingRight: 8,
  },

  buttons: {
    flexDirection: 'row',
    gap: 6,
  },

  smallButton: {
    width: 38,
    height: 38,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },

  presentButton: {
    backgroundColor: '#22c55e',
  },

  absentButton: {
    backgroundColor: '#ef4444',
  },

  selectedPresent: {
    borderWidth: 2,
    borderColor: '#166534',
  },

  selectedAbsent: {
    borderWidth: 2,
    borderColor: '#991b1b',
  },

  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
});
