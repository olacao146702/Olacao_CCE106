import { Ionicons } from '@expo/vector-icons';
import {
  router,
  useLocalSearchParams,
} from 'expo-router';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const courses: Record<
  string,
  {
    code: string;
    name: string;
    units: number;
    instructor: string;
    schedule: string;
    description: string;
  }
> = {
  '101': {
    code: 'IT101',
    name: 'Introduction to Information Technology',
    units: 3,
    instructor: 'Mr. Santos',
    schedule: 'Monday & Wednesday, 9:00 AM',
    description:
      'An introduction to information technology concepts, systems, hardware, software, and modern computing practices.',
  },

  '102': {
    code: 'IT102',
    name: 'Database Systems',
    units: 3,
    instructor: 'Ms. Reyes',
    schedule: 'Tuesday & Thursday, 10:00 AM',
    description:
      'Covers database concepts, relational models, SQL, data organization, and basic database management.',
  },

  '103': {
    code: 'IT103',
    name: 'Mobile Application Development',
    units: 3,
    instructor: 'Mr. Cruz',
    schedule: 'Friday, 1:00 PM',
    description:
      'Introduces mobile application development using modern frameworks and user interface design principles.',
  },
};

export default function CourseDetailsScreen() {
  const { id } = useLocalSearchParams();

  const course = courses[String(id)];

  if (!course) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons
          name="alert-circle-outline"
          size={50}
          color="#B42318"
        />

        <Text style={styles.errorTitle}>
          Course Not Found
        </Text>

        <Text style={styles.errorText}>
          The course ID you entered is invalid.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.back()}
        >
          <Text style={styles.buttonText}>
            Go Back
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <View style={styles.headerCard}>
        <View style={styles.courseIcon}>
          <Ionicons
            name="book-outline"
            size={32}
            color="#123B5D"
          />
        </View>

        <Text style={styles.code}>
          {course.code}
        </Text>

        <Text style={styles.courseName}>
          {course.name}
        </Text>
      </View>

      <View style={styles.card}>
        <InfoRow
          icon="person-outline"
          label="Instructor"
          value={course.instructor}
        />

        <View style={styles.divider} />

        <InfoRow
          icon="calendar-outline"
          label="Schedule"
          value={course.schedule}
        />

        <View style={styles.divider} />

        <InfoRow
          icon="layers-outline"
          label="Units"
          value={`${course.units} Units`}
        />
      </View>

      <Text style={styles.sectionTitle}>
        Description
      </Text>

      <View style={styles.descriptionCard}>
        <Text style={styles.descriptionText}>
          {course.description}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.back()}
      >
        <Ionicons
          name="arrow-back"
          size={20}
          color="#FFFFFF"
        />

        <Text style={styles.buttonText}>
          Back
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
}) {
  return (
    <View style={styles.infoRow}>
      <Ionicons
        name={icon}
        size={21}
        color="#123B5D"
      />

      <View style={styles.infoText}>
        <Text style={styles.label}>
          {label}
        </Text>

        <Text style={styles.value}>
          {value}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7FA',
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  headerCard: {
    backgroundColor: '#123B5D',
    borderRadius: 17,
    padding: 23,
    alignItems: 'center',
    marginBottom: 18,
  },

  courseIcon: {
    width: 65,
    height: 65,
    borderRadius: 17,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },

  code: {
    color: '#BFD3E2',
    fontSize: 13,
    fontWeight: '800',
  },

  courseName: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 5,
    lineHeight: 26,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 18,
    elevation: 2,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  infoText: {
    flex: 1,
    marginLeft: 12,
  },

  label: {
    color: '#7B8791',
    fontSize: 12,
  },

  value: {
    color: '#172B3A',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 2,
  },

  divider: {
    height: 1,
    backgroundColor: '#E7ECF0',
    marginVertical: 14,
  },

  sectionTitle: {
    color: '#172B3A',
    fontSize: 19,
    fontWeight: '800',
    marginTop: 22,
    marginBottom: 11,
  },

  descriptionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 18,
    elevation: 2,
    marginBottom: 20,
  },

  descriptionText: {
    color: '#53616B',
    fontSize: 14,
    lineHeight: 21,
  },

  button: {
    backgroundColor: '#123B5D',
    borderRadius: 13,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    marginLeft: 8,
  },

  errorContainer: {
    flex: 1,
    backgroundColor: '#F4F7FA',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },

  errorTitle: {
    color: '#172B3A',
    fontSize: 22,
    fontWeight: '800',
    marginTop: 15,
  },

  errorText: {
    color: '#7B8791',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 20,
  },
});