import React from 'react'
import BtnRender from './BtnRender'

function ProductList({product}) { 
  return (
    <div className='product_card'>
      <div className='product_img'>
        <img src={product.images} alt='Product' />
      </div>
        <div className='product_box' >
          <h2 title={product.title} >{product.title}</h2>
          <span>Rs. {product.price}</span>
          <p>{product.description}</p>
        </div>
      <BtnRender product={product} />
    </div>
  )
}

export default ProductList