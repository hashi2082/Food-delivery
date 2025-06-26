import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

// 1. Splash Screens
const SplashScreen = ({ title, desc, icon, bgColor, onNext, isLast }) => (
  <View style={[styles.splashContainer, { backgroundColor: bgColor }]}>
    <MaterialIcons name={icon} size={80} color="white" />
    <Text style={styles.splashTitle}>{title}</Text>
    <Text style={styles.splashDesc}>{desc}</Text>
    {isLast ? (
      <View style={styles.authButtons}>
        <TouchableOpacity style={styles.signupBtn} onPress={() => onNext('signup')}>
          <Text style={styles.btnText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn} onPress={() => onNext('login')}>
          <Text style={styles.btnText}>Log In</Text>
        </TouchableOpacity>
      </View>
    ) : (
      <TouchableOpacity style={styles.nextBtn} onPress={onNext}>
        <Text style={styles.btnText}>Next</Text>
      </TouchableOpacity>
    )}
  </View>
);

// 2. Signup Screen
const SignupScreen = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Create Account</Text>
    <TextInput style={styles.input} placeholder="Full Name" />
    <TextInput style={styles.input} placeholder="Email" />
    <TextInput style={styles.input} placeholder="Password" secureTextEntry />
    <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation('food')}>
      <Text style={styles.btnText}>Sign Up</Text>
    </TouchableOpacity>
  </View>
);

// 3. Login Screen
const LoginScreen = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Welcome Back</Text>
    <TextInput style={styles.input} placeholder="Email" />
    <TextInput style={styles.input} placeholder="Password" secureTextEntry />
    <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation('food')}>
      <Text style={styles.btnText}>Log In</Text>
    </TouchableOpacity>
  </View>
);

// 4. Food Items Screen
const FoodScreen = ({ navigation }) => {
  const foods = [
    { id: 1, name: 'Pepperoni Pizza', price: '$12.99', image: 'https://example.com/pizza.jpg' },
    { id: 2, name: 'Cheese Burger', price: '$8.99', image: 'https://example.com/burger.jpg' }
  ];

  return (
    <View style={styles.foodContainer}>
      <Text style={styles.sectionTitle}>Popular Items</Text>
      {foods.map(food => (
        <TouchableOpacity key={food.id} style={styles.foodCard}>
          <Image source={{ uri: food.image }} style={styles.foodImage} />
          <Text>{food.name}</Text>
          <Text>{food.price}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation('delivery')}>
        <Text style={styles.btnText}>Proceed to Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

// 5. Delivery Screen
const DeliveryScreen = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Delivery Details</Text>
    <TextInput style={styles.input} placeholder="Address" />
    <TextInput style={styles.input} placeholder="Phone Number" />
    <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation('confirm')}>
      <Text style={styles.btnText}>Confirm Order</Text>
    </TouchableOpacity>
  </View>
);

// 6. Confirmation Screen
const ConfirmationScreen = () => (
  <View style={styles.container}>
    <MaterialIcons name="check-circle" size={100} color="green" />
    <Text style={styles.title}>Order Confirmed!</Text>
    <Text>Your food will arrive in 30 minutes</Text>
  </View>
);

// Main App Component
export default function App() {
  const [screen, setScreen] = useState('splash1');
  
  const splashScreens = [
    { id: 'splash1', title: 'FoodExpress', desc: 'Delicious meals at your doorstep', icon: 'fastfood', bgColor: '#FF5252' },
    { id: 'splash2', title: 'Fast Delivery', desc: '30 minutes or free', icon: 'delivery-dining', bgColor: '#FF9800' },
    { id: 'splash3', title: 'Get Started', desc: 'Create an account to begin', icon: 'account-circle', bgColor: '#4CAF50', isLast: true }
  ];

  const renderScreen = () => {
    if (screen.startsWith('splash')) {
      const splash = splashScreens.find(s => s.id === screen);
      return <SplashScreen {...splash} onNext={() => setScreen(splash.isLast ? 'signup' : splashScreens[splashScreens.indexOf(splash)+1].id)} />;
    }
    switch(screen) {
      case 'signup': return <SignupScreen navigation={setScreen} />;
      case 'login': return <LoginScreen navigation={setScreen} />;
      case 'food': return <FoodScreen navigation={setScreen} />;
      case 'delivery': return <DeliveryScreen navigation={setScreen} />;
      case 'confirm': return <ConfirmationScreen />;
      default: return null;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {renderScreen()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  splashContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { height: 50, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 10, marginBottom: 15 },
  primaryBtn: { backgroundColor: '#FF5252', padding: 15, borderRadius: 8, alignItems: 'center' },
  btnText: { color: 'white', fontWeight: 'bold' },
  // Add more styles as needed
});
