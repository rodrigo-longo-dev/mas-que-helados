import React from 'react'
import {client} from '../lib/client'
import {Category, HeroBanner } from '../components'

const Home = ({ categories }) => {
  return (
    <>
        <HeroBanner />
        <div className="products-heading">
          <h2>Selecciona una categoría</h2>
          <p>Los mejores productos para el helado</p>
        </div>
        <div className="products-container">
          {categories?.map(category => <Category key={category.id} category={category} />)}
        </div>
    </>
  )
}

export const getServerSideProps = async () => {
  const query = '*[_type == "category"]'
  const categories = await client.fetch(query)
  return {props: {categories}}
}
 
export default Home
