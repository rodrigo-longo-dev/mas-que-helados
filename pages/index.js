import React from 'react'
import {client} from '../lib/client'
import {Category, HeroBanner, FooterBanner } from '../components'

const Home = ({ categories, bannerData }) => {
  return (
    <>
        <HeroBanner heroBanner={bannerData && bannerData[0]} />
        <div className="products-heading">
          <h2>Los mejores productos para helado</h2>
          <p>El mejor helado</p>
        </div>
        <div className="products-container">
          {categories?.map(category => <Category key={category.id} category={category} />)}
        </div>
        <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </>
  )
}

export const getServerSideProps = async () => {
  const query = '*[_type == "category"]'
  const categories = await client.fetch(query)
  
  const bannerQuery = '*[_type == "banner"]'
  const bannerData = await client.fetch(bannerQuery)

  return {props: {categories, bannerData}}
}
 
export default Home
