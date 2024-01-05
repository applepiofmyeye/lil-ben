import { Link } from "react-router-dom"
import "./ItemCard.css"

export default function ItemCard({ item }) {
  return (
    <Link key={item[0]} to={`/item/${item[0]}`} className="link">
            <div className="item-card" key={item[0]}>
              <img src={item[1].src} alt="item picture" />
              <h3>{item[1].name}</h3>
              <p>{"$" + item[1].priceInCents / 100.00  }</p>
            </div>
          </Link>
  )
}
