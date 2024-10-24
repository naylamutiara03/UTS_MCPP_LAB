import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Menu from './BottomNav'; // Import Menu
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Notifikasi = () => {
  const [notifications, setNotifications] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const savedNotifications = await AsyncStorage.getItem('notifications');
        if (savedNotifications !== null) {
          const parsedNotifications = JSON.parse(savedNotifications);
          const validNotifications = parsedNotifications.filter(
            (notification) => notification.title && notification.message && notification.date
          );
          setNotifications(validNotifications); 
        } else {
          // If no notifications found, use dummy data
          setNotifications(dummyNotifications);
        }
      } catch (error) {
        console.error('Error fetching notifications from storage:', error);
      }
    };

    const unsubscribe = navigation.addListener('focus', () => {
      fetchNotifications();
    });

    return unsubscribe;
  }, [navigation]);

  const dummyNotifications = [
    {
      id: '1',
      title: 'Notifikasi 1',
      message: 'Anda telah menerima 1000 poin reward!',
      date: '22/10/2024',
    },
    {
      id: '2',
      title: 'Notifikasi 2',
      message: 'Promo spesial akhir bulan, diskon 20% untuk semua produk!',
      date: '23/10/2024',
    },
    {
      id: '3',
      title: 'Notifikasi 3',
      message: 'Jangan lewatkan acara live streaming kami hari ini!',
      date: '24/10/2024',
    },
    {
      id: '4',
      title: 'Notifikasi 4',
      message: 'Pembayaran Anda berhasil!',
      date: '25/10/2024',
    },
    {
      id: '5',
      title: 'Notifikasi 5',
      message: 'Anda memiliki tagihan yang jatuh tempo dalam 3 hari.',
      date: '26/10/2024',
    },
    {
      id: '6',
      title: 'Notifikasi 6',
      message: 'Aplikasi telah diperbarui ke versi terbaru.',
      date: '27/10/2024',
    },
    {
      id: '7',
      title: 'Notifikasi 7',
      message: 'Poin reward Anda akan kedaluwarsa dalam 7 hari!',
      date: '28/10/2024',
    },
    {
      id: '8',
      title: 'Notifikasi 8',
      message: 'Terima kasih telah berbelanja! Kunjungi kami lagi.',
      date: '29/10/2024',
    },
    {
      id: '9',
      title: 'Notifikasi 9',
      message: 'Dapatkan cashback hingga 50% untuk pembelian berikutnya.',
      date: '30/10/2024',
    },
    {
      id: '10',
      title: 'Notifikasi 10',
      message: 'Anda memiliki undangan untuk acara eksklusif kami.',
      date: '31/10/2024',
    },
  ];

  const handleNotificationPress = (notification) => {
    console.log('Notification details:', notification); 
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Notifikasi</Text>
      </View>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleNotificationPress(item)}>
            <View style={styles.notificationItem}>
              <Image
                source={require('../assets/announce.png')} 
                style={styles.notificationIcon}
              />
              <View style={styles.notificationContent}>
                <Text style={styles.notificationTitle}>{item.title}</Text>
                <Text style={styles.notificationMessage}>{item.message}</Text>
                <Text style={styles.notificationDate}>{item.date}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Image
              source={require('../assets/no-notification.png')} 
              style={styles.noNotificationImage}
              resizeMode="contain"
            />
            <Text style={styles.emptyText}>Belum ada notifikasi.</Text>
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
  notificationItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row', 
    alignItems: 'center', 
  },
  notificationIcon: {
    width: 24, 
    height: 24, 
    marginRight: 10, 
  },
  notificationContent: {
    flex: 1, 
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  notificationDate: {
    fontSize: 12,
    color: '#aaa',
    marginTop: 4,
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  noNotificationImage: {
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

export default Notifikasi;
