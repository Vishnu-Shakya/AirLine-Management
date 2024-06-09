import React ,{useState} from 'react';
import axios from 'axios';
import airlines from '../assets/airlines'

import './FlightCard.css';
import Modal from '../components/Modal';

const FlightCard = ({ flight, dictionaries, SERVER_URL }) => {
  // console.log(flight.itineraries[0].segments[0].aircraft.code)
  const { segments, duration, } = flight.itineraries[0];
  const { departure, arrival, numberOfStops } = segments[0];
  const aircraftCode  = flight.validatingAirlineCodes[0];
  const aircraftName = airlines[aircraftCode].name.split(" ")[0]+" "+airlines[aircraftCode].name.split(" ")[1];
  // console.log(dictionaries.aircraft[flight.itineraries[0].segments[0].aircraft.code]);
  console.log(airlines['AI'].name)

  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  const handleViewPrice = async (e) => {
    e.preventDefault();
    console.log(flight);
    
    const response = await axios.post(SERVER_URL + '/pricing', flight);
    console.log(response);
    openModal();

  }
  const handleBookTicket = (e) => {
    e.preventDefault();

  }
  return (
    <div className="flight-card">
      <div className="flight-info">
        <div className="flex justify-center items-center">
          <img src={airlines[aircraftCode].logo} alt="IndiGo" className="h-12 w-12" />
          <div className='flex flex-col ml-2'>
            <p className="text-[.9rem] cursor-default text-[#333]">{aircraftName}</p>
            {/* <div className="text-xs cursor-default text-[#666]">ppp</div> */}
          </div>
        </div>

        <div className="flex justify-center items-center w-3/5">
          <div className="w-60 flex flex-col">
            <span className="text-[1rem] departure cursor-default pl-8">{departure.at.split("T")[1].substring(0, 5)}</span>
            <span className='text-[.9rem] pl-8 cursor-default'>{departure.iataCode}</span>
          </div>

          <div className='w-60 flex flex-col'>
            <span className="text-[14px] cursor-default text-[#666] pl-8">{duration}</span>
            <span className=" pl-8 cursor-default text-xs text-[#007bff]"> {numberOfStops == 0 ? "Non Stop" : (numberOfStops + ' Stop')} </span>
          </div>

          <div className="w-60 flex flex-col">
            <span className=" text-[1rem] arrival cursor-default pl-8">{arrival.at.split('T')[1].substring(0, 5)}</span>
            <span className='text-[.9rem] pl-8'>{arrival.iataCode}</span>
          </div>
        </div>

        <div className="price flex flex-col">
          <span className='text-[#333] cursor-default'>{flight.price.base.substring(0, flight.price.base.length - 3)} {flight.price.currency}</span>
          <button className="bg-[#007bff] text-[.9rem]  text-[#fff] border-0 border-r-4 px-4 py-2 mt-2 cursor-pointer" onClick={handleViewPrice}>VIEW PRICES</button>
          <Modal show={showModal} onClose={closeModal} flight={flight} SERVER_URL={SERVER_URL}>
            <p>This is the modal content!</p>
          </Modal>
        </div>
      </div>

      <div className="discount">
        <span>Get Rs 325 off using SKYTRIP offer</span>
      </div>

    </div>
  );
};

export default FlightCard;
