import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BpjsPage = () => {
  const navigation = useNavigation();
  const [bpjsNumber, setBpjsNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validateBpjsNumber = () => /^0[0-9]{12}$/.test(bpjsNumber); // nomor BPJS harus diawali dengan 0 dan 13 digit

  const handleOptionPress = (kelas, months) => {
    const price = months * 50000;
    if (!validateBpjsNumber()) {
      setErrorMessage('Nomor BPJS tidak valid. Harus dimulai dengan 0 dan 13 digit.');
    } else {
      setErrorMessage('');
      goToPaymentConfirmation(kelas, `Rp. ${price.toLocaleString()}`);
    }
  };

  const goToPaymentConfirmation = (label, price) => {
    navigation.navigate('PaymentConfirmation', {
      label,
      price,
      bpjsNumber,
      paymentType: 'BPJS' // kirim jenis pembayaran
    });
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image 
            source={require('../assets/back.png')} 
            style={styles.backIcon} 
            resizeMode="contain" 
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Pembayaran BPJS</Text>
      </View>

      {/* Input Field Section */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Masukkan nomor BPJS"
          style={styles.inputField}
          keyboardType="numeric"
          value={bpjsNumber}
          onChangeText={(text) => setBpjsNumber(text)}
        />
        <Image 
          source={require('../assets/contacts-book.png')} 
          style={styles.contactIcon} 
          resizeMode="contain" 
        />
      </View>

      {/* Menu Section */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => handleOptionPress('Kelas 1', 6)} // Kelas 1 = 6 bulan
        >
          <Text style={styles.buttonText}>Kelas 1</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => handleOptionPress('Kelas 2', 4)} // Kelas 2 = 4 bulan
        >
          <Text style={styles.buttonText}>Kelas 2</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => handleOptionPress('Kelas 3', 2)} // Kelas 3 = 2 bulan
        >
          <Text style={styles.buttonText}>Kelas 3</Text>
        </TouchableOpacity>
      </View>

      {/* Error/Info Message */}
      <View style={styles.messageContainer}>
        <View style={styles.messageBox}>
          <Image 
            source={require('../assets/isi-no.png')} 
            style={styles.messageIcon} 
            resizeMode="contain" 
          />
          <Text style={styles.messageText}>
            {errorMessage || 'Isi nomor BPJS yang valid untuk memilih kelas pembayaran.'}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
    paddingTop: 48,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  inputField: {
    flex: 1,
    fontSize: 16,
    padding: 8,
    color: '#333',
  },
  contactIcon: {
    width: 24,
    height: 24,
    marginLeft: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  optionButton: {
    backgroundColor: '#007aff',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    flex: 1,
    marginHorizontal: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  messageContainer: {
    marginTop: 32,
  },
  messageBox: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  messageIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  messageText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
  },
});

export default BpjsPage;
