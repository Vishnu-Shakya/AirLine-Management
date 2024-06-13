import React, { useState } from "react";
import "./Modal.css";
import portsair from "../assets/airports";
import axios from "axios";
import { toast } from "react-toastify";
import { format, differenceInMinutes } from "date-fns";
import DummyPayment from './DummyPayment'; // Import DummyPayment component

function getAirportDataByIATACode(iataCode) {
  return portsair.find((airport) => airport.code === iataCode);
}

const Modal = ({ show, onClose, flightOffer, flight, SERVER_URL }) => {
  if (!show) {
    return null;
  }
  console.log(flightOffer);

  // Destructuring flight object
  const { itineraries } = flightOffer.flightOffers[0];
  const { segments } = itineraries[0];
  const { includedCheckedBags } = flightOffer.flightOffers[0].travelerPricings[0].fareDetailsBySegment[0];

  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [showPayment, setShowPayment] = useState(false); // New state for showing payment form

  const baggage = () => {
    return includedCheckedBags.quantity;
  }

  const handlePassengerChange = (e, type) => {
    const value = parseInt(e.target.value);
    if (type === "adults") setAdults(value);
    if (type === "children") setChildren(value);
  };

  const handleContinuePay = async (e) => {
    e.preventDefault();
    const form = e.target.form;

    if (adults > flight.numberOfBookableSeats) {
      toast.error("Number of adults exceeds available seats");
      return;
    }

    const travellers = Array.from({ length: adults + children }, (_, i) => ({
      id: (i + 1).toString(),
      dateOfBirth: form[`dob-${i}`].value,
      name: {
        firstName: form[`firstName-${i}`].value,
        lastName: form[`secondName-${i}`].value,
      },
      gender: form[`gender-${i}`].value,
      contact: {
        emailAddress: form[`email-${i}`].value,
        phones: [
          {
            deviceType: "MOBILE",
            countryCallingCode: "91",
            number: form[`phoneNumber-${i}`].value,
          },
        ],
      },
    }));

    const formData = {
      flightOffers: [flightOffer.flightOffers[0]],
      travellers,
    };

    try {
      const response = await axios.post(SERVER_URL + "/booking", formData);
      if (response.status === 201) {
        toast.success("Ticket booked");
        setShowPayment(true); // Show payment form upon successful booking
      } else {
        toast.error("Server facing issue");
      }
    } catch (error) {
      toast.error("An error occurred while booking the ticket");
    }
  };

  const basePrice = parseFloat(flightOffer.flightOffers[0].price.base);
  const totalPrice = parseFloat(flightOffer.flightOffers[0].price.total);

  const totalFare =
    adults * basePrice +
    children * basePrice * 0.1 +
    (totalPrice - basePrice) * (adults + children);

  const calculateLayoverTime = (arrTime, depTime) => {
    const arrivalTime = new Date(arrTime);
    const departureTime = new Date(depTime);
    const diff = differenceInMinutes(departureTime, arrivalTime);
    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;
    return `${hours}h ${minutes}m`;
  };

  // Function to calculate total time taken in minutes for the entire journey
  const calculateTotalTimeTaken = () => {
    let totalTimeInMinutes = 0;

    const arrivalTime = new Date(segments[segments.length - 1].arrival.at);
    const departureTime = new Date(segments[0].departure.at);
    totalTimeInMinutes = differenceInMinutes(arrivalTime, departureTime);

    // Convert total time in minutes to hours and minutes
    const hours = Math.floor(totalTimeInMinutes / 60);
    const minutes = totalTimeInMinutes % 60;

    // Return formatted string with hours and minutes
    return `${hours} hours ${minutes} minutes`;
  };

  // Inside your Modal component:
  const totalTimeTaken = calculateTotalTimeTaken();

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h4 className="modal-title">Flight Details</h4>
          <button onClick={onClose} className="modal-close-button">
            &times;
          </button>
        </div>
        <div className="modal-body">
          {/* Overall Route Information */}
          <div className="modal-overall-route">
            <h3>Flight Route:</h3>
            <p>
              {segments.map((segment, index) => {
                const iata = segment.departure.iataCode;
                const airport = getAirportDataByIATACode(iata);
                const iata1 = segment.arrival.iataCode;
                const airport1 = getAirportDataByIATACode(iata1);
                return (
                  <span key={index}>
                    {index > 0 && " -> "}
                    {airport.city} ({iata})
                    {index === segments.length - 1 && ` -> ${airport1.city} (${iata1})`}
                  </span>
                );
              })}
            </p>
            <p>
              <strong>Number of Stops: </strong>
              {segments.length - 1}
            </p>
            <p>
              <strong>Total Time taken: </strong>
              {totalTimeTaken}
            </p>
            <p>
              <strong>Number of baggages allowed: </strong>
              {baggage()}
            </p>
          </div>

          {/* Main Information */}
          <div className="modal-main-info">
            {segments.map((segment, index) => {
              const depIata = segment.departure.iataCode;
              const depAir = getAirportDataByIATACode(depIata);
              const depAirport = `${depAir.name} - ${depAir.city} ${depIata}`;

              const arrIata = segment.arrival.iataCode;
              const arrAir = getAirportDataByIATACode(arrIata);
              const arrAirport = `${arrAir.name} - ${arrAir.city} ${arrIata}`;

              const layoverTime =
                index >= 0
                  ? calculateLayoverTime(
                    segment.departure.at,
                    segment.arrival.at

                  )
                  : null;

              return (
                <div key={index} className="modal-segment-info">
                  <h5>Segment {index + 1}</h5>
                  <p>
                    <strong>Flight Number:</strong> {segment.number}
                  </p>
                  <p>
                    <strong>Departure Airport:</strong> {depAirport}
                  </p>
                  <p>
                    <strong>Arrival Airport:</strong> {arrAirport}
                  </p>
                  <p>
                    <strong>Departure Time:</strong>{" "}
                    {format(new Date(segment.departure.at), "yyyy-MM-dd HH:mm")}
                  </p>
                  <p>
                    <strong>Arrival Time:</strong>{" "}
                    {format(new Date(segment.arrival.at), "yyyy-MM-dd HH:mm")}
                  </p>
                  {/* <p>
                    <strong>Number of Stops:</strong> {segment.numberOfStops}
                  </p> */}
                  {layoverTime && (
                    <p>
                      <strong>Layover Time:</strong> {layoverTime}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
          {/* Additional Information */}
          <div className="modal-additional-info">
            <p>
              <strong>Base Price:</strong>{" "}
              {flightOffer.flightOffers[0].price.base}{" "}
              {flightOffer.flightOffers[0].price.currency}
            </p>
            <p>
              <strong>Total Price:</strong>{" "}
              {flightOffer.flightOffers[0].price.total}{" "}
              {flightOffer.flightOffers[0].price.currency}
            </p>
            <p>
              <strong>Available Seats:</strong> {flight.numberOfBookableSeats}
            </p>
            {/* Passenger details */}
            <h3>Passenger Details</h3>
            <form className="modal-passenger-form">
              <div className="modal-form-group">
                <label>Number of Adults:</label>
                <input
                  type="number"
                  min="1"
                  value={adults}
                  onChange={(e) => handlePassengerChange(e, "adults")}
                />
              </div>
              <div className="modal-form-group">
                <label>Number of Children:</label>
                <input
                  type="number"
                  min="0"
                  value={children}
                  onChange={(e) => handlePassengerChange(e, "children")}
                />
              </div>
              {Array.from({ length: adults + children }).map((_, i) => (
                <div key={i} className="modal-passenger-info">
                  <h4>Passenger {i + 1}</h4>
                  <div className="modal-form-group">
                    <input type="text" placeholder="First Name" name={`firstName-${i}`} />
                    <input type="text" placeholder="Second Name" name={`secondName-${i}`} />
                  </div>
                  <div className="modal-form-group">
                    <input type="date" name={`dob-${i}`} />
                    <select name={`gender-${i}`}>
                      <option value="MALE">MALE</option>
                      <option value="FEMALE">FEMALE</option>
                      <option value="OTHER">OTHER</option>
                    </select>
                  </div>
                  <div className="modal-form-group">
                    <label>Email Address:</label>
                    <input type="email" name={`email-${i}`} required />
                  </div>
                  <div className="modal-form-group">
                    <label>Phone Number:</label>
                    <input type="text" name={`phoneNumber-${i}`} required />
                  </div>
                </div>
              ))}
              <p>
                <strong>Total Fare:</strong> {totalFare.toFixed(2)}{" "}
                {flightOffer.flightOffers[0].price.currency}
              </p>
              <button className="modal-book-button" onClick={handleContinuePay}>
                Continue To Pay
              </button>
            </form>
          </div>
          {/* Dummy Payment Form */}
          {showPayment && (
            <div className="modal-payment">
              <h3>Payment</h3>
              <DummyPayment totalFare={totalFare} onPaymentSuccess={() => {
                setShowPayment(false);
                toast.success('Payment successful!');
              }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
