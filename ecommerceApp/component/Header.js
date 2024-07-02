import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";

const Header = ({ title, rightComponent, onPress }) => {
    const navigation = useNavigation()
    return (
        <View style={{ flex: 1, backgroundColor: '#fff', flexDirection: 'row', padding: 14, alignItems: 'center' }}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
                <Ionicon name='arrow-back-outline' size={24} color={'#000'} />
            </TouchableOpacity>
            <Text style={{ fontSize: 16, fontWeight: '600', color: '#000', marginStart: 8 }}>{title}</Text>
            <View style={{ alignItems: 'flex-end', flex: 1, marginEnd: 10 }}>
                {rightComponent}
            </View>
        </View>
    )
}

export default Header