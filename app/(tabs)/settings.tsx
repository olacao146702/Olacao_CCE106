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

export default function SettingsScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.heading}>
        Account & Preferences
      </Text>

      <Text style={styles.description}>
        Manage your student portal preferences and account actions.
      </Text>

      <TouchableOpacity
        style={styles.settingCard}
        activeOpacity={0.8}
        onPress={() =>
          router.push('/preference' as any)
        }
      >
        <View style={styles.iconBox}>
          <Ionicons
            name="options-outline"
            size={24}
            color="#123B5D"
          />
        </View>

        <View style={styles.settingInfo}>
          <Text style={styles.settingTitle}>
            Preferences
          </Text>

          <Text style={styles.settingDescription}>
            Customize your portal preferences
          </Text>
        </View>

        <Ionicons
          name="chevron-forward"
          size={21}
          color="#8A96A3"
        />
      </TouchableOpacity>

      <View style={styles.settingCard}>
        <View style={styles.iconBox}>
          <Ionicons
            name="notifications-outline"
            size={24}
            color="#123B5D"
          />
        </View>

        <View style={styles.settingInfo}>
          <Text style={styles.settingTitle}>
            Notifications
          </Text>

          <Text style={styles.settingDescription}>
            Manage notification settings
          </Text>
        </View>
      </View>

      <View style={styles.settingCard}>
        <View style={styles.iconBox}>
          <Ionicons
            name="shield-checkmark-outline"
            size={24}
            color="#123B5D"
          />
        </View>

        <View style={styles.settingInfo}>
          <Text style={styles.settingTitle}>
            Privacy
          </Text>

          <Text style={styles.settingDescription}>
            Review privacy information
          </Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>
        Account
      </Text>

      <TouchableOpacity
        style={styles.logoutButton}
        activeOpacity={0.8}
        onPress={() =>
          alert('Logout action selected.')
        }
      >
        <Ionicons
          name="log-out-outline"
          size={21}
          color="#FFFFFF"
        />

        <Text style={styles.logoutText}>
          Log Out
        </Text>
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
    lineHeight: 19,
    marginTop: 5,
    marginBottom: 22,
  },

  settingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2,
  },

  iconBox: {
    width: 47,
    height: 47,
    borderRadius: 12,
    backgroundColor: '#E8F1F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 13,
  },

  settingInfo: {
    flex: 1,
  },

  settingTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#172B3A',
  },

  settingDescription: {
    fontSize: 12,
    color: '#7B8791',
    marginTop: 3,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#172B3A',
    marginTop: 18,
    marginBottom: 12,
  },

  logoutButton: {
    backgroundColor: '#B42318',
    borderRadius: 13,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoutText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    marginLeft: 8,
  },
});