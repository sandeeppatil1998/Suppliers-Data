// pages/SupplierListPage.js

import React, { useState, useEffect } from 'react';
import SupplierCard from '../components/supplierCard';
import './supplierList.css';

const SupplierListPage = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [lastPage, setLastPage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const BASE_URL = 'https://staging.iamdave.ai';
      const API_KEY = '0349234-38472-1209-2837-3432434';

      try {
        setLoader(true); // Set loader to true when starting to fetch data

        const response = await fetch(`${BASE_URL}/list/supply?_page_number=${currentPage}`, {
          headers: {
            'Content-Type': 'application/json',
            'X-I2CE-ENTERPRISE-ID': 'dave_vs_covid',
            'X-I2CE-USER-ID': 'ananth+covid@i2ce.in',
            'X-I2CE-API-KEY': API_KEY,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }


         const { data, is_last } = await response.json();
         // setLastPage(is_last);
         if(is_last === true){
             // setLastPage(true);
             alert('No data Found')
            }
            else{
            setSuppliers(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error.message);
      } finally {
        setLoader(false); // Set loader to false after data is fetched (or even if there's an error)
      }
    };

    fetchData();
  }, [currentPage]);

  const page1 = () => {
    setCurrentPage(currentPage-1);
  };

  const page2 = () => {
    setCurrentPage(currentPage+1);
  };

  return (
    <div>
      <h1>Supplier List</h1>
      <div>
        <button onClick={page1}>Previous</button>
        <button onClick={page2}>Next</button>
      </div>
      {loader && <p>Loading...</p>}
      {loader || (
        <div className="supplier-list">
          {suppliers.map((supplier) => (
            <SupplierCard key={supplier.source_id} supplier={supplier} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SupplierListPage;
