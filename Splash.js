import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Home');  
    }, 3000); // Waktu splash screen = 3 detik

    return () => clearTimeout(timer); // Clear timer
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/logo-umn.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4c669f',
  },
  logo: {
    width: 150, 
    height: 150, 
    marginBottom: 20, 
    opacity: 0.9, // Membuat logo sedikit transparan
    transform: [{ scale: 1.1 }], // Membesarkan logo sedikit untuk efek animasi
  },
});

export default Splash;
