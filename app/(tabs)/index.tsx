import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function Index() {
  const [count, setCount] = useState(0);

  const increase = () => {
    setCount(count + 1);
  };

  const decrease = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <View style={styles.container}>

      <View style={styles.web1} />
      <View style={styles.web2} />
      <View style={styles.web3} />

      <Text style={styles.title}>COUNTER APP</Text>


      <View style={styles.counterBox}>
        <Text style={styles.counter}>{count}</Text>
      </View>

      <View style={styles.buttons}>

        <TouchableOpacity
          style={styles.button}
          onPress={decrease}
        >
          <Text style={styles.buttonText}>−</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={increase}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>

      </View>

      <TouchableOpacity
        style={styles.resetButton}
        onPress={reset}
      >
        <Text style={styles.resetText}>RESET TO ZERO</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080808',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
    overflow: 'hidden',
  },

  title: {
    color: '#e50914',
    fontSize: 38,
    fontWeight: '900',
    letterSpacing: 4,
  },

  subtitle: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 5,
    marginTop: 5,
    marginBottom: 35,
  },

  counterBox: {
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#111111',
    borderWidth: 5,
    borderColor: '#e50914',
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#e50914',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 15,
  },

  counter: {
    color: '#ffffff',
    fontSize: 80,
    fontWeight: '900',
  },

  buttons: {
    flexDirection: 'row',
    gap: 25,
    marginTop: 40,
  },

  button: {
    width: 75,
    height: 75,
    borderRadius: 15,
    backgroundColor: '#e50914',
    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: 2,
    borderColor: '#ff4d55',
  },

  buttonText: {
    color: '#ffffff',
    fontSize: 40,
    fontWeight: 'bold',
  },

  resetButton: {
    marginTop: 25,
    paddingVertical: 15,
    paddingHorizontal: 35,
    borderWidth: 2,
    borderColor: '#e50914',
    borderRadius: 10,
    backgroundColor: '#120304',
  },

  resetText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 2,
  },

  // Subtle web-inspired background lines
  web1: {
    position: 'absolute',
    width: 500,
    height: 500,
    borderRadius: 250,
    borderWidth: 1,
    borderColor: '#3a0a0a',
    top: -200,
    right: -200,
  },

  web2: {
    position: 'absolute',
    width: 350,
    height: 350,
    borderRadius: 175,
    borderWidth: 1,
    borderColor: '#3a0a0a',
    bottom: -150,
    left: -150,
  },

  web3: {
    position: 'absolute',
    width: 700,
    height: 700,
    borderRadius: 350,
    borderWidth: 1,
    borderColor: '#1f1f1f',
    top: -300,
    left: -300,
  },
});