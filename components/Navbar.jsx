import React from 'react'
import Link from 'next/link'
import { AiOutlineShopping } from 'react-icons/ai'
import { FaUserCircle } from 'react-icons/fa'

import { Cart } from './'
import { useStateContext } from '../context/StateContext'

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext()


  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">Mas Que Helados</Link>
      </p>
      <div className="navbar-icons">
        {/* <Link href="/register">
          <div className="cart-icon">
            <FaUserCircle />
          </div>
        </Link> */}
        <button onClick={() => setShowCart(true)} type="button" className="cart-icon">
          <AiOutlineShopping />
          <span className="cart-item-qty">{totalQuantities}</span>
        </button>
      </div>

      {showCart && <Cart />}
    </div>
  )
}

export default Navbar
