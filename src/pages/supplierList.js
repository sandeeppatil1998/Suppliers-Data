import React, { useState, useEffect } from 'react';
import SupplierCard from '../components/supplierCard';
import Loader from '../components/loader';
import Footer from '../components/footer';
import './supplierList.css';

const SupplierListPage = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loader, setLoader] = useState(false);
    const [lastPage, setLastPage] = useState(false);

    //set state variables for filters
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedChannel, setSelectedChannel] = useState('');
    const [selectedState, setSelectedState] = useState('');

    // set state variables to store filter options
    const [categories, setCategories] = useState([]);
    const [channels, setChannels] = useState([]);
    const [states, setStates] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const BASE_URL = 'https://staging.iamdave.ai';
            const API_KEY = '0349234-38472-1209-2837-3432434';

            try {
                setLoader(true);

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

                if (is_last === true) {
                    alert('No data Found');
                } else {
                    setSuppliers(data);

                    // extract the unique data of categoryy , channels and states
                    const uniqueCategories = [...new Set(data.map(supplier => supplier.category))];
                    const uniqueChannels = [...new Set(data.map(supplier => supplier.channel))];
                    const uniqueStates = [...new Set(data.map(supplier => supplier.state))];

                    setCategories(uniqueCategories);
                    setChannels(uniqueChannels);
                    setStates(uniqueStates);
                }
            } catch (error) {
                console.error('Error fetching data:', error.message);
            } finally {
                setLoader(false);
            }
        };

        fetchData();
    }, [currentPage]);

    const page1 = () => {
        setCurrentPage(currentPage - 1);
    };

    const page2 = () => {
        setCurrentPage(currentPage + 1);
    };

    //   
    const handleFilter = () => {

        const filteredData = suppliers.filter((supplier) => {
            return (
                (!selectedCategory || supplier.category === selectedCategory) &&
                (!selectedChannel || supplier.channel === selectedChannel) &&
                (!selectedState || supplier.state === selectedState)
            );
        });

        setSuppliers(filteredData);
    };

    return (
        <div className="main-container">
            <div className="content-container">
                <h1 className='heading'>SUPPLIER's DATA</h1>
                <div className='dropDowns'>

                    <select className="select-dropdown" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>

                    <select className="select-dropdown" value={selectedChannel} onChange={(e) => setSelectedChannel(e.target.value)}>
                        <option value="">Select Channel</option>
                        {channels.map((channel) => (
                            <option key={channel} value={channel}>{channel}</option>
                        ))}
                    </select>

                    <select className="select-dropdown" value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
                        <option value="">Select State</option>
                        {states.map((state) => (
                            <option key={state} value={state}>{state}</option>
                        ))}
                    </select>

                    <button className="filter-button" onClick={handleFilter}>Filter</button>

                    <div className='paginationButton'>
                        <button className="navigation-button" onClick={page1} disabled={currentPage === 1}> Previous</button>
                        <div className="page-number">{currentPage}</div>
                        <button className="navigation-button" onClick={page2} disabled={lastPage}>Next</button>
                    </div>
                </div>

                {loader ? (
                    <Loader />
                ) : (
                    <div className="supplier-list">
                        {suppliers.map((supplier) => (
                            <SupplierCard key={supplier.source_id} supplier={supplier} />
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default SupplierListPage;
