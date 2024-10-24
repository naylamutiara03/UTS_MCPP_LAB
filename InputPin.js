import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Alert, StyleSheet } from 'react-native';

const InputPin = ({ visible, onClose, onSuccess, onTransactionFail }) => {
  const [pin, setPin] = useState('');
  const [circles, setCircles] = useState(Array(6).fill('grey')); 
  const [errorCount, setErrorCount] = useState(0); 
  const defaultPin = '654321'; // Default PIN

  const handlePinInput = (digit) => {
    if (pin.length < 6) {
      const newPin = pin + digit;
      setPin(newPin);
  
      // Update the circle color
      const newCircles = [...circles];
      newCircles[newPin.length - 1] = 'blue'; // Filled circle becomes blue
      setCircles(newCircles);
  
      // If PIN length reaches 6, validate
      if (newPin.length === 6) {
        if (newPin === '030105') {
          Alert.alert('Error', 'PIN 030105 tidak diperbolehkan!');
          setErrorCount(errorCount + 1);
          resetPin();
        } else if (newPin === defaultPin) {
          onSuccess();
        } else {
          setErrorCount(errorCount + 1);
          Alert.alert('Error', 'PIN salah!');
  
          if (errorCount + 1 >= 3) {
            onTransactionFail();
          } else {
            resetPin();
          }
        }
      }
    }
  };  

  const resetPin = () => {
    setPin('');
    setCircles(Array(6).fill('grey'));
  };

  const handleDelete = () => {
    if (pin.length > 0) {
      const newPin = pin.slice(0, -1);
      setPin(newPin);

      // Reset the last filled circle
      const newCircles = [...circles];
      newCircles[newPin.length] = 'grey';
      setCircles(newCircles);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Masukkan PIN</Text>

          {/* PIN Circles */}
          <View style={styles.circleContainer}>
            {circles.map((color, index) => (
              <View
                key={index}
                style={[styles.circle, { backgroundColor: color === 'grey' ? '#d1d1d1' : 'blue' }]} // Use blue for filled circles
              />
            ))}
          </View>

          {/* Number Pad */}
          <View style={styles.numberPad}>
            {/* Adjusted order for the number buttons */}
            {[
              1, 2, 3,
              4, 5, 6,
              7, 8, 9,
              0 // Place 0 at the end
            ].map((num) => (
              <TouchableOpacity
                key={num}
                style={styles.numberButton}
                onPress={() => handlePinInput(num.toString())}
              >
                <Text style={styles.numberText}>{num}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Delete Button */}
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDelete}
          >
            <Text style={styles.deleteText}>Hapus</Text>
          </TouchableOpacity>

          {/* Close Button */}
          <TouchableOpacity
            onPress={() => {
              resetPin();
              onClose();
            }}
          >
            <Text style={styles.closeText}>Tutup</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  circleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#d1d1d1',
    borderWidth: 2,
    borderColor: '#007bff',
  },
  numberPad: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 20,
  },
  numberButton: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 10,
    backgroundColor: '#007bff',
    elevation: 2,
  },
  numberText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
  },
  closeText: {
    color: '#007bff',
    marginTop: 10,
  },
});

export default InputPin;
