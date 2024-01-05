import { createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider } from 'react-router-dom';
import './App.css';
import Cart from './Cart/Cart';
import Home from './Home/Home';
import Item from './Item/Item';
import ItemRootLayout from './ItemRootLayout/ItemRootLayout';
import RootLayout from './RootLayout/RootLayout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path = "/" element={<RootLayout/>}>
      <Route index element={<Home/>}/> 
      <Route path="item" element={<ItemRootLayout/>}>
        <Route path=':id' element={<Item/>}/>
      </Route>
      <Route path="cart" element={<Cart/>}/>
    </Route>
  )
)

const handleClick = (event) => {
  fetch('http://localhost:3000/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      items: [
        { id: 1, quantity: 2},
        { id: 2, quantity: 1 }
      ]
    })

  }).then((res) => {
    res.ok ? res.json() : res.json().then(json => Promise.reject(json))

  }).then(({ url }) => {
    console.log(url);
    window.location = url
  }).catch(e => {
    console.error(e.error)
  })
}


function App() {

  return (
    <RouterProvider router={router}/>
  );
}

export default App;
