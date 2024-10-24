import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import InputPin from './InputPin';
import AsyncStorage from '@react-native-async-storage/async-storage';

const KonfirmasiPembayaran = ({ route, navigation }) => {
  const { label, price, phoneNumber, customerId, bpjsNumber } = route.params;
  const [isPinModalVisible, setPinModalVisible] = useState(false);
  const [operatorImage, setOperatorImage] = useState();
  const [savedPin, setSavedPin] = useState('');

  useEffect(() => {
    if (phoneNumber) {
      const prefix = phoneNumber.substring(0, 4);
      const operatorImages = {
        telkomsel: require('../assets/telkomsel.png'),
        indosat: require('../assets/indosat.png'),
        tri: require('../assets/tri.png'),
        xl: require('../assets/xl.png'),
        axis: require('../assets/logo-axis.png'),
        smartfren: require('../assets/smartfren.png'),
      };

      // Match prefix with operator images
      if (['0811', '0812', '0813', '0821', '0822', '0852', '0853'].includes(prefix)) {
        setOperatorImage(operatorImages.telkomsel);
      } else if (['0814', '0815', '0816', '0855', '0856', '0857', '0858'].includes(prefix)) {
        setOperatorImage(operatorImages.indosat);
      } else if (['0895', '0896', '0897', '0898', '0899'].includes(prefix)) {
        setOperatorImage(operatorImages.tri);
      } else if (['0817', '0818', '0819', '0859', '0877', '0878'].includes(prefix)) {
        setOperatorImage(operatorImages.xl);
      } else if (['0838', '0831', '0832', '0833'].includes(prefix)) {
        setOperatorImage(operatorImages.axis);
      } else if (['0881', '0882', '0883', '0884', '0885', '0886', '0887'].includes(prefix)) {
        setOperatorImage(operatorImages.smartfren);
      }
    }
  }, [phoneNumber]);

  // Load the saved PIN from AsyncStorage when the component mounts
  useEffect(() => {
    const loadPin = async () => {
      try {
        const pin = await AsyncStorage.getItem('userPin');
        if (pin) {
          setSavedPin(pin);
        }
      } catch (error) {
        console.log('Failed to load PIN', error);
      }
    };

    loadPin();
  }, []);

  const handleConfirmation = () => {
    setPinModalVisible(true);
  };

  const handleSuccess = async () => {
    setPinModalVisible(false);
  
    const transaction = {
      id: Date.now().toString(),
      trace: Math.floor(Math.random() * 1000000).toString().padStart(6, '0'),
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      price,
    };
  
    // Save the transaction to AsyncStorage
    try {
      const savedTransactions = await AsyncStorage.getItem('transactions');
      const transactions = savedTransactions ? JSON.parse(savedTransactions) : [];
      transactions.push(transaction);
      await AsyncStorage.setItem('transactions', JSON.stringify(transactions));

      navigation.navigate('TransaksiSukses', { price, phoneNumber, customerId, bpjsNumber });
    } catch (error) {
      console.error('Error saving transaction:', error);
    }
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
        <Text style={styles.headerText}>Konfirmasi Pembayaran</Text>
      </View>

      {/* Display operator image and phone number for Pulsa */}
      {phoneNumber && (
        <View style={styles.infoContainer}>
          <Image source={operatorImage} style={styles.operatorImage} />
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTitle}>{phoneNumber}</Text>
            <Text style={styles.infoSubtitle}>{phoneNumber}</Text>
          </View>
          <Text style={styles.priceText}>{price}</Text>
        </View>
      )}

      {/* Display customer ID for Listrik */}
      {customerId && (
        <View style={styles.infoContainer}>
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTitle}>ID Pelanggan Listrik:</Text>
            <Text style={styles.infoSubtitle}>{customerId}</Text>
          </View>
          <Text style={styles.priceText}>{price}</Text>
        </View>
      )}

      {/* Display BPJS number for BPJS */}
      {bpjsNumber && (
        <View style={styles.infoContainer}>
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTitle}>Nomor BPJS:</Text>
            <Text style={styles.infoSubtitle}>{bpjsNumber}</Text>
          </View>
          <Text style={styles.priceText}>{price}</Text>
        </View>
      )}

      <View style={styles.paymentMethodContainer}>
        <Text style={styles.methodTitle}>Metode Pembayaran</Text>
        <View style={styles.methodDetailContainer}>
          <Image source={require('../assets/digital-wallet.png')} style={styles.walletIcon} />
          <View style={styles.walletInfo}>
            <Text>Saldo Saya</Text>
            <Text style={styles.walletBalance}>Rp. 900.000</Text>
          </View>
          <Text style={styles.priceText}>{price}</Text>
        </View>
      </View>

      <View style={styles.paymentDetailContainer}>
        <Text style={styles.methodTitle}>Detail Pembayaran</Text>
        <View style={styles.detailRow}>
          <Text>Harga {label}</Text>
          <Text style={styles.priceText}>{price}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text>Biaya Transaksi</Text>
          <Text style={styles.priceText}>Rp 0</Text>
        </View>
      </View>

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total Pembayaran</Text>
        <Text style={styles.priceText}>{price}</Text>
      </View>

      {/* Spacer to push the button to the bottom */}
      <View style={{ flex: 1 }} />

      <TouchableOpacity
        style={styles.confirmButton}
        onPress={handleConfirmation}
      >
        <Text style={styles.confirmButtonText}>Konfirmasi</Text>
      </TouchableOpacity>

      <InputPin
        visible={isPinModalVisible}
        onClose={() => setPinModalVisible(false)}
        onSuccess={handleSuccess}
        savedPin={savedPin}
        onTransactionFail={() => navigation.navigate('Gagal')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
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
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
    color: '#333',
  },
  infoContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 1, 
  },
  operatorImage: {
    width: 40,
    height: 40,
  },
  infoTextContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  infoTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  infoSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007aff',
  },
  paymentMethodContainer: {
    marginTop: 16,
  },
  methodTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  methodDetailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  walletIcon: {
    width: 32,
    height: 32,
  },
  walletInfo: {
    flex: 1,
    marginLeft: 8,
  },
  walletBalance: {
    fontSize: 14,
    color: '#666',
  },
  paymentDetailContainer: {
    marginTop: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  totalText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  confirmButton: {
    backgroundColor: '#007aff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 32,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default KonfirmasiPembayaran;
