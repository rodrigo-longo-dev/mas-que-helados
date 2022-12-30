import React from 'react'
import { client } from '../../lib/client'
import { Category } from '../../components'

const Home = ({ subcategories }) => {
  return (
    <>
      <div className="products-heading">
        <h2>Selecciona una subcategoría</h2>
        <p>Los mejores productos para el helado</p>
      </div>
      <div className="products-container">
        {subcategories?.map(category => <Category key={category.id} category={category} />)}
      </div>
    </>
  )
}

export const getServerSideProps = async () => {
  const query = '*[_type == "subcategory"]'
  const subcategories = await client.fetch(query)

  return { props: { subcategories } }
}

export default Home
