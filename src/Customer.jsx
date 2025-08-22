import React,{useState,useEffect} from 'react';
import CustomerService from './services/CustomerService';
import CustomerEdit from './CustomerEdit';

//props suoraan nimellä eikä props.huomio
const Customer = ({customer,setIsPositive,setMessage,setShowMessage}) => {

    //componentin tilan määritys
    const [showDetails,setShowDetails] = useState(false);
    const [muokkausTila,setMuokkausTila] = useState(false);

    const  deleteCustomer =(customer) =>{
        if(window.confirm("Are you sure you want to delete customer: " + customer.companyName + "?"))
        {
            CustomerService.remove(customer.customerId)
            .then(response => {
                if(response.status === 200) {
                    setIsPositive(true);
                    setMessage("New customer deleted successfully: " + customer.companyName);
                    setShowMessage(true);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    setTimeout(() => {
                        setShowMessage(false);
                        window.location.reload(); // reload the page to see the changes
                    }, 3000);
                    
                }
                else
                {
                    setIsPositive(false);
                    setMessage("Something went wrong");
                    setShowMessage(true);
                    setTimeout(() => {
                        setShowMessage(false);
                    }, 3000);
                }
            })

        }
    }

    return (
    <div className='customer-div'>
        <h2 onClick={()=>setShowDetails(!showDetails)}>{customer.companyName}</h2>
            
        {showDetails && <div className='customer-details'>
            <h3>{customer.companyName}</h3> 
            <table className='table'>
                <thead>
                    <tr>
                        <th>Contact Name</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>Country</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>{customer.contactName}</th>
                        <th>{customer.phone}</th>
                        <th>{customer.address}</th>
                        <th>{customer.city}</th>
                        <th>{customer.country}</th>
                    </tr>
                </tbody>
            </table>
            <button className='btn btn-danger' onClick={()=>deleteCustomer(customer)}>delete</button>
            {!muokkausTila && <button className='btn btn-warning' onClick={()=>setMuokkausTila(true)}>Edit</button>}
        </div>
        }
        
        {muokkausTila && <CustomerEdit customer={customer} setMuokkausTila={setMuokkausTila} setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}/>}
    </div>
    );
}

export default Customer;
