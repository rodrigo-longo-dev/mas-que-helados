import React from 'react'
import Head from 'next/head'
import ErrorPage from 'next/error'
import { client } from '../../../../lib/client'
import { Product, HeroBanner } from '../../../../components'
import { useRouter } from 'next/router'

const Index = ({ category, products, productos, slug, bannerData }) => {
  const router = useRouter()
  if (!router.isFallback && !productos) {
    return <ErrorPage statusCode={404} />
  }
  const url = `${slug}/${productos}`
  return (
    <>
      <Head>
        <title>{category?.name} - Mas que helados</title>
        <meta name="description" content="Todos los productos para el helado, están en más que helados!" />
        <meta property="og:title" content="Mas que helados" />
      </Head>
      <HeroBanner heroBanner={bannerData && bannerData[0]} />
      <div className="products-heading">
        <h2>{category?.name}</h2>
        <p>El mejor helado</p>
      </div>
      <div className="products-container">
        {products?.map(product => <Product urlCategory={url} key={product.id} product={product} />)}
      </div>
    </>
  )
}

export const getStaticPaths = async () => {
  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
      paths: [],
      fallback: 'blocking',
    }
  }
  const query = `*[_type == "product"]{
    slug {
      current
    }
  }`
  const products = await client.fetch(query)

  const query2 = `*[_type == "subcategory"]{
    slug {
        current
    }
}`
  const category = await client.fetch(query2)

  const paths = []
  category.forEach(cat => {
    products.forEach(prod => {
      paths.push({ params: { slug: cat.slug.current, productos: prod.slug?.current || '' } })
    })
  })

  return { paths, fallback: 'blocking' }
}



export const getStaticProps = async ({ params: { productos, slug } }) => {
  const query = `*[_type == "subcategory" && slug.current == '${productos}'][0]`
  const category = await client.fetch(query)

  let products = [{}]
  if (category) {
    const productsQuery = `*[_type == "product" && subcategory._ref == '${category._id}']`
    products = await client.fetch(productsQuery)
  }

  const bannerQuery = '*[_type == "banner"]'
  const bannerData = await client.fetch(bannerQuery)


  return {
    props: { category, products, productos, slug, bannerData },
    revalidate: 10,
  }
}

export default Index
