const axios = require('axios');

export const fetchCars = async() => {
    const headers = {
        'X-RapidAPI-Key': '176a0f21b0msha73166ae76c3941p12248ejsnc13e2008f23c',
        'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
    }
    try {
        const response = await axios.request({
        method: 'GET',
        url: 'https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?model=corolla',
        headers: headers
        })
        const result = await response
       
        return result
    } catch (error) {
        console.log(error);
    }
    
}

export const calculateCarRent = (city_mpg, year) => {
    const basePricePerDay = 50; // Base rental price per day in dollars
    const mileageFactor = 0.1; // Additional rate per mile driven
    const ageFactor = 0.05; // Additional rate per year of vehicle age
  
    // Calculate additional rate based on mileage and age
    const mileageRate = city_mpg * mileageFactor;
    const ageRate = (new Date().getFullYear() - year) * ageFactor;
  
    // Calculate total rental rate per day
    const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;
  
    return rentalRatePerDay.toFixed(0);
  };
  