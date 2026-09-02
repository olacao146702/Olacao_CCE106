import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function ProfileScreen() {
  const [name, setName] = useState('');
  const [program, setProgram] = useState('');
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  // Open camera
  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        'Camera Permission',
        'Please allow camera access to take a profile photo.'
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
      setSaved(false);
    }
  };

  // Save profile
  const saveProfile = () => {
    if (!name.trim() || !program.trim()) {
      Alert.alert(
        'Missing Information',
        'Please enter your full name and program.'
      );
      return;
    }

    setSaved(true);

    Alert.alert(
      'Profile Saved',
      'Your profile information has been saved.'
    );
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>Personal Profile</Text>

      {/* PROFILE PHOTO */}
      <View style={styles.photoSection}>
        {profileImage ? (
          <Image
            source={{ uri: profileImage }}
            style={styles.profileImage}
          />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>👤</Text>
          </View>
        )}

        <Pressable
          onPress={takePhoto}
          style={({ pressed }) => [
            styles.cameraButton,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.cameraButtonText}>
            {profileImage ? '📷 RETAKE PHOTO' : '📷 TAKE PROFILE PHOTO'}
          </Text>
        </Pressable>
      </View>

      {/* NAME */}
      <Text style={styles.label}>Full Name *</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your full name"
        value={name}
        onChangeText={setName}
      />

      {/* PROGRAM */}
      <Text style={styles.label}>Program *</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your program"
        value={program}
        onChangeText={setProgram}
      />

      {/* BIO */}
      <Text style={styles.label}>Biography</Text>
      <TextInput
        style={[styles.input, styles.bioInput]}
        placeholder="Tell something about yourself"
        value={bio}
        onChangeText={setBio}
        multiline
      />

      {/* EMAIL */}
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* PHONE */}
      <Text style={styles.label}>Contact Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your contact number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      {/* SAVE BUTTON */}
      <Pressable
        onPress={saveProfile}
        style={({ pressed }) => [
          styles.saveButton,
          pressed && styles.buttonPressed,
        ]}
      >
        <Text style={styles.saveButtonText}>SAVE PROFILE</Text>
      </Pressable>

      {/* SAVED RESULT */}
      {saved && (
        <View style={styles.savedContainer}>
          <Text style={styles.savedTitle}>✓ PROFILE SAVED</Text>

          {profileImage && (
            <Image
              source={{ uri: profileImage }}
              style={styles.savedImage}
            />
          )}

          <Text style={styles.savedText}>
            <Text style={styles.bold}>Name:</Text> {name}
          </Text>

          <Text style={styles.savedText}>
            <Text style={styles.bold}>Program:</Text> {program}
          </Text>

          {bio !== '' && (
            <Text style={styles.savedText}>
              <Text style={styles.bold}>Bio:</Text> {bio}
            </Text>
          )}

          {email !== '' && (
            <Text style={styles.savedText}>
              <Text style={styles.bold}>Email:</Text> {email}
            </Text>
          )}

          {phone !== '' && (
            <Text style={styles.savedText}>
              <Text style={styles.bold}>Contact:</Text> {phone}
            </Text>
          )}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
  },

  photoSection: {
    alignItems: 'center',
    marginBottom: 25,
  },

  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 15,
  },

  placeholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#e5e5e5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },

  placeholderText: {
    fontSize: 65,
  },

  cameraButton: {
    backgroundColor: '#333',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },

  cameraButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },

  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
    marginTop: 12,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },

  bioInput: {
    height: 100,
    textAlignVertical: 'top',
  },

  saveButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 25,
  },

  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  buttonPressed: {
    opacity: 0.6,
    transform: [{ scale: 0.98 }],
  },

  savedContainer: {
    marginTop: 25,
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#e8f5e9',
    borderWidth: 1,
    borderColor: '#81c784',
  },

  savedTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },

  savedImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 15,
  },

  savedText: {
    fontSize: 15,
    marginBottom: 8,
  },

  bold: {
    fontWeight: 'bold',
  },
});