import React,{useState,useEffect} from 'react';
import customerService from './services/CustomerService';
import Customer from './Customer';

//props suoraan nimellä eikä props.huomio
const CustomerList = () => {

    //componentin tilan määritys
    const [customers,setCustomers] = useState([]);
    const [showCustomers,setShowCustomers] = useState(false);
    useEffect(()=>{
        customerService.getAll()
        .then(data => setCustomers(data))
    },[])

    return (
    <>
    <button onClick={()=>setShowCustomers(!showCustomers)}>{showCustomers?"Piilota asiakkaat":"Näytä asiakkaat"}</button>
        {
            showCustomers && customers && customers.map(c => 
                <Customer key={c.customerId}  customer = {c} />
            )
        }
    </>
    
    );
}

export default CustomerList;
