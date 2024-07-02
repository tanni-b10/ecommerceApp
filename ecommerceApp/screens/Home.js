import { View, Text, ScrollView, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import Header from '../component/Header'
import Ionicon from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import AddToCartButton from '../component/AddToCartButton';
import CartContext from '../context/CartContext';

const Home = ({ navigation }) => {
  const [homeData, setHomeData] = useState([])
  const [loading, setLoading] = useState(true)
  const { getDataThroghAsync, cartItems } = useContext(CartContext)

  // const getDataThroughFetch = () => {
  //     fetch('https://fakestoreapi.com/products')
  //         .then((response) => response.json())
  //         .then((responseJson) => { return responseJson }
  //         )
  //         .catch(
  //             (error) => console.log(error)
  //         )
  // }

  useEffect(() => {
    const apiData = getDataThroghAsync()
    apiData.then((data) => {
      setHomeData(data)
      setLoading(false)
    })
  }, [])

  const RightComponent = () => {
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Cart')}>
        <Ionicon name='cart-outline' size={30} color={'#141414'} />
        <View style={{ backgroundColor: '#141414', flex: 1, borderRadius: 200, position: 'absolute', paddingHorizontal: 6, marginLeft: 20, marginTop: -10 }} >
          <Text style={{ fontSize: 12, fontWeight: '500', color: '#fff' }}>{cartItems.length}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <ScrollView style={{ flex: 1 }} >
      <Header title={'Home'} rightComponent={<RightComponent />} />
      {loading ?
        <ActivityIndicator style={{ marginTop: 20, alignSelf: 'center', justifyContent: 'center' }} />
        :
        <FlatList
          data={homeData}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => `${index}`}
          contentContainerStyle={{ marginTop: 8 }}
          scrollEnabled={false}
          renderItem={({ item, index }) => <ShowItem item={item} />}
          ListFooterComponent={
            () => {
              return (
                <View style={{ marginBottom: 30 }} />
              )
            }
          }
          ListEmptyComponent={() => {
            return (
              <View style={{ flex: 1, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 20, fontWeight: '600', color: '#000' }}>
                  No data Found
                </Text>
              </View>
            )
          }}
        />
      }

    </ScrollView>
  )
}

const ShowItem = ({ item }) => {
  const rating = item.rating.rate
  const ratingArray = [1, 2, 3, 4, 5]

  const navigation = useNavigation()
  const { addToCart, cartItems } = useContext(CartContext)
  const cartItem = cartItems.find((el) => el.id == item.id)
  const itemQuantity = cartItem?.quantity

  return (

    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('ProductDetails', item)}
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
        <Text style={{ fontSize: 14, fontWeight: '600', color: '#000', marginTop: 4 }}> ₹{item.price}</Text>
      </View>

      <View style={{ alignSelf: 'flex-end' }}>
        <AddToCartButton
          itemQuantity={itemQuantity}
          onAddToCart={() => {
            const cartItem = cartItems.find((el) => el.id == item.id)
            const quantity = cartItem?.quantity || 0
            addToCart(item, quantity + 1)
          }}
        />

      </View>
    </TouchableOpacity>
  )
}
export default Home