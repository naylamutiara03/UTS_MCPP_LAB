import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from './components/Splash';
import Home from './components/Home';
import Pulsa from './components/Pulsa';
import Listrik from './components/Listrik';
import BPJS from './components/BpjsPage';
import PaymentConfirmation from './components/KonfirmasiPembayaran';
import TransaksiSukses from './components/TransaksiSukses';
import TransaksiGagal from './components/TransaksiGagal';
import Riwayat from './components/Riwayat';
import DetailTransaksi from './components/BuktiTransaksi';
import Notifikasi  from './components/Notifikasi';
import Profile from './components/Profile';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <View className="flex-1">
        <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Pulsa" component={Pulsa} />
          <Stack.Screen name="Listrik" component={Listrik} />
          <Stack.Screen name="BPJS" component={BPJS} />
          <Stack.Screen name="PaymentConfirmation" component={PaymentConfirmation} />
          <Stack.Screen name="TransaksiSukses" component={TransaksiSukses} />
          <Stack.Screen name="TransaksiGagal" component={TransaksiGagal} />
          <Stack.Screen name="Riwayat" component={Riwayat} />
          <Stack.Screen name="DetailTransaksi" component={DetailTransaksi} />
          <Stack.Screen name="Notifikasi" component={Notifikasi}/>
          <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
}
