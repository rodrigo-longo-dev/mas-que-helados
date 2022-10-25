import React from 'react'
import {client} from '../../lib/client'
import {Category } from '../../components'

const Home = ({ subcategories, bannerData }) => {
  return (
    <>
        <div className="products-heading">
          <h2>Los mejores productos para helado</h2>
          <p>El mejor helado</p>
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

  return {props: {subcategories, bannerData}}
}
 
export default Home
