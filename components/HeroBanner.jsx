import React from 'react'
const HeroBanner = () => {
  const url =  "https://firebasestorage.googleapis.com/v0/b/masquehelados-next.appspot.com/o/Archivos%20de%20la%20web%2Ffotos%2FtarrinasBanner.jpg?alt=media&token=0fa3958c-99ab-498d-8558-821cf4734729"
  return (
    <div className="hero-banner-container">
      <div className="hero-banner-text">
        <div>
          <h1>SERGEL</h1>
          <h1>GELATI</h1>
        </div>
        <div>
          <h3>"La mejor materia prima para tus helados"</h3>
        </div>
      </div>
      <img src={url} alt="SERGEL" className="hero-banner-image" />
    </div>
  )
}

export default HeroBanner
