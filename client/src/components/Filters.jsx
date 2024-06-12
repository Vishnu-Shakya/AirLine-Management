import React, { useState } from "react";

const Filters = ({ a, setA, real }) => {
  const [arrivaltime, setarrivaltime] = useState(0);
  const [departime, setdepartime] = useState(0);
  const [val1,setval1] = useState(real);
  const [val2,setval2] = useState(real);
  

    const [selectedOption, setSelectedOption] = useState(null);
  
    const handleOptionChange = (value) => {
    setSelectedOption(value === selectedOption ? null : value);
    };
    
  const before6 = () => {
    setA((prevState) => {
      if (prevState.length === real.length || arrivaltime !== 1) {
        let fin = [];
        if (departime === 0) {
          for (let i = 0; i < real.length; i++) {
            let s = real[i].itineraries[0].segments[0].departure.at;
            if (s.slice(11, 13) < "06") {
              fin.push(real[i]);
            }
          }
        }else{
          for (let i = 0; i < val2.length; i++) {
            let s = val2[i].itineraries[0].segments[0].departure.at;
            if (s.slice(11, 13) < "06") {
              fin.push(val2[i]);
            }
          }
        }
        setval1(()=>fin);
        setarrivaltime(() => 1);
        return fin;
      } else {
        setarrivaltime(() => 0);
        setval1(()=>real);
        return real;
      }
    });
  };

  const bw12n18 = () => {
    setA((prevState) => {
      if (prevState.length === real.length || arrivaltime !== 3) {
        let fin = [];
        if(departime===0)
          {
            for (let i = 0; i < real.length; i++) {
              let s = real[i].itineraries[0].segments[0].departure.at;
              if (s.slice(11, 13) < "18" && s.slice(11, 13) >= "12") {
                fin.push(real[i]);
              }
            }
          }else{
            for (let i = 0; i < val2.length; i++) {
              let s = val2[i].itineraries[0].segments[0].departure.at;
              if (s.slice(11, 13) < "18" && s.slice(11, 13) >= "12") {
                fin.push(val2[i]);
              }
            }
          }
          setval1(()=>fin);
        setarrivaltime(() => 3);
        return fin;
      } else {
        setval1(()=>real);
        setarrivaltime(() => 0);
        return real;
      }
    });
  };

  const after18 = () => {
    setA((prevState) => {
      if (prevState.length === real.length || arrivaltime !== 4) {
        let fin = [];
        if(departime===0)
          {
            for (let i = 0; i < real.length; i++) {
              let s = real[i].itineraries[0].segments[0].departure.at;
              if (s.slice(11, 13) < "24" && s.slice(11, 13) >= "18") {
                fin.push(real[i]);
              }
            }
          }else{
            for (let i = 0; i < val2.length; i++) {
              let s = val2[i].itineraries[0].segments[0].departure.at;
              if (s.slice(11, 13) < "24" && s.slice(11, 13) >= "18") {
                fin.push(val2[i]);
              }
            }
          }
        
        setarrivaltime(() => 4);
        setval1(()=>fin);
        return fin;
      } else {
        setval1(()=>real);
        setarrivaltime(() => 0);
        return real;
      }
    });
  };
  const bw6n12 = () => {
    setA((prevState) => {
      if (prevState.length === real.length || arrivaltime != 2) {
        let fin = [];
        if(departime===0)
          {
            for (let i = 0; i < real.length; i++) {
              let s = real[i].itineraries[0].segments[0].departure.at;
              if (s.slice(11, 13) < "12" && s.slice(11, 13) >= "06") {
                fin.push(real[i]);
              }
            }
          }else{
            for (let i = 0; i < val2.length; i++) {
              let s = val2[i].itineraries[0].segments[0].departure.at;
              if (s.slice(11, 13) < "12" && s.slice(11, 13) >= "06") {
                fin.push(val2[i]);
              }
            }
          }
          setval1(()=>fin);
        setarrivaltime(() => 2);
        return fin;
      } else {
        setval1(()=>real);
        setarrivaltime(() => 0);
        return real;
      }
    });
  };

  const abefore6 = () => {
    setA((prevState) => {
      if (prevState.length === real.length || departime !== 1) {
        let fin = [];
        if(arrivaltime===0)
          {
            for (let i = 0; i < real.length; i++) {
              let s =
                real[i].itineraries[0].segments[
                  real[i].itineraries[0].segments.length - 1
                ].arrival.at;
              if (s.slice(11, 13) < "06") {
                fin.push(real[i]);
              }
            }
          }else{
            for (let i = 0; i < val1.length; i++) {
              let s =
                val1[i].itineraries[0].segments[
                  val1[i].itineraries[0].segments.length - 1
                ].arrival.at;
              if (s.slice(11, 13) < "06") {
                fin.push(val1[i]);
              }
            }
          }

          setdepartime(() => 1);
          setval2(()=>fin);
        return fin;
      } else {
        setval2(()=>real);
        setdepartime(()=>0);
        return real;
      }
    });
    
  };

  const abw12n18 = () => {
    setA((prevState) => {
      if (prevState.length === real.length || departime !== 3) {
        let fin = [];
        if(arrivaltime===0)
          {
            for (let i = 0; i < real.length; i++) {
              let s =
                real[i].itineraries[0].segments[
                  real[i].itineraries[0].segments.length - 1
                ].arrival.at;
              if (s.slice(11, 13) < "18" && s.slice(11, 13) >= "12") {
                fin.push(real[i]);
              }
            }
          }else{
            for (let i = 0; i < val1.length; i++) {
              let s =
                val1[i].itineraries[0].segments[
                  val1[i].itineraries[0].segments.length - 1
                ].arrival.at;
              if (s.slice(11, 13) < "18" && s.slice(11, 13) >= "12") {
                fin.push(val1[i]);
              }
            }
          }
          setdepartime(() => 3);
          setval2(()=>fin);
        return fin;
      } else {
        setval2(()=>real);
        setdepartime(() => 0);
        return real;
      }
    });
    
  };

  const aafter18 = () => {
    setA((prevState) => {
      if (prevState.length === real.length || departime !== 4) {
        let fin = [];
        if(arrivaltime===0)
          {
            for (let i = 0; i < real.length; i++) {
              let s =
                real[i].itineraries[0].segments[
                  real[i].itineraries[0].segments.length - 1
                ].arrival.at;
              if (s.slice(11, 13) < "24" && s.slice(11, 13) >= "18") {
                fin.push(real[i]);
              }
            }
          }else{
            for (let i = 0; i < val1.length; i++) {
              let s =
                val1[i].itineraries[0].segments[
                  val1[i].itineraries[0].segments.length - 1
                ].arrival.at;
              if (s.slice(11, 13) < "24" && s.slice(11, 13) >= "18") {
                fin.push(val1[i]);
              }
            }
          }
          setdepartime(() => 4);
          setval2(()=>fin);
        return fin;
      } else {
        setval2(()=>real);
        setdepartime(() => 0);
        return real;
      }
    });
  
  };
  const abw6n12 = () => {
    setA((prevState) => {
      if (prevState.length === real.length || departime != 2) {
        let fin = [];
        if(arrivaltime===0)
          {
            for (let i = 0; i < real.length; i++) {
              let s =
                real[i].itineraries[0].segments[
                  real[i].itineraries[0].segments.length - 1
                ].arrival.at;
              if (s.slice(11, 13) < "12" && s.slice(11, 13) >= "06") {
                fin.push(real[i]);
              }
            }
          }else{
            for (let i = 0; i < val1.length; i++) {
              let s =
                val1[i].itineraries[0].segments[
                  val1[i].itineraries[0].segments.length - 1
                ].arrival.at;
              if (s.slice(11, 13) < "12" && s.slice(11, 13) >= "06") {
                fin.push(val1[i]);
              }
            }
          }
          setdepartime(() => 2);
          setval2(()=>fin);
        return fin;
      } else {
        setval2(()=>real);
        setdepartime(() => 0);
        return real;
      }
    });
    
  };

  return (
    <div className="w-[98%] p-4 border-r border-gray-300 mx-auto bg-[#fff] ">
      <h2 className="font-bold">Popular Filters</h2>
      <div className="flex items-center mt-2">
        <input type="checkbox" id="popularNonStop" />
        <label htmlFor="popularNonStop" className="ml-2">
          Non Stop
        </label>
      </div>

      <div className="flex items-center mt-2">
        <input type="checkbox" id="popularIndiGo" />
        <label htmlFor="popularIndiGo" className="ml-2">
          IndiGo
        </label>
      </div>
      <div className="flex items-center mt-2">
        <input type="checkbox" id="morningDepartures" name = "time" value = "option1" 
        checked={selectedOption === "option1"}
        onChange={() => handleOptionChange("option1")}
        onClick={before6}/>
        <label htmlFor="morningDepartures" className="ml-2" >
          Morning Departures 
        </label>
      </div>
      <div className="flex items-center mt-2">
        <input type="checkbox" id="lateDepartures" name = "time" value="option2" checked={selectedOption === "option2"}
        onChange={() => handleOptionChange("option2")}
        onClick={after18} />
        <label htmlFor="lateDepartures" className="ml-2" >
          Late Departures
        </label>
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
        <label htmlFor="nonStop" className="ml-2">
          Non Stop
        </label>
      </div>
      <div className="flex items-center mt-2">
        <input type="checkbox" id="oneStop" />
        <label htmlFor="oneStop" className="ml-2">
          1 Stop
        </label>
      </div>

      <h2 className="font-bold mt-4">Departure From New Delhi</h2>
      <div className="grid grid-cols-2 gap-2 mt-2">
        <div
          className="flex flex-col items-center p-2 border border-gray-300 rounded"
          onClick={before6}
        >
          <span>Before 6 AM</span>
        </div>
        <div
          className="flex flex-col items-center p-2 border border-gray-300 rounded"
          onClick={bw6n12}
        >
          <span>6 AM - 12 PM</span>
        </div>
        <div
          className="flex flex-col items-center p-2 border border-gray-300 rounded"
          onClick={bw12n18}
        >
          <span>12 PM - 6 PM</span>
        </div>
        <div
          className="flex flex-col items-center p-2 border border-gray-300 rounded"
          onClick={after18}
        >
          <span>After 6 PM</span>
        </div>
      </div>

      <h2 className="font-bold mt-4">Arrival at Mumbai</h2>
      <div className="grid grid-cols-2 gap-2 mt-2">
        <div
          className="flex flex-col items-center p-2 border border-gray-300 rounded"
          onClick={abefore6}
        >
          <span>Before 6 AM</span>
        </div>
        <div
          className="flex flex-col items-center p-2 border border-gray-300 rounded"
          onClick={abw6n12}
        >
          <span>6 AM - 12 PM</span>
        </div>
        <div
          className="flex flex-col items-center p-2 border border-gray-300 rounded"
          onClick={abw12n18}
        >
          <span>12 PM - 6 PM</span>
        </div>
        <div
          className="flex flex-col items-center p-2 border border-gray-300 rounded"
          onClick={aafter18}
        >
          <span>After 6 PM</span>
        </div>
      </div>

      <h2 className="font-bold mt-4">Airlines</h2>
      <div className="flex items-center mt-2">
        <input type="checkbox" id="airIndia" />
        <label htmlFor="airIndia" className="ml-2">
          Air India
        </label>
      </div>
      <div className="flex items-center mt-2">
        <input type="checkbox" id="airIndiaExpress" />
        <label htmlFor="airIndiaExpress" className="ml-2">
          Air India Express
        </label>
      </div>
      <div className="flex items-center mt-2">
        <input type="checkbox" id="akasaAir" />
        <label htmlFor="akasaAir" className="ml-2">
          Akasa Air
        </label>
      </div>
      <div className="flex items-center mt-2">
        <input type="checkbox" id="indiGo" />
        <label htmlFor="indiGo" className="ml-2">
          IndiGo
        </label>
      </div>
      <div className="flex items-center mt-2">
        <input type="checkbox" id="spiceJet" />
        <label htmlFor="spiceJet" className="ml-2">
          SpiceJet
        </label>
      </div>
      <div className="flex items-center mt-2">
        <input type="checkbox" id="vistara" />
        <label htmlFor="vistara" className="ml-2">
          Vistara
        </label>
      </div>
    </div>
  );
};

export default Filters;
