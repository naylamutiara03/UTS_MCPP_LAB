import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TransaksiGagal = ({ route, navigation }) => {
  const { price, trace, date, time } = route.params || {}; 

  // Save failed transaction in AsyncStorage
  useEffect(() => {
    if (price && trace && date && time) { // Ensure all parameters are present
      const saveFailedTransaction = async () => {
        try {
          const savedTransactions = await AsyncStorage.getItem('transactions');
          const transactions = savedTransactions ? JSON.parse(savedTransactions) : [];

          // Add failed transaction
          transactions.push({
            id: Date.now().toString(), // Unique transaction ID
            trace, 
            date, 
            time, 
            price, 
            status: 'failed', 
          });

          await AsyncStorage.setItem('transactions', JSON.stringify(transactions));
        } catch (error) {
          console.error('Error saving failed transaction:', error);
        }
      };

      saveFailedTransaction();
    }
  }, [price, trace, date, time]);

  return (
    <View style={styles.container}>
      {/* Sticky notes image */}
      <Image source={require('../assets/gagal.png')} style={styles.image} />
      
      <Text style={styles.title}>Transaksi Gagal</Text>
      <Text style={styles.message}>Silahkan periksa kembali transaksi Anda.</Text>

      {/* Button to go back to Transactions page */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Transaksi')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Kembali ke Transaksi</Text>
      </TouchableOpacity>
    </View>
  );
};

// Define styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e74c3c',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    color: '#666',
  },
  button: {
    backgroundColor: '#007aff',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    elevation: 2,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TransaksiGagal;
