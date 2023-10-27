"use client";

import Image from 'next/image'
import Hero from '../components/Hero.jsx'
import SearchBar from '@/components/SearchBar.jsx'
import CustomFilter from '@/components/CustomFilter.jsx'
import { fetchCars } from '@/utils/index.js'
import CarCard from '@/components/CarCard.jsx'
import { fuels, yearsOfProduction } from '@/constants/index.js'
import ShowMore from '@/components/ShowMore.jsx'
import { useState, useEffect } from 'react'

export default function Home() {
  const [allCars, setAllCars] = useState([])
  const [isloading, setIsLoading] = useState(false)
  const [manufacturer, setManufacturer] = useState("")
  const [model, setModel] = useState("")
  const [limit, setLimit] = useState(10)
  const [year, setYear] = useState(2022)
  const [fuel, setFuel] = useState("")

  const getCars = async () => {
    setIsLoading(true)
    try {
      const result = await fetchCars({
        manufacturer: manufacturer || "",
        year: year || 2022,
        fuel: fuel || "",
        limit: limit || 10,
        model: model || "",
      });
      console.log(result);
      setAllCars(result)
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false)
    }
    
    
  }

  useEffect(() => {
      getCars()
  }, [manufacturer, model, limit, year, fuel])
 
  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars

  return (
    <main className="overflow-hidden">
      <Hero/>

      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className='text-4xl font-extrabold'>Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>
        <div className='home__filters'>
          <SearchBar setManufacturer={setManufacturer} setModel={setModel}/>
          <div className='home__filter-container'>
            <CustomFilter title="fuel" options={fuels} setFilter={setFuel}/>
            <CustomFilter title="year" options={yearsOfProduction} setFilter={setYear}/>
          </div>
        </div>
        {allCars.length > 0 ? 
          (
          <section>
              <div className='home__cars-wrapper'>
                {allCars?.map((car, index)=>(<CarCard key={index} car={car}/>))}
              </div>
              {isloading && (
                <div>
                  <Image 
                    src="/loading.svg"
                    alt='loader'
                    width={50}
                    height={50}
                    className='object-contain'
                  />
                </div>
              )}
              <ShowMore
                pageNumber={limit / 10}
                isNext={limit > allCars.length}
                setLimit={setLimit}
              />
          </section>
          ) :
          (
            <div className="home__error-container">
              <h2 className="text-black text-xl font-bold">Ooops, no results</h2>
              <p>{allCars.message}</p>
            </div>
          )
        }
      </div>
    </main>
  )
}
