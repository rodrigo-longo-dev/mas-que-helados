import React, { createContext, useContext, useState } from 'react'
import { toast } from 'react-hot-toast'

const Context = createContext();

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false)
    const [qty, setQty] = useState(1)

    const [totalPrice, setTotalPrice] = useState(() => {
        if (typeof window !== "undefined") {
            const item = localStorage.getItem('totalPrice');
            return item ? item : 0;
        }
        return 0;
    })
    const [totalQuantities, setTotalQuantities] = useState(() => {
        if (typeof window !== "undefined") {
            const item = localStorage.getItem('totalQuantities');
            return item ? item : 0;
        }
        return 0;
    })
    const [cartItems, setCartItems] = useState(() => {
        if (typeof window !== "undefined") {
            const item = localStorage.getItem('cartItems');
            return item ? JSON.parse(item) : [];
        }
        return [];
    });
    const [user, setUser] = useState(() => {
        if (typeof window !== "undefined") {
            const item = localStorage.getItem('user');
            return item ? JSON.parse(item) : null;
        }
        return null;
    })

    let foundProduct;
    let index;

    const setValueLocalStorage = (key, value) => {
        if (typeof window !== "undefined") {
            localStorage.setItem(key, JSON.stringify(value))
        }
    }

    const onAdd = (product, quantity) => {
        const checkProducInCart = cartItems.find(item => item._id === product._id);

        setTotalPrice((prevTotalPrice) => {
            const price = prevTotalPrice + (product.precio.unidadesCaja / product.precio.unidadesPrecio) * product.precio.precio * quantity
            setValueLocalStorage('totalPrice', price)
            return price
        });
        setTotalQuantities((prevTotalQuantities) => {
            const totQty = prevTotalQuantities + quantity
            setValueLocalStorage('totalQuantities', totQty)
            return totQty
        });


        if (checkProducInCart) {
            const updatedCartItems = cartItems.map(cartProduct => {
                if (cartProduct._id === product._id) return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity
                }
            })

            setCartItems(updatedCartItems)
            setValueLocalStorage('cartItems', updatedCartItems)
        } else {
            product.quantity = quantity;
            setCartItems([...cartItems, { ...product }])
            setValueLocalStorage('cartItems', [...cartItems, { ...product }])
        }
        toast.success(`${qty} ${product.name} added to the cart`)
    }

    const onRemove = (product) => {
        foundProduct = cartItems.find((item) => item._id === product._id);
        const newCartItems = cartItems.filter((item) => item._id !== product._id);

        setCartItems(newCartItems);
        setTotalPrice((prevTotalPrice) => {
            let price = prevTotalPrice - (foundProduct.precio.precio * foundProduct.quantity)
            setValueLocalStorage('totalPrice', price)
            return price
        });
        setTotalQuantities((prevTotalQuantities) => {
            const totQty = prevTotalQuantities - foundProduct.quantity
            setValueLocalStorage('totalQuantities', totQty)
            return totQty
        });
        setValueLocalStorage('cartItems', newCartItems)
    }

    const toggleCartItemQuanitity = (id, value) => {
        foundProduct = cartItems.find((item) => item._id === id)
        index = cartItems.findIndex((product) => product._id === id);
        const newCartItems = cartItems.filter((item) => item._id !== id)

        if (value === 'inc') {
            setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 }]);
            setTotalPrice((prevTotalPrice) => {
                const price = prevTotalPrice + (foundProduct.precio.unidadesCaja / foundProduct.precio.unidadesPrecio) * foundProduct.precio.precio
                setValueLocalStorage('totalPrice', price)
                return price
            });
            setTotalQuantities((prevTotalQuantities) => {
                const totQty = prevTotalQuantities + 1
                setValueLocalStorage('totalQuantities', totQty)
                return totQty
            });

            setValueLocalStorage('cartItems', [...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 }])
        } else if (value === 'dec') {
            if (foundProduct.quantity > 1) {
                setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 }]);
                setTotalPrice((prevTotalPrice) => {
                    const price = prevTotalPrice - (foundProduct.precio.unidadesCaja / foundProduct.precio.unidadesPrecio) * foundProduct.precio.precio
                    setValueLocalStorage('totalPrice', price)
                    return price
                });
                setTotalQuantities((prevTotalQuantities) => {
                    const totQty = prevTotalQuantities - 1
                    setValueLocalStorage('totalQuantities', totQty)
                    return totQty
                });

                setValueLocalStorage('cartItems', [...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 }])
            }
        }
    }



    const incQty = (qty) => {
        if (qty > 0) {
            return setQty(qty)
        }
        return setQty((prevQty) => prevQty + 1)
    }
    const decQty = (qty = 1) => {
        setQty((prevQty) => {
            if (prevQty - 1 < qty) return qty
            return prevQty - 1
        })
    }


    const setUserLocale = (user) => {
        if (typeof window !== "undefined") {
            localStorage.setItem('user', JSON.stringify(user))
            setUser(localStorage.getItem('user'))
        }
    }
    const logOut = () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem('user')
            setUser(null)
        }
    }
    return (
        <Context.Provider
            value={{
                showCart,
                cartItems,
                totalPrice,
                totalQuantities,
                qty,
                incQty,
                decQty,
                onAdd,
                setShowCart,
                toggleCartItemQuanitity,
                onRemove,
                setCartItems,
                setTotalPrice,
                setTotalQuantities,
                user,
                setUserLocale,
                logOut,
            }}
        >
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context)
