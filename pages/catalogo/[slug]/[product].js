import React, { useState } from 'react'
import { client, urlFor } from '../../../lib/client'
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AIiOutlineStar, AiOutlineStar } from 'react-icons/ai'
import { Product } from '../../../components'
import { useStateContext } from '../../../context/StateContext'

const ProductDetails = ({ currentProduct, products }) => {
  const { image, name, details, price, units } = currentProduct
  const [index, setIndex] = useState(0);
  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext()
  const handleBuyNow = () => {
    onAdd(currentProduct, qty, onAdd)
    setShowCart(true)
  }
  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img src={urlFor(image && image[index])} className="product-detail-image" />
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
          </div>
        </div>

        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>
              (20)
            </p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">{price}€ {units && <span> / {units} uds.</span>}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}><AiOutlineMinus /></span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}><AiOutlinePlus /></span>
            </p>
          </div>
          <div className="buttons">
            <button type="button" className="add-to-cart" onClick={() => onAdd(currentProduct, qty)}>Add to Cart</button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>Buy Now</button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export const getStaticPaths = async () => {
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

  const paths = []
    category.forEach(cat => {
      products.forEach(prod => {
        paths.push({params: { slug: cat.slug.current, product: prod.slug.current }})
      })
    })

    return { paths, fallback: 'blocking' }
}

export const getStaticProps = async ({ params: { product } }) => {
  const query = `*[_type == "product" && slug.current == '${product}'][0]`
  const productsQuery = `*[_type == "product"]`

  const currentProduct = await client.fetch(query)
  const products = await client.fetch(productsQuery)

  return { props: { currentProduct, products } }
}

export default ProductDetails
