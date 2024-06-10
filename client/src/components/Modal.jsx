// Modal.js
import React from "react";
import "./Modal.css";
import portsair from "../assets/airports";
import axios from "axios";

function getAirportDataByIATACode(iataCode) {
    return portsair.find((airport) => airport.code === iataCode);
}

const Modal = ({ show, onClose, children, flightOffer, flight, SERVER_URL }) => {
    if (!show) {
        return null;
    }

    // Destructuring flight object
    const { itineraries } = flightOffer.flightOffers[0];
    const { segments } = itineraries[0];
    const { departure, arrival, numberOfStops } = segments[0];

    // Getting departure airport data
    const depIata = departure.iataCode;
    const depAir = getAirportDataByIATACode(depIata);
    const depAirport = depAir.name + " - " + depAir.city + " " + depIata;

    //Getting arrival airport data
    const arrIata = arrival.iataCode;
    const arrAir = getAirportDataByIATACode(arrIata);
    const arrAirport = arrAir.name + " - " + arrAir.city + " " + arrIata;

    const handleContinuePay = async(e) => {
        e.preventDefault();

        const formData = {
            flightOffers: [flightOffer.flightOffers[0]],
            travellers: [
                {
                    id: "1",
                    dateOfBirth: e.target.form.dob.value,
                    name: {
                      firstName: e.target.form.firstName.value,
                      lastName: e.target.form.secondName.value,
                  },
                    gender: e.target.form.gender.value,
                    contact: {
                        emailAddress: e.target.form.email.value,
                        phones: [
                            {
                                deviceType: "MOBILE",
                                countryCallingCode: "91",
                                number: e.target.form.phoneNumber.value,
                            },
                        ],
                    },
                },
            ],
        };
        const response = await axios.post(SERVER_URL + "/booking", formData);
        if(response.status==201){
            toast.success('Ticket booked');
        }
        else{
            toast.erro('Server facing Issue');
        }

    };

    return (
        <div className="modal" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h4 className="modal-title">Flight Details</h4>
                    <button onClick={onClose} className="close-button">
                        &times;
                    </button>
                </div>
                <div className="modal-body">
                    {/* Main Information */}
                    <div className="main-info">
                        <p>
                            <strong>Flight Number:</strong> {segments[0].number}
                        </p>
                        <p>
                            <strong>Departure Airport:</strong> {depAirport}
                        </p>
                        <p>
                            <strong>Arrival Airport:</strong> {arrAirport}
                        </p>
                        <p>
                            <strong>Departure Time:</strong> {departure.at}
                        </p>
                        <p>
                            <strong>Arrival Time:</strong> {arrival.at}
                        </p>
                        <p>
                            <strong>Number of Stops:</strong> {numberOfStops}
                        </p>
                    </div>
                    {/* Additional Information */}
                    <div className="additional-info">
                        <p>
                            <strong>Base Price:</strong> {flightOffer.flightOffers[0].price.base} {flightOffer.flightOffers[0].price.currency}
                        </p>
                        <p>
                            <strong>Total price:</strong> {flightOffer.flightOffers[0].price.total} {flightOffer.flightOffers[0].price.currency}
                        </p>
                        <p>
                            <strong>Available Seats:</strong> {flight.numberOfBookableSeats}
                        </p>
                        {/* passenger details */}
                        <p>passenger details</p>
                        <form className="h-[auto] w-96 border-2 mb-4">
                            <div>
                                <input type="text" placeholder="First Name" name="firstName" />
                                <input type="text" placeholder="Second Name" name="secondName" />
                            </div>
                            <div className="flex">
                                <input type="date" name="dob" style={{ textTransform: "uppercase" }} />
                                <select id="class" name="gender">
                                    <option value="MALE">MALE</option>
                                    <option value="FEMLAE">FEMALE</option>
                                    <option value="OTHER">Other</option>
                                </select>
                            </div>
                            <div>
                                <label>Email Address:</label>
                                <input type="email" name="email" required />
                            </div>
                            <div>
                                <label>Phone Number:</label>
                                <input type="text" name="phoneNumber" required />
                            </div>
                            <button className="book-button mt-6" onClick={handleContinuePay}>
                                Continue
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
