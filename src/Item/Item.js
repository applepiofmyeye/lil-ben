import { useLoaderData, useParams } from 'react-router-dom'
import './Item.css'
import { useState } from 'react'
import { useCart } from '../contexts/CartContext'

export default function Item() {
    const itemId = useParams()
    const item = useLoaderData()
    const { addToCart } = useCart()

    const [qty, setQty] = useState(0)
    const [zeroQtyErr, setZeroQtyError] = useState(false)

    const handlePlus = (event) => {
      setZeroQtyError(false)
      setQty(qty => qty + 1)
    }
    const handleMinus = (event) => {
      if (qty > 0) {
        setQty(qty => qty - 1)
      } 
    }

    const handleAddCart = (event) => {
      if (qty > 0) {
        const quantityToAdd = qty
        addToCart(itemId.id, quantityToAdd)
        console.log(itemId.id, quantityToAdd);
        setQty(0)
      } else {
        setZeroQtyError(true)
      }
    }
  return (
    <div className='item-page'>
    <div className='item-page-card'>
      <img src={"../" + item.src} alt={item.name}/>
      <div className='item-info'>
        <h1>{item.name}</h1>
        <h3>{"S$" + item.priceInCents / 100.00}</h3>
        <p>{item.details}</p>
        <h4>Qty:</h4>
        <div className='qty-select'>
          <button className='minus' onClick={handleMinus}>-</button>
          <p>{qty}</p>
          <button className='plus' onClick={handlePlus}>+</button>
        </div>
        <div className='add-cart-btn-container'>
          <button className='add-cart-btn' onClick={handleAddCart}>
            add to cart
          </button>
          {zeroQtyErr && <p>no lil bens selected (selected: {qty})</p>}
        </div>

      </div>
    </div>
    
    </div>
  )
}

export const itemLoader = async ({ params }) => {
  const { id } = params

  const res = await fetch('http://localhost:4000/bens/' + id)

  return res.json()
}