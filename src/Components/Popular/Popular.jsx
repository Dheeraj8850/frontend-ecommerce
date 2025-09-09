import React, { useEffect, useState } from 'react'
import './Popular.css'
import Item from '../Item/Item'

export const Popular = () => {

  const [popularProducts,setPopullarProducts] = useState([]);
  useEffect(()=>{
    fetch('https://backend-ecommerce-ix0p.onrender.com/popullarinwomen')
    .then((response)=>response.json())
    .then((data)=>setPopullarProducts(data));
  },[])


  return (
    <div className="popular">
        <h1>POPULAR IN WOMEN</h1>
        <hr />
        <div className="popular-item">
            {popularProducts.map((item,i)=>{
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
            })}
        </div>
    </div>
  )
}

export default Popular
