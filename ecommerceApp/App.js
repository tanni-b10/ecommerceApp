import { View, Text } from 'react-native'
import React from 'react'
import Navigator from './Navigator.js'
import { CartProvider } from './context/CartContext.js';

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <CartProvider>
        <Navigator />
      </CartProvider>
    </View>

  )
}


export default App