// src/FlightSearch.js
import React from 'react';
import './FlightSearch.css';

const FlightSearch = () => {
  return (
    <div className="flight-search-container">
      <div className="form-container">
        <h1>SkyTrip</h1>
        <form>
          <div className="radio-buttons">
            <label>
              <input type="radio" name="trip-type" value="one-way" /> One-way
            </label>
            <label>
              <input type="radio" name="trip-type" value="round-trip" /> Round-trip
            </label>
          </div>
          <div className="input-field">
            <label htmlFor="from">From:</label>
            <input type="text" id="from" placeholder="DEL" />
          </div>
          <div className="input-field">
            <label htmlFor="to">To:</label>
            <input type="text" id="to" placeholder="GHY" />
          </div>
          <div className="input-field">
            <label htmlFor="departure">Departure:</label>
            <input type="date" id="departure" />
          </div>
          <div className="input-field">
            <label htmlFor="return">Return:</label>
            <input type="date" id="return" />
          </div>
          <div className="input-field">
            <label htmlFor="class">Class:</label>
            <select id="class">
              <option value="economy">Economy</option>
              <option value="business">Business</option>
              <option value="first">First</option>
            </select>
          </div>
          <button type="submit">Search</button>
        </form>
      </div>
    </div>
  );
};

export default FlightSearch;
