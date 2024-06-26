import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./home.css";
import axios from "axios";
import { toast } from 'react-toastify';
import airportdata from "../../assets/airports.js";
console.log(airportdata[0]);

const Home = ({ SERVER_URL, auth }) => {
    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState("");
    const [value2, setValue2] = useState("");
    const [departureDate, setDepartureDate] = useState(null);
    const [searchVisible, setSearchVisible] = useState(false);
    const [searchVisible2, setSearchVisible2] = useState(false);

    const inputRef1 = useRef(null);
    const inputRef2 = useRef(null);
    const suggestionRef1 = useRef(null);
    const suggestionRef2 = useRef(null);

    const today = new Date().toISOString().split("T")[0];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (inputRef1.current && !inputRef1.current.contains(event.target) && suggestionRef1.current && !suggestionRef1.current.contains(event.target)) {
                setSearchVisible(false);
            }
            if (inputRef2.current && !inputRef2.current.contains(event.target) && suggestionRef2.current && !suggestionRef2.current.contains(event.target)) {
                setSearchVisible2(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleDepartureDateChange = (e) => {
        setDepartureDate(e.target.value);
        const returnDateInput = document.getElementById("return");
        console.log(returnDateInput);
        if (returnDateInput) {
            console.log(returnDateInput.value);
            returnDateInput.value = e.target.value;
        }
    };

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
            }
        } else {
            toast.error("please input airport");
        }
    };

    return (
        <div className="App">
            <header className="header">
                <h1>SkyTrip</h1>
                <div className="login-button my-auto text-center">{auth ? <Link to="/profile">Profile </Link> : <Link to="/login">Login </Link>}</div>
            </header>
            <div className="flight-search-container">
                <div className="form-container">
                    <form>
                        <div className="radio-buttons">
                            <label>
                                <input type="radio" name="tripType" value="one-way" defaultChecked /> One-way
                            </label>
                            <label>
                                <input type="radio" name="tripType" value="round-trip" /> Round-trip
                            </label>
                        </div>
                        <div className="input-field" ref={inputRef1}>
                            <label htmlFor="from">From:</label>
                            <input type="text" id="from" placeholder="JFK" value={value} onFocus={handleFocus1} onChange={changeVal} name="from" />
                            {searchVisible && (
                                <ul className="search-options" ref={suggestionRef1}>
                                    {airportdata
                                        .filter((e) => {
                                            const gin = value.toLowerCase();
                                            const toki = e.code.toLowerCase() + " " + e.name.toLowerCase() + " " + e.city.toLowerCase();
                                            const toki2 = e.code.toLowerCase() + "-" + e.name.toLowerCase() + "-" + e.city.toLowerCase();
                                            return toki.includes(gin) || toki2.includes(gin);
                                        })
                                        .slice(0, 3)
                                        .map((e) => (
                                            <li
                                                className="s-o-l"
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

                        <div className="input-field" ref={inputRef2}>
                            <label htmlFor="to">To:</label>
                            <input type="text" id="to" placeholder="LAX" value={value2} onFocus={handleFocus2} onChange={changeVal2} name="to" />
                            {searchVisible2 && (
                                <ul className="search-options" ref={suggestionRef2}>
                                    {airportdata
                                        .filter((e) => {
                                            const gin = value2.toLowerCase();
                                            const toki = e.code.toLowerCase() + " " + e.name.toLowerCase() + " " + e.city.toLowerCase();
                                            const toki2 = e.code.toLowerCase() + "-" + e.name.toLowerCase() + "-" + e.city.toLowerCase();
                                            return toki.includes(gin) || toki2.includes(gin);
                                        })
                                        .slice(0, 3)
                                        .map((e) => (
                                            <li
                                                className="s-o-l"
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

                        <div className="input-field">
                            <label htmlFor="departure">Departure:</label>
                            <input type="date" id="departure" name="departure" min={today} defaultValue={today} onChange={handleDepartureDateChange} />
                        </div>
                        <div className="input-field">
                            <label htmlFor="return">Return:</label>
                            <input type="date" id="return" name="return" min={departureDate ? departureDate : today} defaultValue={departureDate} style={{ textTransform: "uppercase" }} />
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
