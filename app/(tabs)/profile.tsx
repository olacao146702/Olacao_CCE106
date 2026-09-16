import React, { useState } from 'react';
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

export default function ProfileScreen() {
  const [fullName, setFullName] = useState('Student');
  const [program, setProgram] = useState('BS Information Technology');

  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (fullName.trim() === '') {
      setError('Full Name is required.');
      setSaved(false);
      return;
    }

    setError('');
    setSaved(true);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>My Profile</Text>

      <Text style={styles.subtitle}>
        Update your student information
      </Text>

      <View style={styles.profileHeader}>
        <Image
          source={{
            uri: 'https://scontent.fdvo3-1.fna.fbcdn.net/v/t39.30808-6/807085208_122128547223384329_7795756436602453159_n.jpg?stp=dst-jpg_tt6&cstp=mx864x864&ctp=s864x864&_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFxgtYsbByu7IvvbFQE8VKbYnI5_rvUzu9icjn-u9TO72apuRoLCWEOgFX06AXYPG-aw8dq06fwE7tHJSGUDyw8&_nc_ohc=JxbxLFOgWN0Q7kNvwG1fzIv&_nc_oc=AdrFnPRDOhL7FY59cdCk2IudL2jB0nptlu-Dwruk1JljjbFutSWARuVAZQXChlM260I&_nc_zt=23&_nc_ht=scontent.fdvo3-1.fna&_nc_gid=1dpQLkJj3hYV3WtL7LWShw&_nc_ss=7a2a8&oh=00_AQKYV_fRk2A7dh4GxEfgbvVxQ9qss6F7rXYe3evmVUPO3A&oe=6AAFA091',
          }}
          style={styles.avatar}
        />

        <Text style={styles.savedName}>
          {fullName || 'Student'}
        </Text>

        <Text style={styles.savedProgram}>
          {program || 'No program entered'}
        </Text>
      </View>

      <View style={styles.formCard}>
        <Text style={styles.inputLabel}>
          Full Name
        </Text>

        <TextInput
          value={fullName}
          onChangeText={(text) => {
            setFullName(text);
            setError('');
            setSaved(false);
          }}
          placeholder="Enter your full name"
          placeholderTextColor="#94a3b8"
          style={[
            styles.input,
            error !== '' && styles.inputError,
          ]}
        />

        {error !== '' && (
          <Text style={styles.errorText}>
            {error}
          </Text>
        )}

        <Text style={styles.inputLabel}>
          Program / Course
        </Text>

        <TextInput
          value={program}
          onChangeText={(text) => {
            setProgram(text);
            setSaved(false);
          }}
          placeholder="Enter your program"
          placeholderTextColor="#94a3b8"
          style={styles.input}
        />

        <Pressable
          onPress={handleSave}
          disabled={fullName.trim() === ''}
          style={({ pressed }) => [
            styles.saveButton,
            fullName.trim() === '' && styles.disabledButton,
            pressed && fullName.trim() !== '' && styles.buttonPressed,
          ]}
        >
          <Text style={styles.saveButtonText}>
            Save Profile
          </Text>
        </Pressable>

        {saved && (
          <View style={styles.successBox}>
            <Text style={styles.successText}>
              Profile saved successfully!
            </Text>
          </View>
        )}
      </View>

      <View style={styles.noteBox}>
        <Text style={styles.noteTitle}>
          Offline Profile
        </Text>

        <Text style={styles.noteText}>
          Your profile information is handled locally in
          this app.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  title: {
    fontSize: 29,
    fontWeight: '900',
    color: '#0f172a',
  },

  subtitle: {
    color: '#64748b',
    marginTop: 4,
    marginBottom: 22,
  },

  profileHeader: {
    alignItems: 'center',
    backgroundColor: '#1d4ed8',
    borderRadius: 18,
    padding: 22,
    marginBottom: 18,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 4,
    borderColor: '#ffffff',
    marginBottom: 10,
  },

  savedName: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '800',
  },

  savedProgram: {
    color: '#dbeafe',
    marginTop: 4,
    textAlign: 'center',
  },

  formCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#dbeafe',
  },

  inputLabel: {
    color: '#334155',
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 7,
    marginTop: 5,
  },

  input: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#0f172a',
    backgroundColor: '#f8fafc',
    marginBottom: 6,
  },

  inputError: {
    borderColor: '#dc2626',
  },

  errorText: {
    color: '#dc2626',
    fontSize: 12,
    marginBottom: 8,
    fontWeight: '600',
  },

  saveButton: {
    backgroundColor: '#dc2626',
    borderRadius: 11,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 16,
  },

  disabledButton: {
    backgroundColor: '#94a3b8',
  },

  buttonPressed: {
    opacity: 0.65,
    transform: [{ scale: 0.98 }],
  },

  saveButtonText: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 15,
  },

  successBox: {
    backgroundColor: '#dbeafe',
    borderRadius: 10,
    padding: 12,
    marginTop: 14,
  },

  successText: {
    color: '#1d4ed8',
    textAlign: 'center',
    fontWeight: '700',
  },

  noteBox: {
    backgroundColor: '#fee2e2',
    borderRadius: 14,
    padding: 16,
    marginTop: 18,
    borderWidth: 1,
    borderColor: '#fecaca',
  },

  noteTitle: {
    color: '#991b1b',
    fontWeight: '800',
  },

  noteText: {
    color: '#7f1d1d',
    marginTop: 4,
    lineHeight: 19,
    fontSize: 13,
  },
});