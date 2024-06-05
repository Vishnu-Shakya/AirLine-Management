// Modal.js
import React from 'react';
import './Modal.css';

const Modal = ({ show, onClose, children,flight,SERVER_URL}) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h4 className="modal-title">Modal Title</h4>
        </div>
        <div className="modal-body">
          {children}
          <p>{flight.price.base}</p>
          <button  className=' bg-blue-500 w-10 '>Book</button>
        </div>
        <div className="modal-footer">
          <button onClick={onClose} className="button">Close</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
