import { useLocation } from "react-router-dom";

import "./dashboard.css";
import Filters from "../../components/Filters";
import FlightCard from "../../components/FlightCard";
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import "./dashboard.css";
import axios from "axios";
import airportdata from "../../assets/airports.js";
console.log(airportdata[0]);


function Search({ SERVER_URL, token }) {
  const navigate = useNavigate();
  const [departureDate, setDepartureDate] = useState(null);
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
  // const location = useLocation();
  // const flights = location.state?.flights || [];
  // const [loading, setLoading] = useState(false);
  // const [value, setValue] = useState("");
  // const [value2, setValue2] = useState("");
  // const [searchVisible, setSearchVisible] = useState(false);
  // const [searchVisible2, setSearchVisible2] = useState(false);
  const [flightdata,setflightdata] = useState(flights.data);
  // const [departure,setdeparture] = useState("");
  // const inputRef1 = useRef(null);
  // const inputRef2 = useRef(null);
  // // const suggestionRef1 = useRef(null);
  // // const suggestionRef2 = useRef(null);
  const today = new Date().toISOString().split("T")[0];
  const handleDepartureDateChange = (e) => {
    setDepartureDate(e.target.value);
    const returnDateInput = document.getElementById("searchReturn");
    console.log(returnDateInput);
    if (returnDateInput) {
        console.log(returnDateInput.value);
        returnDateInput.value = e.target.value;
    }
};
  const changeflightdata = ((flight)=>
  {
    setflightdata(flight);
  })
console.log(flightdata)
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
        x.addEventListener(
            "mouseenter",
            function (event) {
                event.target.style.background = "rgb(2, 60, 148)";
                event.target.style.color = "white";
            },
            false
        );
        x.addEventListener(
            "mouseleave",
            function (event) {
                event.target.style.background = "white";
                event.target.style.color = "#007bff";
            },
            false
        );
        y.addEventListener(
            "mouseenter",
            function (event) {
                event.target.style.background = "rgb(2, 60, 148)";
                event.target.style.color = "white";
            },
            false
        );
        y.addEventListener(
            "mouseleave",
            function (event) {
                event.target.style.background = "#007bff";
                event.target.style.color = "white";
            },
            false
        );
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
        x.addEventListener(
            "mouseenter",
            function (event) {
                event.target.style.background = "rgb(2, 60, 148)";
                event.target.style.color = "white";
            },
            false
        );
        x.addEventListener(
            "mouseleave",
            function (event) {
                event.target.style.background = "white";
                event.target.style.color = "#007bff";
            },
            false
        );
        y.addEventListener(
            "mouseenter",
            function (event) {
                event.target.style.background = "rgb(2, 60, 148)";
                event.target.style.color = "white";
            },
            false
        );
        y.addEventListener(
            "mouseleave",
            function (event) {
                event.target.style.background = "#007bff";
                event.target.style.color = "white";
            },
            false
        );
        document.getElementById("oneway").style.color = "#007bff";
        document.getElementById("oneway").style.border = "1px #007bff solid";

        document.getElementById("roundtrip").style.background = "#007bff";

        document.getElementById("roundtrip").style.color = "white";
    };

    const sshow = async (e) => {
        e.preventDefault();
        var x = document.getElementById("oneway");
        var y = document.getElementById("roundtrip");
        document.getElementById("oneway").style.background = "white";
        x.addEventListener(
            "mouseenter",
            function (event) {
                event.target.style.background = "rgb(2, 60, 148)";
                event.target.style.color = "white";
            },
            false
        );
        x.addEventListener(
            "mouseleave",
            function (event) {
                event.target.style.background = "white";
                event.target.style.color = "#007bff";
            },
            false
        );
        y.addEventListener(
            "mouseenter",
            function (event) {
                event.target.style.background = "rgb(2, 60, 148)";
                event.target.style.color = "white";
            },
            false
        );
        y.addEventListener(
            "mouseleave",
            function (event) {
                event.target.style.background = "white";
                event.target.style.color = "#007bff";
            },
            false
        );
        document.getElementById("oneway").style.color = "#007bff";
        document.getElementById("oneway").style.border = "1px #007bff solid";

        document.getElementById("roundtrip").style.background = "white";

        document.getElementById("roundtrip").style.color = "#007bff";
        document.getElementById("roundtrip").style.border = "1px #007bff solid";

        // e.preventDefault(); // Prevent default form submission
    
    // Update state to manage UI changes
    // setSearchVisible(false);
    // setSearchVisible2(false);
        // const e = document.getElementById("searchform");
        
    // Construct formData object from form inputs and state values
    const formData = {
    //     // tripType: e.target.form.sTripType.value, // Assuming you have an input with name="tripType"
        from: value, // Value from useState for "from"
        to: value2, // Value from useState for "to"
        departure: departureDate, // Assuming you have an input with name="departure"
    //     return: e.children[1].children[3].children[1].value, // Assuming you have an input with name="return"
    //     class: e.target.form.class.value, // Assuming you have a select with name="class"
    };

      

      // validation

      if ((formData.from.length > 0) & (formData.to.length > 0) & (formData.departure.length > 0)) {

          var validation=true;
          // from validation 


          // to validation 


          // else

          console.log(`${SERVER_URL} + "/search-flights"\n`,`formData:`,formData);
          const response = await axios.post(SERVER_URL + "/search-flights", formData);
          console.log(response);
          if (response.status === 200) {
              setLoading(false);
              navigate("/search", { state: { flights: response.data } });
              setflightdata(()=>flights.data)
          }else{
            console.log("error")
          }
      } else {
          toast.error("please input airport");
      }
    };

  
  return (
    <div className="searchpage">
      <div className="border-2 " >
        <form className="search-form search-active" id = "searchform">
          <div className="search-buttons ">
            <div id="oneway" name = "sTripType" value = "one-way" onClick={owshow}>
              <span>One-way </span>
            </div>
            <div id="roundtrip" name = "sTripType" value = "rount-trip"onClick={rtshow}>
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
                            <input type="text" id="search-to" placeholder="LAX" value={value2} onFocus={handleFocus2} onChange={changeVal2} name="to" />
                            {searchVisible2 && (
                                <ul className="search-search-options" ref={suggestionRef2}>
                                    {airportdata
                                        .filter((e) => {
                                            const gin = value2.toLowerCase();
                                            const toki = e.code.toLowerCase() + " " + e.name.toLowerCase() + " " + e.city.toLowerCase();
                                            const toki2 = e.code.toLowerCase() + "-" + e.name.toLowerCase() + "-" + e.city.toLowerCase();
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
              <input type="date" id="departure" name="departure" min={today} defaultValue={today} value = {departureDate} onChange={handleDepartureDateChange} />
            </div>
            <div className="search-input-field">
              <label htmlFor="search-return">Return:</label>
              <input type="date" id="return" name="return" min={departureDate ? departureDate : today} defaultValue={departureDate} />
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
          <Filters
          a = {flightdata}
          setA = {changeflightdata}
          real={flights.data}></Filters>
        </div>
        <div className="w-[100%] lg:w-[67%]">
          {flightdata.map((flight, index) => (
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
