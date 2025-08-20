import React,{useState} from 'react';

//props suoraan nimellä eikä props.huomio
const Laskuri = ({huomio}) => {

    //componentin tilan määritys
    const [luku,setLuku] = useState(0);

    return (
    <>
        <h3>{luku}</h3>
        <button onClick={()=> setLuku(luku + 1)}>+</button>
        <button onClick={()=> setLuku(luku - 1)}>-</button>
        <button onClick={()=> setLuku(0)}>reset</button>
        <br/>
        <button onClick={huomio}>huomio</button>
    </>
    
    );
}

export default Laskuri;
