import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import FastImage from 'react-native-fast-image';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Header from '../component/Header'
import CartContext from '../context/CartContext';
import AddToCartButton from '../component/AddToCartButton';
import CartButton from '../component/CartButton';

const Details = ({ navigation, route }) => {
  const data = route.params
  const { addToCart, cartItems, deleteFromCart } = useContext(CartContext)
  const cartItem = cartItems.find((el) => el.id == data.id)
  const itemQuantity = cartItem?.quantity

  const RightComponent = () => {
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Cart')}>
        <Ionicon name='cart-outline' size={30} color={'#141414'} />
        <View style={{ backgroundColor: '#141414', flex: 1, borderRadius: 200, position: 'absolute', paddingHorizontal: 6, marginLeft: 20, marginTop: -10 }} >
          <Text style={{ fontSize: 12, fontWeight: '500', color: '#fff' }}>{cartItems?.length}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  const rating = data.rating.rate
  const ratingArray = [1, 2, 3, 4, 5]

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
      <Header title={'Details'} rightComponent={<RightComponent />} />
      <View style={{ flex: 1, margin: 16 }}>

        <FastImage style={{
          height: 200, width: "100%",
        }}
          source={{
            uri: data.image,
            priority: FastImage.priority.normal,
            cache: FastImage.cacheControl.immutable,
          }}
          resizeMode={FastImage.resizeMode.contain} />

        <Text style={{ fontSize: 18, fontWeight: "600", color: '#000', marginBottom: 16, marginTop: 40 }}>{data.title}</Text>
        <Text style={{ fontSize: 16, fontWeight: "900", color: '#141414', flex: 1 }}>Description</Text>
        <Text style={{ fontSize: 14, fontWeight: "600", color: '#000', flex: 1 }}>{data.description}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Text style={{ fontSize: 16, fontWeight: "900", color: '#141414', flex: 1, marginTop: 16 }}>Category</Text>
            <Text style={{ fontSize: 14, fontWeight: "600", color: '#000', }}>{data.category}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 12 }}>
            {ratingArray.map(item => {
              return (
                item <= rating
                  ? <Ionicon name='star' size={24} color={'#fcc200'} />
                  : <Ionicon name='star-outline' size={24} color={'#fcc200'} />
              )
            })
            }
            <Text style={{ fontSize: 14, fontWeight: "600", color: '#000', marginStart: 8 }}>({data.rating.count})</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Text style={{ fontSize: 16, fontWeight: "900", color: '#141414', flex: 1, marginTop: 16 }}>Price</Text>
            <Text style={{ fontSize: 14, fontWeight: "600", color: '#000', }}>₹{data.price}</Text>
          </View>
          {
            itemQuantity > 0
              ? <CartButton
                quantity={itemQuantity}
                onAddToCart={() => {
                  const cartItem = cartItems.find((el) => el.id == data.id)
                  const quantity = cartItem?.quantity || 0
                  addToCart(data, quantity + 1)
                }}
                onDecreaseQuantity={() => {
                  const cartItem = cartItems.find((el) => el.id == data.id)
                  const quantity = cartItem?.quantity || 0
                  addToCart(data, quantity - 1)
                }}
                onDeleteToCart={() => {
                  deleteFromCart({ itemId: data.id })
                }}
              />
              : <AddToCartButton
                onAddToCart={() => {
                  const cartItem = cartItems.find((el) => el.id == data.id)
                  const quantity = cartItem?.quantity || 0
                  addToCart(data, quantity + 1)
                }} />
          }
        </View>
      </View>
    </ScrollView>
  )
}

export default Details