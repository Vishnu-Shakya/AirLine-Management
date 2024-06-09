import React from 'react';

const Filters = () => {
    return (
        <div className="w-[98%] p-4 border-r border-gray-300 mx-auto bg-[#fff] ">
            <h2 className="font-bold">Popular Filters</h2>
            <div className="flex items-center mt-2">
                <input type="checkbox" id="popularNonStop" />
                <label htmlFor="popularNonStop" className="ml-2">Non Stop</label>
            </div>

            <div className="flex items-center mt-2">
                <input type="checkbox" id="popularIndiGo" />
                <label htmlFor="popularIndiGo" className="ml-2">IndiGo</label>
            </div>
            <div className="flex items-center mt-2">
                <input type="checkbox" id="morningDepartures" />
                <label htmlFor="morningDepartures" className="ml-2">Morning Departures</label>

            </div>
            <div className="flex items-center mt-2">
                <input type="checkbox" id="lateDepartures" />
                <label htmlFor="lateDepartures" className="ml-2">Late Departures</label>
            </div>

            <h2 className="font-bold mt-4">One Way Price</h2>
            <div className="flex justify-between mt-2">
                <span>₹9,293</span>
                <span>₹32,400</span>
            </div>
            <input type="range" className="w-full mt-2" />

            <h2 className="font-bold mt-4">Stops From New Delhi</h2>
            <div className="flex items-center mt-2">
                <input type="checkbox" id="nonStop" />
                <label htmlFor="nonStop" className="ml-2">Non Stop</label>
            </div>
            <div className="flex items-center mt-2">
                <input type="checkbox" id="oneStop" />
                <label htmlFor="oneStop" className="ml-2">1 Stop</label>
            </div>

            <h2 className="font-bold mt-4">Departure From New Delhi</h2>
            <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="flex flex-col items-center p-2 border border-gray-300 rounded">
                    <span>Before 6 AM</span>
                </div>
                <div className="flex flex-col items-center p-2 border border-gray-300 rounded">
                    <span>6 AM - 12 PM</span>
                </div>
                <div className="flex flex-col items-center p-2 border border-gray-300 rounded">
                    <span>12 PM - 6 PM</span>
                </div>
                <div className="flex flex-col items-center p-2 border border-gray-300 rounded">
                    <span>After 6 PM</span>
                </div>
            </div>

            <h2 className="font-bold mt-4">Arrival at Mumbai</h2>
            <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="flex flex-col items-center p-2 border border-gray-300 rounded">
                    <span>Before 6 AM</span>
                </div>
                <div className="flex flex-col items-center p-2 border border-gray-300 rounded">
                    <span>6 AM - 12 PM</span>
                </div>
                <div className="flex flex-col items-center p-2 border border-gray-300 rounded">
                    <span>12 PM - 6 PM</span>
                </div>
                <div className="flex flex-col items-center p-2 border border-gray-300 rounded">
                    <span>After 6 PM</span>
                </div>
            </div>

            <h2 className="font-bold mt-4">Airlines</h2>
            <div className="flex items-center mt-2">
                <input type="checkbox" id="airIndia" />
                <label htmlFor="airIndia" className="ml-2">Air India</label>
            </div>
            <div className="flex items-center mt-2">
                <input type="checkbox" id="airIndiaExpress" />
                <label htmlFor="airIndiaExpress" className="ml-2">Air India Express</label>
            </div>
            <div className="flex items-center mt-2">
                <input type="checkbox" id="akasaAir" />
                <label htmlFor="akasaAir" className="ml-2">Akasa Air</label>
            </div>
            <div className="flex items-center mt-2">
                <input type="checkbox" id="indiGo" />
                <label htmlFor="indiGo" className="ml-2">IndiGo</label>
            </div>
            <div className="flex items-center mt-2">
                <input type="checkbox" id="spiceJet" />
                <label htmlFor="spiceJet" className="ml-2">SpiceJet</label>
            </div>
            <div className="flex items-center mt-2">
                <input type="checkbox" id="vistara" />
                <label htmlFor="vistara" className="ml-2">Vistara</label>
            </div>
        </div>
    );
};

export default Filters;
