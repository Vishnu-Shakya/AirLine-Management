import React, { useState } from 'react';
import './DummyPayment.css';

const DummyPayment = () => {
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate a payment processing delay
    setTimeout(() => {
      setMessage('Payment Successful! Transaction ID: DUMMY12345');
    }, 1000);
  };

  return (
    <div className="payment-container">
      <h2>Dummy Payment Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name on Card:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Card Number:</label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Expiry Date:</label>
          <input
            type="text"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            required
          />
        </div>
        <div>
          <label>CVV:</label>
          <input
            type="text"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            required
          />
        </div>
        <button type="submit">Pay Now</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DummyPayment;
