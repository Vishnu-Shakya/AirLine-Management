// Check.js
import React, { useState } from 'react';
import Modal from '../../components/Modal';
import './check.css';

function Check() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div >
      <h1>React Modal Example</h1>
      <button onClick={openModal} className="button">Open Modal</button>
      <Modal show={showModal} onClose={closeModal}>
        <p>This is the modal content!</p>
      </Modal>
    </div>
  );
}

export default Check;
