import React from 'react';
import './FlightCard.css';

const FlightCard = ({flight,dictionaries}) => {
  // console.log(flight.itineraries[0].segments[0].aircraft.code)
  const { segments, duration } = flight.itineraries[0];
  const { aircraft,departure,arrival,numberOfStops } = segments[0];
  const { code } = aircraft;
  const aircraftName = dictionaries.aircraft[code];
  const aircraftNameParts = aircraftName.split(" ");
  const aircraftType = aircraftNameParts[0];
  const aircraftModel = aircraftNameParts[1];
  console.log(dictionaries.aircraft[flight.itineraries[0].segments[0].aircraft.code]);
  return (
    <div className="flight-card">
      <div className="flight-info">
        <div className="flex justify-center items-center">
          <img src="https://imgak.mmtcdn.com/flights/assets/media/dt/common/icons/6E.png" alt="IndiGo" className="h-12 w-12" />
          <div className='flex flex-col m-2'>
            <p className="text-xl cursor-default text-[#333]">{dictionaries.aircraft[code].split(" ")[0]}</p>
            <div className="text-xs cursor-default text-[#666]">{dictionaries.aircraft[code].split(" ")[1]}</div>
          </div>
        </div>

        <div className="flex justify-center items-center w-3/5">
          <div className="w-60 flex flex-col">
            <span className="departure cursor-default pl-8">{departure.at.split("T")[1].substring(0,5)}</span>
            <span className='pl-8 cursor-default'>{departure.iataCode}</span>
          </div>

          <div className='w-60 flex flex-col'>
            <span className="text-[14px] cursor-default text-[#666] pl-8">{duration}</span>
            <span className="pl-8 cursor-default text-xs text-[#007bff]"> {numberOfStops==0?"Non Stop":(numberOfStops+' Stop')} </span>
          </div>
          
          <div className="w-60 flex flex-col">
            <span className="arrival cursor-default pl-8">{arrival.at.split('T')[1].substring(0,5)}</span>
            <span className='pl-8'>{arrival.iataCode}</span>
          </div>
        </div>

        <div className="price flex flex-col">
          <span className='text-[#333] cursor-default'>{flight.price.base.substring(0,flight.price.base.length-3)} {flight.price.currency}</span>
          <button className="bg-[#007bff] text-[#fff] border-0 border-r-4 px-4 py-2 mt-2 cursor-pointer">VIEW PRICES</button>
        </div>
      </div>

      <div className="discount">
        <span>Get Rs 650 off using MMTSUPER</span>
      </div>
    </div>
  );
};

export default FlightCard;
