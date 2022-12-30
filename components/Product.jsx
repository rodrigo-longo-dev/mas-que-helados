import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import { client, urlFor } from '../lib/client'
import { useRouter } from 'next/router'

const Product = ({ product: { image, name, slug, price }, urlCategory, marquee }) => {
  const router = useRouter()
  const [newUrl, setNewUrl] = useState('')
  useEffect(() => {
    const getUrl = router.asPath.split('/')
    setNewUrl(`${getUrl[2]}/${getUrl[3]}`)
  }, [])
  return (
    <div key={slug}>
      {marquee
        ? (
          <Link href={`/subcategories/${newUrl}/${slug?.current}`}>
            <div className="product-card">
              {image?.length > 0 && image[0].asset && <img src={urlFor(image[0])} width={250} height={250} className="product-image" />}
              {image?.asset && <img src={urlFor(image)} width={250} height={250} className="product-image" />}
              <p className="product-name">{name}</p>
              {price && <p className="product-price">{price} €</p>}
            </div>
          </Link>
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
