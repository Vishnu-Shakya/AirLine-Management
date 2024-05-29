import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import './home.css';
import axios from 'axios';


const Home = ({SERVER_URL}) => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();
  const searchFlights = async(e) => {
    e.preventDefault();
    const formData = {
      tripType: e.target.form.tripType.value,
      from: e.target.form.from.value,
      to: e.target.form.to.value,
      departure: e.target.form.departure.value,
      return: e.target.form.return.value,
      class: e.target.form.class.value
    };
    console.log(formData);
    setLoading(true);
    console.log(SERVER_URL+'/search-flights')
    const response=await axios.post(SERVER_URL+'/search-flights', formData)
    console.log(response);
    if(response.status==200){
      setLoading(false);
      navigate('/search', { state: { flights: response.data } });
    }
     
  };

  return (
    <div className="App">
      <header className="header">
        <h1>SkyTrip</h1>
        <Link to='/login' className="login-button my-auto text-center">Login</Link>
      </header>
      <div className="flight-search-container">
        <div className="form-container">
          <form >
            <div className="radio-buttons">
              <label>
                <input type="radio" name="tripType" value="one-way" /> One-way
              </label>
              <label>
                <input type="radio" name="tripType" value="round-trip" /> Round-trip
              </label>
            </div>
            <div className="input-field">
              <label htmlFor="from">From:</label>
              <input type="text" id="from" placeholder="NYC" name='from' />
            </div>
            <div className="input-field">
              <label htmlFor="to">To:</label>
              <input type="text" id="to" placeholder="LAX" name='to' />
            </div>
            <div className="input-field">
              <label htmlFor="departure">Departure:</label>
              <input type="date" id="departure" name='departure' />
            </div>
            <div className="input-field">
              <label htmlFor="return">Return:</label>
              <input type="date" id="return" name='return' />
            </div>
            <div className="input-field">
              <label htmlFor="class">Class:</label>
              <select id="class" name='class'>
                <option value="economy">Economy</option>
                <option value="business">Business</option>
                <option value="first">First</option>
              </select>
            </div>
            <button  onClick={searchFlights} className='h-8'>{loading?"Searching...":'Search'}</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
