import React from 'react'
import Link from 'next/link'

import { urlFor } from '../lib/client'

const Category = ({ category: { image, name, slug } }) => {
  return (
    <div key={slug}>
      <Link href={`/subcategories/${slug.current}`}>
        <div className="product-card">
          <img src={urlFor(image)} width={250} height={250} className="product-image" />
          <p className="product-name">{name}</p>
        </div>
      </Link>
    </div>
  )
}

export default Category
