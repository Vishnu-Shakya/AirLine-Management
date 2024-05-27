import React from 'react'
import "./FlightCard.css"
import people from "./flightCard.js";


function getcard(props)
{
  return (
    <div>
      
      <div className="booked-container">
        <div className="booked-flight">
          <div className="booked-flight-name">{props.flight}</div>
          <p>{props.class} | {props.seat}</p>
          </div>
            <div className="booked-top">

                <div className="booked-from booked-top-item">
                  {props.from}
                </div>
                <div className="booked-time booked-top-item">
                  
                  <p>{props.time} hours</p>
                </div>
                <div className="booked-to booked-top-item">
                  {props.to}
                </div>

            </div>
          <div className="booked-bottom">
            <div className="booked-date">Date of Flight - {props.date}</div>
            <div className="booked-price">Price- Rs.  {props.price}</div>
          </div>

        
      </div>
    </div>
  );
}


function FlightCard() {
  return (
    <div>

      {people.map(getcard)}
    </div>
  )
}

export default FlightCard