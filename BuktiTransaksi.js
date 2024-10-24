import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BuktiTransaksi = ({ route }) => {
  const { transaction, approvalCode, phoneNumber } = route.params || {}; 
  const [operatorImage, setOperatorImage] = useState(null); 
  const navigation = useNavigation();

  useEffect(() => {
    if (phoneNumber) {
      const prefix = phoneNumber.substring(0, 4);
      console.log('Phone number:', phoneNumber);
      console.log('Extracted prefix:', prefix);
  
      const operatorImages = {
        telkomsel: require('../assets/telkomsel.png'),
        indosat: require('../assets/indosat.png'),
        tri: require('../assets/tri.png'),
        xl: require('../assets/xl.png'),
        axis: require('../assets/logo-axis.png'),
        smartfren: require('../assets/smartfren.png'),
      };
  
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
      } else {
        console.log('No operator image matched for prefix:', prefix);
      }
    }
  }, [phoneNumber]);  

  const handlePrint = () => {
    // Logic for print functionality
    console.log('Print button pressed');
  };

  const handleEmail = () => {
    // Logic for email functionality
    console.log('Email button pressed');
  };

  const handleDone = () => {
    navigation.navigate('Riwayat'); // Navigate back to Riwayat
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleDone}>
          <Image 
            source={require('../assets/back.png')} 
            style={styles.backIcon} 
            resizeMode="contain" 
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bukti Transaksi</Text>
      </View>

      {operatorImage && (
        <View style={styles.operatorImageContainer}>
          <Image 
            source={operatorImage} 
            style={styles.operatorImage} 
            resizeMode="contain" 
          />
        </View>
      )}
      
      <Text style={styles.sectionTitle}>Operator</Text>
      <Text style={styles.operatorPhone}>{phoneNumber || 'Tidak tersedia'}</Text>

      <View style={styles.transactionDetails}>
        <DetailRow label="TERMINAL" value="Success" />
        <DetailRow label="MERCHANT" value={Math.floor(Math.random() * 100000000000000).toString()} />
        <DetailRow label="JENIS TRANSAKSI" value="SALE" />
        <DetailRow label="JENIS KARTU" value="Kartu UnionPay Credit" />
        <DetailRow label="NOMOR KARTU" value="**********0005" />
        <DetailRow label="TGL. TRANSAKSI" value={transaction ? `${transaction.date}, ${transaction.time}` : 'Tidak tersedia'} />
        <DetailRow label="BATCH" value={transaction?.trace || 'Tidak tersedia'} />
        <DetailRow label="TRACE NO" value={transaction?.trace || 'Tidak tersedia'} />
        <DetailRow label="REFERENCE NO" value={`${transaction?.trace || 'Tidak tersedia'}20`} />
        <DetailRow label="APPROVAL CODE" value={approvalCode || 'Tidak tersedia'} />
        <DetailRow label="TOTAL" value={transaction?.price ? transaction.price : 'Tidak tersedia'} bold />
      </View>

      {/* Buttons for Print and Email */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handlePrint}>
          <Text style={styles.buttonText}>Cetak</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleEmail}>
          <Text style={styles.buttonText}>Email</Text>
        </TouchableOpacity>
      </View>

      {/* Done button */}
      <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
        <Text style={styles.doneButtonText}>Selesai</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// Reusable component for transaction details rows
const DetailRow = ({ label, value, bold = false }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={[styles.detailValue, bold && styles.boldValue]}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: '#f9f9f9',
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backIcon: {
    marginTop: 20,
    width: 24,
    height: 24,
  },
  headerTitle: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  operatorImageContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  operatorImage: {
    width: 80,
    height: 80,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  operatorPhone: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
    marginBottom: 24,
  },
  transactionDetails: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 16,
    color: '#666',
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
  },
  boldValue: {
    fontWeight: 'bold',
    color: '#000',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    flex: 1,
    backgroundColor: '#4CAF50', // Green background
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  doneButton: {
    backgroundColor: '#2196F3', // Blue background
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  doneButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BuktiTransaksi;
