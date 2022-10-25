import React from 'react'
import Link from 'next/link'

import { client, urlFor } from '../lib/client'
import { useRouter } from 'next/router'

const Product = ({ product: { image, name, slug, price }, urlCategory, marquee }) => {
  const router = useRouter()
  const handleLink = async () => {
    if (marquee) {
      const queryProd = `*[_type == "product" && slug.current == '${slug.current}'][0]`
      const product = await client.fetch(queryProd)
      const querySubcat = `*[_type == "subcategory" && _id == '${product.subcategory._ref}'][0]`
      const subcategory = await client.fetch(querySubcat)
      const queryCat = `*[_type == "category" && _id == '${subcategory.category._ref}'][0]`
      const category = await client.fetch(queryCat)
      router.push(`/subcategories/${category.slug.current}/${subcategory.slug.current}/${product.slug.current}`);
    }
  }
  return (
    <div key={slug}>
      {marquee
        ? (
          <div onClick={handleLink}>
            <div className="product-card">
              {image?.length > 0 && image[0].asset && <img src={urlFor(image[0])} width={250} height={250} className="product-image" />}
              {image?.asset && <img src={urlFor(image)} width={250} height={250} className="product-image" />}
              <p className="product-name">{name}</p>
              {price && <p className="product-price">{price} €</p>}
            </div>
          </div>
        )
        : (
          <Link href={`/subcategories/${urlCategory}/${slug?.current}`}>
            <div className="product-card">
              {image?.length > 0 && image[0].asset && <img src={urlFor(image[0])} width={250} height={250} className="product-image" />}
              {image?.asset && <img src={urlFor(image)} width={250} height={250} className="product-image" />}
              <p className="product-name">{name}</p>
              {price && <p className="product-price">{price} €</p>}
            </div>
          </Link>
        )
      }
    </div>
  )
}

export default Product
