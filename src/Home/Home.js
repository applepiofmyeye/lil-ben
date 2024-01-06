import './Home.css'
import ItemCard from '../ItemCard/ItemCard'
import { useLoaderData } from 'react-router-dom'



export default function Home() {
  const item = useLoaderData()
  return (
    <>
        <div className="text">
            <h1>welcome to lil ben's universe!</h1>
            <p>fancy seeing you here today~ what can i get for you?</p>
        </div>

        <div className='item-grid'>
        {item.map((item) => (
          <ItemCard item ={item} key={item[0]}/>
        ))}
            

        </div>

    </>
    

    
  )
}

export const homeLoader = async () => {
  const res = await fetch('http://localhost:4000/bens')
  return res.json()
}
