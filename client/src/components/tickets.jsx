// Ticket.jsx
import React, { useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import "./tickets.css"; // Import your CSS file for styling

const Ticket = ({ ticket }) => {
    const { status, ticket: ticketInfo } = ticket;
    const { associatedRecords, flightOffers, travelers } = ticketInfo;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPassengerIndex, setSelectedPassengerIndex] = useState(0);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const handlePassengerSelect = (index) => {
        setSelectedPassengerIndex(index);
    };

    const handlePrintTicket = () => {
        const doc = new jsPDF();
        let yOffset = 10;
        
        // Add title
        doc.text("Ticket Details", 10, yOffset);
        yOffset += 10;
        
        // Add horizontal line below title
        doc.line(10, yOffset, 200, yOffset);
        yOffset += 5;
        
        // Add status
        doc.text(`Status: ${status}`, 10, yOffset);
        yOffset += 10;
        
        // Add horizontal line below status
        doc.line(10, yOffset, 200, yOffset);
        yOffset += 5;
        
        // Add associated records if they exist
        if (associatedRecords) {
            associatedRecords.forEach((record) => {
                doc.text(`Reference: ${record.reference}`, 10, yOffset);
                yOffset += 10;
                doc.text(`Creation Date: ${new Date(record.creationDate).toLocaleString()}`, 10, yOffset);
                yOffset += 10;
                
                // Add horizontal line below each record
                doc.line(10, yOffset, 200, yOffset);
                yOffset += 5;
            });
        }
        
        // Add flight offers
        flightOffers.forEach((offer) => {
            doc.text(`Flight Offer ID: ${offer.id}`, 10, yOffset);
            yOffset += 10;
            
            offer.itineraries.forEach((itinerary) => {
                itinerary.segments.forEach((segment) => {
                    doc.text(`Carrier Code: ${segment.carrierCode}`, 10, yOffset);
                    yOffset += 10;
                    doc.text(`Flight Number: ${segment.number}`, 10, yOffset);
                    yOffset += 10;
                    doc.text(`Departure: ${segment.departure.iataCode} at ${new Date(segment.departure.at).toLocaleTimeString()}`, 10, yOffset);
                    yOffset += 10;
                    doc.text(`Arrival: ${segment.arrival.iataCode} at ${new Date(segment.arrival.at).toLocaleTimeString()}`, 10, yOffset);
                    yOffset += 10;
                    doc.text(`Aircraft: ${segment.aircraft.code}`, 10, yOffset);
                    yOffset += 10;
                    doc.text(`Duration: ${segment.duration}`, 10, yOffset);
                    yOffset += 10;
                    doc.text(`Number of Stops: ${segment.numberOfStops}`, 10, yOffset);
                    yOffset += 10;
                    
                    // Add horizontal line below each segment
                    doc.line(10, yOffset, 200, yOffset);
                    yOffset += 5;
                });
            });
        });
        
        // Add a gap above Passenger Details
        yOffset += 10;
        
        // Add Passenger Details section with a horizontal line above it
        doc.line(10, yOffset, 200, yOffset);
        yOffset += 5;
        doc.text(`Passenger Details`, 10, yOffset);
        yOffset += 10;
        
        // Add passenger information
        const traveler = travelers[selectedPassengerIndex];
        doc.text(`Passenger Name: ${traveler.name.firstName} ${traveler.name.lastName}`, 10, yOffset);
        yOffset += 10;
        doc.text(`Gender: ${traveler.gender}`, 10, yOffset);
        yOffset += 10;
        doc.text(`DOB: ${traveler.dateOfBirth}`, 10, yOffset);
        yOffset += 10;
        doc.text(`Contact Number: ${traveler.contact.phones[0].countryCallingCode}${traveler.contact.phones[0].number}`, 10, yOffset);
        yOffset += 10;
        doc.text(`Email: ${traveler.contact.emailAddress}`, 10, yOffset);
        yOffset += 10;
        
        // Add horizontal line below passenger details
        doc.line(10, yOffset, 200, yOffset);
        yOffset += 5;
        
        // Add a border around the document
        doc.rect(5, 5, 200, yOffset - 5);
        
        // Save the document
        doc.save("ticket.pdf");
    };
    

    const handleCancelTicket = () => {
        alert("Ticket cancellation process initiated.");
        // Add your cancellation logic here
    };

    return (
        <div className="ticket-card">
            {/* Card View */}
            <div className="ticket-card-summary" onClick={openModal}>
                <h4 className="ticket-status">Status: {status}</h4>
                {flightOffers &&
                    flightOffers.map((offer, index) => (
                        <div key={index} className="offer-item">
                            <h5>Flight Offer ID: {offer.id}</h5>
                            {offer.itineraries &&
                                offer.itineraries.map((itinerary, index) => (
                                    <div key={index} className="itinerary">
                                        {itinerary.segments &&
                                            itinerary.segments.map(
                                                (segment, index) => (
                                                    <div key={index} className="segment">
                                                        <p>
                                                            <strong>Departure:</strong> {segment.departure.iataCode} at{" "}
                                                            {new Date(segment.departure.at).toLocaleTimeString()}
                                                        </p>
                                                        <p>
                                                            <strong>Arrival:</strong> {segment.arrival.iataCode} at{" "}
                                                            {new Date(segment.arrival.at).toLocaleTimeString()}
                                                        </p>
                                                    </div>
                                                )
                                            )}
                                    </div>
                                ))}
                        </div>
                    ))}
            </div>

            {/* Modal View */}
            {isModalOpen && (
                <div className="ticket-modal">
                    <div className="modal-content">
                        <span className="close-modal" onClick={toggleModal}>
                            &times;
                        </span>
                        <h4 className="ticket-status">Status: {status}</h4>
                        {associatedRecords &&
                            associatedRecords.map((record, index) => (
                                <div key={index} className="record-item">
                                    <p>
                                        <strong>Reference:</strong> {record.reference}
                                    </p>
                                    <p>
                                        <strong>Creation Date:</strong>{" "}
                                        {new Date(record.creationDate).toLocaleString()}
                                    </p>
                                </div>
                            ))}
                        {flightOffers &&
                            flightOffers.map((offer, index) => (
                                <div key={index} className="offer-item">
                                    <h5>Flight Offer ID: {offer.id}</h5>
                                    {offer.itineraries &&
                                        offer.itineraries.map((itinerary, index) => (
                                            <div key={index} className="itinerary">
                                                {itinerary.segments &&
                                                    itinerary.segments.map((segment, index) => (
                                                        <div key={index} className="segment">
                                                            <p>
                                                                <strong>Carrier Code:</strong> {segment.carrierCode}
                                                            </p>
                                                            <p>
                                                                <strong>Flight Number:</strong> {segment.number}
                                                            </p>
                                                            <p>
                                                                <strong>Departure:</strong> {segment.departure.iataCode} at{" "}
                                                                {new Date(segment.departure.at).toLocaleTimeString()}
                                                            </p>
                                                            <p>
                                                                <strong>Arrival:</strong> {segment.arrival.iataCode} at{" "}
                                                                {new Date(segment.arrival.at).toLocaleTimeString()}
                                                            </p>
                                                            <p>
                                                                <strong>Aircraft:</strong> {segment.aircraft.code}
                                                            </p>
                                                            <p>
                                                                <strong>Duration:</strong> {segment.duration}
                                                            </p>
                                                            <p>
                                                                <strong>Number of Stops:</strong> {segment.numberOfStops}
                                                            </p>
                                                        </div>
                                                    ))}
                                            </div>
                                        ))}
                                </div>
                            ))}
                        {/* Passenger dropdown */}
                        {travelers && (
                            <div className="passenger-dropdown">
                                <label htmlFor="passengerSelect">Select Passenger:</label>
                                <select
                                    id="passengerSelect"
                                    value={selectedPassengerIndex}
                                    onChange={(e) => handlePassengerSelect(parseInt(e.target.value))}
                                >
                                    {travelers.map((traveler, index) => (
                                        <option key={index} value={index}>
                                            Passenger {index + 1}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                        {/* Display selected passenger details */}
                        {travelers && (
                            <div className="passenger-details">
                                <h5>Passenger Details</h5>
                                <p>
                                    <strong>Passenger Name:</strong>{" "}
                                    {`${travelers[selectedPassengerIndex].name.firstName} ${travelers[selectedPassengerIndex].name.lastName}`}
                                </p>
                                <p>
                                    <strong>Gender:</strong> {travelers[selectedPassengerIndex].gender}
                                </p>
                                <p>
                                    <strong>DOB:</strong> {travelers[selectedPassengerIndex].dateOfBirth}
                                </p>
                                <p>
                                    <strong>Contact Number:</strong>{" "}
                                    {`${travelers[selectedPassengerIndex].contact.phones[0].countryCallingCode}${travelers[selectedPassengerIndex].contact.phones[0].number}`}
                                </p>
                                <p>
                                    <strong>Email:</strong> {travelers[selectedPassengerIndex].contact.emailAddress}
                                </p>
                            </div>
                        )}
                        {/* Buttons */}
                        <div className="modal-buttons">
                            <button className="print-button" onClick={handlePrintTicket}>Print Ticket</button>
                            <button className="cancel-button" onClick={handleCancelTicket}>Cancel Ticket</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Ticket;
