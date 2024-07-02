import { TouchableOpacity, Text } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const Incart = () => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={{ backgroundColor: 'black', borderRadius: 0, paddingVertical: 8, paddingHorizontal: 12, alignItems: 'center' }}
            onPress={() => navigation.navigate('Cart')}>
            <Text style={{ fontSize: 12, fontWeight: '500', color: '#fff' }}>In Cart</Text>
        </TouchableOpacity>
    )
}

export default Incart