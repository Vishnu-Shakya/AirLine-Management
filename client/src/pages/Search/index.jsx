import React from 'react'
import { useLocation } from 'react-router-dom';

import './dashboard.css';
import Filters from '../../components/Filters';
import FlightCard from '../../components/FlightCard';

function Search({SERVER_URL,token}) {
  const location = useLocation();
  const flights = location.state?.flights || [];
  // console.log(flights);
  console.log(token)
  return (
    <div>
      <div className='h-[200px] border-2'>
        search header
      </div>
      <div className='flex justify-around pt-4 mx-auto'>
        <div className='w-1/5 hidden lg:flex'>
          <Filters></Filters>
        </div>
        <div className='w-[100%] lg:w-[67%]'>
          {flights.data.map((flight, index) => (
            <FlightCard key={index} flight={flight} SERVER_URL={SERVER_URL} dictionaries={flights.dictionaries} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Search