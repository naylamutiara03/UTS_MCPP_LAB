import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import moment from 'moment';

const TransaksiSukses = ({ route, navigation }) => {
  const { price, phoneNumber } = route.params;
  const dateTime = moment().format('DD MMMM YYYY, HH:mm'); // Current date and time
  const remainingBalance = 900000 - parseInt(price.replace(/\D/g, '')); // Calculate remaining balance

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pembayaran Berhasil</Text>
      <Image 
        source={require('../assets/berhasil.png')} 
        style={styles.icon}
        resizeMode="contain" 
      />
      <Text style={styles.price}>{price}</Text>
      <Text style={styles.dateTime}>{dateTime}</Text>
      <Text style={styles.remainingBalance}>Sisa Saldo: Rp {remainingBalance.toLocaleString()}</Text>

      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => navigation.navigate('Home', { phoneNumber, price })}
      >
        <Text style={styles.buttonText}>Tutup</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.detailButton}
        onPress={() => {
          // Navigate to the Transaksi tab and pass phoneNumber
          navigation.navigate('Riwayat', { phoneNumber });
        }}
      >
        <Text style={styles.buttonText}>Lihat Detail</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  price: {
    fontSize: 20,
    fontWeight: '600',
    color: '#28a745', // Green color for success
    marginBottom: 10,
  },
  dateTime: {
    fontSize: 14,
    color: '#777',
    marginBottom: 10,
  },
  remainingBalance: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 10,
    elevation: 2,
  },
  detailButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
  },
});

export default TransaksiSukses;
