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

export default function ProfileScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Ionicons
            name="person"
            size={42}
            color="#123B5D"
          />
        </View>

        <Text style={styles.name}>
          Student User
        </Text>

        <Text style={styles.program}>
          Bachelor of Science in Information Technology
        </Text>
      </View>

      <Text style={styles.sectionTitle}>
        Student Information
      </Text>

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
      </View>

      <TouchableOpacity
        style={styles.button}
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
          name="open-outline"
          size={21}
          color="#FFFFFF"
        />

        <Text style={styles.buttonText}>
          View Student Details
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
      <View style={styles.infoIcon}>
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
    paddingVertical: 15,
    marginBottom: 25,
  },

  avatar: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: '#E3EDF4',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 13,
  },

  name: {
    fontSize: 24,
    fontWeight: '800',
    color: '#172B3A',
  },

  program: {
    fontSize: 13,
    color: '#7B8791',
    textAlign: 'center',
    marginTop: 5,
    lineHeight: 19,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#172B3A',
    marginBottom: 12,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 17,
    elevation: 2,
    marginBottom: 20,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  infoIcon: {
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
    marginBottom: 2,
  },

  value: {
    color: '#172B3A',
    fontSize: 14,
    fontWeight: '700',
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
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    marginLeft: 8,
  },
});