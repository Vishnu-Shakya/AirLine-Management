import React from 'react'
import { useLocation } from 'react-router-dom';

import './dashboard.css';
import Filters from '../../components/Filters';
import FlightCard from '../../components/FlightCard';

function Search() {
  const location = useLocation();
  const flights = location.state?.flights || [];
  console.log(flights);
  return (
    <div>
      <div className='h-[200px] border-2'>
        search header
      </div>
      <div className='flex justify-center pt-4'>
        <div className='w-1/5 hidden lg:flex'>
          <Filters></Filters>
        </div>
        <div>
          {flights.data.map((flight, index) => (
            <FlightCard key={index} flight={flight} dictionaries={flights.dictionaries} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Search