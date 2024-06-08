import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./home.css";
import axios from "axios";
import airportdata from "../../assets/airports.js";
console.log(airportdata[0]);

const Home = ({ SERVER_URL, auth }) => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [value2, setValue2] = useState("");
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchVisible2, setSearchVisible2] = useState(false);
  const [searchVisible3, setSearchVisible3] = useState(false);
  const [searchVisible4, setSearchVisible4] = useState(false);
  const handlefocus = () => {
    setSearchVisible(true);
    setSearchVisible2(true);
    
    
  };
  

  const handlenofocus = () => {
    
    setSearchVisible(false);
     
  };

  const handlenofocus2 = () => {
    
    setSearchVisible2(false);
     
  };

 

  const handlefocus3 = () => {
    setSearchVisible3(true);
    setSearchVisible4(true);
    
  };
  

  const handlenofocus3 = () => {
        
        setSearchVisible3(false);
        setSearchVisible4(false);
    
  };

  const changeVal = (e) => {
    setValue(e.target.value);
    setSearchVisible(true);
  };

  const changeVal2 = (e) => {
    setValue2(e.target.value);
    setSearchVisible3(true);
  };

  console.log(searchVisible + " " +searchVisible2);
  const navigate = useNavigate();
  const searchFlights = async (e) => {
    e.preventDefault();
    const formData = {
      tripType: e.target.form.tripType.value,
      from: e.target.form.from.value,
      to: e.target.form.to.value,
      departure: e.target.form.departure.value,
      return: e.target.form.return.value,
      class: e.target.form.class.value,
    };
    console.log(formData);
    setLoading(true);
    console.log(SERVER_URL + "/search-flights");
    const response = await axios.post(SERVER_URL + "/search-flights", formData);
    console.log(response);
    if (response.status == 200) {
      setLoading(false);
      navigate("/search", { state: { flights: response.data } });
    }
  };

  return (
    <div className="App">
      <header className="header">
        <h1>SkyTrip</h1>

        <div className="login-button my-auto text-center">
          {auth ? (
            <Link to="/profile">Profile </Link>
          ) : (
            <Link to="/login">Login </Link>
          )}
        </div>
      </header>
      <div className="flight-search-container">
        <div className="form-container">
          <form>
            <div className="radio-buttons">
              <label>
                <input type="radio" name="tripType" value="one-way" /> One-way
              </label>
              <label>
                <input type="radio" name="tripType" value="round-trip" />{" "}
                Round-trip
              </label>
            </div>
            <div className="input-field"  onFocus={handlefocus} onBlur={handlenofocus}>
              <label htmlFor="from">From:</label>
              <input
                type="text"
                id="from"
                placeholder="JFK"
                value={value}
                onChange={changeVal}
                name="from"
              />
            
              </div>
                <div className="search-options"  onFocus={handlefocus}  onBlur={handlenofocus2}
                 style = {{visibility:(searchVisible2)?"visible":"hidden"}}>
                  {airportdata
                    .filter((e) => {
                      const gin = value.toLowerCase();
                      const toki =
                        e.code.toLowerCase() +
                        " " +
                        e.name.toLowerCase() +
                        " " +
                        e.city.toLowerCase();
                      const toki2 = 
                      e.code.toLowerCase() +
                      "-" +
                      e.name.toLowerCase() +
                      "-" +
                      e.city.toLowerCase();
                      return (toki.includes(gin)||toki2.includes(gin));
                    })
                    .slice(0, 3)
                    .map((e) => (
                      <li
                        className="s-o-l"
                        key={e.code}
                        onClick={() =>
                          {setValue(e.code + "-" + e.name + "-" + e.city);
                          setSearchVisible(false)
                          setSearchVisible2(false);}
                        }
                        
                        
                      >
                        {e.code + "-" + e.name + "-" + e.city}
                      </li>
                    ))}
                </div>
              
            
            <div className="input-field" onFocus={handlefocus3} >
              <label htmlFor="to">To:</label>
              <input
                type="text"
                id="to"
                placeholder="LAX"
                onFocus={handlefocus3}
                value={value2}
                onChange={changeVal2}
                name="to"
              />
            
            
              <div className="search-options"
              style = {{visibility:(searchVisible3||searchVisible4)?"visible":"hidden"}}>
                {airportdata
                  .filter((e) => {
                    const gin = value2.toLowerCase();
                    const toki =
                      e.code.toLowerCase() +
                      " " +
                      e.name.toLowerCase() +
                      " " +
                      e.city.toLowerCase();
                    const toki2 = 
                    e.code.toLowerCase() +
                    "-" +
                    e.name.toLowerCase() +
                    "-" +
                    e.city.toLowerCase();
                    return (toki.includes(gin)||toki2.includes(gin));
                  })
                  .slice(0, 5)
                  .map((e) => (
                    <li
                      className="s-o-l"
                      key={e.code}
                      onClick={() =>
                        {setValue2(e.code + "-" + e.name + "-" + e.city);
                          handlenofocus3();}
                      }
                    >
                      {e.code + "-" + e.name + "-" + e.city}
                    </li>
                  ))}
              </div>
              </div>
            <div className="input-field">
              <label htmlFor="departure">Departure:</label>
              <input type="date" id="departure" name="departure" />
            </div>
            <div className="input-field">
              <label htmlFor="return">Return:</label>
              <input type="date" id="return" name="return" />
            </div>
            <div className="input-field">
              <label htmlFor="class">Class:</label>
              <select id="class" name="class">
                <option value="economy">Economy</option>
                <option value="business">Business</option>
                <option value="first">First</option>
              </select>
            </div>
            <button onClick={searchFlights} className="h-8">
              {loading ? "Searching..." : "Search"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
