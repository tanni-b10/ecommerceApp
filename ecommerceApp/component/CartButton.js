import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicon from 'react-native-vector-icons/Ionicons';

const CartButton = ({ quantity, onAddToCart, onDeleteToCart, onDecreaseQuantity }) => {
    return (
        <View style={{ padding: 2, borderColor: 'black', borderWidth:1, borderRadius: 1, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={quantity > 1 ? onDecreaseQuantity : onDeleteToCart}
                style={{ borderRightWidth: 1, borderRightColor: 'black', }}>
                {quantity > 1
                    ?
                    <Ionicon name='remove-outline' size={24} color={'black'} style={{ paddingHorizontal: 8 }} />
                    :
                    <Ionicon name='trash-outline' size={24} style={{ paddingHorizontal: 8 }} color={'grey'} />

                }
            </TouchableOpacity>
            <Text style={{ fontSize: 12, fontWeight: '500', color: '#000', paddingHorizontal: 12 }}>{quantity}</Text>
            <TouchableOpacity
                style={{ borderLeftWidth: 1, borderLeftColor: 'black', paddingHorizontal: 2 }}
                onPress={onAddToCart}
                activeOpacity={0.8}
            >
                <Ionicon name='add-outline' size={24} color={'black'} style={{ paddingHorizontal: 8 }} />
            </TouchableOpacity>
        </View>
    )
}

export default CartButton