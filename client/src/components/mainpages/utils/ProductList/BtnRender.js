import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { GlobalState } from '../../../../GlobalState'
import { useState, useContext } from 'react'
import axios from 'axios'
import configURL from '../../../../configURL';

function BtnRender({product}) {

    const state = useContext(GlobalState)
        const [isAdmin] = state.userAPI.isAdmin
        const addCart = state.userAPI.addCart
        const setProducts = state.productsAPI.setProducts
        const products = state.productsAPI.products
        const [token] = state.token

    const addToCart = (prd)=>{
      addCart(prd)
    }

    const deleteProduct = async (prd)=>{
      console.log(products);
      try{
        await axios.delete(`${configURL}/api/products/${prd._id}`,{
          withCredentials:true,
          headers:{Authorization:token}
        })
        window.location.reload(); 
        alert("deleted");


      }catch(err){
        console.error(err);
        
      }
      
    }
  return (
            <div className='raw_btn'>
          {
            isAdmin ? 
            <>
            <button id='btn_delete' onClick={()=> deleteProduct(product)}>Delete</button>
          <Link id='btn_view' to={`edit/${product._id}`} >
          edit
          </Link>
          </>
           :
           <>
          <Link id='btn_buy' to='/cart' onClick={()=> addToCart(product) }>
          
          Buy Now

          </Link>
          <Link id='btn_view' to={`details/${product._id}`} >
          View Now
          </Link>
          </>
          }
        </div>
  )
}

export default BtnRender

