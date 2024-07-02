import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Incart from './Incart';

const AddToCartButton = ({ onAddToCart, itemQuantity }) => {

    return (
        itemQuantity > 0 ?
            <Incart />
            :
            <TouchableOpacity
                activeOpacity={0.8}
                style={{ backgroundColor: 'black', borderRadius: 0, padding: 8 }}
                onPress={onAddToCart}>
                <Text style={{ fontSize: 12, fontWeight: '500', color: '#fff' }}>Add To Cart</Text>
            </TouchableOpacity>

    )
}

export default AddToCartButton