import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import ErrorPage from 'next/error'
import { client, urlFor, fileUrl, videoUrl } from '../../../../lib/client'
import { AiOutlineMinus, AiOutlinePlus, AiOutlineClose } from 'react-icons/ai'
import { FiChevronLeft } from 'react-icons/fi'
import { Product } from '../../../../components'
import { useStateContext } from '../../../../context/StateContext'
import { useRouter } from 'next/router'
import Link from 'next/link'

const ProductDetails = ({ currentProduct, products, product }) => {
  const { image, name, details, video, units, fichaTecnica, precio } = currentProduct
  const [productsMarquee, setProductsMarquee] = useState([]);
  const [newUrl, setNewUrl] = useState('')
  const [index, setIndex] = useState(0);
  const [bigImage, setBigImage] = useState(false);
  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext()
  const router = useRouter()
  if (!router.isFallback && !product) {
    return <ErrorPage statusCode={404} />
  }
  useEffect(() => {
    if (precio) {
      if (precio.minimoCajas) {
        incQty(precio.minimoCajas)
      }
    }
    if (products) {
      const filteredProducts = products.filter(p => p.subcategory._ref === currentProduct.subcategory._ref)
      setProductsMarquee(filteredProducts)
    }
    const getUrl = router.asPath.split('/')
    setNewUrl(`${getUrl[2]}/${getUrl[3]}`)
  }, [])
  return (
    <>
      <Head>
        <title>{name} - Mas que helados</title>
        <meta name="description" content="Todos los productos para el helado, están en más que helados!" />
        <meta property="og:title" content="Mas que helados" />
      </Head>
      {bigImage && <div className="big-image-onscreen">
        <AiOutlineClose onClick={() => setBigImage(false)} />
        <img
          src={urlFor(image[index])}
          className=""
        />
      </div>}
      <div>
        <div className="product-detail-container">
          {image[0].asset && <div>
            <div className="image-container">
              {index !== "video" && <img onClick={() => setBigImage(true)} src={urlFor(image && image[index])} className="product-detail-image" />}
              {video && index === "video" && <video
                className="product-detail-image"
                muted
                autoPlay
                controls
                loop
              >
                <source src={videoUrl(video.asset)} type='video/mp4' />
              </video>}
            </div>
            <div className="small-images-container">
              {image?.map((item, i) => (
                <img
                  key={i}
                  src={urlFor(item)}
                  className={i === index ? 'small-image selected-image' : 'small-image'}
                  onMouseEnter={() => setIndex(i)}
                />
              ))}
              {video && <video
                className="small-image"
                muted
                loop
                onMouseEnter={() => setIndex('video')}
              >
                <source src={videoUrl(video.asset)} type='video/mp4' />
              </video>}
            </div>
          </div>}

          <div className="product-detail-desc">
            <p className="product-detail-goBack"><FiChevronLeft /><Link href={`/subcategories/${newUrl}`}>Volver</Link></p>
            <h1>{name}</h1>
            {fichaTecnica && <a target="_blank" rel="noreferrer" href={fileUrl(fichaTecnica.asset)}>Ficha técnica</a>}
            <h4>Detalles: </h4>
            <p>{details}</p>
            {precio && <>
              <p className="price">{precio.precio}€ <span> / {precio.unidadesPrecio} uds.</span></p>
              <p className="price"><span>{precio.unidadesCaja} uds.  / Caja - Pedido mínimo: {precio.minimoCajas} cajas</span></p>
              <div className="quantity">
                <h3>Quantity:</h3>
                <p className="quantity-desc">
                  <span className="minus" onClick={() => decQty(precio.minimoCajas)}><AiOutlineMinus /></span>
                  <span className="num">{qty}</span>
                  <span className="plus" onClick={incQty}><AiOutlinePlus /></span>
                </p>
              </div>
              <p className="price">Total: {((precio.unidadesCaja / precio.unidadesPrecio) * precio.precio * qty).toFixed(2)}€</p>
              <div className="buttons">
                <button type="button" className="add-to-cart" onClick={() => onAdd(currentProduct, qty)}>Add to Cart</button>
                {/* <button type="button" className="buy-now" onClick={handleBuyNow}>Buy Now</button> */}
              </div>
            </>}
          </div>
        </div>

        <div className="maylike-products-wrapper">
          <h2>También podría interesarte</h2>
          <div className="marquee">
            <div className="maylike-products-container track">
              {productsMarquee.length > 0 && productsMarquee.map((item) => (
                <Product marquee={true} key={item._id} product={item} />
              ))}
            </div>
          </div>
        </div>
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

  const query2 = `*[_type == "category"]{
    slug {
        current
    }
}`
  const category = await client.fetch(query2)

  const query3 = `*[_type == "subcategory"]{
    slug {
        current
    }
}`
  const subcategory = await client.fetch(query3)

  const paths = []
  category.forEach(cat => {
    subcategory.forEach(subcat => {
      products.forEach(prod => {
        paths.push({ params: { slug: cat.slug.current, productos: subcat.slug.current, product: prod.slug?.current || '' } })
      })
    })
  })

  return { paths, fallback: false }
}

export const getStaticProps = async ({ params: { product } }) => {
  const query = `*[_type == "product" && slug.current == '${product}'][0]`
  const productsQuery = `*[_type == "product"]`

  const currentProduct = await client.fetch(query)
  const products = await client.fetch(productsQuery)

  return {
    props: { currentProduct, products, product },
    revalidate: 10,
  }
}

export default ProductDetails
