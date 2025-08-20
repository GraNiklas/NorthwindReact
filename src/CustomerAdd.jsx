import React, { useState } from 'react';
import CustomerService from './services/CustomerService';

//props suoraan nimellä eikä props.huomio
const CustomerAdd = ({ setLisäysTila, setIsPositive, setMessage, setShowMessage }) => {

    const [newCustomerId, setNewCustomerId] = useState('');
    const [newCompanyName, setNewCompanyName] = useState('');
    const [newContactName, setNewContactName] = useState('');
    const [newAddress, setNewAddress] = useState('');
    const [newCity, setNewCity] = useState('');
    const [newRegion, setNewRegion] = useState('');
    const [newPostalCode, setNewPostalCode] = useState('');
    const [newCountry, setNewCountry] = useState('');
    const [newPhone, setNewPhone] = useState('');
    const [newFax, setNewFax] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        var newCustomer = {
            customerId: newCustomerId.toUpperCase(),
            companyName: newCompanyName,
            contactName: newContactName,
            address: newAddress,
            city: newCity,
            region: newRegion,
            postalCode: newPostalCode,
            country: newCountry,
            phone: newPhone,
            fax: newFax
        };
        CustomerService.create(newCustomer)
            .then(responce => {
                if (responce.status == 200)
                    setIsPositive(true);
                    setMessage("New customer added successfully: " + newCompanyName);
                    setShowMessage(true);
                    setLisäysTila(false);
                    setTimeout(() => {
                        setShowMessage(false);
                        window.location.reload(); // reload the page to see the changes
                    }, 3000);
            })
            .catch(error => {
                setShowMessage(true);
                setMessage("Error: " + error.response.data);
                setIsPositive(false);
                setTimeout(() => {
                    setShowMessage(false);
                }, 3000);
            })



    }


    return (
        <div id='addNew'>
            <h2>Customer add</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type='text' placeholder='Customer id 5 characters' name='CustomerId' required onChange={({ target }) => setNewCustomerId(target.value)} maxLength="5" minLength="5" />
                </div>
                <div>
                    <input type='text' placeholder='Company name' name='CompanyName' required onChange={({ target }) => setNewCompanyName(target.value)} />
                </div>
                <div>
                    <input type='text' placeholder='Contact name' name='ContactName' onChange={({ target }) => setNewContactName(target.value)} />
                </div>
                <div>
                    <input type='text' placeholder='Address' name='Address' onChange={({ target }) => setNewAddress(target.value)} />
                </div>
                <div>
                    <input type='text' placeholder='City' name='City' onChange={({ target }) => setNewCity(target.value)} />
                </div>
                <div>
                    <input type='text' placeholder='Region' name='Region' onChange={({ target }) => setNewRegion(target.value)} />
                </div>
                <div>
                    <input type='text' placeholder='PostalCode' name='PostalCode' onChange={({ target }) => setNewPostalCode(target.value)} />
                </div>
                <div>
                    <input type='text' placeholder='Country' name='Country' onChange={({ target }) => setNewCountry(target.value)} />
                </div>
                <div>
                    <input type='text' placeholder='Phone' name='Phone' onChange={({ target }) => setNewPhone(target.value)} />
                </div>
                <div>
                    <input type='text' placeholder='Fax' name='Fax' onChange={({ target }) => setNewFax(target.value)} />
                </div>
                <div>
                    <input type='submit' value='save' />
                    <input type='button' value='back' onClick={() => setLisäysTila(false)} />
                </div>

            </form>
        </div>

    );
}

export default CustomerAdd;
