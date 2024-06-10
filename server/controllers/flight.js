const Amadeus = require("amadeus");
const { response } = require("express");
const flights = require("../db/tempFlight.json");
const amadeus = new Amadeus({
    clientId: "26bsRbwMQleZbDNkhSUFtIYZaTcnAB9V",
    clientSecret: "2QhXPz0alULAUn8v",
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
    ).then((response)=>{
        console.log(response);
        res.status(201).json(response);
    })
    .catch((error)=>{
        console.log(error);
        res.status(500).json(error);
    })
};

module.exports = {
    searchFlight,
    flightPricing,
    flightBooking
};
