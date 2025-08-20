import React,{useState,useEffect} from 'react';
import customerService from './services/CustomerService';
import Customer from './Customer';
import CustomerAdd from './CustomerAdd';

//props suoraan nimellä eikä props.huomio
const CustomerList = ({setIsPositive,setMessage,setShowMessage}) => {

    //componentin tilan määritys
    const [customers,setCustomers] = useState([]);
    const [showCustomers,setShowCustomers] = useState(false);
    const [lisäysTila,setLisäysTila] = useState(false);
    

    useEffect(()=>{
        customerService.getAll()
        .then(data => setCustomers(data))
    },[lisäysTila])

    return (
    <>
        <button onClick={()=>setShowCustomers(!showCustomers)}>{showCustomers?"Piilota asiakkaat":"Näytä asiakkaat"}</button>
        {!lisäysTila && <button className='button' onClick={()=>setLisäysTila(true)}>Add new</button>}
        
        {lisäysTila && <CustomerAdd setLisäysTila={setLisäysTila} setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}/>}
        {
            showCustomers && customers && customers.map(c => 
                <Customer key={c.customerId}  customer = {c} setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} />
            )
        }
    </>
    
    );
}

export default CustomerList;
