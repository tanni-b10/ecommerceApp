import { View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import React, { useContext, } from 'react'
import Header from '../component/Header'
import CartContext from '../context/CartContext'
import Ionicon from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import CartButton from '../component/CartButton'

const Cart = ({ navigation }) => {
  const { cartItems, clearCart } = useContext(CartContext)

  const RightComponent = () => {
    return (
      <TouchableOpacity activeOpacity={0.8} style={{ alignItems: 'center', flex: 1, marginEnd: 5 }} onPress={clearCart}>
        <Text style={{ marginTop: 5, color:'black',fontWeight: 600 }}>CLEAR CART</Text>
      </TouchableOpacity>
    )
  }
  let totalPrice = cartItems.reduce((previousValue, currentValue) => {
    return previousValue + currentValue.quantity * currentValue.price;
  }, 0);
  totalPrice=totalPrice.toFixed(2);
  return (
    <>
      <ScrollView style={{ flex: 1 }} >
        <Header title={'Cart'} rightComponent={<RightComponent />} />
        <FlatList
          data={cartItems}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => `${index}`}
          contentContainerStyle={{ marginTop: 8 }}
          scrollEnabled={false}
          renderItem={({ item, index }) => {
            return (

              <ShowItem item={item} />
            )
          }}
          ListFooterComponent={
            () => {
              return (
                <View style={{ marginBottom: 30 }} />
              )
            }
          }
          ListEmptyComponent={() => {
            return (
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={{ fontSize: 20, fontWeight: '600', color: '#000' }}>
                  No data Found
                </Text>
              </View>
            )
          }}
        />

      </ScrollView>
        <TouchableOpacity activeOpacity={0.8}
          style={{paddingTop:12, paddingHorizontal: 12,flexDirection:'row',justifyContent:'space-between', backgroundColor: 'white', margin: 16, alignItems: 'center' }}
          onPress={() => navigation.navigate('Home')}>
          <Text style={{fontSize:20,color:'black'}}> {totalPrice}</Text>
          <Text style={{ color: 'white', fontSize: 16, fontWeight: '600',backgroundColor: '#141414', paddingHorizontal:30,paddingVertical:8}}>{cartItems.length != 0 ? 'Continue' : 'Find Products'}</Text>
        </TouchableOpacity>
    </>
  )
}
const ShowItem = ({ item }) => {

  const rating = item.rating.rate

  const ratingArray = [1, 2, 3, 4, 5]

  const navigation = useNavigation()
  const { cartItems, addToCart, deleteFromCart } = useContext(CartContext)

  const cartItem = cartItems.find((el) => el.id == item.id)
  const itemQuantity = cartItem?.quantity

  return (

    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('Details', item)}
      style={{
        padding: 16, marginHorizontal: 16,
        marginVertical: 8, backgroundColor: 'white', alignItems: 'center', flexDirection: 'row'
      }}
    >
      <FastImage style={{ height: 64, width: '20%', }}
        source={{
          uri: item.image,
          priority: FastImage.priority.normal,
          cache: FastImage.cacheControl.immutable,
        }}
        resizeMode={FastImage.resizeMode.contain} />

      <View style={{ flex: 1, marginStart: 8 }}>
        <Text style={{ fontSize: 14, fontWeight: '600', color: '#000', flex: 1, }}>{item?.title}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
          {ratingArray.map((item, index) => {
            return (
              item <= rating
                ? <Ionicon name='star' size={24} color={'#FF7300FF'} />
                : <Ionicon name='star-outline' size={24} color={'#FF7300FF'} />
            )
          })
          }
          <Text style={{ fontSize: 12, fontWeight: '500', color: '#000', marginStart: 8 }}>({item.rating.count})</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8, justifyContent: 'space-between' }}>

          <Text style={{ fontSize: 14, fontWeight: '600', color: '#000', marginTop: 4 }}> ₹{item.price}</Text>
          <CartButton
            quantity={itemQuantity}
            onAddToCart={() => {
              const cartItem = cartItems.find((el) => el.id == item.id)
              const quantity = cartItem?.quantity || 0
              addToCart(item, quantity + 1)
            }}
            onDecreaseQuantity={() => {
              const cartItem = cartItems.find((el) => el.id == item.id)
              const quantity = cartItem?.quantity || 0
              addToCart(item, quantity - 1)
            }}
            onDeleteToCart={() => {
              deleteFromCart({ itemId: item.id })
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  )
}
export default Cart