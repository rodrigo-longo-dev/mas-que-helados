import React, { useState } from 'react'
import Link from 'next/link'
import { AiOutlineShopping } from 'react-icons/ai'
import { FaUserCircle } from 'react-icons/fa'
import { FiLogOut, FiSearch } from 'react-icons/fi'
import logoMQH from '../assets/logoMQH.png'
import { Cart, SearchProds } from './'
import { useStateContext } from '../context/StateContext'
import Image from 'next/image'
import { useRouter } from 'next/router'

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities, user, logOut } = useStateContext()
  const router = useRouter()
  const [logout, setLogout] = useState(false)
  const [searchProds, setSearchProds] = useState(false)
  return (
    <>
      <div className="navbar-container">
        <div className="logo">
          <Link href="/"><Image width="110" height="90" src={logoMQH} /></Link>
          {router.asPath !== '/' && <Link href="/"><p>Volver a inicio</p></Link>}
        </div>
        <div className="navbar-icons">
          <div onClick={() => setSearchProds(true)}>
            <div className="cart-icon">
              <FiSearch />
            </div>
          </div>
          {!user && <Link href="/login">
            <div className="cart-icon">
              <FaUserCircle />
            </div>
          </Link>}
          {user && <div onClick={() => setLogout(true)}>
            <div className="cart-icon">
              <FiLogOut />
            </div>
          </div>}
          <button onClick={() => setShowCart(true)} type="button" className="cart-icon">
            <AiOutlineShopping />
            <span className="cart-item-qty">{totalQuantities}</span>
          </button>
        </div>

      </div>
      {searchProds && <SearchProds close={() => setSearchProds(false)} />}
      {showCart && <Cart />}
      {logout && user && <div className="popUp-container">
        <div className="popUp-box">
          <p>Seguro que quieres cerrar sesión</p>
          <button onClick={() => { logOut(null); setLogout(false) }} className="button button--logout">Cerrar sesión</button>
        </div>
      </div>}
    </>
  )
}

export default Navbar
