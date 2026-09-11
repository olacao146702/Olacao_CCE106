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

export default function StudentDetailsScreen() {
  const { id } = useLocalSearchParams();

  const studentId = String(id);

  if (!studentId || studentId === 'undefined') {
    return (
      <View style={styles.errorContainer}>
        <Ionicons
          name="alert-circle-outline"
          size={50}
          color="#B42318"
        />

        <Text style={styles.errorTitle}>
          Invalid Student
        </Text>

        <Text style={styles.errorText}>
          No valid student ID was provided.
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
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Ionicons
            name="person"
            size={38}
            color="#123B5D"
          />
        </View>

        <Text style={styles.name}>
          Student User
        </Text>

        <Text style={styles.program}>
          BS Information Technology
        </Text>
      </View>

      <View style={styles.card}>
        <InfoRow
          icon="id-card-outline"
          label="Student ID"
          value="146702"
        />

        <View style={styles.divider} />

        <InfoRow
          icon="mail-outline"
          label="Email"
          value="j.olacao.146702.tc@umindanao.edu.ph"
        />

        <View style={styles.divider} />

        <InfoRow
          icon="school-outline"
          label="Program"
          value="BS Information Technology"
        />

        <View style={styles.divider} />

        <InfoRow
          icon="calendar-outline"
          label="Year Level"
          value="3rd Year"
        />

        <View style={styles.divider} />

        <InfoRow
          icon="checkmark-circle-outline"
          label="Status"
          value="Active Student"
        />
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
          Back to Previous Screen
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
      <View style={styles.iconBox}>
        <Ionicons
          name={icon}
          size={20}
          color="#123B5D"
        />
      </View>

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

  profileHeader: {
    alignItems: 'center',
    marginBottom: 22,
  },

  avatar: {
    width: 85,
    height: 85,
    borderRadius: 43,
    backgroundColor: '#E3EDF4',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },

  name: {
    color: '#172B3A',
    fontSize: 23,
    fontWeight: '800',
  },

  program: {
    color: '#7B8791',
    fontSize: 13,
    marginTop: 4,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 18,
    elevation: 2,
    marginBottom: 20,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 11,
    backgroundColor: '#E8F1F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  infoText: {
    flex: 1,
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
    marginVertical: 13,
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
    fontSize: 14,
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
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 20,
  },
});