import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    View,
} from 'react-native';

export default function PreferenceScreen() {
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(false);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.heading}>
        Preferences
      </Text>

      <Text style={styles.description}>
        Manage how your Student Portal behaves.
      </Text>

      <View style={styles.card}>
        <PreferenceRow
          title="Notifications"
          description="Receive important portal notifications"
          value={notifications}
          onValueChange={setNotifications}
        />

        <View style={styles.divider} />

        <PreferenceRow
          title="Email Updates"
          description="Receive updates through your email"
          value={emailUpdates}
          onValueChange={setEmailUpdates}
        />
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>
          Portal Preferences
        </Text>

        <Text style={styles.infoText}>
          Your preferences are stored for this session
          and can be changed at any time.
        </Text>
      </View>
    </ScrollView>
  );
}

function PreferenceRow({
  title,
  description,
  value,
  onValueChange,
}: {
  title: string;
  description: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}) {
  return (
    <View style={styles.preferenceRow}>
      <View style={styles.preferenceText}>
        <Text style={styles.preferenceTitle}>
          {title}
        </Text>

        <Text style={styles.preferenceDescription}>
          {description}
        </Text>
      </View>

      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{
          false: '#D5DCE2',
          true: '#8AAEC5',
        }}
        thumbColor={
          value ? '#123B5D' : '#F4F4F4'
        }
      />
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

  heading: {
    fontSize: 24,
    fontWeight: '800',
    color: '#172B3A',
  },

  description: {
    color: '#7B8791',
    fontSize: 13,
    marginTop: 5,
    marginBottom: 22,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 17,
    elevation: 2,
  },

  preferenceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  preferenceText: {
    flex: 1,
    paddingRight: 15,
  },

  preferenceTitle: {
    color: '#172B3A',
    fontSize: 15,
    fontWeight: '800',
  },

  preferenceDescription: {
    color: '#7B8791',
    fontSize: 12,
    lineHeight: 17,
    marginTop: 3,
  },

  divider: {
    height: 1,
    backgroundColor: '#E7ECF0',
    marginVertical: 16,
  },

  infoCard: {
    backgroundColor: '#E8F1F7',
    borderRadius: 15,
    padding: 17,
    marginTop: 18,
  },

  infoTitle: {
    color: '#123B5D',
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 5,
  },

  infoText: {
    color: '#536B7B',
    fontSize: 13,
    lineHeight: 19,
  },
});