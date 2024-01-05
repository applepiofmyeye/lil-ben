import { Link, Outlet } from "react-router-dom";
import './RootLayout.css'

export default function RootLayout() {
  return (
    <>
        <div className="header">
          <div className="logo-container">
            <Link to="/">
              <img className="logo" src="/lil-ben-univ-logo.png" alt="lil ben universe logo"/>
            </Link>
          </div>
          <div className="cart-icon-container">
            <Link to="/cart">
              <img className="cart-icon" src="/cart-icon.png" alt="cart icon"/>
            </Link>

          </div>
          
          
        </div> 
        <div className="padding"></div>
        <Outlet/>
    </>

  )
}
