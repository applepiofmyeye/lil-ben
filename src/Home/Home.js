import './Home.css'
import { store_items } from '../data/items'
import ItemCard from '../ItemCard/ItemCard'

const store_items_arr = Array.from(store_items)

export default function Home() {
  return (
    <>
        <div className="text">
            <h1>welcome to lil ben's universe!</h1>
            <p>fancy seeing you here today~ what can i get for you?</p>
        </div>

        <div className='item-grid'>
        {store_items_arr.map((item) => (
          <ItemCard item ={item} key={item[0]}/>
        ))}
            

        </div>

    </>
    

    
  )
}
