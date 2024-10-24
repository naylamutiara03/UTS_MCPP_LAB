import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Pulsa = () => {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [activeOption, setActiveOption] = useState('');

  const validatePhoneNumber = () => {
    const regex = /^08[1-9][0-9]{8,11}$/;
    const validOperators = ['081', '082', '083', '085', '087', '089'];
    const prefix = phoneNumber.slice(0, 3);
    return regex.test(phoneNumber) && validOperators.includes(prefix);
  };

  const handleOptionPress = (option) => {
    if (!validatePhoneNumber()) {
      setErrorMessage('Nomor telepon tidak valid. Harus dimulai dengan 08 dan prefix operator resmi.');
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
      phoneNumber,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image 
            source={require('../assets/back.png')} 
            style={styles.backIcon} 
            resizeMode="contain" 
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Pulsa & Paket Data</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Masukkan nomor telepon"
          style={[
            styles.phoneInput,
            errorMessage ? styles.errorInput : null,
          ]}
          keyboardType="numeric"
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
        />
        <Image 
          source={require('../assets/contacts-book.png')} 
          style={styles.contactIcon} 
          resizeMode="contain" 
        />
      </View>

      <View style={styles.optionButtons}>
        <TouchableOpacity
          style={[
            styles.optionButton,
            activeOption === 'pulsa' ? styles.activeButton : styles.inactiveButton,
          ]}
          onPress={() => handleOptionPress('pulsa')}
        >
          <Text style={styles.buttonText}>Isi Pulsa</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.optionButton,
            activeOption === 'data' ? styles.activeButton : styles.inactiveButton,
          ]}
          onPress={() => handleOptionPress('data')}
        >
          <Text style={styles.buttonText}>Isi Data</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.messageContainer}>
        <View style={styles.messageBox}>
          <Image 
            source={require('../assets/isi-no.png')} 
            style={styles.messageIcon} 
            resizeMode="contain" 
          />
          <Text style={styles.messageText}>
            {errorMessage || 'Isi nomor telepon yang valid untuk menampilkan menu pembelian.'}
          </Text>
        </View>

        {activeOption === 'pulsa' && (
          <View style={styles.cardContainer}>
            <View style={styles.cardRow}>
              <OptionItem label="5.000" price="Rp. 6.500" onPress={goToPaymentConfirmation} />
              <OptionItem label="10.000" price="Rp. 10.500" onPress={goToPaymentConfirmation} />
            </View>
            <View style={styles.cardRow}>
              <OptionItem label="15.000" price="Rp. 16.500" onPress={goToPaymentConfirmation} />
              <OptionItem label="20.000" price="Rp. 21.500" onPress={goToPaymentConfirmation} />
            </View>
            <View style={styles.cardRow}>
              <OptionItem label="25.000" price="Rp. 26.500" onPress={goToPaymentConfirmation} />
              <OptionItem label="30.000" price="Rp. 31.500" onPress={goToPaymentConfirmation} />
            </View>
            <View style={styles.cardRow}>
              <OptionItem label="50.000" price="Rp. 51.500" onPress={goToPaymentConfirmation} />
              <OptionItem label="100.000" price="Rp. 101.500" onPress={goToPaymentConfirmation} />
            </View>
          </View>
        )}

        {activeOption === 'data' && (
          <View style={styles.cardContainer}>
            <View style={styles.cardRow}>
              <OptionItem label="1GB" price="Rp. 12.500" onPress={goToPaymentConfirmation} />
              <OptionItem label="2.5GB" price="Rp. 25.000" onPress={goToPaymentConfirmation} />
            </View>
            <View style={styles.cardRow}>
              <OptionItem label="5GB" price="Rp. 45.000" onPress={goToPaymentConfirmation} />
              <OptionItem label="7GB" price="Rp. 60.000" onPress={goToPaymentConfirmation} />
            </View>
            <View style={styles.cardRow}>
              <OptionItem label="10GB" price="Rp. 85.000" onPress={goToPaymentConfirmation} />
              <OptionItem label="15GB" price="Rp. 110.000" onPress={goToPaymentConfirmation} />
            </View>
            <View style={styles.cardRow}>
              <OptionItem label="20GB" price="Rp. 130.000" onPress={goToPaymentConfirmation} />
              <OptionItem label="30GB" price="Rp. 150.000" onPress={goToPaymentConfirmation} />
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
    backgroundColor: 'white',
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
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  phoneInput: {
    flex: 1,
    fontSize: 16,
    padding: 8,
  },
  errorInput: {
    borderColor: 'red',
    borderWidth: 1,
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
    backgroundColor: '#3b82f6', 
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
    backgroundColor: '#3b82f6',
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

export default Pulsa;