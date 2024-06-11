import { useLocation } from "react-router-dom";

import "./dashboard.css";
import Filters from "../../components/Filters";
import FlightCard from "../../components/FlightCard";
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./dashboard.css";
import axios from "axios";
import airportdata from "../../assets/airports.js";
console.log(airportdata[0]);

function Search({ SERVER_URL, token }) {
  const location = useLocation();
  const flights = location.state?.flights || [];
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [value2, setValue2] = useState("");
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchVisible2, setSearchVisible2] = useState(false);

  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const suggestionRef1 = useRef(null);
  const suggestionRef2 = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        inputRef1.current &&
        !inputRef1.current.contains(event.target) &&
        suggestionRef1.current &&
        !suggestionRef1.current.contains(event.target)
      ) {
        setSearchVisible(false);
      }
      if (
        inputRef2.current &&
        !inputRef2.current.contains(event.target) &&
        suggestionRef2.current &&
        !suggestionRef2.current.contains(event.target)
      ) {
        setSearchVisible2(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleFocus1 = () => {
    setSearchVisible(true);
  };

  const handleFocus2 = () => {
    setSearchVisible2(true);
  };

  const changeVal = (e) => {
    setValue(e.target.value);
    setSearchVisible(true);
  };

  const changeVal2 = (e) => {
    setValue2(e.target.value);
    setSearchVisible2(true);
  };


  
  const owshow = () => {
    var y = document.getElementById("oneway");
    var x = document.getElementById("roundtrip");
    document.getElementById("oneway").style.background = "white";
    x.addEventListener("mouseenter", function( event ) {   
      event.target.style.background = "rgb(2, 60, 148)";
      event.target.style.color = "white";
    }, false);
    x.addEventListener("mouseleave", function( event ) {   
      event.target.style.background = "white";
      event.target.style.color = "#007bff";
      
    }, false);
    y.addEventListener("mouseenter", function( event ) {   
      event.target.style.background = "rgb(2, 60, 148)";
      event.target.style.color = "white";
    }, false);
    y.addEventListener("mouseleave", function( event ) {   
      event.target.style.background = "#007bff";
      event.target.style.color = "white";
      
    }, false);
    document.getElementById("roundtrip").style.background = "white";
    document.getElementById("roundtrip").style.color = "#007bff";
    document.getElementById("roundtrip").style.border = "1px #007bff solid";

    document.getElementById("oneway").style.background = "#007bff";
    document.getElementById("oneway").style.color = "white";

  };

  const rtshow = () => {
    var x = document.getElementById("oneway");
    var y = document.getElementById("roundtrip");
    document.getElementById("oneway").style.background = "white";
    x.addEventListener("mouseenter", function( event ) {   
      event.target.style.background = "rgb(2, 60, 148)";
      event.target.style.color = "white";
    }, false);
    x.addEventListener("mouseleave", function( event ) {   
      event.target.style.background = "white";
      event.target.style.color = "#007bff";
      
    }, false);
    y.addEventListener("mouseenter", function( event ) {   
      event.target.style.background = "rgb(2, 60, 148)";
      event.target.style.color = "white";
    }, false);
    y.addEventListener("mouseleave", function( event ) {   
      event.target.style.background = "#007bff";
      event.target.style.color = "white";
      
    }, false);
    document.getElementById("oneway").style.color = "#007bff";
    document.getElementById("oneway").style.border = "1px #007bff solid";
    
    document.getElementById("roundtrip").style.background = "#007bff";

    document.getElementById("roundtrip").style.color = "white";
  };

  const sshow = () => {
    var x = document.getElementById("oneway");
    var y = document.getElementById("roundtrip");
    document.getElementById("oneway").style.background = "white";
    x.addEventListener("mouseenter", function( event ) {   
      event.target.style.background = "rgb(2, 60, 148)";
      event.target.style.color = "white";
    }, false);
    x.addEventListener("mouseleave", function( event ) {   
      event.target.style.background = "white";
      event.target.style.color = "#007bff";
      
    }, false);
    y.addEventListener("mouseenter", function( event ) {   
      event.target.style.background = "rgb(2, 60, 148)";
      event.target.style.color = "white";
    }, false);
    y.addEventListener("mouseleave", function( event ) {   
      event.target.style.background = "white";
      event.target.style.color = "#007bff";
      
    }, false);
    document.getElementById("oneway").style.color = "#007bff";
    document.getElementById("oneway").style.border = "1px #007bff solid";
    
    document.getElementById("roundtrip").style.background = "white";

    document.getElementById("roundtrip").style.color = "#007bff";
    document.getElementById("roundtrip").style.border = "1px #007bff solid";
  };

  console.log(token);
  return (
    <div className="searchpage">
      <div className="border-2 ">
        <form className="search-form search-active">
          <div className="search-buttons ">
            <div id="oneway" onClick={owshow}>
              <span>One-way </span>
            </div>
            <div id="roundtrip" onClick={rtshow}>
              <span>Round-Trip</span>
            </div>
            <div id="searchbutton" onClick={sshow}>
              <span>Search</span>
            </div>
          </div>
          <div id="searchactive" className="w-[80%] mx-auto">

            <div className="search-input-field searchfirst" ref={inputRef1}>
              <label htmlFor="search-from">From:</label>
              <input
                type="text"
                id="search-from"
                placeholder="JFK"
                value={value}
                onFocus={handleFocus1}
                onChange={changeVal}
                name="from"
              />
              {searchVisible && (
                <ul className="search-search-options" ref={suggestionRef1}>
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
                      return toki.includes(gin) || toki2.includes(gin);
                    })
                    .slice(0, 5)
                    .map((e) => (
                      <li
                        className="search-s-o-l"
                        key={e.code}
                        onClick={() => {
                          setValue(e.code + "-" + e.name + "-" + e.city);
                          setSearchVisible(false);
                        }}
                      >
                        {e.code + "-" + e.name + "-" + e.city}
                      </li>
                    ))}
                </ul>
              )}
            </div>

            <div className="search-input-field searchsecond" ref={inputRef2}>
              <label htmlFor="search-to">To:</label>
              <input
                type="text"
                id="search-to"
                placeholder="LAX"
                value={value2}
                onFocus={handleFocus2}
                onChange={changeVal2}
                name="to"
              />
              {searchVisible2 && (
                <ul className="search-search-options" ref={suggestionRef2}>
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
                      return toki.includes(gin) || toki2.includes(gin);
                    })
                    .slice(0, 5)
                    .map((e) => (
                      <li
                        className="search-s-o-l"
                        key={e.code}
                        onClick={() => {
                          setValue2(e.code + "-" + e.name + "-" + e.city);
                          setSearchVisible2(false);
                        }}
                      >
                        {e.code + "-" + e.name + "-" + e.city}
                      </li>
                    ))}
                </ul>
              )}
            </div>

            <div className="search-input-field">
              <label htmlFor="search-departure">Departure:</label>
              <input type="date" id="search-departure" name="departure" />
            </div>
            <div className="search-input-field">
              <label htmlFor="search-return">Return:</label>
              <input type="date" id="search-return" name="return" />
            </div>
            <div className="search-input-field searchbuttonthree">
              <label htmlFor="search-class ">Class:</label>
              <select id="search-class" name="class">
                <option value="economy">Economy</option>
                <option value="business">Business</option>
                <option value="first">First</option>
              </select>
            </div>
          </div>
        </form>
      </div>
      <div className="flex justify-around pt-4 mx-auto">
        <div className="w-1/5 hidden lg:flex">
          <Filters ></Filters>
        </div>
        <div className="w-[100%] lg:w-[67%]">
          {flights.data.map((flight,index) => (
            <FlightCard
              key={index}
              flight={flight}
              SERVER_URL={SERVER_URL}
              dictionaries={flights.dictionaries}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Search;
