import { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { useCart } from '../contexts/CartContext'
import './Cart.css'





export default function Cart() {
  const { cartItems } = useCart()
  const bens = useLoaderData()
  const [emptyCartError, setEmptyCartError] = useState(false)

  const stripeCartItems = cartItems.map(item => {
    const stripeItem = {id: parseInt(item.itemId), quantity: item.quantity}
    console.log(stripeItem);
    return stripeItem
  })
  const cartItemsDetails = cartItems.map(item => [bens.find(ben => ben.id === parseInt(item.itemId)), item.quantity])


  const handleClick = (event) => {
    if (cartItems === 0) {
      setEmptyCartError(true)
      
    }
    fetch('http://localhost:3000/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        items: stripeCartItems
      })
  
    }).then((res) => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
  
    }).then((data) => {
      if (data && data.url) {
        console.log(data.url);
        window.location = data.url;
      } else {
        throw new Error('Response data or URL is undefined');
      }
    }).catch(e => {
      console.error(e);
    });
  }




  return (
    <div className='cart-content'>
      <h1>my cart</h1>
      
      {cartItemsDetails.map(
      item => {
        return(
          <Link to={"/item/" + item[0].id} className='cart-to-item-link'>
            <div key={item[0].id} className='item-content'>
              <img src={item[0].src} alt="character based keychain"/>
              <div className='item-info'>
                <h2>{item[0].name}</h2>
                <h3>Quantity: {item[1]}</h3>
              </div>
              
            </div>
          </Link>
        )}
    )}
    <button className='checkout-btn' onClick={handleClick}>checkout</button>
    {emptyCartError && <p>your cart is empty! you may add items into your cart from <a to="/">here</a></p>}
    </div>
  )
}
