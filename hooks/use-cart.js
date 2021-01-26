import { useState, createContext, useContext, useEffect } from 'react'
import products from '../products.json'
import { initiateCheckout } from '../lib/payments'

let defaultCart = {
    products: {}
}

export const CartContext = createContext()

export function useCartState() {
    let [cart, setCart] = useState(defaultCart)

    useEffect(() => {
        const stateFromStorage = window.localStorage.getItem('spacejelly_cart')
        const data = stateFromStorage && JSON.parse(stateFromStorage)
        if (data) {
            setCart(data)
        }
    }, [])

    useEffect(() => {
        const data = JSON.stringify(cart)
        window.localStorage.setItem('spacejelly_cart', data)
    }, [cart])

    let cartItems = Object.keys(cart.products).map(key => {
        let product = products.find(({ id }) => id === key)
        return {
          ...cart.products[key],
          pricePerUnit: product.price
        }
      })

    let subtotal = cartItems.reduce((acc, { pricePerUnit, quantity }) => {
      return acc + (pricePerUnit * quantity)
    }, 0)

    let quantity = cartItems.reduce((acc, { quantity }) => {
      return acc + quantity
    }, 0)
    
    function addToCart({ id } = {}) {
      setCart(prev => {
        let cartState = {...prev}
  
        if(cartState.products[id]) {
          cartState.products[id].quantity = cartState.products[id].quantity + 1
        } else {
          cartState.products[id] = {
            id,
            quantity: 1
          }
        }
  
        return cartState
      })
    }
  
    function checkout() {
      initiateCheckout({
        lineItems: cartItems.map(item => {
          return {
            price: item.id,
            quantity: item.quantity
          }
        })
      })
    }

    return {
        cart,
        setCart,
        cartItems,
        subtotal,
        quantity,
        addToCart,
        checkout
    }
}

export function useCart() {
    let cart = useContext(CartContext)
    return cart
}