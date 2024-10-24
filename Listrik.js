import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Listrik = () => {
  const navigation = useNavigation();
  const [customerId, setCustomerId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [activeOption, setActiveOption] = useState('');

  const validateCustomerId = () => /^[1-9][0-9]{5,11}$/.test(customerId); // ID Pelanggan diawali angka selain nol dan maksimal 12 digit

  const handleOptionPress = (option) => {
    if (!validateCustomerId()) {
      setErrorMessage('ID pelanggan tidak valid.');
      setActiveOption('');
    } else {
      setErrorMessage('');
      setActiveOption(option);
    }
  };

  const goToPaymentConfirmation = (label, price) => {
    navigation.navigate('PaymentConfirmation', {
      label,
      price,
      customerId, 
      paymentType: 'Listrik'
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
        <Text style={styles.headerText}>Isi Listrik</Text>
      </View>

      {/* Input Field Section */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Masukkan ID Pelanggan"
          style={styles.inputField}
          keyboardType="numeric"
          value={customerId}
          onChangeText={(text) => setCustomerId(text)}
        />
        <Image 
          source={require('../assets/contacts-book.png')} 
          style={styles.contactIcon} 
          resizeMode="contain" 
        />
      </View>

      {/* Menu Section */}
      <View style={styles.optionButtons}>
        <TouchableOpacity
          style={[styles.optionButton, activeOption === 'listrik' ? styles.activeButton : styles.inactiveButton]}
          onPress={() => handleOptionPress('listrik')}
        >
          <Text style={styles.buttonText}>Isi Listrik</Text>
        </TouchableOpacity>
      </View>

      {/* Message & Cards */}
      <View style={styles.messageContainer}>
        <View style={styles.messageBox}>
          <Image 
            source={require('../assets/isi-no.png')} 
            style={styles.messageIcon} 
            resizeMode="contain" 
          />
          <Text style={styles.messageText}>
            {errorMessage || 'Isi ID Pelanggan yang valid untuk menampilkan menu pembelian.'}
          </Text>
        </View>

        {activeOption === 'listrik' && (
          <View style={styles.cardContainer}>
            <View style={styles.cardRow}>
              <OptionItem label="20.000" price="Rp. 20.000" onPress={goToPaymentConfirmation} />
              <OptionItem label="50.000" price="Rp. 50.000" onPress={goToPaymentConfirmation} />
            </View>
            <View style={styles.cardRow}>
              <OptionItem label="100.000" price="Rp. 100.000" onPress={goToPaymentConfirmation} />
              <OptionItem label="200.000" price="Rp. 200.000" onPress={goToPaymentConfirmation} />
            </View>
            <View style={styles.cardRow}>
              <OptionItem label="300.000" price="Rp. 300.000" onPress={goToPaymentConfirmation} />
              <OptionItem label="500.000" price="Rp. 500.000" onPress={goToPaymentConfirmation} />
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const OptionItem = ({ label, price, onPress }) => (
  <TouchableOpacity onPress={() => onPress(label, price)} style={styles.optionItem}>
    <Text style={styles.optionLabel}>{label}</Text>
    <Text style={styles.optionPriceText}>Harga</Text>
    <Text style={styles.optionPrice}>{price}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
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
  },
  contactIcon: {
    width: 24,
    height: 24,
    marginLeft: 8,
  },
  optionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  optionButton: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  activeButton: {
    backgroundColor: '#00008B',
  },
  inactiveButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
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
  },
  cardContainer: {
    marginTop: 32,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  optionItem: {
    backgroundColor: '#4f83cc',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    width: '45%',
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  optionPriceText: {
    marginTop: 8,
    color: 'white',
  },
  optionPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Listrik;
