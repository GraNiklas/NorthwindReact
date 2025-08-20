import React,{useState,useEffect} from 'react';

//props suoraan nimellä eikä props.huomio
const Customer = ({customer}) => {

    //componentin tilan määritys
    const [showDetails,setShowDetails] = useState(false);

    return (
    <div className='customer-div'>
        <h2
         onMouseEnter={()=>setShowDetails(true)}
         onMouseLeave={()=>setShowDetails(false)}
         >{customer.companyName}</h2>
        <p>{customer.city} - {customer.country}</p>
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
        </div>
        }
        
    </div>
    );
}

export default Customer;
