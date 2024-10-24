import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, TextInput, StyleSheet, Switch } from 'react-native';
import Menu from './BottomNav';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
  const navigation = useNavigation();
  const [defaultPin] = useState('654321'); // Default PIN
  const [showQuestion, setShowQuestion] = useState(false); // Show the math question
  const [answer, setAnswer] = useState(''); // User's answer
  const [pinRevealed, setPinRevealed] = useState(false); // Show the PIN if answer is correct
  const [isDarkTheme, setIsDarkTheme] = useState(false); // Toggle dark theme

  const handlePinChange = () => {
    setShowQuestion(true); // Show the math question
  };

  const handleAnswerSubmit = () => {
    if (answer === '2') {
      setPinRevealed(true); // Reveal the PIN if the answer is correct
      setShowQuestion(false); // Hide the question
    } else {
      Alert.alert('Error', 'Jawaban salah! Silahkan coba lagi.');
    }
  };

  // Function to toggle dark theme
  const toggleDarkTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  // Conditional styles based on theme
  const themeStyles = isDarkTheme ? styles.dark : styles.light;

  return (
    <View style={[styles.container, themeStyles.container]}>
      <View style={styles.headerContainer}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={[styles.headerText, themeStyles.headerText]}>Profile</Text>
        </View>

        {/* Profile Information */}
        <View style={styles.profileContainer}>
          <Image 
            source={require('../assets/foto-profile.jpg')} 
            style={styles.profileImage} // Apply styles here
          />
          <View style={styles.profileInfo}>
            <Text style={[styles.nameText, themeStyles.text]}>Nayla Mutiara Salsabila Bastari</Text>
            <Text style={[styles.idText, themeStyles.text]}>00000075205</Text>
            <Text style={[styles.dobText, themeStyles.text]}>(03 Januari 2005)</Text>
          </View>
        </View>

        {/* Set PIN Button */}
        <View style={styles.pinButtonContainer}>
          {!pinRevealed ? (
            <>
              {!showQuestion ? (
                <TouchableOpacity
                  style={[styles.pinButton, themeStyles.pinButton]}
                  onPress={handlePinChange}
                >
                  <Text style={styles.pinButtonText}>Lihat PIN</Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.questionContainer}>
                  <Text style={[styles.questionText, themeStyles.text]}>Berapa hasil dari 1 + 1?</Text>
                  <TextInput
                    style={[styles.answerInput, themeStyles.input]}
                    keyboardType="numeric"
                    value={answer}
                    onChangeText={setAnswer}
                    placeholder="Jawaban"
                    placeholderTextColor={isDarkTheme ? '#aaa' : '#888'}
                  />
                  <TouchableOpacity
                    style={[styles.submitButton, themeStyles.submitButton]}
                    onPress={handleAnswerSubmit}
                  >
                    <Text style={styles.submitButtonText}>Submit</Text>
                  </TouchableOpacity>
                </View>
              )}
            </>
          ) : (
            <Text style={[styles.pinText, themeStyles.text]}>PIN anda adalah {defaultPin}</Text>
          )}

          {/* Toggle for Dark Theme */}
          <View style={styles.toggleContainer}>
            <Text style={[styles.toggleText, themeStyles.text]}>Dark Theme</Text>
            <Switch
              value={isDarkTheme}
              onValueChange={toggleDarkTheme}
              thumbColor={isDarkTheme ? '#fff' : '#f4f3f4'}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
            />
          </View>
        </View>
      </View>

      <Menu isDarkTheme={isDarkTheme} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    padding: 16,
    paddingTop: 48,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
    flexDirection: 'column',
  },
  profileImage: {
    width: 176,
    height: 176,
    borderRadius: 88,
    borderWidth: 4,
    borderColor: '#000',
  },
  profileInfo: {
    marginTop: 16,
    alignItems: 'center',
  },
  nameText: {
    fontSize: 18,
    fontWeight: '600',
  },
  idText: {
    fontSize: 18,
    fontWeight: '600',
  },
  dobText: {
    fontSize: 14,
    fontWeight: '600',
  },
  pinButtonContainer: {
    marginTop: 32,
    alignItems: 'center',
  },
  pinButton: {
    backgroundColor: '#3b82f6',
    padding: 12,
    borderRadius: 8,
  },
  pinButtonText: {
    fontWeight: 'bold',
    color: 'white',
  },
  questionContainer: {
    alignItems: 'center',
  },
  questionText: {
    fontSize: 16,
    marginBottom: 8,
  },
  answerInput: {
    width: 100,
    height: 40,
    borderWidth: 1,
    textAlign: 'center',
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  pinText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
  },
  toggleContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleText: {
    marginRight: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Light theme styles
  light: {
    container: {
      backgroundColor: 'white',
    },
    headerText: {
      color: 'black',
    },
    text: {
      color: 'black',
    },
    pinButton: {
      backgroundColor: '#3b82f6',
    },
    submitButton: {
      backgroundColor: '#28a745',
    },
    input: {
      borderColor: 'gray',
    },
  },
  // Dark theme styles
  dark: {
    container: {
      backgroundColor: '#121212',
    },
    headerText: {
      color: 'white',
    },
    text: {
      color: 'white',
    },
    pinButton: {
      backgroundColor: '#1e3a8a',
    },
    submitButton: {
      backgroundColor: '#007f5f',
    },
    input: {
      borderColor: '#444',
      color: 'white',
    },
  },
});

export default Profile;
