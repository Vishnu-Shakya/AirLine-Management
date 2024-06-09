// Modal.js
import React from 'react';
import './Modal.css';
import portsair from '../assets/airports';

function getAirportDataByIATACode(iataCode) {
  return portsair.find(airport => airport.code === iataCode);
}

const Modal = ({ show, onClose, children, flight, SERVER_URL }) => {
  if (!show) {
    return null;
  }
  console.log(flight);

  // Destructuring flight object
  const { itineraries } = flight;
  const { segments } = itineraries[0];
  const { departure, arrival, numberOfStops } = segments[0];

  // Getting departure airport data
  const depIata = departure.iataCode;
  const depAir = getAirportDataByIATACode(depIata);
  const depAirport = depAir.name + ' - ' + depAir.city + ' ' +depIata;


  //Getting arrival airport data
  const arrIata = arrival.iataCode;
  const arrAir = getAirportDataByIATACode(arrIata);
  const arrAirport = arrAir.name + ' - ' + arrAir.city + ' ' + arrIata;
 

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h4 className="modal-title">Flight Details</h4>
          <button onClick={onClose} className="close-button">&times;</button>
        </div>
        <div className="modal-body">
          {/* Main Information */}
          <div className="main-info">
            <p><strong>Flight Number:</strong> {segments[0].number}</p>
            <p><strong>Departure Airport:</strong> {depAirport}</p>
            <p><strong>Arrival Airport:</strong> {arrAirport}</p>
            <p><strong>Departure Time:</strong> {departure.at}</p>
            <p><strong>Arrival Time:</strong> {arrival.at}</p>
            <p><strong>Number of Stops:</strong> {numberOfStops}</p>
          </div>
          {/* Additional Information */}
          <div className="additional-info">
            <p><strong>Base Price:</strong> {flight.price.base} {flight.price.currency}</p>
            <p><strong>Total price:</strong> {flight.price.total} {flight.price.currency}</p>
            <p><strong>Available Seats:</strong> {flight.numberOfBookableSeats}</p>
            {/* Book Button */}
            <button className='book-button' onClick={handleBooking}>Book</button>
          </div>
        </div>
      </div>
    </div>
  );

  function handleBooking() {
    // Handle booking logic here
    alert("Booking functionality will be implemented soon!");
  }
};

export default Modal;
