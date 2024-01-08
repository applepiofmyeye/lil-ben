import { Link } from "react-router-dom"
import "./ItemCard.css"

export default function ItemCard({ item }) {
  return (
    <Link key={item.id} to={`/item/${item.id}`} className="link">
            <div className="item-card" key={item.id}>
              <img src={item.src} alt="item" />
              <h3>{item.name}</h3>
              <p>{"$" + item.priceInCents / 100.00  }</p>
            </div>
          </Link>
  )
}
