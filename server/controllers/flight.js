const Amadeus = require('amadeus');
const { response } = require('express');
const flights=require('../db/tempFlight.json')




const searchFlight= async (req,res)=>{
   const amadeus = new Amadeus({
    clientId:'25wwlbcrcfCHJ6iiKu7l9mXHJ9k1Ad64',
    clientSecret:'hDaRKJRmsmNsD0LA',
   });
    console.log(req.body);
    res.status(200).json(flights.flights);
    // res.status(200).json(flights);
    // amadeus.shopping.flightOffersSearch.get({
    //         originLocationCode: 'DEL',
    //         destinationLocationCode: 'BOM',
    //         departureDate: '2024-07-01',
    //         adults: '1',
    //         currencyCode:'INR',
    //         max: 10
    //       }).then(response => {
    //         console.log(response.result)
    //         res.status(200).json(response.result);
    //       }).catch(error => {
    //         console.error(error);
    //         res.status(500).send(error.message);
    //       });

}

module.exports = {
    searchFlight,
};