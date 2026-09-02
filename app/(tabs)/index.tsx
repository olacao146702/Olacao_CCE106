import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function Calculator() {
  const [firstNumber, setFirstNumber] = useState('');
  const [secondNumber, setSecondNumber] = useState('');
  const [result, setResult] = useState('');
  const [message, setMessage] = useState('');

  const calculate = (operation: string) => {
    // Validate empty input
    if (firstNumber.trim() === '' || secondNumber.trim() === '') {
      setResult('');
      setMessage('Please enter both numbers.');
      return;
    }

    // Convert input to numbers
    const num1 = Number(firstNumber);
    const num2 = Number(secondNumber);

    // Validate invalid input
    if (isNaN(num1) || isNaN(num2)) {
      setResult('');
      setMessage('Please enter valid numbers.');
      return;
    }

    // Prevent division by zero
    if (operation === '/' && num2 === 0) {
      setResult('');
      setMessage('Cannot divide by zero.');
      return;
    }

    let answer = 0;

    switch (operation) {
      case '+':
        answer = num1 + num2;
        break;

      case '-':
        answer = num1 - num2;
        break;

      case '*':
        answer = num1 * num2;
        break;

      case '/':
        answer = num1 / num2;
        break;
    }

    setResult(String(answer));
    setMessage('Calculation successful!');
  };

  return (
    <View style={styles.container}>


      <Text style={styles.title}>SIMPLE CALCULATOR</Text>

      <View style={styles.card}>

        {/* First Number */}
        <Text style={styles.label}>FIRST NUMBER</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter first number"
          placeholderTextColor="#777"
          keyboardType="numeric"
          value={firstNumber}
          onChangeText={setFirstNumber}
        />

        {/* Second Number */}
        <Text style={styles.label}>SECOND NUMBER</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter second number"
          placeholderTextColor="#777"
          keyboardType="numeric"
          value={secondNumber}
          onChangeText={setSecondNumber}
        />

        {/* Operations */}
        <Text style={styles.label}>OPERATIONS</Text>

        <View style={styles.operations}>

          <TouchableOpacity
            style={styles.operationButton}
            onPress={() => calculate('+')}
          >
            <Text style={styles.operationText}>+</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.operationButton}
            onPress={() => calculate('-')}
          >
            <Text style={styles.operationText}>−</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.operationButton}
            onPress={() => calculate('*')}
          >
            <Text style={styles.operationText}>×</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.operationButton}
            onPress={() => calculate('/')}
          >
            <Text style={styles.operationText}>÷</Text>
          </TouchableOpacity>

        </View>

        {/* Result */}
        <Text style={styles.label}>RESULT</Text>

        <View style={styles.resultBox}>
          <Text style={styles.resultText}>
            {result || '—'}
          </Text>
        </View>

        {/* Message */}
        <Text style={styles.label}>MESSAGE</Text>

        <View style={styles.messageBox}>
          <Text style={styles.messageText}>
            {message || 'Enter two numbers and choose an operation.'}
          </Text>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080808',
    padding: 20,
    justifyContent: 'center',
    overflow: 'hidden',
  },

  title: {
    color: '#ffffff',
    fontSize: 36,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: 4,
    marginBottom: 4,
  },

  subtitle: {
    color: '#e50914',
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 3,
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#e50914',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#e50914',
    shadowOpacity: 0.35,
    shadowRadius: 15,
    elevation: 10,
  },

  label: {
    color: '#e50914',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 8,
    marginTop: 10,
  },

  input: {
    height: 55,
    backgroundColor: '#080808',
    borderWidth: 1,
    borderColor: '#8b0000',
    borderRadius: 12,
    paddingHorizontal: 16,
    color: '#ffffff',
    fontSize: 20,
  },

  operations: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
    marginBottom: 10,
  },

  operationButton: {
    width: '22%',
    height: 60,
    backgroundColor: '#8b0000',
    borderWidth: 1,
    borderColor: '#e50914',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  operationText: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: '800',
  },

  resultBox: {
    height: 65,
    backgroundColor: '#080808',
    borderWidth: 1,
    borderColor: '#e50914',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  resultText: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: '800',
  },

  messageBox: {
    minHeight: 55,
    backgroundColor: '#080808',
    borderWidth: 1,
    borderColor: '#8b0000',
    borderRadius: 12,
    padding: 14,
    justifyContent: 'center',
  },

  messageText: {
    color: '#ffffff',
    fontSize: 15,
    textAlign: 'center',
  },

  webCircle1: {
    position: 'absolute',
    width: 500,
    height: 500,
    borderRadius: 250,
    borderWidth: 1,
    borderColor: '#300000',
    top: -250,
    left: -180,
  },

  webCircle2: {
    position: 'absolute',
    width: 600,
    height: 600,
    borderRadius: 300,
    borderWidth: 1,
    borderColor: '#300000',
    bottom: -300,
    right: -220,
  },
});