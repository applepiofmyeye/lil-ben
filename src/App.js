import { createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider } from 'react-router-dom';
import './App.css';
import Cart from './Cart/Cart';
import {CartProvider} from './contexts/CartContext';
import Home, { homeLoader } from './Home/Home';
import Item, { itemLoader } from './Item/Item';
import ItemRootLayout from './ItemRootLayout/ItemRootLayout';
import RootLayout from './RootLayout/RootLayout';
import Success from './Success/Success';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path = "/" element={<RootLayout/>}>
      <Route 
      index 
      element={<Home/>}
      loader={homeLoader}
      /> 
      <Route path="item" element={<ItemRootLayout/>}>
        <Route 
        path=':id' 
        element={<Item/>}
        loader={itemLoader}/>
      </Route>
      <Route 
      path="cart" 
      element={<Cart/>}
      loader={homeLoader}/>
      <Route
      path="success"
      element={<Success/>}/>
    </Route>
  )
)


function App() {

  return (
    <CartProvider value={[]}>
          <RouterProvider router={router}/>
    </CartProvider>
  );
}

export default App;
