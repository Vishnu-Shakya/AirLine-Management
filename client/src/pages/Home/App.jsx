// src/App.js
import React from 'react';
import FlightSearch from './FlightSearch';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <header className="header">
        <h1>SkyTrip</h1>
        <button className="login-button">Login</button>
      </header>
      <FlightSearch />
    </div>
  );
};

export default App;
