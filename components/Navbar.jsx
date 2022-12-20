import React from 'react'
import Link from 'next/link'
import { AiOutlineShopping, AiFillPhone } from 'react-icons/ai'
import { FaUserCircle } from 'react-icons/fa'
import logoMQH from '../assets/logoMQH.png'
import { Cart } from './'
import { useStateContext } from '../context/StateContext'
import Image from 'next/image'

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext()


  return (
    <div className="navbar-container">
      <div className="logo">
        <Link href="/"><Image width="80" height="67" src={logoMQH} /></Link>
      </div>
      <div className="navbar-icons">
        <Link href="/contacto">
          <div className="cart-icon">
            <AiFillPhone />
          </div>
        </Link>
        <Link href="/register">
          <div className="cart-icon">
            <FaUserCircle />
          </div>
        </Link>
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
