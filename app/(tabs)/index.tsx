import React from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Background */}
      <View style={styles.backgroundShape} />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.smallTitle}>HELLO, I'M</Text>

          <Text style={styles.name}>JADE H.</Text>
          <Text style={styles.lastName}>OLACAO</Text>

          <View style={styles.redLine} />

          <Text style={styles.studentText}>
            BACHELOR OF SCIENCE IN INFORMATION TECHNOLOGY
          </Text>
        </View>

        {/* About Me */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardNumber}>01</Text>
            <Text style={styles.cardTitle}>ABOUT ME</Text>
          </View>

          <Text style={styles.introduction}>
            Hi! I am <Text style={styles.highlight}>Jade H. Olacao</Text>,
            19 years old, a Bachelor of Science in Information Technology student.
          </Text>

          <Text style={styles.introduction}>
            I am excited to learn more about mobile development and explore
            how mobile applications are created.
          </Text>

          <Text style={styles.introduction}>
            I want to improve my programming skills by practicing, exploring
            new technologies, creating projects, and learning from the
            challenges I encounter along the way.
          </Text>
        </View>

        {/* Student Information */}
        <View style={styles.infoRow}>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>COURSE</Text>
            <Text style={styles.infoValue}>BSIT</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>CLASS</Text>
            <Text style={styles.infoValue}>2013</Text>
          </View>

        </View>

        {/* Subject */}
        <View style={styles.classCard}>
          <Text style={styles.classLabel}>CLASS CODE</Text>

          <Text style={styles.classValue}>
            CCE106
          </Text>
        </View>

        {/* Goal */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardNumber}>02</Text>
            <Text style={styles.cardTitle}>MY GOAL</Text>
          </View>

          <Text style={styles.goalText}>
            My goal is to become more confident in programming and develop
            useful and creative mobile applications.
          </Text>

          <Text style={styles.goalText}>
            I also want to gain more experience by building different
            projects and continuously improving my skills as an IT student.
          </Text>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080A12',
  },

  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },

  backgroundShape: {
    position: 'absolute',
    width: width * 1.5,
    height: 300,
    backgroundColor: '#151A29',
    borderRadius: 200,
    top: -150,
    left: -100,
    opacity: 0.7,
  },

  header: {
    alignItems: 'center',
    marginBottom: 35,
  },

  smallTitle: {
    color: '#9CA3AF',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 4,
  },

  name: {
    color: '#FFFFFF',
    fontSize: 42,
    fontWeight: '900',
    letterSpacing: 2,
    marginTop: 8,
  },

  lastName: {
    color: '#E31B23',
    fontSize: 42,
    fontWeight: '900',
    letterSpacing: 2,
  },

  redLine: {
    width: 70,
    height: 4,
    backgroundColor: '#E31B23',
    marginVertical: 15,
    borderRadius: 10,
  },

  studentText: {
    color: '#AEB4C0',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
    textAlign: 'center',
  },

  card: {
    backgroundColor: '#111522',
    borderRadius: 18,
    padding: 22,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#252B3A',
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },

  cardNumber: {
    color: '#E31B23',
    fontSize: 13,
    fontWeight: '900',
    marginRight: 12,
  },

  cardTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 2,
  },

  introduction: {
    color: '#C4CAD5',
    fontSize: 15,
    lineHeight: 25,
    marginBottom: 14,
  },

  highlight: {
    color: '#FFFFFF',
    fontWeight: '800',
  },

  infoRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },

  infoCard: {
    flex: 1,
    backgroundColor: '#111522',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#252B3A',
  },

  infoLabel: {
    color: '#8D95A5',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 7,
  },

  infoValue: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '900',
  },

  classCard: {
    backgroundColor: '#D71920',
    borderRadius: 18,
    padding: 20,
    marginBottom: 18,
  },

  classLabel: {
    color: '#FFD7D9',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 2,
  },

  classValue: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '900',
    marginTop: 5,
  },

  goalText: {
    color: '#C4CAD5',
    fontSize: 15,
    lineHeight: 25,
    marginBottom: 14,
  },
});