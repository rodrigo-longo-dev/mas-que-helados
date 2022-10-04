import React from 'react'
import Head from 'next/head'
import NavBar from './Navbar'
import Footer from './Footer'

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Head>
        <title>Mas que helados</title>
        <meta name="description" content="Todos los productos para el helado, están en más que helados!" />
        <meta property="og:title" content="Mas que helados" />
      </Head>
      <header>
        <NavBar />
      </header>
      <main className="main-container">
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Layout
