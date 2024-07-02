import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import Login from './screens/Login';
import Cart from './screens/Cart';
import ProductDetails from './screens/ProductDetails';
import { CartProvider } from './context/CartContext';

const Stack = createNativeStackNavigator();

const Navigator = () => {
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Cart" component={Cart} />
          <Stack.Screen name="ProductDetails" component={ProductDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}

export default Navigator;