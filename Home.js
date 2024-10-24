import React from 'react';
import { View, Image, TouchableOpacity, Text, Dimensions, ScrollView, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BottomNav from './BottomNav';

const { width: screenWidth } = Dimensions.get('window');

// LogoU Component
const LogoU = () => {
  return (
    <View style={styles.logoCard}>
      <TouchableOpacity style={styles.logoContainer}>
        <Image 
          source={require('../assets/union.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
        <Text style={styles.logoText}>All-U-Need</Text>
      </TouchableOpacity>
    </View>
  );
};

// NameCard Component
const NameCard = () => {
    return (
        <View style={styles.nameCard}>
            <View style={styles.textContainer}>
                <Text style={styles.nameText}>Nayla Mutiara Salsabila Bastari</Text>
                <Text style={styles.yearText}>2022</Text>
            </View>

            <View style={styles.iconsContainer}>
                <View style={styles.iconItem}>
                    <Image
                        source={require('../assets/up-arrow.png')}
                        style={styles.iconImage}
                        resizeMode="contain"
                    />
                    <Text style={styles.iconText}>Transfer</Text>
                </View>
                <View style={styles.iconItem}>
                    <Image
                        source={require('../assets/down-arrow.png')}
                        style={styles.iconImage}
                        resizeMode="contain"
                    />
                    <Text style={styles.iconText}>Tarik Tunai</Text>
                </View>
                <View style={styles.iconItem}>
                    <Image
                        source={require('../assets/application.png')}
                        style={styles.iconImage}
                        resizeMode="contain"
                    />
                    <Text style={styles.iconText}>More</Text>
                </View>
            </View>
        </View>
    );
};

// Body Component
const carouselItems = [
  { imgSrc: require('../assets/promo1.jpg')},
  { imgSrc: require('../assets/promo2.jpeg')},
  { imgSrc: require('../assets/promo3.jpg')},
];

const Body = () => {
  const navigation = useNavigation(); // Initialize navigation

  const renderCarouselItem = ({ item }) => (
    <View style={styles.slide}>
      <Image
        source={item.imgSrc}
        style={styles.slideImage}
        resizeMode="cover"
      />
      <Text style={styles.slideCaption}>{item.caption}</Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        {/* Notification card */}
        <View style={styles.notificationCard}>
          <Text style={styles.notificationText}>All-U-Need shared some updates</Text>
          <Image
            source={require('../assets/announce.png')}
            style={styles.notificationIcon}
            resizeMode="contain"
          />
        </View>

        {/* Section with three icons */}
        <View style={styles.iconContainer}>
          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={() => navigation.navigate('Pulsa')} // Navigate to Pulsa Page
          >
            <Image
              source={require('../assets/mobile.png')}
              style={styles.icon}
              resizeMode="contain"
            />
            <Text style={styles.iconText}>Pulsa & Data</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={() => navigation.navigate('Listrik')} // Navigate to Listrik Page
          >
            <Image
              source={require('../assets/listrik.png')}
              style={styles.icon}
              resizeMode="contain"
            />
            <Text style={styles.iconText}>Listrik</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={() => navigation.navigate('BPJS')} // Navigate to BPJS Page
          >
            <Image
              source={require('../assets/bpjs.png')}
              style={styles.icon}
              resizeMode="contain"
            />
            <Text style={styles.iconText}>BPJS</Text>
          </TouchableOpacity>
        </View>

        {/* FlatList for Carousel Section */}
        <Text style={styles.promoTitle}>Promo</Text>
        <FlatList
          data={carouselItems}
          renderItem={renderCarouselItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carouselContainer}
        />
      </View>
    </ScrollView>
  );
};

// Main Home Component
const Home = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <LogoU />
        <NameCard />
        <Body />
        <BottomNav/>
      </View>
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 12, 
    backgroundColor: '#F5F5F5',
  },
  logoCard: {
    marginTop: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoImage: {
    width: 48,
    height: 48,
    marginRight: 8,
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  nameCard: {
    backgroundColor: '#fefefe',
    marginVertical: 10, 
    borderRadius: 16,
    padding: 16, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2, 
    borderColor: '#e0e0e0',
    borderWidth: 1,
  },
  textContainer: {
    marginBottom: 12, 
  },
  nameText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  yearText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10, 
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  iconItem: {
    alignItems: 'center',
  },
  iconImage: {
    width: 40,
    height: 40,
    marginBottom: 8,
  },
  iconText: {
    fontSize: 14,
    color: '#555',
  },
  notificationCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF7E8',
    padding: 12, 
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
  },
  notificationText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  notificationIcon: {
    width: 24,
    height: 24,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12, 
  },
  iconButton: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  iconText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
    textAlign: 'center',
  },
  promoTitle: {
    marginTop: 8,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#444',
    textAlign: 'center',
  },
  carouselContainer: {
    marginBottom: 35,
    paddingVertical: 0, 
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
    width: screenWidth - 40, 
    marginHorizontal: 8,
  },
  slideImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  slideCaption: {
    fontSize: 16,
    color: '#444',
    marginTop: 5, 
    textAlign: 'center',
    fontWeight: '500',
},
});

export default Home;
