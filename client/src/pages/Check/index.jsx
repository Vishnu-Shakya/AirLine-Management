import React, { useState } from 'react';
import axios from 'axios' ;

const Check = () => {
  const fetchAirportCodes = async () => {
    try {
      const response = await axios.get('https://test.api.amadeus.com/v1/reference-data/locations', {
        params: {
          subType: 'AIRPORT',
          keyword: '',
          page: {
            size: 200 // Adjust the size according to your needs
          },
          apiKey: '25wwlbcrcfCHJ6iiKu7l9mXHJ9k1Ad64'
        }
      });
  
      
      console.log(response);
      return response;
    } catch (error) {
      console.error('Error fetching airport codes:', error);
      return [];
    }
  };

  const [inputValue, setInputValue] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setInputValue(inputValue);
    const filtered = data.filter(item =>
      item.label.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleItemClick = (item) => {
    setInputValue(item.label);
    setFilteredData([]);
  };

  

  
  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Type to search..."
      />
      <ul>
        {filteredData.map((item, index) => (
          <li key={index} onClick={() => handleItemClick(item)}>
            {item.label}
          </li>
        ))}
      </ul>
      <button onClick={fetchAirportCodes}>get airports</button>
    </div>
  );
};

export default Check