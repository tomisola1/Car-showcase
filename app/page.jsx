import Image from 'next/image'
import Hero from '../components/Hero.jsx'
import SearchBar from '@/components/SearchBar.jsx'
import CustomFilter from '@/components/CustomFilter.jsx'
import { fetchCars } from '@/utils/index.js'
import CarCard from '@/components/CarCard.jsx'

export default async function Home() {
  const allCars = await fetchCars()
  const result = allCars.data
 
  const isDataEmpty = !Array.isArray(result) || result.length < 1 || !result

  return (
    <main className="overflow-hidden">
      <Hero/>

      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className='text-4xl font-extrabold'>Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>
        <div className='home__filters'>
          <SearchBar/>
          <div className='home__filter-container'>
            <CustomFilter title="fuel"/>
            <CustomFilter title="year"/>
          </div>
        </div>
        {!isDataEmpty ? 
          (
          <section>
              <div className='home__cars-wrapper'>
                {result.map((car, index)=>(<CarCard key={index} car={car}/>))}
              </div>
          </section>
          ) :
          (
            <div className="home__error-container">
              <h2 className="text-black text-xl font-bold">Ooops, no results</h2>
              <p>{allCars?.message}</p>
            </div>
          )
        }
      </div>
    </main>
  )
}
