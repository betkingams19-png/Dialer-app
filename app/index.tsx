import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

export default function DialerScreen() {
  const [dialedNumber, setDialedNumber] = useState('');
  const [callHistory, setCallHistory] = useState<string[]>([]);

  const handleKeyPress = (key: string) => {
    setDialedNumber(prev => prev + key);
  };

  const handleBackspace = () => {
    setDialedNumber(prev => prev.slice(0, -1));
  };

  const handleCall = () => {
    if (dialedNumber.trim()) {
      setCallHistory(prev => [dialedNumber, ...prev]);
      setDialedNumber('');
    }
  };

  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'];

  return (
    <View style={styles.container}>
      <View style={styles.displayArea}>
        <Text style={styles.displayText}>{dialedNumber || 'Entrez un numéro'}</Text>
      </View>

      <View style={styles.keypadContainer}>
        {keys.map(key => (
          <TouchableOpacity
            key={key}
            style={styles.key}
            onPress={() => handleKeyPress(key)}
          >
            <Text style={styles.keyText}>{key}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.backspaceButton]}
          onPress={handleBackspace}
        >
          <Text style={styles.buttonText}>⌫</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.callButton]}
          onPress={handleCall}
        >
          <Text style={styles.buttonText}>📞</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.historyContainer}>
        <Text style={styles.historyTitle}>Historique</Text>
        <FlatList
          data={callHistory}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Text style={styles.historyItem}>{item}</Text>
          )}
          scrollEnabled={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 40,
  },
  displayArea: {
    backgroundColor: '#000',
    padding: 20,
    marginHorizontal: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  displayText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  keypadContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  key: {
    width: '30%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  keyText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backspaceButton: {
    backgroundColor: '#ff9500',
  },
  callButton: {
    backgroundColor: '#34c759',
  },
  buttonText: {
    fontSize: 28,
  },
  historyContainer: {
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  historyItem: {
    fontSize: 14,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});
