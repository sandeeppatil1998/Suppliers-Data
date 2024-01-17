// components/SupplierCard.js

import React from 'react';
import './supplierCard.css'; // Import the CSS file for styling

const SupplierCard = ({ supplier }) => {
  return (
    <div className='card'>
      <div className='card-header'>
        <h2>Category: {supplier.category}</h2>
      </div>
      <div className='card-body'>
        <p>Channel: {supplier.channel}</p>
        <p>Request_description: {supplier.request_description}</p>
        <p>Contact Numbers: {supplier.contact_numbers}</p>
        <p>State: {supplier.state}</p>
        <p>District: {supplier.district}</p>
        <p>Source Time: {supplier.source_time}</p>
      </div>
    </div>
  );
};

export default SupplierCard;
