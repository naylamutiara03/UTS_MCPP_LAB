import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BottomNav = ({ isDarkTheme }) => {
  const navigation = useNavigation(); 

  const themeStyles = isDarkTheme ? styles.dark : styles.light; 

  return (
    <View style={[styles.container, themeStyles.container]}>
      <View style={styles.navBar}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Home')}
        >
          <Image
            source={require('../assets/home-button.png')}
            style={styles.icon}
            resizeMode="contain"
          />
          <Text style={[styles.navText, themeStyles.text]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Riwayat')} 
        >
          <Image
            source={require('../assets/history.png')}
            style={styles.icon}
            resizeMode="contain"
          />
          <Text style={[styles.navText, themeStyles.text]}>Riwayat</Text>
        </TouchableOpacity>

        {/* Circle for QRIS icon */}
        <View style={styles.qrisContainer}>
          <Image
            source={require('../assets/logo-qris.png')}
            style={styles.qrisIcon}
            resizeMode="contain"
          />
        </View>

        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => navigation.navigate('Notifikasi')}
        >
          <Image
            source={require('../assets/notification.png')}
            style={styles.icon}
            resizeMode="contain"
          />
          <Text style={[styles.navText, themeStyles.text]}>Notifikasi</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => navigation.navigate('Profile')}
        >
          <Image
            source={require('../assets/profile.png')}
            style={styles.icon}
            resizeMode="contain"
          />
          <Text style={[styles.navText, themeStyles.text]}>Me</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 4,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navItem: {
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
  navText: {
    marginTop: 2,
    textAlign: 'center',
  },
  qrisContainer: {
    backgroundColor: '#3c89d0',
    borderRadius: 50,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    top: -20,
  },
  qrisIcon: {
    width: 40,
    height: 40,
  },
  // Light theme styles
  light: {
    container: {
      backgroundColor: '#fff',
    },
    text: {
      color: 'black',
    },
  },
  // Dark theme styles
  dark: {
    container: {
      backgroundColor: '#1e1e1e',
    },
    text: {
      color: 'white',
    },
  },
});

export default BottomNav;
