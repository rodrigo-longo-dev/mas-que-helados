import React from 'react'
import Link from 'next/link'

import { urlFor } from '../lib/client'

const FooterBanner = ({ footerBanner: { discount, largeText1, desc, largeText2, saleTime, smallText, midText, product, buttonText, image, footerBackgroundColor, footerPrimaryColor } }) => {
  return (
    <div style={{ backgroundColor: footerBackgroundColor }} className="footer-banner-container">
      <div className="banner-desc">
        <div className="left">
          <p>{discount}</p>
          <h3 style={{ color: footerPrimaryColor }}>{midText}</h3>
          <h3>{largeText1}</h3>
          <p>{saleTime}</p>
        </div>
        <div className="right">
          <p>{smallText}</p>
          <h3>{largeText2}</h3>
          <p>{desc}</p>
          <Link href={`/blog`}>
            <button style={{ backgroundColor: footerPrimaryColor, color: footerBackgroundColor }} type="text">{buttonText}</button>
          </Link>
        </div>
        <img src={urlFor(image)} alt={product} className="footer-banner-image" />
      </div>

    </div>
  )
}

export default FooterBanner
