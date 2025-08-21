import React, { useState, useEffect } from 'react';
import customerService from './services/CustomerService';
import Customer from './Customer';
import CustomerAdd from './CustomerAdd';

//props suoraan nimellä eikä props.huomio
const CustomerList = ({ setIsPositive, setMessage, setShowMessage }) => {

    //componentin tilan määritys
    const [customers, setCustomers] = useState([]);
    const [showCustomers, setShowCustomers] = useState(false);
    const [lisäysTila, setLisäysTila] = useState(false);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const token = localStorage.getItem('token');
        customerService.setToken(token);
        customerService.getAll()
            .then(data => setCustomers(data))
    }, [lisäysTila])


    const handleSearch = (e) => {
        setShowCustomers(true);
        setSearch(e.target.value.toLowerCase());
    }

    return (
        <>
          

            <button onClick={() => setShowCustomers(!showCustomers)}>{showCustomers ? "Piilota asiakkaat" : "Näytä asiakkaat"}</button>
            {!lisäysTila && <button className='button' onClick={() => setLisäysTila(true)}>Lisää uusi</button>}
            <br/>
            <label>Search:</label>
            <input type='text' onChange={(value) => handleSearch(value)}></input>
            {lisäysTila && <CustomerAdd setLisäysTila={setLisäysTila} setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} />}
            {
                showCustomers && customers && customers.map(c => {
                    const lowerCaseName = c.companyName.toLowerCase();
                    if (lowerCaseName.indexOf(search) > -1)
                        return (
                            <Customer key={c.customerId} customer={c} setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} />
                        )
                }
                )
            }
              
        </>

    );
}

export default CustomerList;
