import React from 'react';
import { useState } from 'react';
import { ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import { View, Text, ImageBackground } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicon from 'react-native-vector-icons/Ionicons';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(true);
    const [checkValidEmail, setCheckValidEmail] = useState(false);
    const [checkValidPassword, setCheckValidPassword] = useState(false);

    const handleCheckEmail = (text) => {
        let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (regex.test(text)) {
            setCheckValidEmail(true);
        } else {
            setCheckValidEmail(false);
        }
    }
    const handleCheckPassword = (text) => {
        setPassword(text)
        if (text.length > 8)
            setCheckValidPassword(true);
    }


    const storeData = async () => {
        try {
            navigation.navigate('Home');
            await AsyncStorage.setItem('email', email);
            await AsyncStorage.setItem('password', password);

        } catch (e) {
            // saving error
        }
    };
    return (
        <ImageBackground source={require('../assets/loginImage4.png')} style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps={'always'}>
                <Text style={{
                    textAlign: "center",
                    fontSize: 28,
                    color: "#FFF",
                    fontWeight: 500,
                    marginTop: 150
                }}>
                    Welcome
                </Text>
                <Text style={{
                    color: "#FFF",
                    textAlign: 'center',
                    fontSize: 20,
                    fontWeight: 500,

                }}>
                    Login into your account
                </Text>

                <Text style={{
                    color: 'white',
                    fontSize: 18,
                    fontWeight: 500,
                    marginLeft: 30,
                    marginTop: 20
                }}>
                    Email
                </Text>

                <TextInput
                    placeholder="Email"
                    placeholderTextColor="#C4C4C4"
                    maxLength={40}
                    autoCapitalize='none'
                    style={{
                        color: 'black',
                        padding: 12,
                        height: 48,
                        borderRadius: 6,
                        backgroundColor: '#FEFCFC',
                        marginVertical: 2,
                        marginHorizontal: 30
                    }}
                    onChangeText={(text) => {
                        setEmail(text.trim());
                        handleCheckEmail(text.trim())
                    }}
                />

                {!checkValidEmail &&
                    <Text style={{ color: 'red', textAlign: 'left', marginLeft: 30 }}>Enter vaild email</Text>}

                <Text style={{
                    color: 'white',
                    fontSize: 18,
                    fontWeight: 500,
                    margin: 2,
                    marginLeft: 30,
                }}>Password</Text>


                <View style={{
                    flexDirection: 'row', alignItems: 'center', backgroundColor: '#FEFCFC', borderRadius: 8,
                    paddingRight: 18, marginHorizontal: 30, justifyContent: 'space-between'
                }}>
                    <TextInput
                        placeholder="Password"
                        value={password}
                        secureTextEntry={showPassword}
                        placeholderTextColor="#C4C4C4"
                        maxLength={40}
                        style={{
                            color: 'black',
                            height: 48,
                            borderRadius: 6,
                            backgroundColor: '#FEFCFC',
                            padding: 12,
                            width: '90%'
                        }}
                        onChangeText={(text) => handleCheckPassword(text)}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ backgroundColor: '#FEFCFC' }}>
                        {
                        !showPassword ? <Ionicon name='eye' size={24} style={{ paddingHorizontal: 8 }} color={'grey'} />
                                : <Ionicon name='eye-off' size={24} style={{ paddingHorizontal: 8 }} color={'grey'} />
                        }
                    </TouchableOpacity>
                </View>


                <TouchableOpacity
                    disabled={!checkValidEmail || !checkValidPassword}
                    activeOpacity={0.8}
                    onPress={() => storeData()}
                    style={{
                        backgroundColor:'black',
                        marginVertical: 20, marginHorizontal: 40, borderRadius: 8, color: 'white', paddingVertical: 9, alignItems: "center"
                    }}>
                    <Text style={{ color:'white',fontWeight: 500, fontSize: 20 }}>
                        Login
                    </Text>
                </TouchableOpacity>


                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginHorizontal: 30, marginTop: 20, marginBottom: 100 }}>
                    <Text style={{color:'black'}}>
                        Fashion is a way to tell who you are !
                    </Text>
                </View>
            </ScrollView>
        </ImageBackground>


    )
}

export default Login;
