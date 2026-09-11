import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const courses = [
  {
    id: '2013',
    code: 'CCE106',
    name: 'APPLICATION DEVELOPMENT AND EMERGING TECHNOLOGIES',
    units: 3,
  },
  {
    id: '2018',
    code: 'IT12',
    name: 'SYSTEMS INTEGRATION & ARCHITECTURE',
    units: 3,
  },
  {
    id: '2039',
    code: 'IT13',
    name: 'PROFESSIONAL TRACK FOR IT 4',
    units: 3,
  },
];

export default function HomeScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* WELCOME */}
      <View style={styles.welcomeCard}>
        <View style={styles.welcomeIcon}>
          <Ionicons
            name="school-outline"
            size={30}
            color="#FFFFFF"
          />
        </View>

        <View style={styles.welcomeText}>
          <Text style={styles.welcomeSmall}>
            WELCOME BACK
          </Text>

          <Text style={styles.welcomeName}>
            Student
          </Text>

          <Text style={styles.welcomeDescription}>
            Here's your student portal overview.
          </Text>
        </View>
      </View>

      {/* SUMMARY */}
      <Text style={styles.sectionTitle}>
        Student Summary
      </Text>

      <View style={styles.summaryCard}>
        <View style={styles.summaryRow}>
          <Ionicons
            name="person-outline"
            size={21}
            color="#123B5D"
          />

          <View>
            <Text style={styles.label}>
              Student Name
            </Text>

            <Text style={styles.value}>
              Jade H. Olacao 
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.summaryRow}>
          <Ionicons
            name="id-card-outline"
            size={21}
            color="#123B5D"
          />

          <View>
            <Text style={styles.label}>
              Student ID
            </Text>

            <Text style={styles.value}>
              146702
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.summaryRow}>
          <Ionicons
            name="book-outline"
            size={21}
            color="#123B5D"
          />

          <View>
            <Text style={styles.label}>
              Program
            </Text>

            <Text style={styles.value}>
              DCE
            </Text>
          </View>
        </View>
      </View>

      {/* STATISTICS */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Ionicons
            name="library-outline"
            size={25}
            color="#123B5D"
          />

          <Text style={styles.statNumber}>
            3
          </Text>

          <Text style={styles.statLabel}>
            Courses
          </Text>
        </View>

        <View style={styles.statCard}>
          <Ionicons
            name="school-outline"
            size={25}
            color="#123B5D"
          />

          <Text style={styles.statNumber}>
            9
          </Text>

          <Text style={styles.statLabel}>
            Units
          </Text>
        </View>
      </View>

      {/* COURSES */}
      <Text style={styles.sectionTitle}>
        My Courses
      </Text>

      {courses.map((course) => (
        <TouchableOpacity
          key={course.id}
          style={styles.courseCard}
          activeOpacity={0.8}
          onPress={() =>
            router.push({
              pathname: '/course/[id]' as any,
              params: {
                id: course.id,
              },
            })
          }
        >
          <View style={styles.courseIcon}>
            <Ionicons
              name="book-outline"
              size={24}
              color="#123B5D"
            />
          </View>

          <View style={styles.courseInfo}>
            <Text style={styles.courseCode}>
              {course.code}
            </Text>

            <Text style={styles.courseName}>
              {course.name}
            </Text>

            <Text style={styles.courseUnits}>
              {course.units} Units
            </Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={22}
            color="#8A96A3"
          />
        </TouchableOpacity>
      ))}

      {/* QUICK ACCESS */}
      <Text style={styles.sectionTitle}>
        Quick Access
      </Text>

      <TouchableOpacity
        style={styles.quickButton}
        activeOpacity={0.8}
        onPress={() =>
          router.push({
            pathname: '/student/[id]' as any,
            params: {
              id: '2026-0001',
            },
          })
        }
      >
        <Ionicons
          name="person-circle-outline"
          size={24}
          color="#FFFFFF"
        />

        <View style={styles.quickText}>
          <Text style={styles.quickTitle}>
            Student Details
          </Text>

          <Text style={styles.quickDescription}>
            View your student information
          </Text>
        </View>

        <Ionicons
          name="chevron-forward"
          size={21}
          color="#FFFFFF"
        />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7FA',
  },

  content: {
    padding: 20,
    paddingBottom: 35,
  },

  welcomeCard: {
    backgroundColor: '#123B5D',
    borderRadius: 18,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },

  welcomeIcon: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#285879',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },

  welcomeText: {
    flex: 1,
  },

  welcomeSmall: {
    color: '#BFD3E2',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },

  welcomeName: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: '800',
    marginTop: 2,
  },

  welcomeDescription: {
    color: '#DCE8F0',
    fontSize: 13,
    marginTop: 4,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#172B3A',
    marginBottom: 12,
    marginTop: 4,
  },

  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 17,
    marginBottom: 18,
    elevation: 2,
  },

  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  label: {
    color: '#7B8791',
    fontSize: 12,
    marginBottom: 2,
  },

  value: {
    color: '#172B3A',
    fontSize: 15,
    fontWeight: '700',
  },

  divider: {
    height: 1,
    backgroundColor: '#E7ECF0',
    marginVertical: 13,
  },

  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 23,
  },

  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 16,
    alignItems: 'center',
    elevation: 2,
  },

  statNumber: {
    fontSize: 24,
    fontWeight: '800',
    color: '#172B3A',
    marginTop: 5,
  },

  statLabel: {
    color: '#7B8791',
    fontSize: 12,
    marginTop: 2,
  },

  courseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 11,
    elevation: 2,
  },

  courseIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#E8F1F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 13,
  },

  courseInfo: {
    flex: 1,
  },

  courseCode: {
    color: '#123B5D',
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 2,
  },

  courseName: {
    color: '#172B3A',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 19,
  },

  courseUnits: {
    color: '#8A96A3',
    fontSize: 12,
    marginTop: 3,
  },

  quickButton: {
    backgroundColor: '#123B5D',
    borderRadius: 15,
    padding: 17,
    flexDirection: 'row',
    alignItems: 'center',
  },

  quickText: {
    flex: 1,
    marginLeft: 12,
  },

  quickTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },

  quickDescription: {
    color: '#C7D7E2',
    fontSize: 12,
    marginTop: 2,
  },
});