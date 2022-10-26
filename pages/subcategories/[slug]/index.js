import React from 'react'
import Head from 'next/head'
import ErrorPage from 'next/error'
import { client } from '../../../lib/client'
import { Product, HeroBanner, FooterBanner } from '../../../components'
import { useRouter } from 'next/router'

const Home = ({ category, products, slug, bannerData }) => {
  const router = useRouter()
  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <>
      <Head>
        <title>{category?.name} - Mas que helados</title>
        <meta name="description" content="Todos los productos para el helado, están en más que helados!" />
        <meta property="og:title" content="Mas que helados" />
      </Head>
      {bannerData && <HeroBanner heroBanner={bannerData[0]} />}
      <div className="products-heading">
        <h2>{category?.name}</h2>
        <p>{category?.name}</p>
      </div>
      <div className="products-container">
        {products?.map(product => <Product urlCategory={slug} key={product.id} product={product} />)}
      </div>
      {bannerData && <FooterBanner footerBanner={bannerData[0]} />}
    </>
  )
}

export const getStaticPaths = async () => {
  const query = `*[_type == "category"] {
        slug {
            current
        }
    }`
  const category = await client.fetch(query)

  const paths = category.map(cat => ({ params: { slug: cat.slug.current } }))

  return { paths, fallback: false }
}



export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "category" && slug.current == '${slug}'][0]`
  const category = await client.fetch(query)

  const productsQuery = `*[_type == "subcategory" && category._ref == '${category._id}']`
  const products = await client.fetch(productsQuery)

  const bannerQuery = '*[_type == "banner"]'
  const bannerData = await client.fetch(bannerQuery)


  return {
    props: { category, products, slug, bannerData },
    revalidate: 10,
  }
}

export default Home
