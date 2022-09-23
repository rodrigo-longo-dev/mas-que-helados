import React from 'react'
import Link from 'next/link'

import { urlFor } from '../lib/client'

const HeroBanner = ({ heroBanner }) => {
  return (
    <div style={{ backgroundColor: heroBanner.headerBackgroundColor}} className="hero-banner-container">
      <div>
        <p className="beats-solo">{heroBanner.smallText}</p>
        <h3  style={{ color: heroBanner.headerPrimaryColor}}>{heroBanner.midText}</h3>
        <h1>{heroBanner.largeText1}</h1>
        <img src={urlFor(heroBanner.image)} alt="headphones" className="hero-banner-image"/>
        <div>
          <Link href={`product/${heroBanner.product}`}>
              <button style={{ backgroundColor: heroBanner.headerPrimaryColor}} type="button">{heroBanner.buttonText}</button>
          </Link>
          <div className="desc">
              <h5>Description</h5>
              <p>{heroBanner.desc}</p>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default HeroBanner
