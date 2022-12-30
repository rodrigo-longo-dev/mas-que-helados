import React from 'react'
import Link from 'next/link'

import { urlFor } from '../lib/client'

const Category = ({ category: { image, name, slug } }) => {
  return (
    <>
      <Link key={slug} href={`/subcategories/${slug.current}`}>
        <div className="product-card">
          <img src={urlFor(image)} width={280} height={280} className="product-image" />
          <p className="product-name">{name}</p>
        </div>
      </Link>
    </>
  )
}

export default Category
