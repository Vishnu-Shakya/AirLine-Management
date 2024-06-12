import React, { useState,useEffect } from "react";

const Filters = ({ a, setA, real }) => {
  
  const [selectedfilters,setfilters]  = useState([]);
  
  
  
  

  

  const handleclickfun = (category) => {
    var colch = document.getElementById(category)
    setfilters((prevFilters) => {
      
      if (prevFilters.includes(category)) {
        if(category[0]!=='x')
          {
            colch.style.color = "black";
        colch.style.backgroundColor = "white";
          }
        
        return prevFilters.filter((filter) => filter !== category);
        
      } else {
        if(category[0]!=='x')
          {
            colch.style.color = "white";
        colch.style.backgroundColor = "#007bff";
          }
        
        return [...prevFilters, category];

      }
    });
  };
    useEffect(() => {let fin = [];
      
        console.log(selectedfilters.length);
      setA(() => {
        if(selectedfilters.length===0)
          {
            return real;
          }
        for(let i =0;i<selectedfilters.length;i++)
        {
          if(selectedfilters[i]==="b6")
            {
              for (let j = 0; j < real.length; j++) {
                let s = real[j].itineraries[0].segments[0].departure.at;
                if (s.slice(11, 13) < "06") {
                  if(!fin.includes(real[j]))
                    {
                      fin.push(real[j]);
                    }
                  
                }
              }
            }else if(selectedfilters[i]==="a6b12"){
              for (let j = 0; j < real.length; j++) {
                let s = real[j].itineraries[0].segments[0].departure.at;
                if (s.slice(11, 13) >= "06" &&s.slice(11,13)<"12") {
                  if(!fin.includes(real[j]))
                    {
                      fin.push(real[j]);
                    }
                  
                }
              }
            }else if(selectedfilters[i]==="a12b18")
              {
                for (let j = 0; j < real.length; j++) {
                  let s = real[j].itineraries[0].segments[0].departure.at;
                  if (s.slice(11, 13) >= "12" &&s.slice(11,13)<"18") {
                    if(!fin.includes(real[j]))
                      {
                        fin.push(real[j]);
                      }
                    
                  }
                }
              }else if(selectedfilters[i]==="a18")
                {
                  for (let j = 0; j < real.length; j++) {
                    let s = real[j].itineraries[0].segments[0].departure.at;
                    if (s.slice(11, 13) >= "18" &&s.slice(11,13)<"24") {
                      if(!fin.includes(real[j]))
                        {
                          fin.push(real[j]);
                        }
                      
                    }
                  }
                }else if(selectedfilters[i]=="ab6")
                  {
                    for (let j = 0; j < real.length; j++) {
                      let s = real[j].itineraries[0].segments[real[j].itineraries[0].segments.length-1].arrival.at;
                      if (s.slice(11,13)<"6") {
                        if(!fin.includes(real[j]))
                          {
                            fin.push(real[j]);
                          }
                        
                      }
                    }
                  }else if(selectedfilters[i]==="aa6b12")
                    {
                      for (let j = 0; j < real.length; j++) {
                        let s = real[j].itineraries[0].segments[real[j].itineraries[0].segments.length-1].arrival.at;
                        if (s.slice(11,13)<"12"&&s.slice(11,13)>="06") {
                          if(!fin.includes(real[j]))
                            {
                              fin.push(real[j]);
                            }
                          
                        }
                      }
                    }else if(selectedfilters[i]==="aa12b18")
                      {
                        for (let j = 0; j < real.length; j++) {
                          let s = real[j].itineraries[0].segments[real[j].itineraries[0].segments.length-1].arrival.at;
                          if (s.slice(11,13)<"18"&&s.slice(11,13)>="12") {
                            if(!fin.includes(real[j]))
                              {
                                fin.push(real[j]);
                              }
                            
                          }
                        }
                      }else if(selectedfilters[i]==="aa18")
                        {
                          for (let j = 0; j < real.length; j++) {
                            let s = real[j].itineraries[0].segments[real[j].itineraries[0].segments.length-1].arrival.at;
                            if (s.slice(11,13)<"24"&&s.slice(11,13)>="18") {
                              if(!fin.includes(real[j]))
                                {
                                  fin.push(real[j]);
                                }
                              
                            }
                          }
                        }else if(selectedfilters[i]==="xb6")
                          {
                            for (let j = 0; j < real.length; j++) {
                              let s = real[j].itineraries[0].segments[0].departure.at;
                              if (s.slice(11, 13) < "06") {
                                if(!fin.includes(real[j]))
                                  {
                                    fin.push(real[j]);
                                  }
                                
                              }
                            }
                          }else if(selectedfilters[i]==="xa18")
                            {
                              for (let j = 0; j < real.length; j++) {
                                let s = real[j].itineraries[0].segments[0].departure.at;
                                if (s.slice(11, 13) >= "18" &&s.slice(11,13)<"24") {
                                  if(!fin.includes(real[j]))
                                    {
                                      fin.push(real[j]);
                                    }
                                  
                                }
                              }
                            }
                            else if(selectedfilters[i]==="xns")
                              {
                                for (let j = 0; j < real.length; j++) {
                                  let s = real[j].itineraries[0].segments;
                                  if (s.length===1) {
                                    if(!fin.includes(real[j]))
                                      {
                                        fin.push(real[j]);
                                      }
                                    
                                  }
                                }
                              }
                              
                              else if(selectedfilters[i]==="x1s")
                                {
                                  for (let j = 0; j < real.length; j++) {
                                    let s = real[j].itineraries[0].segments;
                                    if (s.length===2) {
                                      if(!fin.includes(real[j]))
                                        {
                                          fin.push(real[j]);
                                        }
                                      
                                    }
                                  }
                                }
          
        }
  
        return fin;
        });},[selectedfilters])
    
 
  

  console.log(selectedfilters);
  return (
    <div className="w-[98%] p-4 border-r border-gray-300 mx-auto bg-[#fff] ">
      <h2 className="font-bold">Popular Filters</h2>
      
      <div className="flex items-center mt-2">
        <input type="checkbox" id="morningDepartures" name = "time" value = "option1" onClick={() => handleclickfun("xb6")}
        />
        <label htmlFor="morningDepartures" className="ml-2"  >
          Morning Departures 
        </label>
      </div>
      <div className="flex items-center mt-2">
        <input type="checkbox" id="lateDepartures" name = "time" value="option2" onClick={() => handleclickfun("xa18")}
         />
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
        <input type="checkbox" id="nonStop" onClick={()=>handleclickfun("xns")}/>
        <label htmlFor="nonStop" className="ml-2">
          Non Stop
        </label>
      </div>
      <div className="flex items-center mt-2">
        <input type="checkbox" id="oneStop" onClick={()=>handleclickfun("x1s")}/>
        <label htmlFor="oneStop" className="ml-2">
          1 Stop
        </label>
      </div>

      <h2 className="font-bold mt-4">Departure From New Delhi</h2>
      <div className="grid grid-cols-2 gap-2 mt-2">
        <div
          className="flex flex-col items-center p-2 border border-gray-300 rounded" id = "b6"
          onClick={() => (handleclickfun("b6"))}
        >
          <span>Before 6 AM</span>
        </div>
        <div
          className="flex flex-col items-center p-2 border border-gray-300 rounded" id = "a6b12"
          onClick={() => (handleclickfun("a6b12"))}
        >
          <span>6 AM - 12 PM</span>
        </div>
        <div
          className="flex flex-col items-center p-2 border border-gray-300 rounded" id = "a12b18"
          onClick={() => (handleclickfun("a12b18"))}
        >
          <span>12 PM - 6 PM</span>
        </div>
        <div
          className="flex flex-col items-center p-2 border border-gray-300 rounded" id = "a18"
          onClick={() => (handleclickfun("a18"))}
        >
          <span>After 6 PM</span>
        </div>
      </div>

      <h2 className="font-bold mt-4">Arrival at Mumbai</h2>
      <div className="grid grid-cols-2 gap-2 mt-2">
        <div
          className="flex flex-col items-center p-2 border border-gray-300 rounded" id = "aa6"
          onClick={() => (handleclickfun("aa6"))}
        >
          <span>Before 6 AM</span>
        </div>
        <div
          className="flex flex-col items-center p-2 border border-gray-300 rounded" id = "aa6b12"
          onClick={() => (handleclickfun("aa6b12"))}
        >
          <span>6 AM - 12 PM</span>
        </div>
        <div
          className="flex flex-col items-center p-2 border border-gray-300 rounded" id = "aa12b18"
          onClick={() => (handleclickfun("aa12b18"))}
        >
          <span>12 PM - 6 PM</span>
        </div>
        <div
          className="flex flex-col items-center p-2 border border-gray-300 rounded" id = "aa18"
          onClick={() => (handleclickfun("aa18"))}
        >
          <span>After 6 PM</span>
        </div>
      </div>

      
    </div>
  );
};

export default Filters;
