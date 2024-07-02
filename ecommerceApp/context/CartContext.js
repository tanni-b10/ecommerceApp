import React, { useState, useEffect } from 'react'
import { Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const CartContext = React.createContext()

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([])

    const getDataThroghAsync = async () => {
        try {
            let response = await fetch('https://fakestoreapi.com/products')
            let responseJson = await response.json();
            return responseJson;
        }
        catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        getCartItems()
    }, [])

    const getCartItems = async () => {
        try {
            const basket = await AsyncStorage.getItem('cartItems')
            if (basket) {
                setCartItems(JSON.parse(basket))
                return basket
            }
            else
                return []
        }
        catch (error) {
            console.error('Error fetching cart Items', error)
        }
    }

    const addToCart = async (item, changedQuantity) => {
        try {
            let productsInCart = await AsyncStorage.getItem('cartItems');
            productsInCart = await JSON.parse(productsInCart) || []

            const existingCartItem = await productsInCart.find((el) => el.id == item.id)
            if (existingCartItem) {
                setCartItems((prevCartItems) => {
                    const updatedCartItems = [...prevCartItems];
                    const existingCartItemIndex = updatedCartItems.findIndex((cartItem) => cartItem.id === item.id);
                    if (existingCartItemIndex != -1) {
                        updatedCartItems[existingCartItemIndex].quantity = changedQuantity;
                    }
                    AsyncStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
                    Alert.alert('Cart updated')
                    return updatedCartItems;
                })
            } else {
                const modifiedItem = await { ...item, quantity: 1 }
                AsyncStorage.setItem('cartItems', JSON.stringify([...cartItems, modifiedItem]));
                Alert.alert('Item added to cart')
                setCartItems([...cartItems, modifiedItem])
            }
        }
        catch (error) {
            console.error('Error adding item to cart', error);
        }
    }

    const deleteFromCart = async ({ itemId }) => {
        const updateCartItems = cartItems.filter((item) => itemId != item.id)
        setCartItems(updateCartItems)
        await AsyncStorage.setItem('cartItems', JSON.stringify(updateCartItems));
        Alert.alert('Item deleted from Cart')
    }

    const clearCart = async () => {
        await AsyncStorage.removeItem('cartItems')
        setCartItems([]);
        Alert.alert('Cart cleared')
    }

    return (
        <CartContext.Provider
            value={{
                getDataThroghAsync, setCartItems, cartItems,
                addToCart, getCartItems,
                deleteFromCart,clearCart
            }}>
            {children}
        </CartContext.Provider>
    )
}
export default CartContext




