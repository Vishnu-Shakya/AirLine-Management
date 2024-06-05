const Amadeus = require('amadeus');
const { response } = require('express');
const flights = require('../db/tempFlight.json')




const searchFlight = async (req, res) => {
  const amadeus = new Amadeus({
    clientId: '25wwlbcrcfCHJ6iiKu7l9mXHJ9k1Ad64',
    clientSecret: 'hDaRKJRmsmNsD0LA',
  });
  console.log(req.body);
  console.log(flights)
  // res.status(200).json(flights.flights);
  amadeus.shopping.flightOffersSearch.get({
    originLocationCode: 'DEL',
    destinationLocationCode: 'BOM',
    departureDate: '2024-07-03',
    adults: '1',
    currencyCode: 'INR',
    max: 10
  }).then(response => {
    console.log(response)
    res.status(200).json(response.result);
  }).catch(error => {
    console.error(error);
    res.status(500).send(error.message);
  });

}
const flightPricing = async (req, res) => {
  const amadeus = new Amadeus({
    clientId: '25wwlbcrcfCHJ6iiKu7l9mXHJ9k1Ad64',
    clientSecret: 'hDaRKJRmsmNsD0LA',
  });
  // console.log(req.body);
  amadeus.booking.flightOrder('eJzTd9cPizQ2d7UEAAsmAj0%3D').get()
    .then(function (response) {
      console.log('Booking Details:', response.data);
    })
    .catch(function (error) {
      console.error('Error fetching booking details:', error);
    });
  amadeus.shopping.flightOffers.pricing.post(
    JSON.stringify({
      "data": {
        "type": "flight-offers-pricing",
        "flightOffers": [
          req.body
        ]
      }
    })
  ).then((pricingResponse) => {
    // console.log(pricingResponse.result.data.flightOffers);
    res.status(200).json(pricingResponse);
  })
}

module.exports = {
  searchFlight,
  flightPricing
};