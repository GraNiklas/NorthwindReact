import React,{useState} from 'react';

//props suoraan nimellä eikä props.huomio
const Laskuri = ({huomio}) => {

    //componentin tilan määritys
    const [luku,setLuku] = useState(0);

    return (
    <>
        <h1>Laskuri</h1>
        <h3>{luku}</h3>
        <button className='btn btn-secondary' onClick={()=> setLuku(luku + 1)}>+</button>
        <button className='btn btn-secondary' onClick={()=> setLuku(luku - 1)}>-</button>
        <button className='btn btn-secondary' onClick={()=> setLuku(0)}>reset</button>
        <br/>
        <button className='btn btn-secondary' onClick={huomio}>huomio</button>
    </>
    
    );
}

export default Laskuri;
