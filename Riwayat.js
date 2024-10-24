import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Menu from './BottomNav'; 
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const Riwayat = ({ route }) => {
  const [transactions, setTransactions] = useState([]);
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();
  const phoneNumber = route.params?.phoneNumber;

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const savedTransactions = await AsyncStorage.getItem('transactions');
        if (savedTransactions !== null) {
          const parsedTransactions = JSON.parse(savedTransactions);

          // Filter out invalid transactions
          const validTransactions = parsedTransactions.filter(
            (transaction) => transaction.price && transaction.trace && transaction.date && transaction.time
          );

          setTransactions(validTransactions); // Set valid transactions
        }
      } catch (error) {
        console.error('Error fetching transactions from storage:', error);
      }
    };

    // Fetch transactions when screen is focused
    const unsubscribe = navigation.addListener('focus', () => {
      fetchTransactions();
    });

    // Cleanup the listener on component unmount
    return unsubscribe;
  }, [navigation]);

  const filteredTransactions = transactions.filter((t) =>
    t.trace.includes(searchText)
  );

  const handleTransactionPress = (transaction) => {
    console.log('Transaction details:', transaction); // Log transaction details
    navigation.navigate('DetailTransaksi', {
      transaction,
      phoneNumber,
      approvalCode: transaction.approvalCode,
      operatorId: transaction.operatorId, // Pass operator ID to detail screen
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Riwayat Transaksi</Text>
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="Cari berdasarkan No. Trace"
        value={searchText}
        onChangeText={setSearchText}
      />
      <FlatList
        data={filteredTransactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleTransactionPress(item)}>
            <View style={styles.transactionItem}>
              <View>
                <Text style={styles.successText}>Berhasil</Text>
                <Text style={styles.transactionText}>No. Trace: {item.trace}</Text>
                <Text style={styles.transactionDate}>
                  {item.date} | {item.time}
                </Text>
              </View>
              <Text style={styles.transactionPrice}>{item.price}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Image
              source={require('../assets/gagal.png')}
              style={styles.noHistoryImage}
              resizeMode="contain"
            />
            <Text style={styles.emptyText}>Belum ada transaksi.</Text>
          </View>
        }
        contentContainerStyle={styles.flatListContent}
      />
      <Menu />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  header: {
    marginBottom: 20,
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  headerText: {
    marginTop: 20,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center', 
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 20,
    elevation: 1,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  successText: {  
    fontSize: 14,
    color: 'green',
  },
  transactionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  transactionDate: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  transactionPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  noHistoryImage: {
    width: 120,
    height: 120,
  },
  emptyText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
  flatListContent: {
    paddingBottom: 100,
  },
});

export default Riwayat;
