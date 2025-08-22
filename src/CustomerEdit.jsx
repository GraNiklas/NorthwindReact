import React, { useState } from 'react';
import CustomerService from './services/CustomerService';

//props suoraan nimellä eikä props.huomio
const CustomerEdit = ({customer, setMuokkausTila, setIsPositive, setMessage, setShowMessage }) => {

    const [newCustomerId, setNewCustomerId] = useState(customer?.customerId ||"");
    const [newCompanyName, setNewCompanyName] = useState(customer?.companyName ||"");
    const [newContactName, setNewContactName] = useState(customer?.contactName ||"");
    const [newAddress, setNewAddress] = useState(customer?.address ||"");
    const [newCity, setNewCity] = useState(customer?.city ||"");
    const [newRegion, setNewRegion] = useState(customer?.region ||"");
    const [newPostalCode, setNewPostalCode] = useState(customer?.postalCode ||"");
    const [newCountry, setNewCountry] = useState(customer?.country ||"");
    const [newPhone, setNewPhone] = useState(customer?.phone ||"");
    const [newFax, setNewFax] = useState(customer?.fax ||"");

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
        CustomerService.update(newCustomer)
            .then(responce => {
                if (responce.status == 200)
                {

                    setIsPositive(true);
                    setMessage("Customer edited successfully: " + newCompanyName);
                    setShowMessage(true);
                    setMuokkausTila(false);
                    setTimeout(() => {
                        setShowMessage(false);
                        window.location.reload(); // reload the page to see the changes
                    }, 3000);
                }
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
        <div id='edit'>
            <h2>Customer edit</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type='text' placeholder='Customer id 5 characters' name='CustomerId' required onChange={({ target }) => setNewCustomerId(target.value)} disabled value={newCustomerId} maxLength="5" minLength="5" />
                </div>
                <div>
                    <input type='text' placeholder='Company name' name='CompanyName' required onChange={({ target }) => setNewCompanyName(target.value)} value={newCompanyName}/>
                </div>
                <div>
                    <input type='text' placeholder='Contact name' name='ContactName' onChange={({ target }) => setNewContactName(target.value)} value={newContactName}/>
                </div>
                <div>
                    <input type='text' placeholder='Address' name='Address' onChange={({ target }) => setNewAddress(target.value)} value={newAddress}/>
                </div>
                <div>
                    <input type='text' placeholder='City' name='City' onChange={({ target }) => setNewCity(target.value)} value={newCity}/>
                </div>
                <div>
                    <input type='text' placeholder='Region' name='Region' onChange={({ target }) => setNewRegion(target.value)} value={newRegion}/>
                </div>
                <div>
                    <input type='text' placeholder='PostalCode' name='PostalCode' onChange={({ target }) => setNewPostalCode(target.value)} value={newPostalCode}/>
                </div>
                <div>
                    <input type='text' placeholder='Country' name='Country' onChange={({ target }) => setNewCountry(target.value)} value={newCountry}/>
                </div>
                <div>
                    <input type='text' placeholder='Phone' name='Phone' onChange={({ target }) => setNewPhone(target.value)} value={newPhone}/>
                </div>
                <div>
                    <input type='text' placeholder='Fax' name='Fax' onChange={({ target }) => setNewFax(target.value)} value={newFax}/>
                </div>
                <div>
                    <input className='btn btn-success' type='submit' value='save' />
                    <input className='btn btn-secondary' type='button' value='back' onClick={() => setMuokkausTila(false)} />
                </div>

            </form>
        </div>

    );
}

export default CustomerEdit;
