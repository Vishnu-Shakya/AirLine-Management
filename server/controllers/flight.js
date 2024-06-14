const Amadeus = require("amadeus");
const { response } = require("express");
const flights = require("../db/tempFlight.json");
const User = require('../models/Users.js');

const amadeus = new Amadeus({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
});

const searchFlight = async (req, res) => {

    console.log(req.body);
    amadeus.shopping.flightOffersSearch
        .get({
            originLocationCode: req.body.from.split("-")[0],
            destinationLocationCode: req.body.to.split("-")[0],
            departureDate: req.body.departure,
            adults: "1",
            currencyCode: "INR",
            max: 10,
        })
        .then((response) => {
            console.log(response);
            res.status(200).json(response.result);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send(error.message);
        });
};
const flightPricing = async (req, res) => {
    amadeus.shopping.flightOffers.pricing
        .post(
            JSON.stringify({
                data: {
                    type: "flight-offers-pricing",
                    flightOffers: [req.body],
                },
            })
        )
        .then((pricingResponse) => {
            res.status(200).json(pricingResponse)
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send(error.message);
        });
};
const flightBooking = async (req, res) => {
    console.log(req.body);
    amadeus.booking.flightOrders.post(
        JSON.stringify({
            data: {
                type: 'flight-order',
                flightOffers: [req.body.flightOffers[0]],
                travelers: req.body.travellers
            }
        })
    ).then(async (response) => {
        console.log(response.data);

        try {
            // Find the user by id and update the bookedTicket array
            const updatedUser = await User.findByIdAndUpdate(
                req.body.userId,
                {
                    $push: {
                        bookedTicket: {
                            flightId: response.data.id,
                            departureDate: response.data.flightOffers[0].itineraries[0].segments[0].departure.at.split('T')[0],
                            passengers: req.body.travellers.length
                        }
                    }
                },
                { new: true } // Return the updated document
            );

            if (updatedUser) {
                console.log("Booked ticket added successfully:", updatedUser);
                 res.status(201).json(response);
            } else {
                console.log("User not found");
            }
        } catch (error) {
            console.error("Error adding booked ticket:", error);
        }
       
    })
        .catch((error) => {
            console.log(error);
            res.status(500).json(error);
        })
};
const ticketInfo = async (req, res) => {
    const bookedTickets = req.body;
    console.log(bookedTickets);

    try {
        const resultPromises = bookedTickets.map(ticket =>
            amadeus.booking.flightOrder(ticket.flightId).get()
                .then(response => response.data)
                .catch(error => {
                    console.error('Error fetching booking details:', error);
                    throw new Error(error.message);
                })
        );

        const results = await Promise.all(resultPromises);

        res.status(200).json(results);

    } catch (error) {
        console.error('Error:', error);
        res.status(500).send(error.message);
    }
};
const ticketCancel = async (req, res) => {
    const bookedTickets = req.body;
    console.log(req.body);
    amadeus.booking.flightOrder("eJzTd9f38nCM8PAFAAs%2BAmY%3D").delete()
        .then((response) => {
            console.log(response);
            res.status(200).json(response);
        })
        .catch(error => {
            console.error('Error fetching booking details:', error);
            throw new Error(error.message);
        })

    // try {
    //     const resultPromises = bookedTickets.map(ticket =>
    //         amadeus.booking.flightOrder(ticket.flightId).get()
    //             .then(response => response.data)
    //             .catch(error => {
    //                 console.error('Error fetching booking details:', error);
    //                 throw new Error(error.message);
    //             })
    //     );

    //     const results = await Promise.all(resultPromises);

    //     res.status(200).json(results);

    // } catch (error) {
    //     console.error('Error:', error);
    //     res.status(500).send(error.message);
    // }
};



module.exports = {
    searchFlight,
    flightPricing,
    flightBooking,
    ticketInfo,
    ticketCancel
};
